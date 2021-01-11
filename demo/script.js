document.addEventListener("DOMContentLoaded", function() {
  new INumber.default('[data-inumber]', {
    change(el, value) {
      console.log('change', el, value);
    }
  });

  document.body.addEventListener('click', function(e) {
    if ( !e.target.closest('#reinit') ) return;

    INumber.default.prototype.init();
    console.log('reinit');
  });

});
