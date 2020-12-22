import '../sass/app.sass'

$(document).ready(function () {
    document.body.classList.add('is-loaded')
})

//  Header

const $header         = $('.header')
const $menu           = $('.menu')
const $headerMenuBtn  = $('#header-menu-btn')


function scrollPage() {
    if (window.pageYOffset > 0) {
        $header.addClass('is-scroll')
    } else {
        $header.removeClass('is-scroll')
    }

    // setTimeout(function () {
        if (window.innerWidth < 992) $menu.css('padding-top', $header.outerHeight(true))
    // }, 300)
}


function toggleHeaderMenu() {
    $headerMenuBtn.toggleClass('is-active')
    $header.toggleClass('is-menu-open')
    $menu.toggleClass('is-open')
    document.body.classList.toggle('menu-opened')
}

$($headerMenuBtn).on('click', toggleHeaderMenu)
$(window).on('resize scroll load', scrollPage)


// Sliders
let mobileSliders = []
let mobileSlidersActive = false

function activateMobileSliders() {
    if (mobileSlidersActive) return

    mobileSlidersActive = true
    mobileSliders = [
        new Swiper('.team__slider.swiper-container', {
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
                    spaceBetween: 24,
                }
            }
        }),
    ]
}

function deactivateMobileSliders() {
    if (mobileSlidersActive && mobileSliders) {
        mobileSliders.map(x => {
            if (Array.isArray(x)) {
                x.map(x => x.destroy())
            } else {
                x.destroy()
            }
        })
        mobileSliders = []
        mobileSlidersActive = false
    }
}

function checkMobileSliders() {
    if (window.innerWidth < 1024) {
        // Activate
        activateMobileSliders()
    } else {
        // Deactivate
        deactivateMobileSliders()
    }
}

$(window).on('load resize', checkMobileSliders)


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
            spaceBetween: 40,
        }
    }
})


// Modals

$('.modal').on('show.bs.modal', function () {
    $('.modal-custom-backdrop').addClass('is-open')
})

$('.modal').on('hide.bs.modal', function () {
    $('.modal-custom-backdrop').removeClass('is-open')
})

$('.modal-custom-backdrop').on('click', function () {
    $('.modal').modal('hide')
})


// Form

function deactivateError() {
    const $el = $(this)
    const placeholderText = $el.attr('data-placeholder')

    $el.removeClass('is-error')
    $el.attr('placeholder', placeholderText)
}

function activateError(el, name) {
    const $el = $(`${el} input[name="${name}"]`)

    $el.addClass('is-error')
    $el.attr('placeholder', 'Required Field')
}

function checkInputRequired(el, name) {
    return $(`${el} input[name="${name}"]`).attr('data-required')
}

function checkPolicyRequired(el) {
    return $(`${el} input[name="privacy_policy"]`)[1].checked
}

function checkFormData(el, data) {
    let error = false
    for (let { name, value } of data) {
        if (value === '') {
            if (checkInputRequired(el, name) !== undefined) {
                error = true
                activateError(el, name)
            }
        }
    }

    if (!checkPolicyRequired(el)) {
        error = true
        activateError(el, 'privacy_policy')
    }

    return error
}

function normalizeFormData(data) {
    let obj = {}
    for (let { name, value } of data) {
        obj[name] = value
    }

    return obj
}


$('form').each(function (index, item) {
    const $el = $(item)
    const $submit = $el.find('button[type="submit"]')
    const $policy = $el.find('.form-checkbox-policy input')[1]

    function checkPolicy() {
        if ($policy.checked) {
            $($submit).removeClass('is-disabled')
        } else {
            $($submit).addClass('is-disabled')
        }
    }

    $($policy).on('change', checkPolicy)
    checkPolicy()
})

$('form input').on('focus', deactivateError)
$('form input[type="checkbox"]').on('change', deactivateError)

$('.selector').each(function (index, item) {
    const $el = $(item)
    const $el_list = $el.find('.selector__list')
    const $el_front_content = $el.find('.selector__front span')
    const $select = $el.find('select')
    const $options = $select.find('option')

    for (let $option of $options) {
        if ($($option).attr('data-placeholder') !== undefined) continue

        const $link = document.createElement('a')
        $link.href = '#'
        $link.innerHTML = $option.innerHTML
        $link.addEventListener('click', function (e) {
            e.preventDefault()
            $($select).val($option.value)

            $el_front_content[0].innerHTML = $option.value
            $el_list.find('a').removeClass('is-active')
            $(this).addClass('is-active')
        })

        $($el_list).append($link)
    }
})

$('#modal-freelancer-form').submit(function (e) {
    e.preventDefault()
    const data = $(this).serializeArray()

    if (!checkFormData('#modal-freelancer', data)) {
        const normData = normalizeFormData(data)

        if (normData.privacy_policy === 'false') return

        $.ajax({
            url: 'callback.php',
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
        })
          .done(() => {
            $('#modal-freelancer .modal__tab').removeClass('is-active')
            $('#modal-freelancer .modal__tab[data-name="success"]').addClass('is-active')
        })
          .fail((res) => {
            // NEED DELETE IN PROD
            $('#modal-freelancer .modal__tab').removeClass('is-active')
            $('#modal-freelancer .modal__tab[data-name="success"]').addClass('is-active')

            const $errorText = $('#modal-freelancer-form .form-error-text')
            $errorText[0].innerHTML = res.message || 'Has Error'
            $errorText.addClass('is-active')

            setTimeout(function () {
                $('#modal-freelancer-form .form-error-text').removeClass('is-active')
            }, 3000)
        })
    }
})

$('#modal-talent-form').submit(function (e) {
    e.preventDefault()
    const data = $(this).serializeArray()

    if (!checkFormData('#modal-talent', data)) {
        const normData = normalizeFormData(data)

        if (normData.privacy_policy === 'false') return

        $.ajax({
            url: 'callback.php',
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
        })
          .done(() => {
              $('#modal-talent .modal__tab').removeClass('is-active')
              $('#modal-talent .modal__tab[data-name="success"]').addClass('is-active')
          })
          .fail((res) => {
              // NEED DELETE IN PROD
              $('#modal-talent .modal__tab').removeClass('is-active')
              $('#modal-talent .modal__tab[data-name="success"]').addClass('is-active')

              const $errorText = $('#modal-talent-form .form-error-text')
              $errorText[0].innerHTML = res.message || 'Has Error'
              $errorText.addClass('is-active')

              setTimeout(function () {
                  $('#modal-talent-form .form-error-text').removeClass('is-active')
              }, 3000)
          })
    }
})
