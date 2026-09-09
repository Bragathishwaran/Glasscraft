/* ============================================
   Glass & Aluminum Fabrication - Contact JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initContactForm();
  initMeasurementForm();
});

/* --- Contact Form Validation --- */
function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var isValid = validateForm(form);
    if (isValid) {
      showSuccess('contactSuccess', 'contactError');
      form.reset();
    }
  });
}

/* --- Measurement Form Validation --- */
function initMeasurementForm() {
  var form = document.getElementById('measurementForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var isValid = validateForm(form);
    if (isValid) {
      showSuccess('measurementSuccess', 'measurementError');
      form.reset();
    }
  });
}

/* --- Shared Validation Logic --- */
function validateForm(form) {
  clearErrors(form);
  var isValid = true;

  var requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(function (field) {
    if (!field.value.trim()) {
      showFieldError(field, 'This field is required');
      isValid = false;
    }
  });

  var phoneFields = form.querySelectorAll('input[type="tel"]');
  phoneFields.forEach(function (field) {
    if (field.value.trim() && !/^[+]?[\d\s\-()]{7,15}$/.test(field.value.trim())) {
      showFieldError(field, 'Please enter a valid phone number');
      isValid = false;
    }
  });

  var emailFields = form.querySelectorAll('input[type="email"]');
  emailFields.forEach(function (field) {
    if (field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
      showFieldError(field, 'Please enter a valid email address');
      isValid = false;
    }
  });

  var numericFields = form.querySelectorAll('[data-numeric]');
  numericFields.forEach(function (field) {
    if (field.value.trim() && !/^\d+(\.\d+)?$/.test(field.value.trim())) {
      showFieldError(field, 'Please enter a valid number');
      isValid = false;
    }
  });

  return isValid;
}

function showFieldError(field, message) {
  field.style.borderColor = '#dc2626';
  var errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.style.cssText = 'color: #dc2626; font-size: 0.75rem; margin-top: 0.25rem;';
  errorDiv.textContent = message;

  var parent = field.parentElement;
  if (parent) {
    parent.appendChild(errorDiv);
  }
}

function clearErrors(form) {
  form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
  form.querySelectorAll('[style]').forEach(function (el) {
    el.style.borderColor = '';
  });
}

function showSuccess(successId, errorId) {
  var successEl = document.getElementById(successId);
  var errorEl = document.getElementById(errorId);

  if (successEl) {
    successEl.classList.add('show');
    successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  if (errorEl) {
    errorEl.classList.remove('show');
  }

  setTimeout(function () {
    if (successEl) successEl.classList.remove('show');
  }, 6000);
}

function showError(successId, errorId) {
  var successEl = document.getElementById(successId);
  var errorEl = document.getElementById(errorId);

  if (successEl) successEl.classList.remove('show');
  if (errorEl) {
    errorEl.classList.add('show');
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
