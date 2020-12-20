import '../sass/app.sass'

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
