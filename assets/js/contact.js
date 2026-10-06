/* ============================================
   Glass & Aluminum Fabrication - Contact JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initMeasurementForm();
});

/* --- Measurement / Enquiry Form Validation --- */
function initMeasurementForm() {
  var form = document.getElementById('measurementForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var isValid = validateForm(form);
    if (isValid) {
      showSuccess('measurementSuccess', 'measurementError');
      form.reset();
      clearErrors(form);
    } else {
      showError('measurementSuccess', 'measurementError');
    }
  });
}

/* --- Shared Validation Logic --- */
function validateForm(form) {
  clearErrors(form);
  var firstInvalid = null;

  function fail(field, message) {
    showFieldError(field, message);
    if (!firstInvalid) firstInvalid = field;
  }

  form.querySelectorAll('[required]').forEach(function (field) {
    if (!(field.value || '').trim()) {
      fail(field, field.tagName === 'SELECT' ? 'Please select an option' : 'This field is required');
    }
  });

  var nameField = form.querySelector('[name="fullName"]');
  if (nameField && nameField.value.trim()) {
    var name = nameField.value.trim();
    if (name.length < 2 || !/[A-Za-z]/.test(name)) {
      fail(nameField, 'Please enter a valid name (at least 2 characters)');
    }
  }

  form.querySelectorAll('input[type="email"]').forEach(function (field) {
    if (field.value.trim() && !isEmailValid(field.value.trim())) {
      fail(field, 'Please enter a valid email address');
    }
  });

  form.querySelectorAll('input[type="tel"]').forEach(function (field) {
    if (field.value.trim() && !isPhoneValid(field.value.trim())) {
      fail(field, 'Please enter a valid phone number (7-15 digits)');
    }
  });

  form.querySelectorAll('[data-numeric]').forEach(function (field) {
    if (field.value.trim() && !/^\d+(\.\d+)?$/.test(field.value.trim())) {
      fail(field, 'Please enter a valid number');
    }
  });

  if (firstInvalid) {
    firstInvalid.focus();
    return false;
  }

  return true;
}

function isEmailValid(value) {
  if (value.length > 254 || /\s/.test(value)) return false;
  var parts = value.split('@');
  if (parts.length !== 2) return false;

  var local = parts[0];
  var domain = parts[1];
  if (!local || local.length > 64 || /^\./.test(local) || /\.\./.test(local) || /\.$/.test(local)) return false;
  if (!/^[A-Za-z0-9._%+-]+$/.test(local)) return false;
  if (!/^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(domain)) return false;
  if (!/\.[A-Za-z]{2,}$/.test(domain)) return false;

  return true;
}

function isPhoneValid(value) {
  if (!/^\+?[\d\s\-()]+$/.test(value)) return false;
  var digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function showFieldError(field, message) {
  field.classList.add('is-invalid');
  var errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.innerHTML = '<i class="bi bi-exclamation-circle"></i><span></span>';
  errorDiv.querySelector('span').textContent = message;

  var parent = field.parentElement;
  if (parent) {
    parent.appendChild(errorDiv);
  }
}

function clearErrors(form) {
  form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
  form.querySelectorAll('.is-invalid').forEach(function (el) { el.classList.remove('is-invalid'); });
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
