import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Sortable from "sortablejs";
import {
  getCards,
  addCard,
  removeCardById,
  updateCardColumn,
  updateColumnOrder,
} from "./storage.js";
import { renderCard, removeCardFromDOM } from "./ui.js";

const form = document.querySelector(".form");
const allColumns = document.querySelectorAll(".card-cabin");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const textCard = form.querySelector('input[name="text-to-save"]');
  const trimCard = textCard.value.trim();

  if (trimCard === "") {
    iziToast.error({
      message: "Заполни поле",
      position: "topRight",
    });
    return;
  }

  textCard.value = "";

  const cardObject = {
    text: trimCard,
    id: crypto.randomUUID(),
    column: "todo",
  };

  addCard(cardObject);
  renderCard(cardObject);
});

getCards().forEach((card) => {
  renderCard(card);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const cardElement = event.target.closest(".card");
    const id = cardElement.dataset.id;
    removeCardById(id);
    removeCardFromDOM(id);
  }
});

allColumns.forEach((column) => {
  new Sortable(column, {
    group: "shared",
    animation: 250,
    onEnd: (evt) => {
      const movedCard = evt.item.dataset.id;
      const newColumn = evt.to.dataset.column;

      updateCardColumn(movedCard, newColumn);

      const updatedIds = Array.from(evt.to.children).map((el) => el.dataset.id);
      updateColumnOrder(newColumn, updatedIds);
    },
  });
});
