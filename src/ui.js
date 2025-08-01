export const cardContainer = document.querySelector(".card-show");

export function renderCard(card) {
  const cardHTML = `
    <div class="card" data-id="${card.id}">
      <span>${card.text}</span>
      <button class="delete-btn">Удалить</button>
    </div>
  `;
  cardContainer.insertAdjacentHTML("beforeend", cardHTML);
}

export function removeCardFromDOM(id) {
  const cardElement = cardContainer.querySelector('[data-id="${id}"]');
  if (cardElement) cardElement.remove();
}
