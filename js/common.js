/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

$(document).ready(function () {
  document.body.classList.add('is-loaded');
});

//  Header

var $header = $('.header');
var $menu = $('.menu');
var $headerMenuBtn = $('#header-menu-btn');
function scrollPage() {
  if (window.pageYOffset > 0) {
    $header.addClass('is-scroll');
  } else {
    $header.removeClass('is-scroll');
  }

  // setTimeout(function () {
  if (window.innerWidth < 992) $menu.css('padding-top', $header.outerHeight(true));
  // }, 300)
}

function toggleHeaderMenu() {
  $headerMenuBtn.toggleClass('is-active');
  $header.toggleClass('is-menu-open');
  $menu.toggleClass('is-open');
  document.body.classList.toggle('menu-opened');
}
$($headerMenuBtn).on('click', toggleHeaderMenu);
$(window).on('resize scroll load', scrollPage);

// Sliders
var mobileSliders = [];
var mobileSlidersActive = false;
function activateMobileSliders() {
  if (mobileSlidersActive) return;
  mobileSlidersActive = true;
  mobileSliders = [new Swiper('.team__slider.swiper-container', {
    loop: false,
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.slider__pagination',
      bulletClass: 'slider__bullet',
      bulletActiveClass: 'is-active',
      clickable: true
    },
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 24
      }
    }
  })];
}
function deactivateMobileSliders() {
  if (mobileSlidersActive && mobileSliders) {
    mobileSliders.map(function (x) {
      if (Array.isArray(x)) {
        x.map(function (x) {
          return x.destroy();
        });
      } else {
        x.destroy();
      }
    });
    mobileSliders = [];
    mobileSlidersActive = false;
  }
}
function checkMobileSliders() {
  if (window.innerWidth < 1024) {
    // Activate
    activateMobileSliders();
  } else {
    // Deactivate
    deactivateMobileSliders();
  }
}
$(window).on('load resize', checkMobileSliders);
new Swiper('.reviews__slider.swiper-container', {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: '.slider__pagination',
    bulletClass: 'slider__bullet',
    bulletActiveClass: 'is-active',
    clickable: true
  },
  navigation: {
    nextEl: '.slider__arrow-next',
    prevEl: '.slider__arrow-prev',
    disabledClass: 'btn-slider_disable'
  },
  breakpoints: {
    1024: {
      slidesPerView: 2,
      spaceBetween: 40
    }
  }
});

// Modals

$('.modal').on('show.bs.modal', function () {
  $('.modal-custom-backdrop').addClass('is-open');
});
$('.modal').on('hide.bs.modal', function () {
  $('.modal-custom-backdrop').removeClass('is-open');
});
$('.modal-custom-backdrop').on('click', function () {
  $('.modal').modal('hide');
});

// Form

function deactivateError() {
  var $el = $(this);
  var placeholderText = $el.attr('data-placeholder');
  $el.removeClass('is-error');
  $el.attr('placeholder', placeholderText);
}
function activateError(el, name) {
  var $el = $("".concat(el, " input[name=\"").concat(name, "\"]"));
  $el.addClass('is-error');
  $el.attr('placeholder', 'Required Field');
}
function checkInputRequired(el, name) {
  return $("".concat(el, " input[name=\"").concat(name, "\"]")).attr('data-required');
}
function checkPolicyRequired(el) {
  return $("".concat(el, " input[name=\"privacy_policy\"]"))[1].checked;
}
function checkFormData(el, data) {
  var error = false;
  var _iterator = _createForOfIteratorHelper(data),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _step.value,
        name = _step$value.name,
        value = _step$value.value;
      if (value === '') {
        if (checkInputRequired(el, name) !== undefined) {
          error = true;
          activateError(el, name);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (!checkPolicyRequired(el)) {
    error = true;
    activateError(el, 'privacy_policy');
  }
  return error;
}
function normalizeFormData(data) {
  var obj = {};
  var _iterator2 = _createForOfIteratorHelper(data),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = _step2.value,
        name = _step2$value.name,
        value = _step2$value.value;
      obj[name] = value;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return obj;
}
$('form').each(function (index, item) {
  var $el = $(item);
  var $submit = $el.find('button[type="submit"]');
  var $policy = $el.find('.form-checkbox-policy input')[1];
  function checkPolicy() {
    if ($policy.checked) {
      $($submit).removeClass('is-disabled');
    } else {
      $($submit).addClass('is-disabled');
    }
  }
  $($policy).on('change', checkPolicy);
  checkPolicy();
});
$('form input').on('focus', deactivateError);
$('form input[type="checkbox"]').on('change', deactivateError);
$('.selector').each(function (index, item) {
  var $el = $(item);
  var $el_list = $el.find('.selector__list');
  var $el_front_content = $el.find('.selector__front span');
  var $select = $el.find('select');
  var $options = $select.find('option');
  var _iterator3 = _createForOfIteratorHelper($options),
    _step3;
  try {
    var _loop = function _loop() {
      var $option = _step3.value;
      if ($($option).attr('data-placeholder') !== undefined) return "continue";
      var $link = document.createElement('a');
      $link.href = '#';
      $link.innerHTML = $option.innerHTML;
      $link.addEventListener('click', function (e) {
        e.preventDefault();
        $($select).val($option.value);
        $el_front_content[0].innerHTML = $option.value;
        $el_list.find('a').removeClass('is-active');
        $(this).addClass('is-active');
      });
      $($el_list).append($link);
    };
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _ret = _loop();
      if (_ret === "continue") continue;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
});
$('#modal-freelancer-form').submit(function (e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  if (!checkFormData('#modal-freelancer', data)) {
    var normData = normalizeFormData(data);
    if (normData.privacy_policy === 'false') return;
    $.ajax({
      url: 'callback-freelancer.php',
      method: 'POST',
      dataType: 'JSON',
      data: {
        first_name: normData.first_name,
        last_name: normData.last_name,
        email: normData.email,
        specialization: normData.specialization,
        experience: normData.experience,
        portfolio: normData.portfolio,
        privacy_policy: normData.privacy_policy
      }
    }).done(function () {
      $('#modal-freelancer .modal__tab').removeClass('is-active');
      $('#modal-freelancer .modal__tab[data-name="success"]').addClass('is-active');
    }).fail(function (res) {
      // NEED DELETE IN PROD
      $('#modal-freelancer .modal__tab').removeClass('is-active');
      $('#modal-freelancer .modal__tab[data-name="success"]').addClass('is-active');
      var $errorText = $('#modal-freelancer-form .form-error-text');
      $errorText[0].innerHTML = res.message || 'Has Error';
      $errorText.addClass('is-active');
      setTimeout(function () {
        $('#modal-freelancer-form .form-error-text').removeClass('is-active');
      }, 3000);
    });
  }
});
$('#modal-talent-form').submit(function (e) {
  e.preventDefault();
  var data = $(this).serializeArray();
  if (!checkFormData('#modal-talent', data)) {
    var normData = normalizeFormData(data);
    if (normData.privacy_policy === 'false') return;
    $.ajax({
      url: 'callback-talent.php',
      method: 'POST',
      dataType: 'JSON',
      data: {
        first_name: normData.first_name,
        last_name: normData.last_name,
        email: normData.email,
        phone: normData.phone,
        task: normData.task,
        budget: normData.budget,
        privacy_policy: normData.privacy_policy
      }
    }).done(function () {
      $('#modal-talent .modal__tab').removeClass('is-active');
      $('#modal-talent .modal__tab[data-name="success"]').addClass('is-active');
    }).fail(function (res) {
      // NEED DELETE IN PROD
      $('#modal-talent .modal__tab').removeClass('is-active');
      $('#modal-talent .modal__tab[data-name="success"]').addClass('is-active');
      var $errorText = $('#modal-talent-form .form-error-text');
      $errorText[0].innerHTML = res.message || 'Has Error';
      $errorText.addClass('is-active');
      setTimeout(function () {
        $('#modal-talent-form .form-error-text').removeClass('is-active');
      }, 3000);
    });
  }
});
/******/ })()
;