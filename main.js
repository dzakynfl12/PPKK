/*!
 * Start Bootstrap - SB Admin 2 v4.1.3 (https://startbootstrap.com/theme/sb-admin-2)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin-2/blob/master/LICENSE)
 */

! function (l) {
    "use strict";
    l("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
        l("body").toggleClass("sidebar-toggled"), l(".sidebar").toggleClass("toggled"), l(".sidebar").hasClass("toggled") && l(".sidebar .collapse").collapse("hide")
    }), l(window).resize(function () {
        l(window).width() < 768 && l(".sidebar .collapse").collapse("hide"), l(window).width() < 480 && !l(".sidebar").hasClass("toggled") && (l("body").addClass("sidebar-toggled"), l(".sidebar").addClass("toggled"), l(".sidebar .collapse").collapse("hide"))
    }), l("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function (e) {
        var o;
        768 < l(window).width() && (o = (o = e.originalEvent).wheelDelta || -o.detail, this.scrollTop += 30 * (o < 0 ? 1 : -1), e.preventDefault())
    }), l(document).on("scroll", function () {
        100 < l(this).scrollTop() ? l(".scroll-to-top").fadeIn() : l(".scroll-to-top").fadeOut()
    }), l(document).on("click", "a.scroll-to-top", function (e) {
        var o = l(this);
        l("html, body").stop().animate({
            scrollTop: l(o.attr("href")).offset().top
        }, 1e3, "easeInOutExpo"), e.preventDefault()
    })
}(jQuery);

const navbar = document.getElementsByTagName('#collapseTwo')[0];
window.addEventListener('click', function(){
    console.log(Window.onclick);
    if (this.window.onclick) {
        navbar.classList.replace('data-toggle="collapse"', 'data-toggle="collapse show"');
        navbar.classList.replace('class="nav-link collapsed"', 'class="nav-link "');
    } else if (this.window.onclick) {
        navbar.classList.replace('data-toggle="collapse show"', 'data-toggle="collapse"');
        navbar.classList.replace('class="nav-link"', 'class="nav-link collapsed"');
    }
});

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown =>{
    const select = dropdown.querySelector('.selectd');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        select.classList.toggle('selectd-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('selectd-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});

let subMenu = document.getElementsById("subMenu");

        function toggleMenu(){
            subMenu.classList.toggle("open-menu");
        };