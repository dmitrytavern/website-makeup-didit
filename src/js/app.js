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