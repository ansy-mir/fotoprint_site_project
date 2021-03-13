import {getResource} from '../servises/requests';

const showMoreStyles = (trigger, wrapper) => {
  const btn = document.querySelector(trigger);

//   cards.forEach(card => {
//     card.classList.add('animated', 'fadeInUp');
//   });

//   btn.addEventListener('click', () => {
//     cards.forEach(card => {
//       card.classList.remove('hidden-lg', 'hidden-md','hidden-sm','hidden-xs');
//       card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs');
//     });
//     // btn.style.display = 'none';
//     btn.remove();
//   });


  btn.addEventListener('click', function() {
    getResource('http://localhost:3000/styles')
      .then(result => createCards(result)) 
      .catch(error => console.log(error));
    
    this.remove();
  });

  function createCards(responce) {
    responce.forEach(({src, title, link})=> {
      let card = document.createElement('div');

      card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs');
      card.innerHTML = `
        <div class="styles-block">
          <img src=${src} alt="style">
          <h4>${title}</h4>
          <a href=${link}>Подробнее</a>
			  </div>
      `;

      document.querySelector(wrapper).appendChild(card);
    });
  }
};

export default showMoreStyles;