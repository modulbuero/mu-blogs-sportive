(($) => {

/** ************************************
	Init the Functions
*/
$(document).ready(()=>{
    scrollToRightHero()
    showLebenslaufContainer();
    contactFormLabel()
    dayCounter()
    exampleCustomSwiper(".swiper-numberpagination")
    closeMenuIfHash()
    translation()

    if($(document).width() <= 601){
        for(var i = 0; i < 2; i++) {
           $('.ihf-counter > div > div').clone().insertAfter('.ihf-counter > div > div');
        }
    }

    setTimeout(function () {
        const path = window.location.pathname;
        if (/\/(es|pt|fr|ru|ar)\//.test(path)) {
            console.log("not EN");

            $('header a[href*="#"]').on('click', function(e){
                e.stopPropagation();
                let hash = $(this).attr('href');
                console.log(hash)
                jQuery('html, body').animate({scrollTop: jQuery(hash).offset().top - 80});
                return false;
            });
        }
    },1000);
    

})

$(window).resize(function() {
    setTimeout(()=>{
        ScrollTrigger.refresh()
    }, 300)
});

/**Functions */

/** Slider
 *  activate custom params for Swiper
 *  @param index Number-ID  
 *  @param spv Slides per View
 */
function exampleCustomSwiper(index, spv=1){
    setTimeout(function(){ // Timeout im Parent weil Swiper.JS nach Script.JS geladen wird.
        if($(index).length){
            let slidesPerView = spv;
    
            let cSwiperParams ={
                loop: true,
                keyboard: {
                    enabled: true,
                },
                navigation: {
                    nextEl: index + ' .swiper-button-next',
                    prevEl: index + ' .swiper-button-prev',
                },
                pagination: {
                    el: index + ' .swiper-pagination',
                    renderBullet: function (index, className) {
                        return '<span class="' + className + ' butzeck-bulletpoints">' + (index + 1) + '</span>';
                    },
                    clickable: true,
                },
                allowTouchMove: false,

                slidesPerView: slidesPerView,
                effect: "slide",
                
                
                // if window width is bigger than
                
            }
    
            let standSwiper = new Swiper(index, cSwiperParams);

            // Klick auf eigene Pagination Bugfix Touch Navigataion
            document.querySelectorAll('.swiper-pagination-bullet').forEach(bullet => {
                bullet.addEventListener('click', function () {
                    const index = parseInt(this.dataset.slide, 10);
                    standSwiper.slideToLoop(index);
                });
            });

            // Funktion zur Aktualisierung
            function updateCustomPagination(standSwiper) {
                document.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
                    bullet.classList.toggle('active', i === standSwiper.realIndex);
                    console.log("TochSlideIndex " + standSwiper.realIndex)
                });
            }
        }
    }, 1000)
    
}

/*Lebenslauf showMore*/
function showLebenslaufContainer(container=".lebenslauf-wrap>div", show=3){
    let currentIndex = 0;
    const containersPerLoad = show;
    const $containers = $(container);
    const totalContainers = $containers.length;
    const $loadBtn = $('.load-more');
    //const $statusText = $('#statusText');

    // Initial: Erste 2 Container anzeigen
    function showInitialContainers() {
        showNextContainers();
        updateStatus();
    }

    // Nächste Container anzeigen
    //beginn true = show 3 every time
    function showNextContainers(begin=true) {
        const endIndex = Math.min(currentIndex + containersPerLoad, totalContainers);
        
        for (let i = currentIndex; i < endIndex; i++) {
            setTimeout(() => {
                if(begin){
                    $containers.eq(i).addClass('show');
                }else{
                    $containers.addClass('show'); // Alle anzeigen 
                    $loadBtn.addClass('hidden');
                    $loadBtn.parent().addClass('is-open');
                    $containers.removeClass('last-Element');
                }
            }, (i - currentIndex) * 200); // Verzögerung zwischen den Containern
        }
        
        currentIndex = endIndex;
        updateLastElementClass()
    }

    // Status und Button-Text aktualisieren
    function updateStatus() {
        const remaining = totalContainers - currentIndex;
        
        if (remaining > 0) {
            //$loadBtn.find('a').text(`Weitere ${Math.min(remaining, containersPerLoad)} Container laden`);
            //$statusText.text(`${currentIndex} von ${totalContainers} Containern angezeigt`);
        } else {
            $loadBtn.addClass('hidden');
        }
    }

    // Last-Element Klasse aktualisieren
    function updateLastElementClass() {
        // Entfernen der Klasse von allen Containern
        $containers.removeClass('last-Element');
        
        // Hinzufügen der Klasse zum letzten sichtbaren Container
        if (currentIndex > 0) {
            $containers.eq(currentIndex - 1).addClass('last-Element');
        }
    }

    // Button Click Event
    $loadBtn.on('click', function() {
        if (currentIndex < totalContainers) {
            // Button temporär deaktivieren
            $loadBtn.prop('disabled', true).find('a').text('Loading...');
            
            setTimeout(() => {
                showNextContainers(false);
                updateStatus();
                $loadBtn.prop('disabled', false).find('a').text('Laden...');;
            }, 500);
        }
    });

    // Reset Funktion (optional - für Demonstration)
    // $(document).on('keydown', function(e) {
    //     if (e.key === 'r' || e.key === 'R') {
    //         // Reset bei Drücken der R-Taste
    //         currentIndex = 0;
    //         $containers.removeClass('show');
    //         $loadBtn.removeClass('hidden');
    //         showInitialContainers();
    //     }
    // });

    // Initial laden
    showInitialContainers();
}

/*Kontakt-Formular Label-Activation*/
function contactFormLabel(){
    let labelWrap = 'form ';
    let input     = labelWrap + '.nf-field-element input';
    let textarea  = labelWrap + '.nf-field-element textarea';

    function checkInputField() {
        $(input).each(function(){
            if($(this).val() == ""){
                $(this).parents(':eq(1)').removeClass('focus-input');
            }
        })
    }

    $(input).on('focus click', function(){
        checkInputField();
    })

    $(input + ", " + textarea).on('focus click', function(){
        $(this).parents(':eq(1)').addClass('focus-input');
    })

    $(input + ", " + textarea).on('focusout', function(){
        checkInputField()
    })
}

function dayCounter(){
    const targetDate = new Date(2025, 11, 19); // 19. Dezember 2025, Jan. = 0

    function updateCountdown() {
        const now       = new Date();
        const timeDiff  = targetDate - now;
        const daysLeft  = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        $('.ihf-counter code').html(daysLeft);
    }
    updateCountdown();

    // Optional: Jede Minute neu berechnen
    //setInterval(updateCountdown, 60 * 1000);
}

function scrollToRightHero(){
    let heroWrapper = ".butzeck-hero-wrapper"
    let counterWrap = ".ihf-counter";
    let slideInWrap = ".slide-in-wrapper";

    if($(counterWrap).length && $(slideInWrap).length && $(document).width() > 834){

        let scrubs  = 1.2
        let header  = "74px"
        if($(window).width() <= 1112){
            header  = "56px"
        }
        if($(window).width() <= 768){
            scrubs=0.5;
        }
        
        const slideAnimation = {
            trigger: heroWrapper,
            start: "top +="+header,
            scrub: scrubs,
            markers: false,
            pin: true,
            ease: 'slow',
            toggleActions: "play reverse play reverse"
        };
        
        gsap.to( counterWrap, {
            xPercent: 110,
            opacity:0,
			scrollTrigger: slideAnimation,
        })

        gsap.to(slideInWrap, {
            xPercent: 100,
            scrollTrigger: slideAnimation,
        }) 
    }
}

function closeMenuIfHash(){
    if($(document).width() <= 834){
        $('header .widget_nav_menu ul.menu > li a').on('click', () => {
            $(".hamburger-menu").click()
        })
    }
}

function translation(){
    if($('body.blog').length){
        $('body.blog h1.main-title').text('News')
        $('body.blog .loop-wrapper .loop-more').text('read more ')
        
    }
}



})(jQuery)