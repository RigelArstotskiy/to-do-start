console.log(10)

const form = document.querySelector('.form')//get a DOM element

form.addEventListener('submit', event => {
    event.preventDefault();

    const textCard = form.querySelector('input[name="text-to-save"');
    const trimCard = textCard.value.trim();

    console.log(9, {trimCard});//testing, is button works as it suppose to
})