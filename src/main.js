import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
console.log(10)

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
    }
    cards.push(cardObject);

    localStorage.setItem('cards', JSON.stringify(cards));

    renderCard(trimCard)

    console.log(9, {trimCard});//testing, is button works as it suppose to
})


function renderCard(text) {
  const cardHTML = `
    <div class="card">
      <span>${text}</span>
      <button class="delete-btn">Удалить</button>
    </div>
  `;
  cardContainer.insertAdjacentHTML('beforeend', cardHTML);
}

const saved = localStorage.getItem('cards');
let cards = saved ? JSON.parse(saved) : [];

console.log(cards);//testing array

cards.forEach(card => {
    renderCard(card.text);
});

cardContainer.addEventListener('click', event => {
    if (event.target.classList.contains('delete-btn')){
    const cardElement = event.target.closest('.card');
    const text = cardElement.querySelector('span').textContent;

    cards = cards.filter(card => card.text !== text);

    localStorage.setItem('cards', JSON.stringify(cards));

    cardElement.remove();
    }
});