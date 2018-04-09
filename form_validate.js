'use strict';
(function() {
  var validities = [];
  var Validation = function (field, length){
    this.errors = [];
    this.field = field;
    this.length = length;
  };

  Validation.prototype = {
    stopSubmit: function() {
      if (this.errors.length > 0) {
        validities.push('invalid');
      }
    },
    colorizeValid: function () {
      this.field.style.backgroundColor = 'rgba(240,180,136,0.2)';
    },
    colorizeInvalid: function () {
      this.field.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
    },
    cleanErrorMessage: function() {
      var fieldID = this.field.id;
      var children = contactForm.querySelectorAll('#' + fieldID + '+ p');
      Array.from(children).forEach(function(child) {
        child.textContent = '';
      });
    },
    setErrorMessage: function() {
      this.cleanErrorMessage();
      var placeForError = contactForm.querySelector('#' + this.field.id + '+ p');
      if (this.errors.length > 0) {
        var message = this.errors;
        var fragment = document.createDocumentFragment();
        message.forEach(function (el) {
          var p = document.createElement('p');
          p.classList.add('error');
          p.innerHTML = '*' + el;
          fragment.appendChild(p);
        });
        placeForError.appendChild(fragment);
      }
    },
    checkIfEmpty: function() {
      if ((this.field.value === '') || (this.field.value.match(/^\s/))) {
        this.errors.push('Поле ' + this.field.placeholder + ' не может быть пустым или начинаться с пробелов!');
        return true;
      }
    },
    checkIfTooShort: function () {
      if (this.field.value.length < this.length) {
        this.errors.push('Поле ' + this.field.placeholder + ' не может быть короче ' + this.length +' символов');
        return true;
      }
    },
    checkPhonePattern: function () {
      if (!(this.field.value.match(/((\+?7\s?\(?(9\d{2}|343)\)?)\s?\d{3}-?\s?\d{2}(-?\s?)\d{2})|((8\s?\(?(9\d{2}|343)\)?)\s?\d{3}-?\s?\d{2}(-?\s?)\d{2})/))) {
        this.errors.push('Номер телефона должен начинаться с +79 или 89 или +7(343) или 8(343)');
        return true;
      }
    },
    checkMailPattern: function () {
      if (!(this.field.value.match(/\w+@\w+/))) {
        this.errors.push('Адрес эл. почты должен состоять из латинских букв и символа "@" образец: example@mail.ru');
        return true;
      }
    },
    checkMessagePattern: function () {
      if (this.field.value.match(/<|>|\/|\\|<a>|<\/a>|<img>|\|/)) {
        this.errors.push('Поле "Сообщение" не может содержать символы "<" ">" "\\" "/" "|", а также теги html-разметки');
        return true;
      }
    },
    checkName: function () {
      var empty = this.checkIfEmpty(this.field);
      var short = this.checkIfTooShort(this.field, this.length);
      if (empty || short) {
        this.setErrorMessage();
        this.colorizeInvalid(this.field);
      } else {
        this.colorizeValid(this.field);
        this.cleanErrorMessage();
      }
    },
    checkPhone: function () {
      var empty = this.checkIfEmpty(this.field);
      var matchPattern = this.checkPhonePattern(this.field);
      var short = this.checkIfTooShort(this.field, this.length);
      if(empty || matchPattern || short) {
        this.setErrorMessage();
        this.colorizeInvalid(this.field);
      } else {
        this.colorizeValid(this.field);
        this.cleanErrorMessage();
      }
    },
    checkMail: function () {
      var empty = this.checkIfEmpty(this.field);
      var valid = this.checkMailPattern();
      if (empty || valid) {
        this.setErrorMessage();
        this.colorizeInvalid(this.field);
      } else {
        this.colorizeValid(this.field);
        this.cleanErrorMessage();
      }
    },
    checkMessage: function () {
      var matchPattern = this.checkMessagePattern(this.field);
      var empty = this.checkIfEmpty(this.field);
      var short = this.checkIfTooShort(this.field, this.length);
      if (matchPattern || empty || short) {
        this.setErrorMessage();
        this.colorizeInvalid(this.field);
      } else {
        this.colorizeValid(this.field);
        this.cleanErrorMessage();
      }
    }
  };
  var contactForm = document.querySelector('#contactForm'); // непосредственно сама форма
  var submit = contactForm.querySelector('input[type=submit]');
  var form = document.querySelector('.contact-form'); // div, содержащий форму
  var button = document.querySelector('.show-hide-contact-form');

  var formFields = {
    phoneField: contactForm.querySelector('input#mobile-phone'),
    messageField: contactForm.querySelector('textarea#message'),
    nameField: contactForm.querySelector('input#name'),
    mailField: contactForm.querySelector('input#mail'),
    spamCheckField: contactForm.querySelector('input#phone')
  };

  function onValidate () {
    var name = new Validation(formFields.nameField, 3);
      name.checkName();
    var phone = new Validation(formFields.phoneField, 11);
      phone.checkPhone();
    var mail = new Validation(formFields.mailField);
      mail.checkMail();
    var message = new Validation(formFields.messageField, 15);
      message.checkMessage();
  }

  function addHandlers () {
    contactForm.addEventListener('input', onValidate);
    submit.addEventListener('click', function(evt) {
      var name = new Validation(formFields.nameField, 3);
        name.checkName();
        name.stopSubmit();
      var phone = new Validation(formFields.phoneField, 11);
        phone.checkPhone();
        phone.stopSubmit();
      var mail = new Validation(formFields.mailField);
        mail.checkMail();
        mail.stopSubmit();
      var message = new Validation(formFields.messageField, 15);
        message.checkMessage();
        message.stopSubmit();
      if (validities.length === 0 && formFields.spamCheckField.value === "") {
        contactForm.submit();
        alert("Сообщение успешно отправлено");
      } else {
        evt.preventDefault();
      }
      validities = [];
    });
    submit.addEventListener('keydown', function(evt) {
        if (evt.keyCode === 13) {
          evt.preventDefault();
        }
    });
  }
  addHandlers();

  var closeFormButton = document.querySelector('.close-form');

  function closeAndResetForm() {
    var errors = document.querySelectorAll('p.error');
    errors.forEach(function(error) {
      error.textContent = '';
    });
    var inputs = contactForm.querySelectorAll('label+*');
    inputs.forEach(function(it) {
      it.removeAttribute('style');
    });
    form.classList.add('hidden');
    button.classList.remove('hidden');
    form.classList.add('hidden');
  }
  button.addEventListener('click' , function() {
    if (form.classList.contains('hidden')) {
      form.classList.remove('hidden');
      button.classList.add('hidden');
      closeFormButton.addEventListener('click', closeAndResetForm);
    } else {
      closeFormButton.removeEventListener('click', closeAndResetForm);
    }
  });
})();


