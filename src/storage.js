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
} //вернёт сам массив

export function addCard(card) {
  cards.push(card);
  saveToLocalStorage();
} //сохраняем карточку в объекте, и затем в локальном хранилище

export function removeCardById(id) {
  cards = cards.filter((card) => card.id !== id);
  saveToLocalStorage();
} //сделали функцию удаления карточки по айди

export function reorderCards(oldIndex, newIndex) {
  const movedCard = cards.splice(oldIndex, 1)[0];
  cards.splice(newIndex, 0, movedCard);
  saveToLocalStorage();
} //д-н-д
