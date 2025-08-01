import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import Sortable from "sortablejs";
import { getCards, addCard, removeCardById, reorderCards } from "./storage.js";
import { renderCard, removeCardFromDOM, cardContainer } from "./ui.js";

const form = document.querySelector(".form"); //get a DOM element

form.addEventListener("submit", (event) => {
  //handler
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

  textCard.value = ""; //clear form

  const cardObject = {
    text: trimCard,
    id: crypto.randomUUID(),
  };

  addCard(cardObject);

  renderCard(cardObject);
});

getCards().forEach((card) => {
  renderCard(card);
});

cardContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const cardElement = event.target.closest(".card");

    const id = cardElement.dataset.id;

    removeCardById(id);
    removeCardFromDOM(id);

    cardElement.remove();
  }
});

const sortable = new Sortable(cardContainer, {
  animation: 250,
  swapThreshold: 0.55,
  onEnd: function (e) {
    reorderCards(e.oldIndex, e.newIndex);
  },
});
