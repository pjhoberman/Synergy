/* Site variables - change these to whatever you want */
var slide_delay = 7; // this is in seconds;

/* Edit below this line with caution */

var current_slide = 1,
    slide_interval;

function setActiveNav(page){
    if( page !== '' ){
        $('nav li a.active').removeClass('active');
        $('nav li a[href*=' + page + ']').addClass('active');
    }
}

function changeSlide(n){
    if(n > $('#image-slider .image-slider-button').length || n === 0 ){
        n = 1;
    }

    current_slide = n;
    $('#image-slider img').attr('src', 'img/slider/' + n + '.jpg');
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
                $('#preload').load('img/slider/' + i + '.jpg');
            }
        } // if

    // read more -- if more than one <p>, maybe a for="" type relationship between the span and the p's
    $('span.read-more').click(function(){
        $(this).parent().next('p').slideDown();
        $(this).remove();
    });

    // intellipanel info
    $('#intellipanel-table td').click(function(){
        $('#intellipanel-info ul').hide();
        $('#intellipanel-info ul#' + $(this).attr('data-info')).show();
    });

    // coverage map
    $('area').mouseover(function(){
        var state = $(this).attr('href').replace('#','');
        $('.state').hide();
        if(!$('img#' + state).length){
            var a = $(this).attr('coords').split(','),
                top = left = 10000;

            for( var i=0; i<a.length; i++ ){
                if( i % 2 ){
                    if( a[i] < top ){
                        top = a[i];
                    }
                } else {
                    if( a[i] < left ){
                        left = a[i];
                    }
                }
            } // for

            $('<img src="img/coverage/' + state + '.png" style="top: ' + $(this).attr('data-top') + '; left: ' + $(this).attr('data-left') + '; position: absolute;" id="' + state + '"  class="state" />').appendTo('#map');
        } else {
            $('img#' + state).show();
        }
    })
    // .mouseout(function(){
    //     $('.state').hide();
    // });
    $('.state').live('click',function(){
        $('#coverage-info p').hide();
        $('#coverage-info p[data-state=' + $(this).attr('id') + ']').show();
    })

 });
