const modals = () => {
  let btnPressed = false;

  function bindModals(triggerSelector, modalSelector, closeSelector, destroy = false) {
    const trigger = document.querySelectorAll(triggerSelector),
          openModal = document.querySelector(modalSelector),
          closeModal = document.querySelector(closeSelector),
          windows = document.querySelectorAll('[data-modal]'),
          scroll = calcScroll();

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if(e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          item.remove();
        }
        
        //Все модальные окна скрыты на странице
        windows.forEach(item => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn');
        });

        //Модальное окно отображается на странице
        openModal.style.display = 'block';
        //Для блокировки скролла страницы при открытом модальном окне
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    closeModal.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });

      openModal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = '0px';
    });

    openModal.addEventListener('click', (e) => {
      if(e.target === openModal) {
        windows.forEach(item => {
          item.style.display = 'none';
        });
        openModal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px';
        // clearInterval(showModalByTime);
      }
    });
  }

  function showModalByTime (selector, time) {
    setTimeout(function() {
      let isAnyModalShown = false;

      //Проверяем, показывается ли пользователю какое-то из модальных окон
      document.querySelectorAll(['data-modal']).forEach(item => {
        if (window.getComputedStyle(item).display !== 'none') {
          isAnyModalShown = true;
        }
      });

        if (!isAnyModalShown) {
          document.querySelector(selector).style.display = 'block';
          document.body.style.overflow = 'hidden';
          let scroll = calcScroll();
          document.body.style.marginRight = `${scroll}px`;
        }
    }, time);
  }
  
  function calcScroll () {
    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  function openByScroll(selector) {
    //Определяем, долистал ли пользователь до конца страницы
    window.addEventListener('scroll', () => {
      if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
        document.querySelector(selector).click();
      }
    });

  }

  bindModals('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift');
  // showModalByTime('.popup-consultation', 70000);
};

export default modals;
