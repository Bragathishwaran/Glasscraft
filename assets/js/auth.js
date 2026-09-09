/* ============================================
   Glass & Aluminum Fabrication - Auth JS
   Front-end only validation (no server)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initLoginForm();
  initSignupForm();
});

/* --- Login Form --- */
function initLoginForm() {
  var form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAuthErrors(form);

    var isValid = true;
    var email = form.querySelector('[name="loginEmail"]');
    var password = form.querySelector('[name="loginPassword"]');

    if (!email.value.trim()) {
      markInvalid(email, 'Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      markInvalid(email, 'Enter a valid email address');
      isValid = false;
    }

    if (!password.value) {
      markInvalid(password, 'Password is required');
      isValid = false;
    } else if (password.value.length < 6) {
      markInvalid(password, 'Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      var success = document.getElementById('loginSuccess');
      if (success) success.classList.add('show');
      form.reset();
      setTimeout(function () { if (success) success.classList.remove('show'); }, 5000);
    } else {
      showAuthError('loginError');
    }
  });
}

/* --- Signup Form --- */
function initSignupForm() {
  var form = document.getElementById('signupForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAuthErrors(form);

    var isValid = true;
    var name = form.querySelector('[name="signupName"]');
    var email = form.querySelector('[name="signupEmail"]');
    var phone = form.querySelector('[name="signupPhone"]');
    var password = form.querySelector('[name="signupPassword"]');
    var confirm = form.querySelector('[name="signupConfirm"]');
    var agree = form.querySelector('[name="agree"]');

    if (!name.value.trim()) {
      markInvalid(name, 'Full name is required');
      isValid = false;
    }

    if (!email.value.trim()) {
      markInvalid(email, 'Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      markInvalid(email, 'Enter a valid email address');
      isValid = false;
    }

    if (!phone.value.trim()) {
      markInvalid(phone, 'Phone number is required');
      isValid = false;
    } else if (!/^[+]?[\d\s\-()]{7,15}$/.test(phone.value.trim())) {
      markInvalid(phone, 'Enter a valid phone number');
      isValid = false;
    }

    if (!password.value) {
      markInvalid(password, 'Password is required');
      isValid = false;
    } else if (password.value.length < 6) {
      markInvalid(password, 'Password must be at least 6 characters');
      isValid = false;
    }

    if (confirm.value !== password.value) {
      markInvalid(confirm, 'Passwords do not match');
      isValid = false;
    }

    if (!agree.checked) {
      isValid = false;
      var agreeLabel = agree.closest('label');
      if (agreeLabel) {
        var err = document.createElement('div');
        err.className = 'field-error';
        err.style.cssText = 'color: #dc2626; font-size: 0.75rem; margin-top: 0.25rem;';
        err.textContent = 'Please accept the terms and conditions';
        agreeLabel.parentElement.appendChild(err);
      }
    }

    if (isValid) {
      var success = document.getElementById('signupSuccess');
      if (success) success.classList.add('show');
      form.reset();
      setTimeout(function () { if (success) success.classList.remove('show'); }, 5000);
    } else {
      showAuthError('signupError');
    }
  });
}

/* --- Helpers --- */
function markInvalid(field, message) {
  field.style.borderColor = '#dc2626';
  var parent = field.parentElement;
  if (parent) {
    var err = document.createElement('div');
    err.className = 'field-error';
    err.style.cssText = 'color: #dc2626; font-size: 0.75rem; margin-top: 0.25rem;';
    err.textContent = message;
    parent.appendChild(err);
  }
}

function clearAuthErrors(form) {
  form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
  form.querySelectorAll('[style]').forEach(function (el) {
    el.style.borderColor = '';
  });
}

function showAuthError(id) {
  var el = document.getElementById(id);
  if (el) {
    el.classList.add('show');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(function () { el.classList.remove('show'); }, 5000);
  }
}
