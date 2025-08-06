export function renderCard(card) {
  const column = card.column || "todo";
  const container = document.querySelector(
    `.card-cabin[data-column="${column}"]`
  );

  if (!container) {
    console.warn("Не найдена колонка для карточки:", column);
    return;
  }

  const cardHTML = `
    <div class="card" data-id="${card.id}">
      <span>${card.text}</span>
      <button class="delete-btn">Удалить</button>
    </div>
  `;
  container.insertAdjacentHTML("beforeend", cardHTML);
}

export function removeCardFromDOM(id) {
  const cardElement = document.querySelector(`[data-id="${id}"]`);
  if (cardElement) cardElement.remove();
}
