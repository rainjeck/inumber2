/**
 * License: MIT
 * Version: 2.0.1
 * Description: Simple and easy Input Spinner
 * Author: Tishuk Nadezda
 * Homepage: https://rainjeck.github.io/inumber2/
 */

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.INumber = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  'use strict';

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var INumber = /*#__PURE__*/function () {
    function INumber(selector, opts) {
      var _this = this;

      _classCallCheck(this, INumber);

      if (!selector) {
        console.error("INumber: Selector not set");
        return;
      }

      this.selector = selector;
      this.params = opts || {};
      if (!document.querySelector(selector)) return;
      this.init();
      document.addEventListener('click', function (e) {
        if (e.target.closest('[data-inumber-down]')) {
          _this.down(e.target.closest('[data-inumber-down]'));
        } else if (e.target.closest('[data-inumber-up]')) {
          _this.up(e.target.closest('[data-inumber-up]'));
        } else {
          return;
        }
      });
      document.body.addEventListener('change', function (e) {
        var elems = Array.from(document.querySelectorAll(_this.selector));
        if (!elems) return;

        _this.start(elems);

        var inputEl = e.target.closest('[data-inumber-input]');
        if (!inputEl) return;

        var endValue = _this.checkNewValue(inputEl, e.target.value);

        if (_this.params && typeof _this.params.change === "function") {
          _this.params.change(inputEl, parseFloat(endValue));
        }
      });
      document.body.addEventListener('focus', function (e) {
        var inputEl = e.target.closest('[data-inumber-input]');
        if (!inputEl) return;

        if (inputEl.value == 0) {
          inputEl.value = '';
        }
      }, true);
      document.body.addEventListener('blur', function (e) {
        var inputEl = e.target.closest('[data-inumber-input]');
        if (!inputEl) return;

        if (!inputEl.value) {
          _this.checkNewValue(inputEl, e.target.value);
        }
      }, true);
    }

    _createClass(INumber, [{
      key: "init",
      value: function init() {
        var elems = Array.from(document.querySelectorAll(this.selector));
        this.start(elems);
      }
    }, {
      key: "start",
      value: function start(elems) {
        var _this2 = this;

        if (!elems) return;
        elems.forEach(function (item) {
          var inputEl = item.querySelector('[data-inumber-input]');
          var value = parseFloat(inputEl.value);

          _this2.checkNewValue(inputEl, value);
        });
      }
    }, {
      key: "up",
      value: function up(buttonEl) {
        var wrapperEl = buttonEl.closest(this.selector);
        var inputEl = wrapperEl.querySelector('[data-inumber-input]');

        if (!inputEl) {
          console.error("INumber: Input element not found");
          return;
        }

        var endValue = this.checkNewValue(inputEl, inputEl.value, 'up');

        if (this.params && typeof this.params.change === "function") {
          this.params.change(inputEl, parseFloat(endValue));
        }
      }
    }, {
      key: "down",
      value: function down(buttonEl) {
        var wrapperEl = buttonEl.closest(this.selector);
        var inputEl = wrapperEl.querySelector('[data-inumber-input]');

        if (!inputEl) {
          console.error("INumber: Input element not found");
          return;
        }

        var endValue = this.checkNewValue(inputEl, inputEl.value, 'down');

        if (this.params && typeof this.params.change === "function") {
          this.params.change(inputEl, parseFloat(endValue));
        }
      }
    }, {
      key: "checkNewValue",
      value: function checkNewValue(inputEl, value) {
        var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var min = inputEl.hasAttribute('min') ? parseFloat(inputEl.getAttribute('min')) : 0;
        var max = inputEl.hasAttribute('max') ? parseFloat(inputEl.getAttribute('max')) : 1000000;
        var step = inputEl.hasAttribute('step') ? inputEl.getAttribute('step') : 1;
        var isFixed = step && step.indexOf('.') > 0 ? step.substr(step.indexOf('.') + 1) : 0;
        var newValue = parseFloat(value);

        if (Number.isNaN(newValue)) {
          newValue = min;
        }

        if (action == 'up') {
          newValue = newValue + parseFloat(step);
        }

        if (action == 'down') {
          newValue = newValue - parseFloat(step);
        }

        if (newValue < min) {
          newValue = min;
        }

        if (newValue > max) {
          newValue = max;
        }

        if (isFixed.length > 0) {
          newValue = newValue.toFixed(isFixed.length);
        }

        inputEl.value = newValue;
        return newValue;
      }
    }]);

    return INumber;
  }();

  var _default = INumber;
  _exports["default"] = _default;
});
//# sourceMappingURL=../dest/inumber.js.map
