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

    console.log(9, {trimCard});//testing, is button works as it suppose to
})

const saved = localStorage.getItem('cards');
const cards = saved ? JSON.parse(saved) : [];
console.log(cards);//testing array

cards.forEach(card => {
    cardContainer.insertAdjacentHTML('beforeend', `<div class="card">${card.text}</div>`)
});