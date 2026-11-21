// === СОСТОЯНИЕ И СОХРАНЕНИЕ ===
let state = {
  nickname: localStorage.getItem('gd_nick') || 'Player_' + Math.floor(100 + Math.random() * 900),
  balance: Number(localStorage.getItem('gd_balance') ?? 2500),
  inventory: JSON.parse(localStorage.getItem('gd_inventory') || '[]'),
  stats: JSON.parse(localStorage.getItem('gd_stats') || '{"opened":0,"upgrades":0}'),
  rarities: JSON.parse(localStorage.getItem('gd_rarities') || JSON.stringify(DEFAULT_RARITIES)),
  cards: JSON.parse(localStorage.getItem('gd_cards') || JSON.stringify(DEFAULT_CARDS)),
  cases: JSON.parse(localStorage.getItem('gd_cases') || JSON.stringify(DEFAULT_CASES)),
  cloud: JSON.parse(localStorage.getItem('gd_cloud') || '{"binId":"","apiKey":""}'),
  liveDrops: JSON.parse(localStorage.getItem('gd_livedrops') || '[]')
};

const HOLO_MULTIPLIER = 2.5;
const HOLO_CHANCE = 0.12;

let currentCaseId = null;
let isSpinning = false;
let lastWonCard = null;

// Переменные для апгрейда, трейда и крафта
let upgSelectedSourceUid = null;
let upgSelectedTargetId = null;
let upgSelectedTargetHolo = false;
let upgRandomPool = [];

let tradeMyOfferUids = [];
let tradeBotOffer = [];

let craftSelectedUids = [];

function saveState() {
  localStorage.setItem('gd_nick', state.nickname);
  localStorage.setItem('gd_balance', state.balance);
  localStorage.setItem('gd_inventory', JSON.stringify(state.inventory));
  localStorage.setItem('gd_stats', JSON.stringify(state.stats));
  localStorage.setItem('gd_rarities', JSON.stringify(state.rarities));
  localStorage.setItem('gd_cards', JSON.stringify(state.cards));
  localStorage.setItem('gd_cases', JSON.stringify(state.cases));
  localStorage.setItem('gd_livedrops', JSON.stringify(state.liveDrops.slice(0, 25)));
  updateTopBar();
}

function updateTopBar() {
  document.getElementById('user-balance').textContent = Math.floor(state.balance);
  document.getElementById('nickname-input').value = state.nickname;
}

function saveNickname() {
  const val = document.getElementById('nickname-input').value.trim();
  if (val) {
    state.nickname = val;
    saveState();
  }
}

function addFreeMoney() {
  state.balance += 1000;
  saveState();
}

// === НАВИГАЦИЯ ПО ВКЛАДКАМ ===
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('tab-' + tabName).classList.add('active');
  document.querySelector(`.nav-btn[data-tab="${tabName}"]`).classList.add('active');

  if (tabName === 'cases') renderCasesList();
  if (tabName === 'upgrade') {
    if (upgRandomPool.length === 0) rerollUpgradeTargets();
    renderUpgradeUI();
  }
  if (tabName === 'collection') renderCollection();
  if (tabName === 'craft') renderCraftUI();
  if (tabName === 'admin') renderAdminUI();
}

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ КАРТОЧЕК И СОРТИРОВКИ ===
function getRarityObj(rarityId) {
  return state.rarities.find(r => r.id === rarityId) || state.rarities[0];
}

function getCardPrice(card, isHolo) {
  return Math.round(card.price * (isHolo ? HOLO_MULTIPLIER : 1));
}

function sortItems(items, sortMode) {
  return [...items].sort((a, b) => {
    const cardA = a.card || a;
    const cardB = b.card || b;
    const priceA = getCardPrice(cardA, a.isHolo || false);
    const priceB = getCardPrice(cardB, b.isHolo || false);
    const rarA = getRarityObj(cardA.rarity).order;
    const rarB = getRarityObj(cardB.rarity).order;

    if (sortMode === 'price-desc') return priceB - priceA;
    if (sortMode === 'price-asc') return priceA - priceB;
    if (sortMode === 'rarity-desc') return rarB - rarA || priceB - priceA;
    if (sortMode === 'rarity-asc') return rarA - rarB || priceA - priceB;
    return 0;
  });
}

function createCardHTML(card, isHolo = false, extraClass = '', clickAttr = '') {
  const rar = getRarityObj(card.rarity);
  const price = getCardPrice(card, isHolo);
  const effectClass = rar.effect && rar.effect !== 'none' ? `effect-${rar.effect}` : '';
  const holoClass = isHolo ? 'is-holo' : '';

  return `
    <div class="gd-card ${holoClass} ${effectClass} ${extraClass}" 
         style="--rar-color: ${rar.color}; --rar-bg: ${rar.bg};"
         ${clickAttr}>
      <div class="card-top-row">
        <span class="card-rank">${card.top > 0 ? '#' + card.top : '★'}</span>
        <span class="card-rarity-badge">${rar.name}</span>
      </div>
      <img class="card-thumb" src="${card.img}" alt="${card.name}" onerror="this.src='https://placehold.co/320x180/181a20/ffffff?text=GD+LEVEL'">
      <div class="card-title">${card.name}</div>
      <div class="card-footer">
        <span class="card-price">${price} ₽</span>
        ${isHolo ? '<span class="holo-pill">✦ HOLO</span>' : ''}
      </div>
    </div>
  `;
}

function giveCardToPlayer(card, isHolo, sourceLabel = 'Кейс') {
  const item = {
    uid: 'u_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    cardId: card.id,
    isHolo: isHolo
  };
  state.inventory.push(item);
  saveState();
  pushLiveDrop(card, isHolo, sourceLabel);
  return item;
}

// === ОБЩАЯ ЛЕНТА ЛАЙВ-ДРОПА (ДЛЯ ВСЕХ ИГРОКОВ) ===
async function pushLiveDrop(card, isHolo, source) {
  const rar = getRarityObj(card.rarity);
  const dropEntry = {
    id: Date.now() + Math.random(),
    user: state.nickname,
    cardName: card.name,
    img: card.img,
    isHolo: isHolo,
    rarColor: rar.color,
    rarName: rar.name,
    source: source
  };

  state.liveDrops.unshift(dropEntry);
  state.liveDrops = state.liveDrops.slice(0, 25);
  saveState();
  renderLiveFeed();

  // Синхронизация в облако JSONBin, чтобы видели другие игроки
  if (state.cloud.binId && state.cloud.apiKey) {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${state.cloud.binId}/latest`, {
        headers: { 'X-Master-Key': state.cloud.apiKey }
      });
      const json = await res.json();
      const cloudDrops = Array.isArray(json.record?.drops) ? json.record.drops : [];
      cloudDrops.unshift(dropEntry);
      await fetch(`https://api.jsonbin.io/v3/b/${state.cloud.binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': state.cloud.apiKey
        },
        body: JSON.stringify({ drops: cloudDrops.slice(0, 30) })
      });
    } catch (e) {
      console.warn('Ошибка отправки в общую ленту:', e);
    }
  }
}

async function fetchCloudLiveDrops() {
  if (!state.cloud.binId || !state.cloud.apiKey) return;
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${state.cloud.binId}/latest`, {
      headers: { 'X-Master-Key': state.cloud.apiKey }
    });
    const json = await res.json();
    if (Array.isArray(json.record?.drops)) {
      state.liveDrops = json.record.drops;
      renderLiveFeed();
    }
  } catch (e) {}
}

function renderLiveFeed() {
  const feed = document.getElementById('live-drop-feed');
  feed.innerHTML = state.liveDrops.map(d => `
    <div class="live-item" style="--rar-color: ${d.rarColor}">
      <img src="${d.img}" alt="">
      <div class="live-item-info">
        <b>${d.isHolo ? '✦ HOLO ' : ''}${d.cardName}</b>
        <span>${d.user} • ${d.rarName}</span>
      </div>
    </div>
  `).join('');
}

// === 6) КЕЙСЫ И РУЛЕТКА ===
function renderCasesList() {
  const sortMode = document.getElementById('cases-sort').value;
  const sorted = [...state.cases].sort((a, b) => sortMode === 'price-asc' ? a.price - b.price : b.price - a.price);
  const grid = document.getElementById('cases-list');
  grid.innerHTML = sorted.map(c => `
    <div class="case-item" onclick="openCaseView('${c.id}')">
      <img src="${c.img}" alt="${c.name}">
      <h3>${c.name}</h3>
      <div class="case-price-tag">${c.price} ₽</div>
    </div>
  `).join('');
}

function openCaseView(caseId) {
  currentCaseId = caseId;
  const c = state.cases.find(x => x.id === caseId);
  document.getElementById('cases-grid-view').classList.add('hidden');
  document.getElementById('case-open-view').classList.remove('hidden');
  document.getElementById('active-case-title').textContent = c.name;
  document.getElementById('active-case-price').textContent = c.price;
  renderCaseContents();
  prepareRouletteTape(c);
}

function closeCaseView() {
  if (isSpinning) return;
  document.getElementById('case-open-view').classList.add('hidden');
  document.getElementById('cases-grid-view').classList.remove('hidden');
}

function renderCaseContents() {
  const c = state.cases.find(x => x.id === currentCaseId);
  const sortMode = document.getElementById('case-contents-sort').value;
  const caseCards = c.cardIds.map(id => state.cards.find(card => card.id === id)).filter(Boolean);
  const sorted = sortItems(caseCards, sortMode);
  document.getElementById('case-contents-grid').innerHTML = sorted.map(card => createCardHTML(card, false)).join('');
}

function rollWeightedCard(poolCards) {
  let totalWeight = 0;
  const weighted = poolCards.map(card => {
    const w = getRarityObj(card.rarity).weight || 10;
    totalWeight += w;
    return { card, w };
  });
  let rnd = Math.random() * totalWeight;
  for (const item of weighted) {
    if (rnd < item.w) return item.card;
    rnd -= item.w;
  }
  return poolCards[0];
}

function prepareRouletteTape(caseObj, winCard = null, winHolo = false) {
  const pool = caseObj.cardIds.map(id => state.cards.find(c => c.id === id)).filter(Boolean);
  const track = document.getElementById('roulette-track');
  track.style.transition = 'none';
  track.style.transform = 'translateX(0px)';

  let html = '';
  for (let i = 0; i < 45; i++) {
    if (i === 38 && winCard) {
      html += createCardHTML(winCard, winHolo);
    } else {
      const rndCard = pool[Math.floor(Math.random() * pool.length)];
      html += createCardHTML(rndCard, Math.random() < HOLO_CHANCE);
    }
  }
  track.innerHTML = html;
}

function spinCurrentCase(fast = false) {
  if (isSpinning) return;
  const c = state.cases.find(x => x.id === currentCaseId);
  if (state.balance < c.price) return alert('Недостаточно рублей!');

  state.balance -= c.price;
  state.stats.opened += 1;
  saveState();

  const pool = c.cardIds.map(id => state.cards.find(card => card.id === id)).filter(Boolean);
  const wonCard = rollWeightedCard(pool);
  const wonHolo = Math.random() < HOLO_CHANCE;

  prepareRouletteTape(c, wonCard, wonHolo);
  isSpinning = true;
  document.getElementById('spin-case-btn').disabled = true;

  const track = document.getElementById('roulette-track');
  const cardWidth = 170; // 160px + 10px gap
  const offset = 38 * cardWidth + (Math.random() * 60 - 30) + 80;

  setTimeout(() => {
    track.style.transition = fast ? 'transform 0.8s cubic-bezier(0.15, 0.85, 0.25, 1)' : 'transform 4.2s cubic-bezier(0.12, 0.88, 0.22, 1)';
    track.style.transform = `translateX(-${offset}px)`;
  }, 30);

  setTimeout(() => {
    isSpinning = false;
    document.getElementById('spin-case-btn').disabled = false;
    const addedItem = giveCardToPlayer(wonCard, wonHolo, c.name);
    showWinModal(wonCard, wonHolo, addedItem.uid);
  }, fast ? 900 : 4350);
}

// === 1) ПАКИ ЗА 500 РУБЛЕЙ ===
function buyPack() {
  if (state.balance < 500) return alert('Недостаточно рублей для покупки пака (нужно 500 ₽)!');
  state.balance -= 500;
  state.stats.opened += 1;

  const revealArea = document.getElementById('pack-reveal-area');
  revealArea.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const card = rollWeightedCard(state.cards);
    const isHolo = Math.random() < HOLO_CHANCE;
    giveCardToPlayer(card, isHolo, 'Пак 500₽');
    revealArea.innerHTML += createCardHTML(card, isHolo);
  }
  saveState();
}

// === 3) АПГРЕЙДЫ (ВЫБОР ИЗ 15 СЛУЧАЙНЫХ КАРТ) ===
function rerollUpgradeTargets() {
  upgRandomPool = [];
  for (let i = 0; i < 15; i++) {
    const rndCard = state.cards[Math.floor(Math.random() * state.cards.length)];
    const isHolo = Math.random() < 0.25;
    upgRandomPool.push({ card: rndCard, isHolo });
  }
  upgSelectedTargetId = null;
  renderUpgradeUI();
}

function renderUpgradeUI() {
  // Твой инвентарь
  const invSort = document.getElementById('upg-inv-sort').value;
  const myMapped = state.inventory.map(item => ({
    ...item,
    card: state.cards.find(c => c.id === item.cardId)
  })).filter(x => x.card);

  const sortedMy = sortItems(myMapped, invSort);
  document.getElementById('upgrade-my-cards').innerHTML = sortedMy.map(item => {
    const sel = item.uid === upgSelectedSourceUid ? 'selected' : '';
    return createCardHTML(item.card, item.isHolo, sel, `onclick="selectUpgradeSource('${item.uid}')"`);
  }).join('');

  renderUpgradeTargets();
  updateUpgradeSlotsAndChance();
}

function renderUpgradeTargets() {
  const tSort = document.getElementById('upg-target-sort').value;
  const sortedTargets = sortItems(upgRandomPool, tSort);
  document.getElementById('upgrade-target-cards').innerHTML = sortedTargets.map((t, idx) => {
    const sel = (t.card.id === upgSelectedTargetId && t.isHolo === upgSelectedTargetHolo) ? 'selected' : '';
    return createCardHTML(t.card, t.isHolo, sel, `onclick="selectUpgradeTarget('${t.card.id}', ${t.isHolo})"`);
  }).join('');
}

function selectUpgradeSource(uid) {
  upgSelectedSourceUid = uid;
  updateUpgradeSlotsAndChance();
  renderUpgradeUI();
}

function selectUpgradeTarget(cardId, isHolo) {
  upgSelectedTargetId = cardId;
  upgSelectedTargetHolo = isHolo;
  updateUpgradeSlotsAndChance();
  renderUpgradeTargets();
}

function updateUpgradeSlotsAndChance() {
  const srcSlot = document.getElementById('upgrade-source-slot');
  const tgtSlot = document.getElementById('upgrade-target-slot');
  const btn = document.getElementById('do-upgrade-btn');
  const chanceText = document.getElementById('upgrade-chance-text');
  const circle = document.getElementById('upgrade-circle');

  const srcItem = state.inventory.find(x => x.uid === upgSelectedSourceUid);
  const srcCard = srcItem ? state.cards.find(c => c.id === srcItem.cardId) : null;
  const tgtCard = state.cards.find(c => c.id === upgSelectedTargetId);

  srcSlot.innerHTML = srcCard ? createCardHTML(srcCard, srcItem.isHolo) : 'Выбери карту снизу';
  tgtSlot.innerHTML = tgtCard ? createCardHTML(tgtCard, upgSelectedTargetHolo) : 'Выбери цель справа';

  if (srcCard && tgtCard) {
    const srcPrice = getCardPrice(srcCard, srcItem.isHolo);
    const tgtPrice = getCardPrice(tgtCard, upgSelectedTargetHolo);
    let chance = (srcPrice / tgtPrice) * 85;
    chance = Math.max(1, Math.min(85, chance));

    chanceText.textContent = chance.toFixed(2) + '%';
    const deg = (chance / 100) * 360;
    circle.style.background = `conic-gradient(var(--accent) ${deg}deg, #262934 ${deg}deg)`;
    btn.disabled = false;
  } else {
    chanceText.textContent = '0.00%';
    circle.style.background = `conic-gradient(var(--accent) 0deg, #262934 0deg)`;
    btn.disabled = true;
  }
}

function executeUpgrade() {
  const srcIdx = state.inventory.findIndex(x => x.uid === upgSelectedSourceUid);
  if (srcIdx === -1) return;

  const srcItem = state.inventory[srcIdx];
  const srcCard = state.cards.find(c => c.id === srcItem.cardId);
  const tgtCard = state.cards.find(c => c.id === upgSelectedTargetId);

  const srcPrice = getCardPrice(srcCard, srcItem.isHolo);
  const tgtPrice = getCardPrice(tgtCard, upgSelectedTargetHolo);
  const chance = Math.max(1, Math.min(85, (srcPrice / tgtPrice) * 85));

  const roll = Math.random() * 100;
  const arrow = document.getElementById('upgrade-arrow');
  arrow.style.transition = 'transform 1.2s cubic-bezier(0.2, 0.9, 0.3, 1)';
  arrow.style.transform = `rotate(${360 * 3 + (roll / 100) * 360}deg)`;

  document.getElementById('do-upgrade-btn').disabled = true;

  setTimeout(() => {
    // Удаляем исходную карту
    state.inventory.splice(srcIdx, 1);
    upgSelectedSourceUid = null;

    const msg = document.getElementById('upgrade-result-msg');
    if (roll <= chance) {
      state.stats.upgrades += 1;
      giveCardToPlayer(tgtCard, upgSelectedTargetHolo, 'Апгрейд');
      msg.innerHTML = `<span style="color:#4ade80; font-weight:800;">УСПЕХ! Выпал ${tgtCard.name}</span>`;
    } else {
      msg.innerHTML = `<span style="color:#f87171; font-weight:800;">НЕУДАЧА! Карточка сгорела</span>`;
    }
    saveState();
    renderUpgradeUI();
  }, 1250);
}

// === 2) ТРЕЙД С БОТОМ ===
function startBotTrade() {
  tradeMyOfferUids = [];
  tradeBotOffer = [];
  document.getElementById('trade-arena').classList.remove('hidden');
  renderTradeUI();
}

function toggleTradeCard(uid) {
  const idx = tradeMyOfferUids.indexOf(uid);
  if (idx > -1) tradeMyOfferUids.splice(idx, 1);
  else tradeMyOfferUids.push(uid);

  recalculateBotOffer();
  renderTradeUI();
}

function recalculateBotOffer() {
  let mySum = 0;
  tradeMyOfferUids.forEach(uid => {
    const item = state.inventory.find(x => x.uid === uid);
    if (item) {
      const card = state.cards.find(c => c.id === item.cardId);
      mySum += getCardPrice(card, item.isHolo);
    }
  });

  // Бот дает ровно столько же или на 2-10% меньше
  let targetBotBudget = Math.floor(mySum * (0.90 + Math.random() * 0.10));
  tradeBotOffer = [];

  if (targetBotBudget > 0) {
    const sortedCatalog = [...state.cards].sort((a, b) => b.price - a.price);
    for (let guard = 0; guard < 12 && targetBotBudget >= 100; guard++) {
      const affordable = sortedCatalog.filter(c => c.price <= targetBotBudget);
      if (affordable.length === 0) break;
      const pick = affordable[Math.floor(Math.random() * Math.min(3, affordable.length))];
      const canHolo = getCardPrice(pick, true) <= targetBotBudget && Math.random() < 0.25;
      tradeBotOffer.push({ card: pick, isHolo: canHolo });
      targetBotBudget -= getCardPrice(pick, canHolo);
    }
  }
}

function renderTradeUI() {
  let mySum = 0;
  const offerHtml = tradeMyOfferUids.map(uid => {
    const item = state.inventory.find(x => x.uid === uid);
    const card = state.cards.find(c => c.id === item.cardId);
    mySum += getCardPrice(card, item.isHolo);
    return createCardHTML(card, item.isHolo, '', `onclick="toggleTradeCard('${uid}')"`);
  }).join('');

  let botSum = 0;
  const botHtml = tradeBotOffer.map(b => {
    botSum += getCardPrice(b.card, b.isHolo);
    return createCardHTML(b.card, b.isHolo);
  }).join('');

  document.getElementById('my-trade-sum').textContent = mySum;
  document.getElementById('bot-trade-sum').textContent = botSum;
  document.getElementById('my-trade-offer').innerHTML = offerHtml;
  document.getElementById('bot-trade-offer').innerHTML = botHtml;

  const availInv = state.inventory.filter(x => !tradeMyOfferUids.includes(x.uid));
  document.getElementById('trade-my-inv').innerHTML = availInv.map(item => {
    const card = state.cards.find(c => c.id === item.cardId);
    return createCardHTML(card, item.isHolo, '', `onclick="toggleTradeCard('${item.uid}')"`);
  }).join('');

  document.getElementById('confirm-trade-btn').disabled = !(mySum > 0 && tradeBotOffer.length > 0);
}

function confirmTrade() {
  state.inventory = state.inventory.filter(x => !tradeMyOfferUids.includes(x.uid));
  tradeBotOffer.forEach(b => giveCardToPlayer(b.card, b.isHolo, 'Трейд с ботом'));
  tradeMyOfferUids = [];
  tradeBotOffer = [];
  saveState();
  renderTradeUI();
  alert('Трейд успешно завершен!');
}

// === 7) КРАФТЫ (10 КАРТ ОДНОЙ РЕДКОСТИ -> 1 СЛЕДУЮЩЕЙ) ===
function renderCraftUI() {
  const sortMode = document.getElementById('craft-sort').value;
  const mapped = state.inventory.map(item => ({
    ...item,
    card: state.cards.find(c => c.id === item.cardId)
  })).filter(x => x.card);

  const sorted = sortItems(mapped, sortMode);
  document.getElementById('craft-inv-grid').innerHTML = sorted.map(item => {
    const isSel = craftSelectedUids.includes(item.uid);
    return createCardHTML(item.card, item.isHolo, isSel ? 'selected' : '', `onclick="toggleCraftCard('${item.uid}')"`);
  }).join('');

  // Отрисовка 10 слотов
  const slotsEl = document.getElementById('craft-selected-slots');
  let slotsHtml = '';
  let sumPrice = 0;

  for (let i = 0; i < 10; i++) {
    const uid = craftSelectedUids[i];
    if (uid) {
      const item = state.inventory.find(x => x.uid === uid);
      const card = state.cards.find(c => c.id === item.cardId);
      sumPrice += getCardPrice(card, item.isHolo);
      slotsHtml += `<div class="craft-mini-slot" onclick="toggleCraftCard('${uid}')"><img src="${card.img}" style="width:100%;height:100%;object-fit:cover;"></div>`;
    } else {
      slotsHtml += `<div class="craft-mini-slot">${i + 1}</div>`;
    }
  }
  slotsEl.innerHTML = slotsHtml;
  document.getElementById('craft-count').textContent = craftSelectedUids.length;
  document.getElementById('craft-avg-price').textContent = craftSelectedUids.length ? Math.round(sumPrice / craftSelectedUids.length) : 0;
  document.getElementById('do-craft-btn').disabled = craftSelectedUids.length !== 10;
}

function toggleCraftCard(uid) {
  const idx = craftSelectedUids.indexOf(uid);
  if (idx > -1) {
    craftSelectedUids.splice(idx, 1);
  } else {
    if (craftSelectedUids.length >= 10) return alert('Уже выбрано 10 карт!');
    const newItem = state.inventory.find(x => x.uid === uid);
    const newCard = state.cards.find(c => c.id === newItem.cardId);

    if (craftSelectedUids.length > 0) {
      const firstItem = state.inventory.find(x => x.uid === craftSelectedUids[0]);
      const firstCard = state.cards.find(c => c.id === firstItem.cardId);
      if (firstCard.rarity !== newCard.rarity) {
        return alert('Для крафта нужны 10 карт ОДНОЙ редкости!');
      }
    }
    craftSelectedUids.push(uid);
  }
  renderCraftUI();
}

function executeCraft() {
  if (craftSelectedUids.length !== 10) return;

  let totalValue = 0;
  let baseRarityId = null;

  craftSelectedUids.forEach(uid => {
    const item = state.inventory.find(x => x.uid === uid);
    const card = state.cards.find(c => c.id === item.cardId);
    baseRarityId = card.rarity;
    totalValue += getCardPrice(card, item.isHolo);
  });

  const avgInputPrice = totalValue / 10;
  const currentRar = getRarityObj(baseRarityId);
  const nextRar = [...state.rarities].sort((a, b) => a.order - b.order).find(r => r.order > currentRar.order) || currentRar;

  const candidates = state.cards.filter(c => c.rarity === nextRar.id);
  const pool = candidates.length > 0 ? candidates : state.cards;

  // Чем выше средняя цена 10 вложенных карт, тем более дорогую карту следующей редкости выдаем
  const sortedPool = [...pool].sort((a, b) => a.price - b.price);
  const minInput = Math.min(...state.cards.filter(c => c.rarity === baseRarityId).map(c => c.price));
  const maxInput = Math.max(...state.cards.filter(c => c.rarity === baseRarityId).map(c => c.price * HOLO_MULTIPLIER));
  const ratio = maxInput > minInput ? Math.min(1, Math.max(0, (avgInputPrice - minInput) / (maxInput - minInput))) : 0.5;

  const targetIndex = Math.min(sortedPool.length - 1, Math.floor(ratio * sortedPool.length));
  const craftedCard = sortedPool[targetIndex];
  const isHolo = Math.random() < HOLO_CHANCE;

  state.inventory = state.inventory.filter(x => !craftSelectedUids.includes(x.uid));
  craftSelectedUids = [];

  const added = giveCardToPlayer(craftedCard, isHolo, 'Крафт 10→1');
  showWinModal(craftedCard, isHolo, added.uid);
  renderCraftUI();
}

// === 4) КОЛЛЕКЦИЯ И СТАТИСТИКА ===
function renderCollection() {
  const sortMode = document.getElementById('col-sort').value;
  const mapped = state.inventory.map(item => ({
    ...item,
    card: state.cards.find(c => c.id === item.cardId)
  })).filter(x => x.card);

  const totalValue = mapped.reduce((acc, x) => acc + getCardPrice(x.card, x.isHolo), 0);
  document.getElementById('stat-total-cards').textContent = mapped.length;
  document.getElementById('stat-inv-value').textContent = totalValue + ' ₽';
  document.getElementById('stat-opened').textContent = state.stats.opened;
  document.getElementById('stat-upgrades').textContent = state.stats.upgrades;

  const sorted = sortItems(mapped, sortMode);
  document.getElementById('collection-grid').innerHTML = sorted.map(item => {
    const price = getCardPrice(item.card, item.isHolo);
    return `
      <div>
        ${createCardHTML(item.card, item.isHolo)}
        <button class="secondary-btn" style="width:100%; margin-top:6px; font-size:12px;" onclick="sellInventoryCard('${item.uid}')">
          Продать за ${price} ₽
        </button>
      </div>
    `;
  }).join('');
}

function sellInventoryCard(uid) {
  const idx = state.inventory.findIndex(x => x.uid === uid);
  if (idx === -1) return;
  const item = state.inventory[idx];
  const card = state.cards.find(c => c.id === item.cardId);
  state.balance += getCardPrice(card, item.isHolo);
  state.inventory.splice(idx, 1);
  saveState();
  renderCollection();
}

function sellAllDuplicates() {
  const seen = new Set();
  let earned = 0;
  state.inventory = state.inventory.filter(item => {
    const key = item.cardId + '_' + item.isHolo;
    if (seen.has(key)) {
      const card = state.cards.find(c => c.id === item.cardId);
      earned += getCardPrice(card, item.isHolo);
      return false;
    }
    seen.add(key);
    return true;
  });
  state.balance += earned;
  saveState();
  renderCollection();
  alert(`Продано дубликатов на сумму: ${earned} ₽`);
}

// === 5) АДМИН-ПАНЕЛЬ (ПАРОЛЬ 12356790) ===
function checkAdminPass() {
  const pass = document.getElementById('admin-pass-input').value;
  if (pass === '12356790') {
    document.getElementById('admin-login-box').classList.add('hidden');
    document.getElementById('admin-panel-content').classList.remove('hidden');
    renderAdminUI();
  } else {
    alert('Неверный пароль!');
  }
}

function saveCloudConfig() {
  state.cloud.binId = document.getElementById('cfg-bin-id').value.trim();
  state.cloud.apiKey = document.getElementById('cfg-api-key').value.trim();
  localStorage.setItem('gd_cloud', JSON.stringify(state.cloud));
  alert('Ключи общей ленты сохранены!');
  fetchCloudLiveDrops();
}

function renderAdminUI() {
  document.getElementById('cfg-bin-id').value = state.cloud.binId || '';
  document.getElementById('cfg-api-key').value = state.cloud.apiKey || '';

  // Редкости
  document.getElementById('admin-rarities-list').innerHTML = state.rarities.map(r => `
    <div class="rar-tag" style="background:${r.bg}; border: 1px solid ${r.color}; color:#fff;">
      ${r.name} (вес: ${r.weight}, эффект: ${r.effect})
      <button onclick="adminDeleteRarity('${r.id}')" style="background:none;border:none;color:#f87171;cursor:pointer;">✕</button>
    </div>
  `).join('');

  // Селект редкостей для новой карты
  document.getElementById('new-card-rarity').innerHTML = state.rarities.map(r =>
    `<option value="${r.id}">${r.name}</option>`
  ).join('');

  // Чекбоксы карт для нового кейса
  document.getElementById('admin-case-cards-selector').innerHTML = state.cards.map(c => `
    <label style="display:flex;align-items:center;gap:6px;font-size:12px;">
      <input type="checkbox" class="case-card-cb" value="${c.id}"> #${c.top} ${c.name}
    </label>
  `).join('');

  // Все карты
  document.getElementById('admin-cards-count').textContent = state.cards.length;
  document.getElementById('admin-all-cards').innerHTML = state.cards.map(c => `
    <div>
      ${createCardHTML(c, false)}
      <button class="secondary-btn" style="width:100%;margin-top:4px;color:#f87171;" onclick="adminDeleteCard('${c.id}')">Удалить</button>
    </div>
  `).join('');
}

function adminAddRarity() {
  const name = document.getElementById('new-rar-name').value.trim();
  const color = document.getElementById('new-rar-color').value;
  const bg = document.getElementById('new-rar-bg').value;
  const weight = Number(document.getElementById('new-rar-weight').value) || 50;
  const effect = document.getElementById('new-rar-effect').value;
  if (!name) return;

  const id = name.toLowerCase().replace(/\s+/g, '_');
  const existing = state.rarities.find(r => r.id === id);
  if (existing) {
    Object.assign(existing, { name, color, bg, weight, effect });
  } else {
    state.rarities.push({ id, name, color, bg, order: state.rarities.length + 1, weight, effect });
  }
  saveState();
  renderAdminUI();
}

function adminDeleteRarity(id) {
  if (state.rarities.length <= 1) return;
  state.rarities = state.rarities.filter(r => r.id !== id);
  saveState();
  renderAdminUI();
}

function adminAddCard() {
  const top = Number(document.getElementById('new-card-top').value) || 0;
  const name = document.getElementById('new-card-name').value.trim();
  const rarity = document.getElementById('new-card-rarity').value;
  const price = Number(document.getElementById('new-card-price').value) || 500;
  const img = document.getElementById('new-card-img').value.trim() || 'https://placehold.co/320x180/181a20/ffffff?text=GD';

  if (!name) return alert('Введи название уровня!');
  state.cards.push({ id: 'c_' + Date.now(), top, name, rarity, price, img });
  saveState();
  renderAdminUI();
  alert('Карточка добавлена и уже падает в паках!');
}

function adminDeleteCard(id) {
  state.cards = state.cards.filter(c => c.id !== id);
  saveState();
  renderAdminUI();
}

function adminAddCase() {
  const name = document.getElementById('new-case-name').value.trim();
  const price = Number(document.getElementById('new-case-price').value) || 500;
  const img = document.getElementById('new-case-img').value.trim() || 'https://placehold.co/320x180/181a20/ffffff?text=CASE';
  const selectedIds = Array.from(document.querySelectorAll('.case-card-cb:checked')).map(cb => cb.value);

  if (!name || selectedIds.length === 0) return alert('Укажи название кейса и выбери хотя бы 1 карту!');
  state.cases.push({ id: 'case_' + Date.now(), name, price, img, cardIds: selectedIds });
  saveState();
  alert('Кейс создан!');
}

// === МОДАЛЬНОЕ ОКНО ВЫИГРЫША ===
function showWinModal(card, isHolo, uid) {
  lastWonCard = { card, isHolo, uid };
  document.getElementById('win-card-container').innerHTML = createCardHTML(card, isHolo);
  document.getElementById('sell-won-btn').textContent = `Продать за ${getCardPrice(card, isHolo)} ₽`;
  document.getElementById('win-modal').classList.remove('hidden');
}

function closeWinModal() {
  document.getElementById('win-modal').classList.add('hidden');
}

function sellWonCard() {
  if (lastWonCard) {
    sellInventoryCard(lastWonCard.uid);
    closeWinModal();
  }
}

// === ЗАПУСК ===
updateTopBar();
renderCasesList();
renderLiveFeed();
setInterval(fetchCloudLiveDrops, 5000);
