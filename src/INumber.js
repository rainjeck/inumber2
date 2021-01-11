'use strict';

class INumber {

  constructor(selector, opts) {

    if (!selector) {
      console.error("INumber: Selector not set");
      return;
    }

    this.selector = selector;

    this.params = opts || {};

    if ( !document.querySelector(selector) ) return;

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
  }

  init() {
    const elems = Array.from( document.querySelectorAll(this.selector) );

    elems.forEach((item, i) => {
      const inputEl = item.querySelector('[data-inumber-input]');
      const value = parseFloat(inputEl.value);

      this.checkNewValue(inputEl, value);

      inputEl.addEventListener('change', e => {
        const endValue = this.checkNewValue(inputEl, e.target.value);

        if (this.params && typeof this.params.change === "function") {
          this.params.change( inputEl, parseFloat(endValue) );
        }
      });
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
}

export default INumber;
