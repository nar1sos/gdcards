// Стартовый пул Extreme Demon уровней (можно дополнять в Админке)
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
    id: 'lvl_9',
    rank: 22,
    name: 'Kocmoc',
    verifier: 'Zoink',
    publisher: 'cherryteam',
    rarity: 'epic',
    price: 290,
    image: 'https://i.ytimg.com/vi/28091283910/maxresdefault.jpg'
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
  { key: 'common', weight: 48 },
  { key: 'epic', weight: 26 },
  { key: 'mythic', weight: 14 },
  { key: 'legendary', weight: 7.5 },
  { key: 'apex', weight: 3.5 },
  { key: 'limit', weight: 1 }
];

const HOLO_CHANCE = 0.12; // 12% шанс на HOLO
const HOLO_MULTIPLIER = 3.5;

// Состояние приложения (сохраняется в localStorage)
let state = {
  balance: 500,
  packs: 1,
  packsOpened: 0,
  secondsLeft: 60,
  pool: [],
  inventory: [],
  droppedTemp: []
};

// Временные состояния для Трейда и Апгрейда
let tradeActive = false;
let userTradeIds = [];
let botOfferCards = [];

let selectedUpgradeSourceId = null;
let selectedUpgradeTarget = null;
let upgradeTargetsPool = [];
let isSpinning = false;

// Инициализация
function init() {
  const saved = localStorage.getItem('gd_case_save_v1');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    } catch (e) {
      console.error(e);
    }
  }
  if (!state.pool || state.pool.length === 0) {
    state.pool = [...DEFAULT_POOL];
  }

  setupNavigation();
  startPackTimer();
  generateUpgradeTargets();
  updateHeader();
  renderCollection();
  renderAdminPreview();
  bindEvents();
}

function saveState() {
  localStorage.setItem('gd_case_save_v1', JSON.stringify({
    balance: state.balance,
    packs: state.packs,
    packsOpened: state.packsOpened,
    pool: state.pool,
    inventory: state.inventory
  }));
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2600);
}

// Навигация
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
      if (tab === 'admin') renderAdminPool();
    });
  });
}

function updateHeader() {
  document.getElementById('header-packs').textContent = state.packs;
  document.getElementById('header-balance').textContent = Math.floor(state.balance);
  const openBtn = document.getElementById('open-pack-btn');
  openBtn.textContent = `Открыть пак (${state.packs})`;
  openBtn.disabled = state.packs <= 0;
}

// Таймер фарма паков (1 пак каждую минуту пока открыт сайт)
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

// Генерация случайной карточки из пула
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
  const finalPrice = Math.round(base.price * (isHolo ? HOLO_MULTIPLIER : 1));

  return {
    uid: 'card_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    templateId: base.id,
    rank: base.rank,
    name: base.name,
    verifier: base.verifier,
    publisher: base.publisher,
    rarity: base.rarity,
    image: base.image,
    isHolo,
    price: finalPrice,
    favorite: false
  };
}

// Отрисовка HTML одной карточки
function createCardElement(card, options = {}) {
  const div = document.createElement('div');
  div.className = `gd-card rarity-${card.rarity} ${card.isHolo ? 'is-holo' : ''}`;

  const fallbackImg = `https://placehold.co/400x225/141420/ffffff?text=${encodeURIComponent(card.name)}`;

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
      <div class="card-meta">
        Verified by ${card.verifier}<br/>
        Published by ${card.publisher}
      </div>
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

  if (options.actionLabel) {
    const row = document.createElement('div');
    row.className = 'card-actions-row';
    const btn = document.createElement('button');
    btn.textContent = options.actionLabel;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      options.onAction(card);
    });
    row.appendChild(btn);
    div.appendChild(row);
  }

  if (options.onClick) {
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => options.onClick(card));
  }

  return div;
}

// 1. ОТКРЫТИЕ ПАКА
function openPack() {
  if (state.packs <= 0) return;
  state.packs--;
  state.packsOpened++;

  state.droppedTemp = [];
  for (let i = 0; i < 5; i++) {
    state.droppedTemp.push(rollSingleCard());
  }

  saveState();
  updateHeader();
  renderDroppedCards();
}

function renderDroppedCards() {
  const area = document.getElementById('pack-result-area');
  const grid = document.getElementById('dropped-cards-grid');
  if (state.droppedTemp.length === 0) {
    area.classList.add('hidden');
    return;
  }
  area.classList.remove('hidden');
  grid.innerHTML = '';

  let total = 0;
  state.droppedTemp.forEach(card => {
    total += card.price;
    grid.appendChild(createCardElement(card, {
      actionLabel: `Продать за ${card.price} ₽`,
      onAction: (c) => {
        state.balance += c.price;
        state.droppedTemp = state.droppedTemp.filter(x => x.uid !== c.uid);
        saveState();
        updateHeader();
        renderDroppedCards();
        showToast(`Продано за ${c.price} ₽`);
      }
    }));
  });

  document.getElementById('dropped-total-price').textContent = total;
}

// 2. ТРЕЙДЫ С БОТОМ
function startTrade() {
  tradeActive = true;
  userTradeIds = [];
  botOfferCards = [];
  document.getElementById('trade-placeholder').classList.add('hidden');
  document.getElementById('trade-workspace').classList.remove('hidden');
  document.getElementById('trade-inventory-block').classList.remove('hidden');
  renderTradeWorkspace();
}

function generateBotOffer() {
  const userCards = state.inventory.filter(c => userTradeIds.includes(c.uid));
  const userSum = userCards.reduce((s, c) => s + c.price, 0);

  if (userSum === 0) {
    botOfferCards = [];
    return;
  }

  // Бот подбирает 1-3 карты примерно на ту же сумму (от 85% до 115%)
  const targetMin = userSum * 0.85;
  const targetMax = userSum * 1.15;
  let bestOffer = [];

  for (let attempt = 0; attempt < 40; attempt++) {
    const count = Math.floor(Math.random() * 3) + 1;
    const temp = [];
    for (let i = 0; i < count; i++) temp.push(rollSingleCard());
    const sum = temp.reduce((s, c) => s + c.price, 0);
    if (sum >= targetMin && sum <= targetMax) {
      bestOffer = temp;
      break;
    }
    if (bestOffer.length === 0) bestOffer = temp;
  }

  botOfferCards = bestOffer;
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
    statusText.textContent = 'Бот готов к обмену!';
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
function generateUpgradeTargets() {
  upgradeTargetsPool = [];
  for (let i = 0; i < 15; i++) {
    upgradeTargetsPool.push(rollSingleCard());
  }
  selectedUpgradeTarget = null;
}

function getUpgradeChance() {
  const src = state.inventory.find(c => c.uid === selectedUpgradeSourceId);
  if (!src || !selectedUpgradeTarget) return 0;
  // Формула шанса: соотношение цен с небольшим запасом, максимум 80%, минимум 1%
  const raw = (src.price / selectedUpgradeTarget.price) * 82;
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

  tgtSlot.innerHTML = '';
  if (selectedUpgradeTarget) {
    tgtSlot.appendChild(createCardElement(selectedUpgradeTarget));
  } else {
    tgtSlot.textContent = 'Выбери цель из 15 карт';
  }

  const chance = getUpgradeChance();
  document.getElementById('upg-chance-text').textContent = `${chance}%`;
  const deg = (chance / 100) * 360;
  const wheel = document.getElementById('upgrade-wheel');
  wheel.style.background = `conic-gradient(#22c55e 0deg ${deg}deg, #1e293b ${deg}deg 360deg)`;

  document.getElementById('run-upgrade-btn').disabled = !(srcCard && selectedUpgradeTarget) || isSpinning;

  userGrid.innerHTML = '';
  state.inventory.forEach(c => {
    userGrid.appendChild(createCardElement(c, {
      onClick: () => {
        if (isSpinning) return;
        selectedUpgradeSourceId = c.uid;
        renderUpgradePage();
      }
    }));
  });

  targetGrid.innerHTML = '';
  upgradeTargetsPool.forEach(c => {
    targetGrid.appendChild(createCardElement(c, {
      onClick: () => {
        if (isSpinning) return;
        selectedUpgradeTarget = c;
        renderUpgradePage();
      }
    }));
  });
}

function runUpgrade() {
  const srcCard = state.inventory.find(c => c.uid === selectedUpgradeSourceId);
  if (!srcCard || !selectedUpgradeTarget || isSpinning) return;

  isSpinning = true;
  document.getElementById('run-upgrade-btn').disabled = true;
  const statusEl = document.getElementById('upgrade-status');
  statusEl.textContent = 'Крутим рулетку...';

  const chance = getUpgradeChance();
  const win = Math.random() * 100 <= chance;

  // Угол остановки стрелки сверху (0 deg = верх)
  const winAngle = Math.random() * ((chance / 100) * 350);
  const loseAngle = ((chance / 100) * 360) + 10 + Math.random() * (340 - (chance / 100) * 360);
  const targetSectorAngle = win ? winAngle : loseAngle;
  const finalRotation = 360 * 5 + (360 - targetSectorAngle);

  const wheel = document.getElementById('upgrade-wheel');
  wheel.style.transform = `rotate(${finalRotation}deg)`;

  setTimeout(() => {
    // Удаляем исходную карту в любом случае
    state.inventory = state.inventory.filter(c => c.uid !== srcCard.uid);

    if (win) {
      state.inventory.push({ ...selectedUpgradeTarget, uid: 'upg_' + Date.now() });
      statusEl.style.color = '#4ade80';
      statusEl.textContent = `УСПЕХ! Получена карта ${selectedUpgradeTarget.name}`;
      showToast('Апгрейд прошёл успешно!');
    } else {
      statusEl.style.color = '#f87171';
      statusEl.textContent = 'НЕУДАЧА! Карта сгорела.';
      showToast('Апгрейд не удался');
    }

    selectedUpgradeSourceId = null;
    generateUpgradeTargets();
    saveState();

    // Сброс вращения колеса без анимации для следующего раза
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

// 5. АДМИНКА
function renderAdminPreview() {
  const rank = document.getElementById('card-rank').value || 1;
  const name = document.getElementById('card-name').value || 'Название уровня';
  const verifier = document.getElementById('card-verifier').value || 'Verifier';
  const publisher = document.getElementById('card-publisher').value || 'Publisher';
  const rarity = document.getElementById('card-rarity').value || 'common';
  const price = Number(document.getElementById('card-price').value) || 100;
  const image = document.getElementById('card-image').value || 'https://placehold.co/400x225/181825/fff?text=GD+Level';

  const box = document.getElementById('admin-preview-box');
  box.innerHTML = '';

  const normalSample = { rank, name, verifier, publisher, rarity, price, image, isHolo: false };
  const holoSample = { rank, name, verifier, publisher, rarity, price: Math.round(price * HOLO_MULTIPLIER), image, isHolo: true };

  box.appendChild(createCardElement(normalSample));
  box.appendChild(createCardElement(holoSample));
}

function renderAdminPool() {
  document.getElementById('pool-count').textContent = state.pool.length;
  const grid = document.getElementById('admin-pool-grid');
  grid.innerHTML = '';

  state.pool.forEach(lvl => {
    grid.appendChild(createCardElement({ ...lvl, isHolo: false }, {
      actionLabel: 'Удалить из пула',
      onAction: (c) => {
        if (state.pool.length <= 1) {
          showToast('В пуле должна остаться хотя бы 1 карта!');
          return;
        }
        state.pool = state.pool.filter(x => x.id !== c.id);
        saveState();
        renderAdminPool();
        showToast('Карта удалена из пула');
      }
    }));
  });
}

// Привязка событий
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
    renderDroppedCards();
    showToast('Все карточки добавлены в коллекцию!');
  });

  document.getElementById('sell-all-dropped-btn').addEventListener('click', () => {
    const sum = state.droppedTemp.reduce((s, c) => s + c.price, 0);
    state.balance += sum;
    state.droppedTemp = [];
    saveState();
    updateHeader();
    renderDroppedCards();
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
  document.getElementById('refresh-targets-btn').addEventListener('click', () => {
    if (isSpinning) return;
    generateUpgradeTargets();
    renderUpgradePage();
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
      renderAdminPool();
    } else {
      document.getElementById('admin-error').textContent = 'Неверный пароль!';
    }
  });

  ['card-rank', 'card-name', 'card-verifier', 'card-publisher', 'card-rarity', 'card-price', 'card-image'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderAdminPreview);
  });

  document.getElementById('add-card-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newLevel = {
      id: 'lvl_' + Date.now(),
      rank: Number(document.getElementById('card-rank').value),
      name: document.getElementById('card-name').value.trim(),
      verifier: document.getElementById('card-verifier').value.trim(),
      publisher: document.getElementById('card-publisher').value.trim(),
      rarity: document.getElementById('card-rarity').value,
      price: Number(document.getElementById('card-price').value),
      image: document.getElementById('card-image').value.trim()
    };

    state.pool.unshift(newLevel);
    saveState();
    renderAdminPool();
    e.target.reset();
    renderAdminPreview();
    showToast(`Уровень "${newLevel.name}" добавлен в паки!`);
  });
}

init();
