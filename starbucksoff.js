document.addEventListener('DOMContentLoaded', function() {
    var footerColumns = document.querySelectorAll('.footer-column');
  
    for (var i = 0; i < footerColumns.length; i++) {
      footerColumns[i].addEventListener('click', function() {
        this.classList.toggle('active');
      });
    }
  });
  