/* ============================================
   Glass & Aluminum Fabrication - Auth JS
   Front-end only validation (no server)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  initLoginForm();
  initSignupForm();
  initForgotPasswordForm();
  initAuthToggle();
  initGoogleSignin();
});

/* --- Login Form --- */
function initLoginForm() {
  var form = document.getElementById('loginForm');
  if (!form) return;

  var email = form.querySelector('[name="loginEmail"]');
  var remember = form.querySelector('[name="remember"]');

  try {
    var remembered = localStorage.getItem('hexaglaze-remembered-email');
    if (remembered) {
      email.value = remembered;
      if (remember) remember.checked = true;
    }
  } catch (err) { /* storage unavailable */ }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAuthErrors(form);

    var isValid = true;
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
      try {
        if (remember && remember.checked) {
          localStorage.setItem('hexaglaze-remembered-email', email.value.trim());
        } else {
          localStorage.removeItem('hexaglaze-remembered-email');
        }
      } catch (err) { /* storage unavailable */ }
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

/* --- Forgot Password Form --- */
function initForgotPasswordForm() {
  var form = document.getElementById('forgotPasswordForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAuthErrors(form);

    var email = form.querySelector('[name="forgotEmail"]');
    var value = email.value.trim();

    if (!value) {
      markInvalid(email, 'Email is required');
      showAuthError('forgotError');
      return;
    }

    if (!isValidEmail(value)) {
      markInvalid(email, 'Enter a valid email address');
      showAuthError('forgotError');
      return;
    }

    form.reset();
    showAuthError('forgotSuccess');
  });
}

function isValidEmail(value) {
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

/* --- Login / Signup view toggle --- */
function initAuthToggle() {
  document.querySelectorAll('[data-auth-toggle]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = link.getAttribute('data-auth-toggle');
      var card = link.closest('.auth-card');
      if (!target || !card) return;

      var title = card.querySelector('[data-auth-title]');
      var subtitle = card.querySelector('[data-auth-subtitle]');
      var activated = null;

      card.querySelectorAll('[data-auth-panel]').forEach(function (panel) {
        var isActive = panel.getAttribute('data-auth-panel') === target;
        panel.classList.toggle('is-active', isActive);
        if (isActive) {
          activated = panel;
          if (title) {
            var panelTitle = panel.getAttribute('data-title');
            if (panelTitle) title.textContent = panelTitle;
          }
          if (subtitle) {
            var panelSubtitle = panel.getAttribute('data-subtitle');
            if (panelSubtitle) subtitle.textContent = panelSubtitle;
          }
        }
      });

      card.querySelectorAll('.alert-custom.show').forEach(function (el) {
        el.classList.remove('show');
      });
      card.querySelectorAll('form').forEach(clearAuthErrors);

      if (activated) {
        var firstField = activated.querySelector('input');
        if (firstField) firstField.focus();
      }
    });
  });
}

/* --- Google sign-in (not configured on this static build) --- */
function initGoogleSignin() {
  document.querySelectorAll('[data-google-signin]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showAuthError('googleNotice');
    });
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
