const mask = (selector) => {

  let setCursorPosition = (pos, elem) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
  };

  function createMask(event) {
    let matrix = '+7 (___) ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

    if(def.length >= val.length) {
      val = def;
    }
    console.log(val);

    //this.value - то, что ввёл пользователь. /./g - проходим по каждому символу из матрицы (a) и применяем к нему функцию
    this.value = matrix.replace(/./g, function(a) {
      //и если символ в матрице === числу или ___, то записывает туда введенные пользователем данные из val (обрезанного this.value)
      //иначе возвращает символ как есть (a) или обрезает строку (''), если символов больше, чем 
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
    console.log(this.value);

    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
      } else {
        console.log('Hello')
        setCursorPosition(this.value.length, this);
      }
    }
  }

  let inputs = document.querySelectorAll(selector);

  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};

export default mask;