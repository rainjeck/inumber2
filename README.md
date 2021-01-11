
# INUMBER
Simple and easy Input Spinner. Version 2.

Support:
 - Float numbers

## Files
Include ```inumber.min.js```

## Layout
```
<div data-inumber>
  <button type="button" data-inumber-down>DOWN</button>
  <input type="text" data-inumber-input min="1" max="10" step="1" value="1"/>
  <button type="button" data-inumber-up>UP</button>
</div>
```

Float Input:
```
<div data-inumber>
  <button type="button" data-inumber-down>DOWN</button>
  <input type="text" data-inumber-input min="0.25" max="10" step="0.15" value="1.2"/>
  <button type="button" data-inumber-up>UP</button>
</div>
```

Attributes 'min', 'max', 'step', 'value' are required

## Usage
```
new INumber.default('[data-inumber]', {
  change: function(inputEl, value) {
    /* ... do your stuff here ... */
  }
});

// Reinit
INumber.default.prototype.init();
```
