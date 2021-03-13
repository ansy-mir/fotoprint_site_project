// import checkNumInputs from './checkNumInputs';
import {postData} from '../servises/requests';

const forms = (state) => {
  const allForms = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');

  // checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Идет отправка..',
    success: 'Отправлено!',
    failure: 'Ошибка..',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  };

  const clearInputs = () => {
    inputs.forEach(item => {
        item.value = '';
    });
    upload.forEach(item => {
      item.previousElementSibling.textContent = 'Файл не выбран';
    });
  };

  upload.forEach(item => {
    item.addEventListener('input', () => {
      let dots;
      const arr = item.files[0].name.split('.');
      arr[0].length > 6 ? dots = '...' : dots = '.';
      const name = `${arr[0].substring(0,6)}${dots}${arr[1]}`;
      item.previousElementSibling.textContent = name;
    });
  });

  allForms.forEach(item => {
    item.addEventListener('submit', (e) => {
       
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.parentNode.appendChild(statusMessage);

      //Красиво скрыть форму, чтобы на её месте появилось окно оповещения. 
      //Сначала делаем её прозрачной, потом через 4 мс убираем вообще
      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);

      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(item);
      if (item.getAttribute('data-calc') === 'end') {
         formData.append('totalPrice', document.querySelector('.calc-price').textContent);
      }
      console.log(JSON.stringify(state))
      //Переменная для формирования динамического пути для отправки данных
      let api;
      
      //closest возвращает ближайший родительский элемент (или сам элемент), который соответствует заданному CSS-селектору 
      //или null, если таковых элементов вообще нет.
      item.closest('.popup-design') || item.classList.contains('calc-form') ? api = path.designer : api = path.question;
      console.log(api);
     
      postData(api, formData)
        .then(result => {
          console.log(result);
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;

      }).catch((e) => {
          console.log(e);
          statusImg.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;

      }).finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = 'block';
            item.classList.remove('fadeOutUp', 'animated');
            item.classList.add('fadeInUp');
          }, 4000);

          //Закрываем окно после ввода всех данных
          // if (item.getAttribute('data-calc') === 'end') {
          //   setTimeout(() => {
          //     item.closest('.popup_calc_end').style.display = 'none';
          //     document.body.style.overflow = "scroll";
          //   }, 6000);            
          // }
        });
    });
  });
};
export default forms;