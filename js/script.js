/* Site variables - change these to whatever you want */
var slide_delay = 3; // this is in seconds;

/* Edit below this line with caution */

var current_slide = 1,
    slide_interval;

function setActiveNav(page){
    if( page !== '' ){
        $('nav li.active').removeClass('active');
        $('nav li a[href*=' + page + ']').parent().addClass('active');
    }
}

function changeSlide(n){
    if(n > $('#image-slider .image-slider-button').length || n === 0 ){
        n = 1;
    }

    current_slide = n;
    $('#image-slider img').attr('src', 'img/slider/' + n + '.png');
    $('#image-slider .image-slider-button').removeClass('active');
    $('#image-slider .image-slider-button:eq(' + (n-1) + ')').addClass('active');
}

function setSlideInterval(){
    clearInterval(slide_interval);
    slide_interval = setInterval( function(){changeSlide(current_slide+1);}, slide_delay * 1000 );
}

 $(function() {
    var path = window.location.pathname.split('/'),
        page = path[path.length-1].replace('.html','');

    // make the logo clickable
    $('#logo').click(function(){
        window.location = '.';
    });

    // set up the active state of the nav
    setActiveNav(page);

    // set up nav links
    $('nav li').click(function(){
        window.location = $(this).find('a').attr('href');
    });

    // image slider

        // only do this on index
        if(page === '' || page === 'index'){

            // click on a button
            $('#image-slider .image-slider-button').click(function(){
                changeSlide($(this).index() + 1);
            });

            // start the interval
            setSlideInterval();

            $('#image-slider').mouseover(function(){
                clearInterval(slide_interval);
            })
            .mouseout(function(){
                setSlideInterval();
            });

            // preload images
            for(var i=1; i<=$('#image-slider .image-slider-button').length; i++){
                $('#preload').load('img/slider/' + i + '.png');
            }
        } // if

    // read more -- if more than one <p>, maybe a for="" type relationship between the span and the p's
    $('.read-more').click(function(){
        $(this).parent().next('p').slideDown();
        $(this).remove();
    });

 });
