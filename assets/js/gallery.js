/* ============================================
   Glass & Aluminum Fabrication - Gallery JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initGalleryFilter();
  initGalleryModal();
});

/* --- Gallery Filtering --- */
function initGalleryFilter() {
  var filterBtns = document.querySelectorAll('.gallery-filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-grid-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      var filter = this.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(function () {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(function () {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });
}

/* --- Gallery Modal / Lightbox --- */
function initGalleryModal() {
  var modal = document.getElementById('galleryModal');
  if (!modal) return;

  var modalImage = document.getElementById('galleryModalImage');
  var btnPrev = modal.querySelector('.btn-prev');
  var btnNext = modal.querySelector('.btn-next');
  var btnClose = modal.querySelector('.btn-close-custom');
  var currentIndex = 0;
  var visibleItems = [];

  function updateVisibleItems() {
    visibleItems = [];
    document.querySelectorAll('.gallery-grid-item').forEach(function (item) {
      if (item.style.display !== 'none') {
        visibleItems.push(item);
      }
    });
  }

  function openModal(index) {
    updateVisibleItems();
    currentIndex = index;
    showImage(currentIndex);
    var bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  }

  function showImage(index) {
    if (!visibleItems.length || !modalImage) return;
    var img = visibleItems[index].querySelector('img');
    if (img) {
      modalImage.src = img.getAttribute('data-full') || img.src;
      modalImage.alt = img.alt;
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    showImage(currentIndex);
  }

  document.querySelectorAll('.gallery-grid-item').forEach(function (item, i) {
    item.addEventListener('click', function () {
      updateVisibleItems();
      var visibleIndex = visibleItems.indexOf(item);
      if (visibleIndex >= 0) {
        openModal(visibleIndex);
      }
    });
  });

  if (btnNext) btnNext.addEventListener('click', nextImage);
  if (btnPrev) btnPrev.addEventListener('click', prevImage);
  if (btnClose) btnClose.addEventListener('click', function () {
    var bsModal = bootstrap.Modal.getInstance(modal);
    if (bsModal) bsModal.hide();
  });

  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('show')) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') {
      var bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) bsModal.hide();
    }
  });
}
