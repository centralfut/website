


$(document).ready(function () {

    // Preloader
    // $(window).load(function () {
    //     $('.preloader').fadeOut();
    // });

    // Initiat WOW.js
    var wow = new WOW(
        {
            mobile: false
        }
    );
    wow.init();

    // .intro-section reduce opacity when scrolling down
    // $(window).scroll(function () {
    //     if ($(window).width() > 1260) {
    //         windowScroll = $(window).scrollTop();
    //         contentOpacity = 1 - (windowScroll / ($('#intro').offset().top + $('#intro').height()));
    //         $('.intro-section').css('transform', 'translateY(' + Math.floor(windowScroll * 0.16) + 'px)');
    //         $('.intro-section').css('-webkit-transform', 'translateY(' + Math.floor(windowScroll * 0.16) + 'px)');
    //         $('.intro-section').css('opacity', contentOpacity.toFixed(2));
    //     }
    // });

    var leituraCompleta = false;
    $(window).scroll(function () {
        // Fixed navigation
        if ($(window).scrollTop() > 500) {
            $('.navbar').addClass('fixednav');
        } else {
            $('.navbar').removeClass('fixednav');
        }


        if (!leituraCompleta && $(window).scrollTop() >= $(document).height() - $(window).height()) {
            leituraCompleta = true;

            // evento google analytics
            gtag('event', 'leitura_completa');
        }
        // if(window.scrollY >= document.body.clientHeight - window.innerHeight) {
        //     alert ("Final do documento ->");
        // }
    });

    // Initiat onepageNav.js
    $('.nav').onePageNav({
        currentClass: 'current',
        'scrollOffset': 500
    });

    // Hide Mobile Nav when clicking item
    $(".nav a, .navbar-header a").click(function (event) {
        $(".navbar-collapse").removeClass("in").addClass("collapse");
    });

    /* Buttons Scroll to Div */
    $('.navbar-brand').click(function () {
        $.scrollTo('.intro', 1000);
        return false;
    });

    // $('.btn-custom').click(function () {
    //     $.scrollTo('.download', 1000);
    //     return false;
    // });

    $('.btn-custom-border, a.mouse').click(function () {
        $.scrollTo('.features', 1000);
        return false;
    });

    // Screenshot carousel
    $(".screens").owlCarousel({
        items: 4,
        navigation: true,
        navigationText: [
            "<i class='fa fa-angle-left btn-slide'></i>",
            "<i class='fa fa-angle-right btn-slide'></i>"
        ],
        pagination: false,
        itemsDesktop: [1000, 4],
        itemsDesktopSmall: [990, 3],
        itemsTablet: [600, 1],
        itemsMobile: false
    });

    // Screenshot lightbox
    $('.screens a').nivoLightbox({
        effect: 'fadeScale'
    });

    // Brief carousel
    $(".small-slider").owlCarousel({
        items: 1,
        navigation: true,
        navigationText: [
            "<i class='fa fa-angle-left btn-slide'></i>",
            "<i class='fa fa-angle-right btn-slide'></i>"
        ],
        pagination: false,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [900, 1],
        itemsTablet: [600, 1],
        itemsMobile: false
    })

    // Testemonial carousel
    $(".testemonials").owlCarousel({
        autoPlay: 8000,
        autoHeight: true,
        singleItem: true,
        navigation: false,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [900, 1],
        itemsTablet: [600, 1],
        itemsMobile: false
    });

    // Initiat fitVids.js
    $(".video-item").fitVids();

    // Bootstrap Tab navigation
    $('.tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    // Testemonial carousel
    $(".customer-slider").owlCarousel({
        autoPlay: 8000,
        items: 5,
        pagination: false,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [900, 1],
        itemsTablet: [600, 1],
        itemsMobile: false
    });

    $("#contactform").submit(function (e) {
        e.preventDefault();

        var telefone = $("#telefone").val();

        $.post('https://us-east1-central-fut.cloudfunctions.net/landing-page/formulario-contato', {telefone: telefone})
            .done(function () {
                noty({
                    text: 'Obrigado, logo logo entraremos em contato com você.',
                    type:'success',
                    layout:'bottomLeft',
                    timeout: 6000,
                    progressBar: true,
                    animation: {
                        open: {height: 'toggle'},
                        close: 'animated fadeOut',
                        easing: 'swing',
                        speed: 500 // opening & closing animation speed
                    }
                });

                // conversão google ads (informar telefone)
                gtag('event', 'conversion', {
                    'send_to': 'AW-1050345124/gHBOCJOmtocBEKT96_QD'
                });

                // evento google analytics
                gtag('event', 'gerar_lead', {
                    'event_label': 'Telefone',
                    'event_category': 'Entre em Contato'
                });
            })
            .fail(function(){
                noty({
                    text: 'Não conseguimos agendar sua ligação, entre em contato conosco pelo whatsapp: (81) 9 7103-2211',
                    type:'error',
                    layout:'bottomLeft',
                    timeout: 30000,
                    progressBar: true,
                    animation: {
                        open: {height: 'toggle'},
                        close: 'animated fadeOut',
                        easing: 'swing',
                        speed: 500 // opening & closing animation speed
                    }
                });
            });

    });

    $("#telefone").mask("?(99) 9 9999-9999");
});