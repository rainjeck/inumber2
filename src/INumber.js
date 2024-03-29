'use strict';

class INumber {

  constructor(selector, opts) {

    if (!selector) {
      console.error("INumber: Selector not set");
      return;
    }

    this.selector = selector;

    this.params = opts || {};

    if (!document.querySelector(selector)) return;

    const debounceChange = (this.params && this.params.debounceChange) ? this.params.debounceChange : 300;
    const debounceKeyup = (this.params && this.params.debounceKeyup) ? this.params.debounceKeyup : 300;

    this.init();

    document.addEventListener('click', e => {
      if ( e.target.closest('[data-inumber-down]') ) {

        this.down( e.target.closest('[data-inumber-down]') );

      } else if ( e.target.closest('[data-inumber-up]') ) {

        this.up( e.target.closest('[data-inumber-up]') );

      } else {
        return;
      }
    });

    document.body.addEventListener('change', this.debounce(e => {
      const inputEl = e.target.closest('[data-inumber-input]');

      if (!inputEl) return;

      const elems = Array.from(document.querySelectorAll(this.selector));

      if (!elems) return;

      this.start(elems);

      const endValue = this.checkNewValue(inputEl, e.target.value);

      if (this.params && typeof this.params.change === "function") {
        this.params.change( inputEl, parseFloat(endValue) );
      }
    }, debounceChange));

    document.body.addEventListener('keyup', this.debounce(e => {
      const inputEl = e.target.closest('[data-inumber-input]');

      if (!inputEl) return;

      const elems = Array.from(document.querySelectorAll(this.selector));

      if (!elems) return;

      this.start(elems);

      const endValue = this.checkNewValue(inputEl, e.target.value);

      if (this.params && typeof this.params.keyup === "function") {
        this.params.keyup( inputEl, parseFloat(endValue) );
      }
    }, debounceKeyup));

    document.body.addEventListener('focus', e => {
      const inputEl = e.target.closest('[data-inumber-input]');

      if (!inputEl) return;

      if (inputEl.value == 0) {
        inputEl.value = '';
      }
    }, true);

    document.body.addEventListener('blur', e => {
      const inputEl = e.target.closest('[data-inumber-input]');

      if (!inputEl) return;

      if (!inputEl.value) {
        this.checkNewValue(inputEl, e.target.value);
      }
    }, true);
  }

  init() {
    const elems = Array.from(document.querySelectorAll(this.selector));

    this.start(elems);
  }

  start(elems) {
    if (!elems) return;

    elems.forEach(item => {
      const inputEl = item.querySelector('[data-inumber-input]');
      const value = parseFloat(inputEl.value);

      this.checkNewValue(inputEl, value);
    });
  }

  up(buttonEl) {
    const wrapperEl = buttonEl.closest(this.selector);
    const inputEl = wrapperEl.querySelector('[data-inumber-input]');

    if ( !inputEl ) {
      console.error("INumber: Input element not found");
      return;
    }

    const endValue = this.checkNewValue( inputEl, inputEl.value, 'up' );

    if (this.params && typeof this.params.change === "function") {
      this.params.change( inputEl, parseFloat(endValue) );
    }
  }

  down(buttonEl) {
    const wrapperEl = buttonEl.closest(this.selector);
    const inputEl = wrapperEl.querySelector('[data-inumber-input]');

    if ( !inputEl ) {
      console.error("INumber: Input element not found");
      return;
    }

    const endValue = this.checkNewValue( inputEl, inputEl.value, 'down' );

    if (this.params && typeof this.params.change === "function") {
      this.params.change( inputEl, parseFloat(endValue) );
    }
  }

  checkNewValue( inputEl, value, action = '' ) {
    const min = (inputEl.hasAttribute('min')) ? parseFloat(inputEl.getAttribute('min')) : 0;
    const max = (inputEl.hasAttribute('max')) ? parseFloat(inputEl.getAttribute('max')) : 1000000;
    const step = (inputEl.hasAttribute('step')) ? inputEl.getAttribute('step') : 1;

    const isFixed = (step && (step.indexOf('.') > 0) ) ? step.substr( step.indexOf('.') + 1 ) : 0;

    let newValue = parseFloat(value);

    if ( Number.isNaN(newValue) ) {
      newValue = min;
    }

    if ( action == 'up' ) {
      newValue = newValue + parseFloat(step);
    }

    if ( action == 'down' ) {
      newValue = newValue - parseFloat(step);
    }

    if ( newValue < min ) {
      newValue = min;
    }

    if ( newValue > max ) {
      newValue = max;
    }

    if ( isFixed.length > 0 ) {
      newValue = newValue.toFixed(isFixed.length);
    }

    inputEl.value = newValue;

    return newValue;
  }

  debounce(func, timeout = 300) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
}

export default INumber;
