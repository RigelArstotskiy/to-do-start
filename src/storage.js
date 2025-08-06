let cards;

try {
  const saved = localStorage.getItem("cards");
  cards = saved ? JSON.parse(saved) : [];
} catch (err) {
  console.error("localStorage error:", err);
  cards = [];
}

function saveToLocalStorage() {
  localStorage.setItem("cards", JSON.stringify(cards));
}

export function getCards() {
  return cards;
}

export function addCard(card) {
  cards.push(card);
  saveToLocalStorage();
}

export function removeCardById(id) {
  cards = cards.filter((card) => card.id !== id);
  saveToLocalStorage();
}

export function updateCardColumn(id, newColumn) {
  const card = cards.find((c) => c.id === id);
  if (card) {
    card.column = newColumn;
    saveToLocalStorage();
  }
}

export function updateColumnOrder(column, orderedIds) {
  const columnCards = cards.filter((card) => card.column === column);
  const newOrder = orderedIds
    .map((id) => columnCards.find((c) => c.id === id))
    .filter(Boolean);
  cards = [...cards.filter((card) => card.column !== column), ...newOrder];
  saveToLocalStorage();
}
