// === НАСТРОЙКИ ОБЩЕГО ПУЛА КАРТ (JSONBin.io) ===
const JSONBIN_BIN_ID = '6afc4b60ffd5d16053c85caa';
const JSONBIN_MASTER_KEY = '$2a$10$eiZem/A1JhfYhF6bHWXE7uzoJ6D8QjuKpyPe5Hrg9i2osHoYhRrVK';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Стартовый пул (используется только если облако ещё не настроено или в облаке вообще нет массива pool)
const DEFAULT_POOL = [
  {
    id: 'lvl_1',
    rank: 1,
    name: 'Tidal Wave',
    verifier: 'Zoink',
    publisher: 'OniLink',
    rarity: 'limit',
    price: 4500,
    image: 'https://i.ytimg.com/vi/9fsZ014qB3s/maxresdefault.jpg'
  },
  {
    id: 'lvl_2',
    rank: 2,
    name: 'Acheron',
    verifier: 'Zoink',
    publisher: 'ryamu',
    rarity: 'apex',
    price: 2200,
    image: 'https://i.ytimg.com/vi/sBKR6aUorzA/maxresdefault.jpg'
  },
  {
    id: 'lvl_3',
    rank: 3,
    name: 'Avernus',
    verifier: 'Zoink',
    publisher: 'PockeWindfish',
    rarity: 'apex',
    price: 1900,
    image: 'https://i.ytimg.com/vi/16Zh8hW264w/maxresdefault.jpg'
  },
  {
    id: 'lvl_4',
    rank: 4,
    name: 'Thinking Space II',
    verifier: 'Zoink',
    publisher: 'CairoX',
    rarity: 'mythic',
    price: 750,
    image: 'https://i.ytimg.com/vi/5M6h8f6bY5g/maxresdefault.jpg'
  },
  {
    id: 'lvl_5',
    rank: 5,
    name: 'Silent Clubstep',
    verifier: 'Paqoe',
    publisher: 'TheRealSailent',
    rarity: 'legendary',
    price: 1200,
    image: 'https://i.ytimg.com/vi/GR4Sn_dc83w/maxresdefault.jpg'
  },
  {
    id: 'lvl_6',
    rank: 6,
    name: 'Abyss of Darkness',
    verifier: 'Cursed',
    publisher: 'Exen',
    rarity: 'legendary',
    price: 1050,
    image: 'https://i.ytimg.com/vi/ejJ2220141A/maxresdefault.jpg'
  },
  {
    id: 'lvl_9',
    rank: 9,
    name: 'ORBIT',
    verifier: 'Zoink',
    publisher: 'MindCap',
    rarity: 'mythic',
    price: 720,
    image: 'https://placehold.co/400x225/1a1025/ffffff?text=ORBIT'
  },
  {
    id: 'lvl_7',
    rank: 10,
    name: 'Antarctic Lights',
    verifier: 'Axinity',
    publisher: 'declanic',
    rarity: 'mythic',
    price: 680,
    image: 'https://i.ytimg.com/vi/8hH2H6-X1bU/maxresdefault.jpg'
  },
  {
    id: 'lvl_8',
    rank: 14,
    name: 'Slaughterhouse',
    verifier: 'Doggie',
    publisher: 'icedcave',
    rarity: 'epic',
    price: 340,
    image: 'https://i.ytimg.com/vi/kpcF1-6989M/maxresdefault.jpg'
  },
  {
    id: 'lvl_10',
    rank: 35,
    name: 'Kuzureta',
    verifier: 'Teno',
    publisher: 'Teno',
    rarity: 'common',
    price: 110,
    image: 'https://i.ytimg.com/vi/0rG15S9Z4zY/maxresdefault.jpg'
  },
  {
    id: 'lvl_11',
    rank: 48,
    name: 'Bloodlust',
    verifier: 'Knobbelboy',
    publisher: 'Knobbelboy',
    rarity: 'common',
    price: 95,
    image: 'https://i.ytimg.com/vi/5247258391/maxresdefault.jpg'
  },
  {
    id: 'lvl_12',
    rank: 75,
    name: 'Tartarus',
    verifier: 'Dolphy',
    publisher: 'Riot',
    rarity: 'common',
    price: 80,
    image: 'https://i.ytimg.com/vi/398123981/maxresdefault.jpg'
  }
];

const RARITY_WEIGHTS = [
  { key: 'common', weight: 67.5 },
  { key: 'epic', weight: 31.5 },
  { key: 'mythic', weight: 0.4 },
  { key: 'legendary', weight: 0.3 },
  { key: 'apex', weight: 0.2 },
  { key: 'limit', weight: 0.1 }
];

const RARE_ANIM_TIERS = ['legendary', 'apex', 'limit'];
const HOLO_CHANCE = 0.12;
const HOLO_MULTIPLIER = 3.5;

// Личный прогресс игрока хранится локально, а pool синхронизируется с облаком
let state = {
  balance: 500,
  packs: 1,
  packsOpened: 0,
  secondsLeft: 60,
  pool: [],
  inventory: [],
  droppedTemp: []
};

let tradeActive = false;
let userTradeIds = [];
let botOfferCards = [];

let selectedUpgradeSourceId = null;
let selectedUpgradeTargetKey = null;
let isSpinning = false;
let isOpeningPack = false;
let uploadedAdminImageDataUrl = '';
let editingCardImageDataUrl = '';

function isCloudConfigured() {
  return (
    JSONBIN_BIN_ID &&
    !JSONBIN_BIN_ID.includes('ВСТАВЬ_СЮДА') &&
    JSONBIN_MASTER_KEY &&
    !JSONBIN_MASTER_KEY.includes('ВСТАВЬ_СЮДА')
  );
}

async function fetchSharedPool() {
  if (!isCloudConfigured()) {
    return { ok: false, pool: null };
  }
  try {
    const res = await fetch(`${JSONBIN_URL}/latest?nocache=${Date.now()}`, {
      cache: 'no-store',
      headers: {
        'X-Master-Key': JSONBIN_MASTER_KEY
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    if (data.record && Array.isArray(data.record.pool)) {
      return { ok: true, pool: data.record.pool };
    }
    return { ok: true, pool: [] };
  } catch (err) {
    console.error('Не удалось загрузить общий пул:', err);
    return { ok: false, pool: null };
  }
}

async function pushSharedPool(newPool) {
  if (!isCloudConfigured()) {
    showToast('Укажи JSONBIN_BIN_ID и JSONBIN_MASTER_KEY в начале app.js!');
    return false;
  }
  try {
    const res = await fetch(JSONBIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_MASTER_KEY
      },
      body: JSON.stringify({ pool: newPool })
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return true;
  } catch (err) {
    console.error('Ошибка отправки общего пула:', err);
    showToast('Не удалось сохранить пул в облако (проверь ключ, Bin ID или размер картинок)');
    return false;
  }
}

function ensureOpenAllPacksButton() {
  const openBtn = document.getElementById('open-pack-btn');
  if (!openBtn || document.getElementById('open-all-packs-btn')) return;

  const actionsWrap = openBtn.parentElement;
  if (actionsWrap) {
    actionsWrap.style.flexWrap = 'wrap';
  }

  const allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.id = 'open-all-packs-btn';
  allBtn.className = 'btn-secondary';
  allBtn.textContent = 'Открыть все';
  allBtn.addEventListener('click', openAllPacks);

  openBtn.insertAdjacentElement('afterend', allBtn);
}

function ensureAdminSyncButton() {
  const adminPanel = document.getElementById('admin-panel');
  if (!adminPanel || document.getElementById('sync-pool-now-btn')) return;

  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex; flex-wrap:wrap; align-items:center; gap:12px; margin:16px 0 8px;';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'sync-pool-now-btn';
  btn.className = 'btn-secondary';
  btn.textContent = 'Залить текущий пул в облако всем игрокам';
  btn.addEventListener('click', async () => {
    if (!state.pool || state.pool.length === 0) {
      showToast('Пул пуст — нечего отправлять');
      return;
    }
    const ok = await pushSharedPool(state.pool);
    if (ok) {
      showToast(`Пул (${state.pool.length} карт) сохранён в облако!`);
    }
  });

  const status = document.createElement('span');
  status.id = 'cloud-sync-status';
  status.className = 'hint';
  status.textContent = isCloudConfigured()
    ? 'Облако подключено: изменения пула видят все игроки'
    : 'Облако НЕ настроено: заполни JSONBIN_BIN_ID и JSONBIN_MASTER_KEY в app.js';

  bar.appendChild(btn);
  bar.appendChild(status);

  const heading = adminPanel.querySelector('h3.sub-title');
  if (heading) {
    adminPanel.insertBefore(bar, heading);
  } else {
    adminPanel.prepend(bar);
  }
}

async function init() {
  const saved = localStorage.getItem('gd_case_save_v1');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.balance = parsed.balance ?? 500;
      state.packs = parsed.packs ?? 1;
      state.packsOpened = parsed.packsOpened ?? 0;
      state.inventory = Array.isArray(parsed.inventory) ? parsed.inventory : [];
      if (Array.isArray(parsed.pool) && parsed.pool.length > 0) {
        state.pool = parsed.pool;
      }
    } catch (e) {
      console.error(e);
    }
  }

  const cloudResult = await fetchSharedPool();
  if (cloudResult.ok && Array.isArray(cloudResult.pool)) {
    if (cloudResult.pool.length > 0) {
      state.pool = cloudResult.pool;
      saveState();
    } else if (!state.pool || state.pool.length === 0) {
      state.pool = [...DEFAULT_POOL];
    }
  } else if (!state.pool || state.pool.length === 0) {
    state.pool = [...DEFAULT_POOL];
  }

  setupNavigation();
  ensureOpenAllPacksButton();
  ensureAdminSyncButton();
  startPackTimer();
  updateHeader();
  renderCollection();
  renderAdminPreview();
  bindEvents();

  if (isCloudConfigured()) {
    setInterval(async () => {
      const fresh = await fetchSharedPool();
      if (fresh.ok && Array.isArray(fresh.pool) && fresh.pool.length > 0) {
        const changed = JSON.stringify(fresh.pool) !== JSON.stringify(state.pool);
        if (changed) {
          state.pool = fresh.pool;
          saveState();
          renderAdminPool();
          if (document.getElementById('tab-upgrade').classList.contains('active') && !isSpinning) {
            renderUpgradePage();
          }
        }
      }
    }, 15000);
  }
}

function saveState() {
  try {
    localStorage.setItem('gd_case_save_v1', JSON.stringify({
      balance: state.balance,
      packs: state.packs,
      packsOpened: state.packsOpened,
      pool: state.pool,
      inventory: state.inventory
    }));
  } catch (e) {
    showToast('Память браузера заполнена — удали часть тяжёлых картинок!');
  }
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2600);
}

function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.getElementById(`tab-${tab}`).classList.add('active');

      if (tab === 'collection') renderCollection();
      if (tab === 'upgrade') renderUpgradePage();
      if (tab === 'trades' && tradeActive) renderTradeWorkspace();
      if (tab === 'admin') {
        ensureAdminSyncButton();
        renderAdminPool();
      }
    });
  });
}

function updateHeader() {
  document.getElementById('header-packs').textContent = state.packs;
  document.getElementById('header-balance').textContent = Math.floor(state.balance);
  const openBtn = document.getElementById('open-pack-btn');
  openBtn.textContent = `Открыть пак (${state.packs})`;
  openBtn.disabled = state.packs <= 0 || isOpeningPack;

  const openAllBtn = document.getElementById('open-all-packs-btn');
  if (openAllBtn) {
    openAllBtn.textContent = state.packs > 1 ? `Открыть все (${state.packs})` : 'Открыть все';
    openAllBtn.disabled = state.packs <= 0 || isOpeningPack;
  }
}

function startPackTimer() {
  setInterval(() => {
    state.secondsLeft--;
    if (state.secondsLeft <= 0) {
      state.packs += 1;
      state.secondsLeft = 60;
      saveState();
      updateHeader();
      showToast('+1 бесплатный пак начислен!');
    }
    const sec = String(state.secondsLeft).padStart(2, '0');
    document.getElementById('pack-timer').textContent = `00:${sec}`;
    const pct = ((60 - state.secondsLeft) / 60) * 100;
    document.getElementById('pack-progress').style.width = `${pct}%`;
  }, 1000);
}

function buildCardInstance(base, isHolo = false, uidPrefix = 'card') {
  const finalPrice = Math.round(base.price * (isHolo ? HOLO_MULTIPLIER : 1));
  return {
    uid: `${uidPrefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    templateId: base.id,
    rank: base.rank,
    name: base.name,
    verifier: base.verifier || '',
    publisher: base.publisher || '',
    rarity: base.rarity,
    image: base.image,
    isHolo,
    price: finalPrice,
    favorite: false
  };
}

function rollSingleCard(customRarity = null) {
  let chosenRarity = customRarity;
  if (!chosenRarity) {
    const roll = Math.random() * 100;
    let acc = 0;
    for (const r of RARITY_WEIGHTS) {
      acc += r.weight;
      if (roll <= acc) {
        chosenRarity = r.key;
        break;
      }
    }
  }

  let candidates = state.pool.filter(c => c.rarity === chosenRarity);
  if (candidates.length === 0) candidates = state.pool;

  const base = candidates[Math.floor(Math.random() * candidates.length)];
  const isHolo = Math.random() < HOLO_CHANCE;
  return buildCardInstance(base, isHolo, 'card');
}

function createCardElement(card, options = {}) {
  const isRareAnim = options.animateDrop && (card.isHolo || RARE_ANIM_TIERS.includes(card.rarity));
  const animClass = options.animateDrop ? (isRareAnim ? 'drop-anim-rare' : 'drop-anim') : '';
  const selectedClass = options.selected ? 'selected-card' : '';

  const div = document.createElement('div');
  div.className = `gd-card rarity-${card.rarity} ${card.isHolo ? 'is-holo' : ''} ${animClass} ${selectedClass}`;

  const fallbackImg = `https://placehold.co/400x225/141420/ffffff?text=${encodeURIComponent(card.name)}`;

  const verifierLine = card.verifier ? `<div>Verified by ${card.verifier}</div>` : '';
  const publisherLine = card.publisher ? `<div>Published by ${card.publisher}</div>` : '';
  const metaBlock = (verifierLine || publisherLine) ? `<div class="card-meta">${verifierLine}${publisherLine}</div>` : '';

  div.innerHTML = `
    <div class="card-top">
      <span class="card-rank">#${card.rank}</span>
      <span class="rarity-badge">${card.rarity}</span>
    </div>
    <div class="card-thumb">
      <img src="${card.image}" alt="${card.name}" onerror="this.src='${fallbackImg}'" />
    </div>
    <div class="card-info">
      <div class="card-title">${card.name}</div>
      ${metaBlock}
    </div>
    <div class="card-footer">
      <div class="card-left-tags">
        ${card.isHolo ? '<span class="holo-pill">✦ HOLO</span>' : ''}
        <span class="card-price-tag">${card.price} ₽</span>
      </div>
      ${options.showFav ? `<button class="fav-btn ${card.favorite ? 'active' : ''}" title="В избранное">★</button>` : ''}
    </div>
  `;

  if (options.showFav) {
    const favBtn = div.querySelector('.fav-btn');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.favorite = !card.favorite;
      saveState();
      renderCollection();
    });
  }

  if (options.actionLabel || options.editLabel) {
    const row = document.createElement('div');
    row.className = 'card-actions-row';

    if (options.editLabel) {
      const editBtn = document.createElement('button');
      editBtn.textContent = options.editLabel;
      editBtn.className = 'btn-edit-card';
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        options.onEdit(card);
      });
      row.appendChild(editBtn);
    }

    if (options.actionLabel) {
      const btn = document.createElement('button');
      btn.textContent = options.actionLabel;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        options.onAction(card);
      });
      row.appendChild(btn);
    }

    div.appendChild(row);
  }

  if (options.onClick) {
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => options.onClick(card));
  }

  return div;
}

function appendDroppedCardElement(grid, card, animate = true) {
  const cardEl = createCardElement(card, {
    animateDrop: animate,
    actionLabel: `Продать за ${card.price} ₽`,
    onAction: (c) => {
      state.balance += c.price;
      state.droppedTemp = state.droppedTemp.filter(x => x.uid !== c.uid);
      saveState();
      updateHeader();
      renderDroppedCards(false);
      showToast(`Продано за ${c.price} ₽`);
    }
  });
  grid.appendChild(cardEl);
}

// 1. ОТКРЫТИЕ ОДНОГО ПАКА
function openPack() {
  if (state.packs <= 0 || isOpeningPack) return;
  isOpeningPack = true;
  state.packs -= 1;
  state.packsOpened += 1;

  const rolled = [];
  for (let i = 0; i < 5; i++) {
    rolled.push(rollSingleCard());
  }
  state.droppedTemp.push(...rolled);

  saveState();
  updateHeader();

  const packBox = document.getElementById('pack-box-visual');
  packBox.classList.remove('opening');
  void packBox.offsetWidth;
  packBox.classList.add('opening');

  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
  area.classList.remove('hidden');

  const total = state.droppedTemp.reduce((s, c) => s + c.price, 0);
  document.getElementById('dropped-total-price').textContent = total;

  rolled.forEach((card, idx) => {
    setTimeout(() => {
      appendDroppedCardElement(grid, card, true);

      if (card.isHolo || RARE_ANIM_TIERS.includes(card.rarity)) {
        showToast(`Выпал ${card.rarity.toUpperCase()}${card.isHolo ? ' HOLO' : ''}: ${card.name}!`);
      }

      if (idx === rolled.length - 1) {
        isOpeningPack = false;
        updateHeader();
      }
    }, idx * 180);
  });
}

// ОТКРЫТИЕ ВСЕХ ПАКОВ СРАЗУ
function openAllPacks() {
  if (state.packs <= 0 || isOpeningPack) return;
  isOpeningPack = true;

  const packsToOpen = state.packs;
  state.packs = 0;
  state.packsOpened += packsToOpen;

  const rolled = [];
  for (let p = 0; p < packsToOpen; p++) {
    for (let i = 0; i < 5; i++) {
      rolled.push(rollSingleCard());
    }
  }
  state.droppedTemp.push(...rolled);

  saveState();
  updateHeader();

  const packBox = document.getElementById('pack-box-visual');
  packBox.classList.remove('opening');
  void packBox.offsetWidth;
  packBox.classList.add('opening');

  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
  area.classList.remove('hidden');

  const total = state.droppedTemp.reduce((s, c) => s + c.price, 0);
  document.getElementById('dropped-total-price').textContent = total;

  const rareCount = rolled.filter(c => c.isHolo || RARE_ANIM_TIERS.includes(c.rarity)).length;
  showToast(`Открыто паков: ${packsToOpen} (${rolled.length} карт${rareCount ? `, редких/Holo: ${rareCount}` : ''})`);

  const batchSize = 15;
  const shouldAnimate = rolled.length <= 40;
  let index = 0;

  function renderNextBatch() {
    const fragment = document.createDocumentFragment();
    const end = Math.min(index + batchSize, rolled.length);
    for (let i = index; i < end; i++) {
      const cardEl = createCardElement(rolled[i], {
        animateDrop: shouldAnimate,
        actionLabel: `Продать за ${rolled[i].price} ₽`,
        onAction: (c) => {
          state.balance += c.price;
          state.droppedTemp = state.droppedTemp.filter(x => x.uid !== c.uid);
          saveState();
          updateHeader();
          renderDroppedCards(false);
          showToast(`Продано за ${c.price} ₽`);
        }
      });
      fragment.appendChild(cardEl);
    }
    grid.appendChild(fragment);
    index = end;

    if (index < rolled.length) {
      setTimeout(renderNextBatch, shouldAnimate ? 70 : 15);
    } else {
      isOpeningPack = false;
      updateHeader();
    }
  }

  renderNextBatch();
}

function renderDroppedCards(animate = false) {
  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
  if (state.droppedTemp.length === 0) {
    area.classList.add('hidden');
    grid.innerHTML = '';
    return;
  }
  area.classList.remove('hidden');
  grid.innerHTML = '';

  let total = 0;
  const fragment = document.createDocumentFragment();
  state.droppedTemp.forEach(card => {
    total += card.price;
    fragment.appendChild(createCardElement(card, {
      animateDrop: animate,
      actionLabel: `Продать за ${card.price} ₽`,
      onAction: (c) => {
        state.balance += c.price;
        state.droppedTemp = state.droppedTemp.filter(x => x.uid !== c.uid);
        saveState();
        updateHeader();
        renderDroppedCards(false);
        showToast(`Продано за ${c.price} ₽`);
      }
    }));
  });
  grid.appendChild(fragment);

  document.getElementById('dropped-total-price').textContent = total;
}

// 2. ТРЕЙДЫ С БОТОМ (плавный прогресс с шансом оверпея на +100..+500 и редко на +500..+1000 ₽)
function startTrade() {
  tradeActive = true;
  userTradeIds = [];
  botOfferCards = [];
  document.getElementById('trade-placeholder').classList.add('hidden');
  document.getElementById('trade-workspace').classList.remove('hidden');
  document.getElementById('trade-inventory-block').classList.remove('hidden');
  renderTradeWorkspace();
}

function getAllCatalogVariants() {
  const list = [];
  state.pool.forEach(base => {
    list.push({ base, isHolo: false, price: Math.round(base.price) });
    list.push({ base, isHolo: true, price: Math.round(base.price * HOLO_MULTIPLIER) });
  });
  return list;
}

function pickTradeTargetSum(userSum) {
  const roll = Math.random();

  // ~13%: редкий крупный оверпей (+500..+1000 ₽)
  if (roll < 0.13) {
    const bonus = 500 + Math.random() * 500;
    return Math.round(userSum + bonus);
  }

  // ~22%: умеренный оверпей для постепенного подъёма (+100..+500 ₽)
  if (roll < 0.35) {
    const bonus = 100 + Math.random() * 400;
    return Math.round(userSum + bonus);
  }

  // ~65%: близко к стоимости игрока (лёгкий плюс до +120 или небольшой минус до -120)
  const delta = (Math.random() * 240) - 120;
  return Math.max(10, Math.round(userSum + delta));
}

function generateBotOffer() {
  const userCards = state.inventory.filter(c => userTradeIds.includes(c.uid));
  const userSum = userCards.reduce((s, c) => s + c.price, 0);

  if (userSum === 0) {
    botOfferCards = [];
    return;
  }

  const variants = getAllCatalogVariants();
  if (variants.length === 0) {
    botOfferCards = [];
    return;
  }

  const targetSum = pickTradeTargetSum(userSum);
  let bestCombo = [];
  let bestDiff = Infinity;

  // Перебираем комбинации из 1..4 карт и ищем ближайшую к targetSum
  for (let i = 0; i < 800; i++) {
    const count = Math.floor(Math.random() * 4) + 1;
    const combo = [];
    for (let k = 0; k < count; k++) {
      combo.push(variants[Math.floor(Math.random() * variants.length)]);
    }
    const comboSum = combo.reduce((s, item) => s + item.price, 0);
    const diff = Math.abs(comboSum - targetSum);

    if (diff < bestDiff) {
      bestDiff = diff;
      bestCombo = combo;
      if (diff === 0) break;
    }
  }

  botOfferCards = bestCombo.map(item => buildCardInstance(item.base, item.isHolo, 'trade'));
}

function renderTradeWorkspace() {
  const userSlots = document.getElementById('user-offer-slots');
  const botSlots = document.getElementById('bot-offer-slots');
  const invGrid = document.getElementById('trade-user-inv');

  userSlots.innerHTML = '';
  botSlots.innerHTML = '';
  invGrid.innerHTML = '';

  const userCards = state.inventory.filter(c => userTradeIds.includes(c.uid));
  const userSum = userCards.reduce((s, c) => s + c.price, 0);
  const botSum = botOfferCards.reduce((s, c) => s + c.price, 0);

  document.getElementById('user-offer-sum').textContent = userSum;
  document.getElementById('bot-offer-sum').textContent = botSum;

  userCards.forEach(c => {
    userSlots.appendChild(createCardElement(c, {
      onClick: () => {
        userTradeIds = userTradeIds.filter(id => id !== c.uid);
        generateBotOffer();
        renderTradeWorkspace();
      }
    }));
  });

  botOfferCards.forEach(c => {
    botSlots.appendChild(createCardElement(c));
  });

  const confirmBtn = document.getElementById('confirm-trade-btn');
  const statusText = document.getElementById('bot-status-text');

  if (userCards.length === 0) {
    confirmBtn.disabled = true;
    statusText.textContent = 'Добавь свои карты в трейд';
  } else {
    confirmBtn.disabled = false;
    const diff = botSum - userSum;
    const diffLabel = diff > 0 ? `+${diff} ₽` : diff < 0 ? `${diff} ₽` : '0 ₽';
    statusText.textContent = `Оффер: ${botSum} ₽ (${diffLabel} к твоим ${userSum} ₽)`;
  }

  state.inventory
    .filter(c => !userTradeIds.includes(c.uid))
    .forEach(c => {
      invGrid.appendChild(createCardElement(c, {
        onClick: () => {
          if (userTradeIds.length >= 6) {
            showToast('Максимум 6 карт в одном трейде');
            return;
          }
          userTradeIds.push(c.uid);
          generateBotOffer();
          renderTradeWorkspace();
        }
      }));
    });
}

// 3. АПГРЕЙДЫ
function getUpgradeCatalog() {
  const items = [];
  state.pool.forEach(base => {
    ['normal', 'holo'].forEach(mode => {
      const isHolo = mode === 'holo';
      const card = buildCardInstance(base, isHolo, 'upg_cat');
      card.catalogKey = `${base.id}__${mode}`;
      items.push(card);
    });
  });
  return items;
}

function getSelectedUpgradeTarget() {
  if (!selectedUpgradeTargetKey) return null;
  return getUpgradeCatalog().find(item => item.catalogKey === selectedUpgradeTargetKey) || null;
}

function getUpgradeChance() {
  const src = state.inventory.find(c => c.uid === selectedUpgradeSourceId);
  const tgt = getSelectedUpgradeTarget();
  if (!src || !tgt) return 0;
  const raw = (src.price / tgt.price) * 82;
  return Math.max(1, Math.min(80, Number(raw.toFixed(1))));
}

function renderUpgradePage() {
  const srcSlot = document.getElementById('upg-source-slot');
  const tgtSlot = document.getElementById('upg-target-slot');
  const userGrid = document.getElementById('upg-user-cards');
  const targetGrid = document.getElementById('upg-target-cards');

  const srcCard = state.inventory.find(c => c.uid === selectedUpgradeSourceId);
  srcSlot.innerHTML = '';
  if (srcCard) {
    srcSlot.appendChild(createCardElement(srcCard));
  } else {
    srcSlot.textContent = 'Выбери карту ниже';
  }

  const tgtCard = getSelectedUpgradeTarget();
  tgtSlot.innerHTML = '';
  if (tgtCard) {
    tgtSlot.appendChild(createCardElement(tgtCard));
  } else {
    tgtSlot.textContent = 'Выбери любую карту из списка';
  }

  const chance = getUpgradeChance();
  document.getElementById('upg-chance-text').textContent = `${chance}%`;
  const deg = (chance / 100) * 360;
  const wheel = document.getElementById('upgrade-wheel');
  wheel.style.background = `conic-gradient(#22c55e 0deg ${deg}deg, #1e293b ${deg}deg 360deg)`;

  document.getElementById('run-upgrade-btn').disabled = !(srcCard && tgtCard) || isSpinning;

  userGrid.innerHTML = '';
  if (state.inventory.length === 0) {
    userGrid.innerHTML = '<div class="empty-box" style="grid-column: 1/-1;">У тебя пока нет карт в инвентаре.</div>';
  } else {
    state.inventory.forEach(c => {
      userGrid.appendChild(createCardElement(c, {
        selected: c.uid === selectedUpgradeSourceId,
        onClick: () => {
          if (isSpinning) return;
          selectedUpgradeSourceId = c.uid;
          renderUpgradePage();
        }
      }));
    });
  }

  const query = (document.getElementById('upg-search-input').value || '').trim().toLowerCase();
  const typeFilter = document.getElementById('upg-type-filter').value;
  const rarityFilter = document.getElementById('upg-rarity-filter').value;

  const filteredCatalog = getUpgradeCatalog().filter(c => {
    if (typeFilter === 'holo' && !c.isHolo) return false;
    if (typeFilter === 'normal' && c.isHolo) return false;
    if (rarityFilter !== 'all' && c.rarity !== rarityFilter) return false;
    if (query) {
      const matchName = c.name.toLowerCase().includes(query);
      const matchRank = `#${c.rank}`.includes(query) || String(c.rank) === query;
      if (!matchName && !matchRank) return false;
    }
    return true;
  });

  document.getElementById('upg-catalog-count').textContent = `${filteredCatalog.length} карт`;

  targetGrid.innerHTML = '';
  if (filteredCatalog.length === 0) {
    targetGrid.innerHTML = '<div class="empty-box" style="grid-column: 1/-1;">Ничего не найдено.</div>';
    return;
  }

  filteredCatalog.forEach(c => {
    targetGrid.appendChild(createCardElement(c, {
      selected: c.catalogKey === selectedUpgradeTargetKey,
      onClick: () => {
        if (isSpinning) return;
        selectedUpgradeTargetKey = c.catalogKey;
        renderUpgradePage();
      }
    }));
  });
}

function runUpgrade() {
  const srcCard = state.inventory.find(c => c.uid === selectedUpgradeSourceId);
  const tgtCard = getSelectedUpgradeTarget();
  if (!srcCard || !tgtCard || isSpinning) return;

  isSpinning = true;
  document.getElementById('run-upgrade-btn').disabled = true;
  const statusEl = document.getElementById('upgrade-status');
  statusEl.textContent = 'Крутим рулетку...';

  const chance = getUpgradeChance();
  const win = Math.random() * 100 <= chance;

  const winAngle = Math.random() * ((chance / 100) * 350);
  const loseAngle = ((chance / 100) * 360) + 10 + Math.random() * (340 - (chance / 100) * 360);
  const targetSectorAngle = win ? winAngle : loseAngle;
  const finalRotation = 360 * 5 + (360 - targetSectorAngle);

  const wheel = document.getElementById('upgrade-wheel');
  wheel.style.transform = `rotate(${finalRotation}deg)`;

  setTimeout(() => {
    state.inventory = state.inventory.filter(c => c.uid !== srcCard.uid);

    if (win) {
      state.inventory.push({
        ...tgtCard,
        uid: 'upg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)
      });
      statusEl.style.color = '#4ade80';
      statusEl.textContent = `УСПЕХ! Получена карта ${tgtCard.name}${tgtCard.isHolo ? ' [HOLO]' : ''}`;
      showToast('Апгрейд прошёл успешно!');
    } else {
      statusEl.style.color = '#f87171';
      statusEl.textContent = 'НЕУДАЧА! Карта сгорела.';
      showToast('Апгрейд не удался');
    }

    selectedUpgradeSourceId = null;
    saveState();

    setTimeout(() => {
      wheel.style.transition = 'none';
      wheel.style.transform = 'rotate(0deg)';
      setTimeout(() => {
        wheel.style.transition = 'transform 2.6s cubic-bezier(0.15, 0.85, 0.25, 1)';
        isSpinning = false;
        renderUpgradePage();
      }, 50);
    }, 600);
  }, 2700);
}

// 4. КОЛЛЕКЦИЯ
function renderCollection() {
  const rarityFilter = document.getElementById('filter-rarity').value;
  const typeFilter = document.getElementById('filter-type').value;
  const favOnly = document.getElementById('filter-fav').checked;

  document.getElementById('stat-total-cards').textContent = state.inventory.length;
  document.getElementById('stat-holo-cards').textContent = state.inventory.filter(c => c.isHolo).length;
  const totalVal = state.inventory.reduce((s, c) => s + c.price, 0);
  document.getElementById('stat-inv-value').textContent = `${totalVal} ₽`;
  document.getElementById('stat-packs-opened').textContent = state.packsOpened;

  const filtered = state.inventory.filter(c => {
    if (rarityFilter !== 'all' && c.rarity !== rarityFilter) return false;
    if (typeFilter === 'holo' && !c.isHolo) return false;
    if (typeFilter === 'normal' && c.isHolo) return false;
    if (favOnly && !c.favorite) return false;
    return true;
  });

  const grid = document.getElementById('collection-grid');
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-box" style="grid-column: 1/-1;">Карточек по выбранным фильтрам пока нет.</div>';
    return;
  }

  filtered.forEach(card => {
    grid.appendChild(createCardElement(card, {
      showFav: true,
      actionLabel: `Продать (${card.price} ₽)`,
      onAction: (c) => {
        state.balance += c.price;
        state.inventory = state.inventory.filter(x => x.uid !== c.uid);
        saveState();
        updateHeader();
        renderCollection();
        showToast(`Продано за ${c.price} ₽`);
      }
    }));
  });
}

function getCurrentAdminImage() {
  if (uploadedAdminImageDataUrl) return uploadedAdminImageDataUrl;
  const urlVal = document.getElementById('card-image').value.trim();
  if (urlVal) return urlVal;
  return 'https://placehold.co/400x225/181825/fff?text=GD+Level';
}

// 5. АДМИНКА
function renderAdminPreview() {
  const rank = document.getElementById('card-rank').value || 1;
  const name = document.getElementById('card-name').value || 'Название уровня';
  const verifier = document.getElementById('card-verifier').value.trim();
  const publisher = document.getElementById('card-publisher').value.trim();
  const rarity = document.getElementById('card-rarity').value || 'common';
  const price = Number(document.getElementById('card-price').value) || 100;
  const image = getCurrentAdminImage();

  const box = document.getElementById('admin-preview-box');
  box.innerHTML = '';

  const normalSample = { rank, name, verifier, publisher, rarity, price, image, isHolo: false };
  const holoSample = { rank, name, verifier, publisher, rarity, price: Math.round(price * HOLO_MULTIPLIER), image, isHolo: true };

  box.appendChild(createCardElement(normalSample));
  box.appendChild(createCardElement(holoSample));
}

function openEditModal(card) {
  editingCardImageDataUrl = '';
  document.getElementById('edit-card-id').value = card.id;
  document.getElementById('edit-card-rank').value = card.rank;
  document.getElementById('edit-card-name').value = card.name;
  document.getElementById('edit-card-verifier').value = card.verifier || '';
  document.getElementById('edit-card-publisher').value = card.publisher || '';
  document.getElementById('edit-card-rarity').value = card.rarity;
  document.getElementById('edit-card-price').value = card.price;
  document.getElementById('edit-card-file').value = '';
  document.getElementById('edit-card-image').value = card.image.startsWith('data:') ? '' : card.image;
  document.getElementById('edit-card-modal').classList.remove('hidden');
}

function closeEditModal() {
  editingCardImageDataUrl = '';
  document.getElementById('edit-card-modal').classList.add('hidden');
}

function renderAdminPool() {
  document.getElementById('pool-count').textContent = state.pool.length;
  const grid = document.getElementById('admin-pool-grid');
  grid.innerHTML = '';

  state.pool.forEach(lvl => {
    grid.appendChild(createCardElement({ ...lvl, isHolo: false }, {
      editLabel: 'Изменить',
      onEdit: (c) => openEditModal(c),
      actionLabel: 'Удалить',
      onAction: async (c) => {
        if (state.pool.length <= 1) {
          showToast('В пуле должна остаться хотя бы 1 карта!');
          return;
        }
        const nextPool = state.pool.filter(x => x.id !== c.id);
        const ok = await pushSharedPool(nextPool);
        if (ok) {
          state.pool = nextPool;
          saveState();
          renderAdminPool();
          showToast('Карта удалена у всех игроков');
        }
      }
    }));
  });
}

function bindEvents() {
  document.getElementById('open-pack-btn').addEventListener('click', openPack);

  document.getElementById('buy-pack-btn').addEventListener('click', () => {
    if (state.balance < 250) {
      showToast('Недостаточно ₽ (нужно 250 ₽)');
      return;
    }
    state.balance -= 250;
    state.packs += 1;
    saveState();
    updateHeader();
    showToast('Куплен 1 пак!');
  });

  document.getElementById('keep-all-dropped-btn').addEventListener('click', () => {
    state.inventory.push(...state.droppedTemp);
    state.droppedTemp = [];
    saveState();
    renderDroppedCards(false);
    showToast('Все карточки добавлены в коллекцию!');
  });

  document.getElementById('sell-all-dropped-btn').addEventListener('click', () => {
    const sum = state.droppedTemp.reduce((s, c) => s + c.price, 0);
    state.balance += sum;
    state.droppedTemp = [];
    saveState();
    updateHeader();
    renderDroppedCards(false);
    showToast(`Продано всё за ${sum} ₽`);
  });

  // Трейды
  document.getElementById('start-trade-btn').addEventListener('click', startTrade);
  document.getElementById('reroll-bot-btn').addEventListener('click', () => {
    generateBotOffer();
    renderTradeWorkspace();
  });
  document.getElementById('cancel-trade-btn').addEventListener('click', () => {
    tradeActive = false;
    document.getElementById('trade-workspace').classList.add('hidden');
    document.getElementById('trade-inventory-block').classList.add('hidden');
    document.getElementById('trade-placeholder').classList.remove('hidden');
  });
  document.getElementById('confirm-trade-btn').addEventListener('click', () => {
    if (userTradeIds.length === 0) return;
    state.inventory = state.inventory.filter(c => !userTradeIds.includes(c.uid));
    state.inventory.push(...botOfferCards);
    userTradeIds = [];
    botOfferCards = [];
    saveState();
    renderTradeWorkspace();
    showToast('Обмен с ботом успешно завершён!');
  });

  // Апгрейды
  document.getElementById('upg-search-input').addEventListener('input', () => {
    if (!isSpinning) renderUpgradePage();
  });
  document.getElementById('upg-type-filter').addEventListener('change', () => {
    if (!isSpinning) renderUpgradePage();
  });
  document.getElementById('upg-rarity-filter').addEventListener('change', () => {
    if (!isSpinning) renderUpgradePage();
  });
  document.getElementById('run-upgrade-btn').addEventListener('click', runUpgrade);

  // Фильтры коллекции
  ['filter-rarity', 'filter-type', 'filter-fav'].forEach(id => {
    document.getElementById(id).addEventListener('change', renderCollection);
  });

  // Админка
  document.getElementById('admin-login-btn').addEventListener('click', () => {
    const pass = document.getElementById('admin-pass-input').value;
    if (pass === '12356790') {
      document.getElementById('admin-lock').classList.add('hidden');
      document.getElementById('admin-panel').classList.remove('hidden');
      ensureAdminSyncButton();
      renderAdminPool();
    } else {
      document.getElementById('admin-error').textContent = 'Неверный пароль!';
    }
  });

  document.getElementById('card-file').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      uploadedAdminImageDataUrl = '';
      renderAdminPreview();
      return;
    }
    if (file.size > 80 * 1024) {
      showToast('Файл больше 80 КБ — для общего пула лучше вставить URL картинки!');
    }
    const reader = new FileReader();
    reader.onload = () => {
      uploadedAdminImageDataUrl = reader.result;
      document.getElementById('card-image').value = '';
      renderAdminPreview();
    };
    reader.readAsDataURL(file);
  });

  ['card-rank', 'card-name', 'card-verifier', 'card-publisher', 'card-rarity', 'card-price', 'card-image'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      if (id === 'card-image' && document.getElementById('card-image').value.trim()) {
        uploadedAdminImageDataUrl = '';
        document.getElementById('card-file').value = '';
      }
      renderAdminPreview();
    });
  });

  document.getElementById('add-card-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('card-file');
    const urlInput = document.getElementById('card-image').value.trim();

    if (!uploadedAdminImageDataUrl && !urlInput) {
      showToast('Выбери картинку с ПК или вставь URL!');
      return;
    }

    const newLevel = {
      id: 'lvl_' + Date.now(),
      rank: Number(document.getElementById('card-rank').value),
      name: document.getElementById('card-name').value.trim(),
      verifier: document.getElementById('card-verifier').value.trim(),
      publisher: document.getElementById('card-publisher').value.trim(),
      rarity: document.getElementById('card-rarity').value,
      price: Number(document.getElementById('card-price').value),
      image: uploadedAdminImageDataUrl || urlInput
    };

    const nextPool = [newLevel, ...state.pool];
    const ok = await pushSharedPool(nextPool);
    if (!ok) return;

    state.pool = nextPool;
    saveState();
    renderAdminPool();
    e.target.reset();
    fileInput.value = '';
    uploadedAdminImageDataUrl = '';
    renderAdminPreview();
    showToast(`Уровень "${newLevel.name}" добавлен всем игрокам!`);
  });

  // Модалка редактирования карточки
  document.getElementById('close-edit-modal-btn').addEventListener('click', closeEditModal);
  document.getElementById('cancel-edit-btn').addEventListener('click', closeEditModal);

  document.getElementById('edit-card-file').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      editingCardImageDataUrl = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      editingCardImageDataUrl = reader.result;
      document.getElementById('edit-card-image').value = '';
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('edit-card-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-card-id').value;
    const idx = state.pool.findIndex(c => c.id === id);
    if (idx === -1) return;

    const current = state.pool[idx];
    const urlVal = document.getElementById('edit-card-image').value.trim();
    const nextImage = editingCardImageDataUrl || urlVal || current.image;

    const nextPool = [...state.pool];
    nextPool[idx] = {
      ...current,
      rank: Number(document.getElementById('edit-card-rank').value),
      name: document.getElementById('edit-card-name').value.trim(),
      verifier: document.getElementById('edit-card-verifier').value.trim(),
      publisher: document.getElementById('edit-card-publisher').value.trim(),
      rarity: document.getElementById('edit-card-rarity').value,
      price: Number(document.getElementById('edit-card-price').value),
      image: nextImage
    };

    const ok = await pushSharedPool(nextPool);
    if (!ok) return;

    state.pool = nextPool;
    saveState();
    renderAdminPool();
    closeEditModal();
    showToast(`Карточка "${state.pool[idx].name}" обновлена для всех!`);
  });
}

init();
