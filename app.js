const STORAGE_KEY = "gd_extreme_battle_v1";
const ADMIN_PASS = "12356790";
const PACK_PRICE = 500;
const HOLO_MULTIPLIER = 2.4;
const HOLO_CHANCE = 0.16;

// Порядок редкостей от самой частой (0) к самой редкой
const DEFAULT_RARITIES = [
  { id: "common", name: "Common", color: "#3b82f6", effect: "none", weight: 42 },
  { id: "epic", name: "Epic", color: "#a855f7", effect: "glow", weight: 24 },
  { id: "mythic", name: "Mythic", color: "#ef4444", effect: "glow", weight: 14 },
  { id: "legendary", name: "Legendary", color: "#eab308", effect: "glow", weight: 9 },
  { id: "apex", name: "Apex", color: "linear-gradient(90deg,#ec4899,#eab308,#22d3ee,#a855f7)", effect: "rainbow", weight: 5 },
  { id: "limit", name: "Limit", color: "#14b8a6", effect: "pulse", weight: 4 },
  { id: "upcoming", name: "UPCOMING", color: "#ec4899", effect: "glitch", weight: 2 }
];

const DEFAULT_CARDS = [
  { id: "c1", name: "Cataclysm", creator: "Ggb0y", rarityId: "common", basePrice: 250, inPack: true, image: "" },
  { id: "c2", name: "Bloodbath", creator: "Riot", rarityId: "common", basePrice: 340, inPack: true, image: "" },
  { id: "c3", name: "Sonic Wave", creator: "Cyclic", rarityId: "common", basePrice: 410, inPack: true, image: "" },
  { id: "c4", name: "Artificial Ascent", creator: "Viprin", rarityId: "epic", basePrice: 850, inPack: true, image: "" },
  { id: "c5", name: "Kuzureta", creator: "Teno", rarityId: "epic", basePrice: 1150, inPack: true, image: "" },
  { id: "c6", name: "Firework", creator: "Endlevel", rarityId: "mythic", basePrice: 2200, inPack: true, image: "" },
  { id: "c7", name: "Slaughterhouse", creator: "ICEDCAVE", rarityId: "mythic", basePrice: 2900, inPack: true, image: "" },
  { id: "c8", name: "Acheron", creator: "Ryamu", rarityId: "legendary", basePrice: 5400, inPack: true, image: "" },
  { id: "c9", name: "Tidal Wave", creator: "OniLink", rarityId: "legendary", basePrice: 7800, inPack: true, image: "" },
  { id: "c10", name: "Abyss of Darkness", creator: "Exen", rarityId: "apex", basePrice: 14500, inPack: true, image: "" },
  { id: "c11", name: "Limbo", creator: "MindCap", rarityId: "limit", basePrice: 26000, inPack: true, image: "" },
  { id: "c12", name: "Grief", creator: "IcedCave", rarityId: "upcoming", basePrice: 45000, inPack: true, image: "" }
];

const DEFAULT_CASES = [
  {
    id: "case_starter",
    name: "Demon Starter Case",
    price: 750,
    desc: "Стартовый кейс с классикой и редкими демонами.",
    cardIds: ["c1", "c2", "c3", "c4", "c5", "c6"]
  },
  {
    id: "case_top",
    name: "Top Extreme & Limit Case",
    price: 4500,
    desc: "Высокие шансы на Mythic, Legendary, Apex, Limit и UPCOMING.",
    cardIds: ["c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12"]
  }
];

function createInitialState() {
  return {
    balance: 5000,
    rarities: structuredClone(DEFAULT_RARITIES),
    cards: structuredClone(DEFAULT_CARDS),
    cases: structuredClone(DEFAULT_CASES),
    inventory: [
      { uid: "init_1", cardId: "c1", isHolo: false },
      { uid: "init_2", cardId: "c1", isHolo: false },
      { uid: "init_3", cardId: "c2", isHolo: false },
      { uid: "init_4", cardId: "c4", isHolo: true }
    ],
    history: [],
    stats: {
      packsOpened: 0,
      casesOpened: 0,
      upgradesWon: 0,
      upgradesLost: 0,
      tradesDone: 0,
      craftsDone: 0
    }
  };
}

let state = loadState();
let adminUnlocked = false;
let activeCaseId = null;
let upgradeSelectedUid = null;
let upgradeTargetCard = null;
let upgradeTargetsPool = [];
let tradeSelectedUids = new Set();
let craftSelectedUids = new Set();
let newCaseSelectedCardIds = new Set();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw);
    const base = createInitialState();
    return {
      ...base,
      ...parsed,
      inventory: Array.isArray(parsed.inventory) ? parsed.inventory : base.inventory,
      history: Array.isArray(parsed.history) ? parsed.history : base.history,
      stats: { ...base.stats, ...(parsed.stats || {}) }
    };
  } catch {
    return createInitialState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Ошибка сохранения в localStorage:", e);
  }
  renderTopbar();
}

function recordDropHistory(sourceLabel, card, isHolo) {
  const rarity = getRarity(card.rarityId);
  const price = getCardPrice(card, isHolo);
  state.history.unshift({
    id: `h_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    source: sourceLabel,
    cardName: card.name,
    rarityName: rarity.name,
    isHolo,
    price,
    time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  });
  if (state.history.length > 150) {
    state.history.length = 150;
  }
}

function formatRub(num) {
  return `${Math.round(num).toLocaleString("ru-RU")} ₽`;
}

function getRarityIndex(rarityId) {
  const idx = state.rarities.findIndex(r => r.id === rarityId);
  return idx === -1 ? 0 : idx;
}

function getRarity(rarityId) {
  return state.rarities.find(r => r.id === rarityId) || state.rarities[0];
}

function getCard(cardId) {
  return state.cards.find(c => c.id === cardId) || state.cards[0];
}

function getCardPrice(card, isHolo) {
  return isHolo ? Math.round(card.basePrice * HOLO_MULTIPLIER) : card.basePrice;
}

function sortItems(items, sortMode, priceGetter, rarityIdGetter) {
  const arr = [...items];
  switch (sortMode) {
    case "price_desc":
      return arr.sort((a, b) => priceGetter(b) - priceGetter(a));
    case "price_asc":
      return arr.sort((a, b) => priceGetter(a) - priceGetter(b));
    case "rarity_desc":
      return arr.sort((a, b) => {
        const diff = getRarityIndex(rarityIdGetter(b)) - getRarityIndex(rarityIdGetter(a));
        return diff !== 0 ? diff : priceGetter(b) - priceGetter(a);
      });
    case "rarity_asc":
      return arr.sort((a, b) => {
        const diff = getRarityIndex(rarityIdGetter(a)) - getRarityIndex(rarityIdGetter(b));
        return diff !== 0 ? diff : priceGetter(a) - priceGetter(b);
      });
    default:
      return arr;
  }
}

function pickWeighted(list, weightFn) {
  const total = list.reduce((sum, item) => sum + Math.max(0.01, weightFn(item)), 0);
  let roll = Math.random() * total;
  for (const item of list) {
    roll -= Math.max(0.01, weightFn(item));
    if (roll <= 0) return item;
  }
  return list[list.length - 1];
}

function rollCardInstance(poolCards) {
  const card = pickWeighted(poolCards, c => {
    const r = getRarity(c.rarityId);
    const rarityWeight = r ? r.weight : 10;
    const priceFactor = 1000 / Math.max(200, c.basePrice);
    return rarityWeight * (0.4 + 0.6 * Math.min(3, priceFactor));
  });
  const isHolo = Math.random() < HOLO_CHANCE;
  return {
    uid: `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    cardId: card.id,
    isHolo
  };
}

function getSolidColorForBorder(colorStr) {
  if (!colorStr) return "#3b82f6";
  if (colorStr.includes("gradient")) return "#ec4899";
  return colorStr;
}

function renderCardElement(card, isHolo, options = {}) {
  const rarity = getRarity(card.rarityId);
  const price = getCardPrice(card, isHolo);
  const borderColor = getSolidColorForBorder(rarity.color);
  const effectClass = rarity.effect && rarity.effect !== "none" ? `eff-${rarity.effect}` : "";

  const div = document.createElement("div");
  div.className = `gd-card ${effectClass} ${isHolo ? "is-holo" : ""} ${options.selectable ? "selectable" : ""} ${options.selected ? "selected" : ""}`;
  div.style.setProperty("--rarity-color", borderColor);

  const artContent = card.image
    ? `<img src="${escapeHtml(card.image)}" alt="${escapeHtml(card.name)}" />`
    : `<span>${escapeHtml(card.name.toUpperCase())}</span>`;

  div.innerHTML = `
    <div class="card-top-badges">
      <span class="rarity-pill" style="background:${rarity.color.includes("gradient") ? "#18181b" : borderColor}33;border-color:${borderColor}">${escapeHtml(rarity.name)}</span>
      ${isHolo ? `<span class="holo-badge">HOLO</span>` : ""}
    </div>
    <div class="card-art">${artContent}</div>
    <div>
      <div class="card-title">${escapeHtml(card.name)}</div>
      <div class="card-creator">by ${escapeHtml(card.creator || "Unknown")}</div>
    </div>
    <div class="card-footer">
      <span class="card-price">${formatRub(price)}</span>
      ${options.extraBadge ? `<span class="muted small">${options.extraBadge}</span>` : ""}
    </div>
  `;

  if (options.onClick) {
    div.addEventListener("click", options.onClick);
  }
  return div;
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderTopbar() {
  document.getElementById("balanceValue").textContent = formatRub(state.balance);
}

// НАВИГАЦИЯ
document.getElementById("mainNav").addEventListener("click", e => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;
  const page = btn.dataset.page;

  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(`page-${page}`).classList.add("active");

  renderCurrentPage(page);
});

document.getElementById("freeRubBtn").addEventListener("click", () => {
  state.balance += 2500;
  saveState();
});

function renderCurrentPage(page) {
  if (page === "packs") renderPacksPage();
  if (page === "cases") renderCasesPage();
  if (page === "upgrades") renderUpgradesPage();
  if (page === "trades") renderTradesPage();
  if (page === "crafts") renderCraftsPage();
  if (page === "collection") renderCollectionPage();
  if (page === "admin") renderAdminPage();
}

// 1. ПАКИ
function openPacksCount(count) {
  const totalCost = PACK_PRICE * count;
  if (state.balance < totalCost) {
    alert("Недостаточно виртуальных рублей! Нажми +2 500 ₽ сверху.");
    return;
  }
  const pool = state.cards.filter(c => c.inPack);
  if (!pool.length) {
    alert("В паках пока нет карточек. Добавь их в админке!");
    return;
  }

  state.balance -= totalCost;
  state.stats.packsOpened += count;

  const drops = [];
  for (let i = 0; i < count; i++) {
    const inst = rollCardInstance(pool);
    state.inventory.push(inst);
    drops.push(inst);
    recordDropHistory("Пак (500 ₽)", getCard(inst.cardId), inst.isHolo);
  }

  saveState();

  const showcase = document.getElementById("packDropResult");
  showcase.innerHTML = "";
  drops.forEach(d => {
    const card = getCard(d.cardId);
    showcase.appendChild(renderCardElement(card, d.isHolo, { extraBadge: "СОХРАНЕНО" }));
  });

  renderPacksPage();
}

document.getElementById("buyOnePackBtn").addEventListener("click", () => openPacksCount(1));
document.getElementById("buyFivePacksBtn").addEventListener("click", () => openPacksCount(5));
document.getElementById("packsSortSelect").addEventListener("change", renderPacksPage);

function renderPacksPage() {
  const sortMode = document.getElementById("packsSortSelect").value;
  const pool = sortItems(
    state.cards.filter(c => c.inPack),
    sortMode,
    c => c.basePrice,
    c => c.rarityId
  );
  const grid = document.getElementById("packsPoolGrid");
  grid.innerHTML = "";
  pool.forEach(c => grid.appendChild(renderCardElement(c, false)));
}

// 2. КЕЙСЫ
document.getElementById("backToCasesBtn").addEventListener("click", () => {
  activeCaseId = null;
  document.getElementById("caseDetailView").classList.add("hidden");
  document.getElementById("casesListView").classList.remove("hidden");
});

document.getElementById("caseContentsSort").addEventListener("change", () => {
  if (activeCaseId) renderCaseDetail(activeCaseId);
});

function renderCasesPage() {
  const grid = document.getElementById("casesGrid");
  grid.innerHTML = "";
  state.cases.forEach(cs => {
    const box = document.createElement("div");
    box.className = "case-box";
    box.innerHTML = `
      <div>
        <h3>${escapeHtml(cs.name)}</h3>
        <p class="muted small" style="margin-top:6px;">${escapeHtml(cs.desc || "")}</p>
      </div>
      <div class="card-footer">
        <span class="price-tag">${formatRub(cs.price)}</span>
        <span class="btn btn-secondary btn-sm">Открыть</span>
      </div>
    `;
    box.addEventListener("click", () => {
      activeCaseId = cs.id;
      document.getElementById("casesListView").classList.add("hidden");
      document.getElementById("caseDetailView").classList.remove("hidden");
      document.getElementById("caseSpinResult").innerHTML = "";
      renderCaseDetail(cs.id);
    });
    grid.appendChild(box);
  });
}

function renderCaseDetail(caseId) {
  const cs = state.cases.find(c => c.id === caseId);
  if (!cs) return;

  document.getElementById("activeCaseTitle").textContent = cs.name;
  document.getElementById("activeCaseDesc").textContent = cs.desc || "";
  document.getElementById("activeCasePrice").textContent = formatRub(cs.price);

  const sortMode = document.getElementById("caseContentsSort").value;
  const caseCards = cs.cardIds.map(id => getCard(id)).filter(Boolean);
  const sortedCards = sortItems(caseCards, sortMode, c => c.basePrice, c => c.rarityId);

  const contentsGrid = document.getElementById("caseContentsGrid");
  contentsGrid.innerHTML = "";
  sortedCards.forEach(c => contentsGrid.appendChild(renderCardElement(c, false)));

  const track = document.getElementById("rouletteTrack");
  track.style.transition = "none";
  track.style.transform = "translateX(0px)";
  track.innerHTML = "";

  for (let i = 0; i < 24; i++) {
    const sample = sortedCards[i % Math.max(1, sortedCards.length)] || state.cards[0];
    const r = getRarity(sample.rarityId);
    const el = document.createElement("div");
    el.className = "roulette-item";
    el.style.setProperty("--rarity-color", getSolidColorForBorder(r.color));
    el.innerHTML = `
      <div class="rarity-pill">${escapeHtml(r.name)}</div>
      <div class="card-title" style="margin-top:6px;">${escapeHtml(sample.name)}</div>
      <div class="card-price" style="margin-top:4px;">${formatRub(sample.basePrice)}</div>
    `;
    track.appendChild(el);
  }
}

document.getElementById("spinCaseBtn").addEventListener("click", () => {
  const cs = state.cases.find(c => c.id === activeCaseId);
  if (!cs) return;
  if (state.balance < cs.price) {
    alert("Недостаточно рублей для открытия кейса!");
    return;
  }
  const pool = cs.cardIds.map(id => getCard(id)).filter(Boolean);
  if (!pool.length) return;

  state.balance -= cs.price;
  state.stats.casesOpened += 1;

  const winInstance = rollCardInstance(pool);
  state.inventory.push(winInstance);
  recordDropHistory(`Кейс: ${cs.name}`, getCard(winInstance.cardId), winInstance.isHolo);
  saveState();

  const track = document.getElementById("rouletteTrack");
  track.innerHTML = "";
  const winIndex = 28;
  const totalItems = 35;

  for (let i = 0; i < totalItems; i++) {
    const inst = i === winIndex ? winInstance : rollCardInstance(pool);
    const c = getCard(inst.cardId);
    const r = getRarity(c.rarityId);
    const price = getCardPrice(c, inst.isHolo);
    const el = document.createElement("div");
    el.className = `roulette-item ${inst.isHolo ? "is-holo" : ""}`;
    el.style.setProperty("--rarity-color", getSolidColorForBorder(r.color));
    el.innerHTML = `
      <div class="card-top-badges">
        <span class="rarity-pill">${escapeHtml(r.name)}</span>
        ${inst.isHolo ? `<span class="holo-badge">HOLO</span>` : ""}
      </div>
      <div class="card-title" style="margin-top:6px;">${escapeHtml(c.name)}</div>
      <div class="card-price" style="margin-top:4px;">${formatRub(price)}</div>
    `;
    track.appendChild(el);
  }

  const itemWidth = 165;
  const targetOffset = -(winIndex * itemWidth + 77);

  track.style.transition = "none";
  track.style.transform = "translateX(0px)";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      track.style.transition = "transform 4.2s cubic-bezier(0.12, 0.84, 0.18, 1)";
      track.style.transform = `translateX(${targetOffset}px)`;
    });
  });

  setTimeout(() => {
    const winCard = getCard(winInstance.cardId);
    const resBox = document.getElementById("caseSpinResult");
    resBox.innerHTML = "";
    resBox.appendChild(renderCardElement(winCard, winInstance.isHolo, { extraBadge: "СОХРАНЕНО" }));
  }, 4300);
});

// 3. АПГРЕЙДЫ
function generateFifteenTargets() {
  const pool = [...state.cards];
  const result = [];
  for (let i = 0; i < 15; i++) {
    const c = pool[Math.floor(Math.random() * pool.length)];
    const isHolo = Math.random() < 0.25;
    result.push({ card: c, isHolo });
  }
  upgradeTargetsPool = result;
  upgradeTargetCard = null;
}

function calcUpgradeChance(myPrice, targetPrice) {
  if (!myPrice || !targetPrice) return 0;
  const raw = (myPrice / targetPrice) * 0.85;
  return Math.max(0.02, Math.min(0.92, raw));
}

function renderUpgradesPage() {
  if (!upgradeTargetsPool.length) generateFifteenTargets();

  const sortMode = document.getElementById("upgradeInvSort").value;
  const sortedInv = sortItems(
    state.inventory,
    sortMode,
    item => getCardPrice(getCard(item.cardId), item.isHolo),
    item => getCard(item.cardId).rarityId
  );

  const myGrid = document.getElementById("upgradeMyCardsGrid");
  myGrid.innerHTML = "";
  sortedInv.forEach(item => {
    const c = getCard(item.cardId);
    const el = renderCardElement(c, item.isHolo, {
      selectable: true,
      selected: item.uid === upgradeSelectedUid,
      onClick: () => {
        upgradeSelectedUid = item.uid;
        renderUpgradesPage();
      }
    });
    myGrid.appendChild(el);
  });

  const targetsGrid = document.getElementById("upgradeTargetsGrid");
  targetsGrid.innerHTML = "";
  upgradeTargetsPool.forEach((t, idx) => {
    const isSel = upgradeTargetCard && upgradeTargetCard.index === idx;
    const el = renderCardElement(t.card, t.isHolo, {
      selectable: true,
      selected: isSel,
      onClick: () => {
        upgradeTargetCard = { ...t, index: idx };
        renderUpgradesPage();
      }
    });
    targetsGrid.appendChild(el);
  });

  const srcSlot = document.getElementById("upgradeSourceSlot");
  const tgtSlot = document.getElementById("upgradeTargetSlot");
  const chanceEl = document.getElementById("upgradeChanceText");
  const rollBtn = document.getElementById("rollUpgradeBtn");

  const myItem = state.inventory.find(i => i.uid === upgradeSelectedUid);
  let myPrice = 0;
  let targetPrice = 0;

  if (myItem) {
    const mc = getCard(myItem.cardId);
    myPrice = getCardPrice(mc, myItem.isHolo);
    srcSlot.className = "slot-box";
    srcSlot.innerHTML = `<div><strong>${escapeHtml(mc.name)}</strong>${myItem.isHolo ? " [HOLO]" : ""}<div class="card-price">${formatRub(myPrice)}</div></div>`;
  } else {
    srcSlot.className = "slot-box empty";
    srcSlot.textContent = "Выбери свою карту";
  }

  if (upgradeTargetCard) {
    targetPrice = getCardPrice(upgradeTargetCard.card, upgradeTargetCard.isHolo);
    tgtSlot.className = "slot-box";
    tgtSlot.innerHTML = `<div><strong>${escapeHtml(upgradeTargetCard.card.name)}</strong>${upgradeTargetCard.isHolo ? " [HOLO]" : ""}<div class="card-price">${formatRub(targetPrice)}</div></div>`;
  } else {
    tgtSlot.className = "slot-box empty";
    tgtSlot.textContent = "Выбери цель из 15";
  }

  if (myItem && upgradeTargetCard) {
    const chance = calcUpgradeChance(myPrice, targetPrice);
    chanceEl.textContent = `${(chance * 100).toFixed(1)}%`;
    rollBtn.disabled = false;
  } else {
    chanceEl.textContent = "—";
    rollBtn.disabled = true;
  }
}

document.getElementById("rerollTargetsBtn").addEventListener("click", () => {
  generateFifteenTargets();
  renderUpgradesPage();
});

document.getElementById("rollUpgradeBtn").addEventListener("click", () => {
  const myIdx = state.inventory.findIndex(i => i.uid === upgradeSelectedUid);
  if (myIdx === -1 || !upgradeTargetCard) return;

  const myItem = state.inventory[myIdx];
  const myPrice = getCardPrice(getCard(myItem.cardId), myItem.isHolo);
  const targetPrice = getCardPrice(upgradeTargetCard.card, upgradeTargetCard.isHolo);
  const chance = calcUpgradeChance(myPrice, targetPrice);

  state.inventory.splice(myIdx, 1);
  upgradeSelectedUid = null;

  const won = Math.random() < chance;
  const resBox = document.getElementById("upgradeResultBox");
  resBox.innerHTML = "";

  if (won) {
    state.stats.upgradesWon += 1;
    const newInst = {
      uid: `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      cardId: upgradeTargetCard.card.id,
      isHolo: upgradeTargetCard.isHolo
    };
    state.inventory.push(newInst);
    recordDropHistory("Апгрейд (Успех)", upgradeTargetCard.card, upgradeTargetCard.isHolo);
    resBox.appendChild(renderCardElement(upgradeTargetCard.card, upgradeTargetCard.isHolo, { extraBadge: "УСПЕХ!" }));
  } else {
    state.stats.upgradesLost += 1;
    resBox.innerHTML = `<div class="error-text">Не повезло! Шанс был ${(chance * 100).toFixed(1)}% — карта сгорела.</div>`;
  }

  saveState();
  renderUpgradesPage();
});

// 4. ТРЕЙДЫ С БОТОМ
document.getElementById("tradeSortSelect").addEventListener("change", renderTradesPage);
document.getElementById("clearTradeBtn").addEventListener("click", () => {
  tradeSelectedUids.clear();
  renderTradesPage();
});

function renderTradesPage() {
  const sortMode = document.getElementById("tradeSortSelect").value;
  const sortedInv = sortItems(
    state.inventory,
    sortMode,
    item => getCardPrice(getCard(item.cardId), item.isHolo),
    item => getCard(item.cardId).rarityId
  );

  let mySum = 0;
  tradeSelectedUids.forEach(uid => {
    const item = state.inventory.find(i => i.uid === uid);
    if (item) mySum += getCardPrice(getCard(item.cardId), item.isHolo);
  });

  document.getElementById("tradeMySum").textContent = formatRub(mySum);
  document.getElementById("tradeMyCount").textContent = String(tradeSelectedUids.size);

  const grid = document.getElementById("tradeInventoryGrid");
  grid.innerHTML = "";
  sortedInv.forEach(item => {
    const c = getCard(item.cardId);
    const el = renderCardElement(c, item.isHolo, {
      selectable: true,
      selected: tradeSelectedUids.has(item.uid),
      onClick: () => {
        if (tradeSelectedUids.has(item.uid)) tradeSelectedUids.delete(item.uid);
        else tradeSelectedUids.add(item.uid);
        renderTradesPage();
      }
    });
    grid.appendChild(el);
  });
}

document.getElementById("executeTradeBtn").addEventListener("click", () => {
  if (!tradeSelectedUids.size) {
    alert("Выбери хотя бы одну карту для трейда.");
    return;
  }

  let mySum = 0;
  const toRemove = [];
  tradeSelectedUids.forEach(uid => {
    const idx = state.inventory.findIndex(i => i.uid === uid);
    if (idx !== -1) {
      const item = state.inventory[idx];
      mySum += getCardPrice(getCard(item.cardId), item.isHolo);
      toRemove.push(uid);
    }
  });

  const ratio = 0.82 + Math.random() * 0.18;
  const targetBotBudget = Math.max(100, Math.round(mySum * ratio));

  state.inventory = state.inventory.filter(item => !toRemove.includes(item.uid));
  tradeSelectedUids.clear();

  const candidates = [];
  state.cards.forEach(c => {
    candidates.push({ card: c, isHolo: false, price: getCardPrice(c, false) });
    candidates.push({ card: c, isHolo: true, price: getCardPrice(c, true) });
  });

  const botItems = [];
  let botSum = 0;
  for (let attempt = 0; attempt < 25; attempt++) {
    const affordable = candidates.filter(x => botSum + x.price <= targetBotBudget);
    if (!affordable.length) break;
    const pick = affordable[Math.floor(Math.random() * affordable.length)];
    botItems.push(pick);
    botSum += pick.price;
  }

  let cashDiff = 0;
  if (!botItems.length) {
    cashDiff = targetBotBudget;
    state.balance += cashDiff;
  } else {
    botItems.forEach(b => {
      state.inventory.push({
        uid: `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        cardId: b.card.id,
        isHolo: b.isHolo
      });
      recordDropHistory("Трейд с ботом", b.card, b.isHolo);
    });
  }

  state.stats.tradesDone += 1;
  saveState();

  const resBox = document.getElementById("tradeBotResult");
  resBox.innerHTML = `<div style="width:100%" class="muted small">Ты отдал на <strong>${formatRub(mySum)}</strong> • Бот дал на <strong>${formatRub(botSum + cashDiff)}</strong></div>`;
  botItems.forEach(b => {
    resBox.appendChild(renderCardElement(b.card, b.isHolo, { extraBadge: "ОТ БОТА" }));
  });
  if (cashDiff > 0) {
    resBox.innerHTML += `<div class="card-price">Бонус от бота: +${formatRub(cashDiff)}</div>`;
  }

  renderTradesPage();
});

// 5. КРАФТЫ (10 карт одной редкости -> 1 карта следующей редкости)
document.getElementById("craftSortSelect").addEventListener("change", renderCraftsPage);
document.getElementById("craftClearBtn").addEventListener("click", () => {
  craftSelectedUids.clear();
  renderCraftsPage();
});

document.getElementById("craftAutoFillBtn").addEventListener("click", () => {
  craftSelectedUids.clear();
  const byRarity = {};
  state.inventory.forEach(item => {
    const rId = getCard(item.cardId).rarityId;
    const nextIdx = getRarityIndex(rId) + 1;
    if (nextIdx < state.rarities.length) {
      if (!byRarity[rId]) byRarity[rId] = [];
      byRarity[rId].push(item);
    }
  });
  for (const rId of Object.keys(byRarity)) {
    if (byRarity[rId].length >= 10) {
      byRarity[rId]
        .sort((a, b) => getCardPrice(getCard(a.cardId), a.isHolo) - getCardPrice(getCard(b.cardId), b.isHolo))
        .slice(0, 10)
        .forEach(x => craftSelectedUids.add(x.uid));
      break;
    }
  }
  renderCraftsPage();
});

function renderCraftsPage() {
  const sortMode = document.getElementById("craftSortSelect").value;
  const sortedInv = sortItems(
    state.inventory,
    sortMode,
    item => getCardPrice(getCard(item.cardId), item.isHolo),
    item => getCard(item.cardId).rarityId
  );

  const selectedItems = [...craftSelectedUids]
    .map(uid => state.inventory.find(i => i.uid === uid))
    .filter(Boolean);

  const sum = selectedItems.reduce((acc, it) => acc + getCardPrice(getCard(it.cardId), it.isHolo), 0);
  const firstRarityId = selectedItems.length ? getCard(selectedItems[0].cardId).rarityId : null;
  const nextRarity = firstRarityId ? state.rarities[getRarityIndex(firstRarityId) + 1] : null;

  document.getElementById("craftSelectedCount").textContent = `${selectedItems.length} / 10`;
  document.getElementById("craftSelectedRarity").textContent = firstRarityId
    ? `${getRarity(firstRarityId).name}${nextRarity ? ` ➔ ${nextRarity.name}` : " (максимальная)"}`
    : "—";
  document.getElementById("craftSelectedSum").textContent = formatRub(sum);
  document.getElementById("executeCraftBtn").disabled = !(selectedItems.length === 10 && nextRarity);

  const grid = document.getElementById("craftInventoryGrid");
  grid.innerHTML = "";

  sortedInv.forEach(item => {
    const c = getCard(item.cardId);
    const el = renderCardElement(c, item.isHolo, {
      selectable: true,
      selected: craftSelectedUids.has(item.uid),
      onClick: () => {
        if (craftSelectedUids.has(item.uid)) {
          craftSelectedUids.delete(item.uid);
        } else {
          if (craftSelectedUids.size >= 10) return;
          if (selectedItems.length > 0 && getCard(c.id).rarityId !== firstRarityId) {
            alert("Для крафта нужно выбрать 10 карт одной редкости!");
            return;
          }
          if (getRarityIndex(c.rarityId) + 1 >= state.rarities.length) {
            alert("Это уже самая высокая редкость!");
            return;
          }
          craftSelectedUids.add(item.uid);
        }
        renderCraftsPage();
      }
    });
    grid.appendChild(el);
  });
}

document.getElementById("executeCraftBtn").addEventListener("click", () => {
  const selectedItems = [...craftSelectedUids]
    .map(uid => state.inventory.find(i => i.uid === uid))
    .filter(Boolean);
  if (selectedItems.length !== 10) return;

  const curRarityId = getCard(selectedItems[0].cardId).rarityId;
  const nextRarity = state.rarities[getRarityIndex(curRarityId) + 1];
  if (!nextRarity) return;

  const totalInputPrice = selectedItems.reduce((acc, it) => acc + getCardPrice(getCard(it.cardId), it.isHolo), 0);
  const avgPrice = totalInputPrice / 10;

  let nextTierCards = state.cards.filter(c => c.rarityId === nextRarity.id);
  if (!nextTierCards.length) {
    nextTierCards = state.cards.filter(c => getRarityIndex(c.rarityId) > getRarityIndex(curRarityId));
  }
  if (!nextTierCards.length) nextTierCards = state.cards;

  const chosenCard = pickWeighted(nextTierCards, c => {
    const ratio = c.basePrice / Math.max(100, avgPrice * 2.2);
    return Math.max(0.1, Math.min(5, ratio));
  });

  const isHolo = Math.random() < Math.min(0.5, HOLO_CHANCE + (avgPrice / 50000));

  state.inventory = state.inventory.filter(it => !craftSelectedUids.has(it.uid));
  craftSelectedUids.clear();

  const newInst = {
    uid: `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    cardId: chosenCard.id,
    isHolo
  };
  state.inventory.push(newInst);
  state.stats.craftsDone += 1;
  recordDropHistory(`Крафт ➔ ${nextRarity.name}`, chosenCard, isHolo);
  saveState();

  const resBox = document.getElementById("craftResultBox");
  resBox.innerHTML = "";
  resBox.appendChild(renderCardElement(chosenCard, isHolo, { extraBadge: "СКРАФЧЕНО" }));

  renderCraftsPage();
});

// 6. КОЛЛЕКЦИЯ, СТАТИСТИКА И ИСТОРИЯ
document.getElementById("collectionSortSelect").addEventListener("change", renderCollectionPage);

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  state.history = [];
  saveState();
  renderCollectionPage();
});

document.getElementById("sellDupesBtn").addEventListener("click", () => {
  const seen = new Set();
  let earned = 0;
  const kept = [];

  for (const item of state.inventory) {
    const key = `${item.cardId}_${item.isHolo ? "H" : "N"}`;
    if (!seen.has(key)) {
      seen.add(key);
      kept.push(item);
    } else {
      earned += Math.round(getCardPrice(getCard(item.cardId), item.isHolo) * 0.7);
    }
  }

  state.inventory = kept;
  state.balance += earned;
  saveState();
  alert(`Продано дубликатов на ${formatRub(earned)}`);
  renderCollectionPage();
});

function renderCollectionPage() {
  const totalValue = state.inventory.reduce((acc, it) => acc + getCardPrice(getCard(it.cardId), it.isHolo), 0);
  const holoCount = state.inventory.filter(it => it.isHolo).length;
  const uniqueCards = new Set(state.inventory.map(it => it.cardId)).size;

  const statsGrid = document.getElementById("statsGrid");
  statsGrid.innerHTML = `
    <div class="stat-card"><div class="muted small">Карт в коллекции</div><div class="stat-val">${state.inventory.length}</div></div>
    <div class="stat-card"><div class="muted small">Уникальных уровней</div><div class="stat-val">${uniqueCards} / ${state.cards.length}</div></div>
    <div class="stat-card"><div class="muted small">HOLO карточек</div><div class="stat-val">${holoCount}</div></div>
    <div class="stat-card"><div class="muted small">Стоимость инвентаря</div><div class="stat-val">${formatRub(totalValue)}</div></div>
    <div class="stat-card"><div class="muted small">Открыто паков / кейсов</div><div class="stat-val">${state.stats.packsOpened} / ${state.stats.casesOpened}</div></div>
    <div class="stat-card"><div class="muted small">Апгрейдов / Трейдов / Крафтов</div><div class="stat-val">${state.stats.upgradesWon + state.stats.upgradesLost} / ${state.stats.tradesDone} / ${state.stats.craftsDone}</div></div>
  `;

  const sortMode = document.getElementById("collectionSortSelect").value;
  const sortedInv = sortItems(
    state.inventory,
    sortMode,
    item => getCardPrice(getCard(item.cardId), item.isHolo),
    item => getCard(item.cardId).rarityId
  );

  const grid = document.getElementById("collectionGrid");
  grid.innerHTML = "";

  sortedInv.forEach(item => {
    const c = getCard(item.cardId);
    const sellPrice = Math.round(getCardPrice(c, item.isHolo) * 0.7);
    const el = renderCardElement(c, item.isHolo, { extraBadge: `Продать: ${formatRub(sellPrice)}` });
    const sellBtn = document.createElement("button");
    sellBtn.className = "btn btn-ghost btn-sm";
    sellBtn.textContent = `Продать (${formatRub(sellPrice)})`;
    sellBtn.addEventListener("click", e => {
      e.stopPropagation();
      state.inventory = state.inventory.filter(x => x.uid !== item.uid);
      state.balance += sellPrice;
      saveState();
      renderCollectionPage();
    });
    el.appendChild(sellBtn);
    grid.appendChild(el);
  });

  const historyEl = document.getElementById("dropHistoryList");
  historyEl.innerHTML = "";
  if (!state.history.length) {
    historyEl.innerHTML = `<div class="muted small">История пока пуста — открой пак, кейс или сделай крафт/трейд.</div>`;
  } else {
    state.history.forEach(h => {
      const row = document.createElement("div");
      row.className = "history-row";
      row.innerHTML = `
        <div>
          <span class="muted small">[${escapeHtml(h.time)}]</span>
          <strong>${escapeHtml(h.source)}</strong>:
          <span>${escapeHtml(h.cardName)}</span>
          <span class="muted small">(${escapeHtml(h.rarityName)}${h.isHolo ? ", HOLO" : ""})</span>
        </div>
        <span class="card-price">${formatRub(h.price)}</span>
      `;
      historyEl.appendChild(row);
    });
  }
}

// 7. АДМИНКА
document.getElementById("adminLoginBtn").addEventListener("click", () => {
  const pass = document.getElementById("adminPasswordInput").value.trim();
  const err = document.getElementById("adminAuthError");
  if (pass === ADMIN_PASS) {
    adminUnlocked = true;
    err.textContent = "";
    renderAdminPage();
  } else {
    err.textContent = "Неверный пароль";
  }
});

document.getElementById("adminLogoutBtn").addEventListener("click", () => {
  adminUnlocked = false;
  document.getElementById("adminPasswordInput").value = "";
  renderAdminPage();
});

document.getElementById("resetDefaultDataBtn").addEventListener("click", () => {
  if (!confirm("Сбросить баланс, инвентарь, историю, редкости, кейсы и карточки к начальным?")) return;
  state = createInitialState();
  saveState();
  renderAdminPage();
});

function renderAdminPage() {
  const lockBox = document.getElementById("adminLockBox");
  const panel = document.getElementById("adminPanel");

  if (!adminUnlocked) {
    lockBox.classList.remove("hidden");
    panel.classList.add("hidden");
    return;
  }

  lockBox.classList.add("hidden");
  panel.classList.remove("hidden");

  const raritySel = document.getElementById("cardRaritySelect");
  raritySel.innerHTML = "";
  state.rarities.forEach(r => {
    const opt = document.createElement("option");
    opt.value = r.id;
    opt.textContent = r.name;
    raritySel.appendChild(opt);
  });

  const rarList = document.getElementById("adminRaritiesList");
  rarList.innerHTML = "";
  state.rarities.forEach((r, idx) => {
    const row = document.createElement("div");
    row.className = "admin-row";
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(r.name)}</strong>
        <span class="muted small"> • эффект: ${escapeHtml(r.effect)} • вес: ${r.weight}</span>
      </div>
      <div class="btn-row">
        <select class="input select eff-change">
          ${["none", "glow", "pulse", "rainbow", "glitch"]
            .map(ef => `<option value="${ef}" ${r.effect === ef ? "selected" : ""}>${ef}</option>`)
            .join("")}
        </select>
        <button class="btn btn-ghost btn-sm move-up" ${idx === 0 ? "disabled" : ""}>▲</button>
        <button class="btn btn-ghost btn-sm move-down" ${idx === state.rarities.length - 1 ? "disabled" : ""}>▼</button>
        <button class="btn btn-danger btn-sm del-rar">Удалить</button>
      </div>
    `;
    row.querySelector(".eff-change").addEventListener("change", e => {
      r.effect = e.target.value;
      saveState();
      renderAdminPage();
    });
    row.querySelector(".move-up").addEventListener("click", () => {
      [state.rarities[idx - 1], state.rarities[idx]] = [state.rarities[idx], state.rarities[idx - 1]];
      saveState();
      renderAdminPage();
    });
    row.querySelector(".move-down").addEventListener("click", () => {
      [state.rarities[idx + 1], state.rarities[idx]] = [state.rarities[idx], state.rarities[idx + 1]];
      saveState();
      renderAdminPage();
    });
    row.querySelector(".del-rar").addEventListener("click", () => {
      if (state.rarities.length <= 1) return;
      state.rarities.splice(idx, 1);
      saveState();
      renderAdminPage();
    });
    rarList.appendChild(row);
  });

  const cardsList = document.getElementById("adminCardsList");
  cardsList.innerHTML = "";
  state.cards.forEach(c => {
    const r = getRarity(c.rarityId);
    const row = document.createElement("div");
    row.className = "admin-row";
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(c.name)}</strong> <span class="muted small">(${escapeHtml(r.name)})</span> • <span class="card-price">${formatRub(c.basePrice)}</span>
        <span class="muted small"> • В паках: ${c.inPack ? "Да" : "Нет"}</span>
      </div>
      <button class="btn btn-danger btn-sm">Удалить</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      state.cards = state.cards.filter(x => x.id !== c.id);
      saveState();
      renderAdminPage();
    });
    cardsList.appendChild(row);
  });

  const picker = document.getElementById("newCaseCardsPicker");
  picker.innerHTML = "";
  state.cards.forEach(c => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `chip-btn ${newCaseSelectedCardIds.has(c.id) ? "active" : ""}`;
    btn.textContent = `${c.name} (${formatRub(c.basePrice)})`;
    btn.addEventListener("click", () => {
      if (newCaseSelectedCardIds.has(c.id)) newCaseSelectedCardIds.delete(c.id);
      else newCaseSelectedCardIds.add(c.id);
      renderAdminPage();
    });
    picker.appendChild(btn);
  });

  const casesList = document.getElementById("adminCasesList");
  casesList.innerHTML = "";
  state.cases.forEach(cs => {
    const row = document.createElement("div");
    row.className = "admin-row";
    row.innerHTML = `
      <div><strong>${escapeHtml(cs.name)}</strong> • <span class="card-price">${formatRub(cs.price)}</span> • карт: ${cs.cardIds.length}</div>
      <button class="btn btn-danger btn-sm">Удалить</button>
    `;
    row.querySelector("button").addEventListener("click", () => {
      state.cases = state.cases.filter(x => x.id !== cs.id);
      saveState();
      renderAdminPage();
    });
    casesList.appendChild(row);
  });
}

document.getElementById("addRarityBtn").addEventListener("click", () => {
  const name = document.getElementById("newRarityName").value.trim();
  const color = document.getElementById("newRarityColor").value.trim() || "#38bdf8";
  const effect = document.getElementById("newRarityEffect").value;
  const weight = Number(document.getElementById("newRarityWeight").value) || 5;
  if (!name) return;

  state.rarities.push({
    id: `r_${Date.now()}`,
    name,
    color,
    effect,
    weight
  });
  document.getElementById("newRarityName").value = "";
  saveState();
  renderAdminPage();
});

document.getElementById("saveCardBtn").addEventListener("click", () => {
  const name = document.getElementById("cardNameInput").value.trim();
  const creator = document.getElementById("cardCreatorInput").value.trim() || "GD";
  const rarityId = document.getElementById("cardRaritySelect").value;
  const basePrice = Math.max(10, Number(document.getElementById("cardPriceInput").value) || 500);
  const image = document.getElementById("cardImageInput").value.trim();
  const inPack = document.getElementById("cardInPackCheckbox").checked;
  if (!name) return;

  state.cards.push({
    id: `c_${Date.now()}`,
    name,
    creator,
    rarityId,
    basePrice,
    image,
    inPack
  });

  document.getElementById("cardNameInput").value = "";
  document.getElementById("cardPriceInput").value = "";
  document.getElementById("cardImageInput").value = "";
  saveState();
  renderAdminPage();
});

document.getElementById("createCaseBtn").addEventListener("click", () => {
  const name = document.getElementById("newCaseName").value.trim();
  const price = Math.max(50, Number(document.getElementById("newCasePrice").value) || 1000);
  const desc = document.getElementById("newCaseDesc").value.trim();
  if (!name || !newCaseSelectedCardIds.size) {
    alert("Укажи название кейса и выбери хотя бы одну карточку.");
    return;
  }

  state.cases.push({
    id: `case_${Date.now()}`,
    name,
    price,
    desc,
    cardIds: [...newCaseSelectedCardIds]
  });

  newCaseSelectedCardIds.clear();
  document.getElementById("newCaseName").value = "";
  document.getElementById("newCasePrice").value = "";
  document.getElementById("newCaseDesc").value = "";
  saveState();
  renderAdminPage();
});

// Инициализация
renderTopbar();
renderPacksPage();
