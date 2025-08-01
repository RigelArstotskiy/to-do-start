import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Sortable from 'sortablejs';

const form = document.querySelector('.form')//get a DOM element
const cardContainer = document.querySelector('.card-show');

form.addEventListener('submit', event => {//handler
    event.preventDefault();

    const textCard = form.querySelector('input[name="text-to-save"]');
    const trimCard = textCard.value.trim();
    

    if (trimCard === '') {
        iziToast.error({
            message: 'Заполни поле',
            position: 'topRight'
        });
        return;
    }

    textCard.value = '';//clear form

    const cardObject = {
    text: trimCard,
    id: crypto.randomUUID(),
    }

    cards.push(cardObject);

    localStorage.setItem('cards', JSON.stringify(cards));

    renderCard(cardObject)
})


function renderCard(card) {
  const cardHTML = `
    <div class="card" id="card-${card.id}">
      <span>${card.text}</span>
      <button class="delete-btn">Удалить</button>
    </div>
  `;
  cardContainer.insertAdjacentHTML('beforeend', cardHTML);
}

const saved = localStorage.getItem('cards');
let cards = saved ? JSON.parse(saved) : [];

cards.forEach(card => {
    renderCard(card);
});

cardContainer.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')){
    const cardElement = event.target.closest('.card');
    
    const idAttr = cardElement.id;
    const id = idAttr.replace('card-', '');

    cards = cards.filter(card => card.id !== id);

    localStorage.setItem('cards', JSON.stringify(cards));

    cardElement.remove();
    }
});

const sortable = new Sortable(cardContainer, {
  animation: 150,
  swapThreshold: 0.55,
  onEnd: function (e) {
    updateCardsOrder(e.oldIndex, e.newIndex);
  },
});

function updateCardsOrder (oldIndex, newIndex) {
  if(oldIndex === newIndex) return;

  const movedCard = cards.splice(oldIndex, 1)[0];
  cards.splice(newIndex, 0, movedCard);

  localStorage.setItem('cards', JSON.stringify(cards));
}