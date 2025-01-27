function logoAnimation() {
	
	var firstRunDelay = 1000; /*ms*/
	var cssAnimationTime = 2000; /*ms*/
			
	var imgs = $(".center-logo img");
	var interval = firstRunDelay + (imgs.length - 1) * cssAnimationTime; /*ms*/
	var executions = 0;
	
	function animateImg(){
		executions++;
		
		$(".center-logo img.hide-logo").removeClass('animate-logo').css( 'animation-delay', '0s' );
		$(".center-logo img.hide-logo").width();
		for ( var i = 1; i < imgs.length; i++ ) {
			$(".center-logo img").eq(i).addClass('animate-logo').css( 'animation-delay', (i - 1) *cssAnimationTime + 'ms' );
		}
		
	}
	/* Run once after delay */
	setTimeout( animateImg, firstRunDelay );

	/* Run forever with set interval */
	window.setInterval( animateImg, interval);
}


function backToTop() {
	jQuery( window ).on( 'scroll', function() {
		if ( jQuery( this ).scrollTop() > 500 ) {
			jQuery( '#toTop' ).addClass( 'toTop-show' );
		} else {
			jQuery( '#toTop' ).removeClass( 'toTop-show' );
		}
	} );

	jQuery( '#toTop' ).on( 'click', function( event ) {
		event.preventDefault();
		jQuery( 'html, body' ).animate( { scrollTop: 0 }, 500 );
		return false;
	} );

} 

var fltr = null;

function reveal() {
	// var reveals = document.querySelectorAll(".reveal");
	var reveals = document.querySelectorAll(".reveal");
	for (var i = 0; i < reveals.length; i++) {
		var windowHeight = window.innerHeight;
		var elementTop = reveals[i].getBoundingClientRect().top;
		var elementVisible = 30;

		if (elementTop < windowHeight - elementVisible) {
			reveals[i].classList.add("active");
		} 
		// else {
		  // reveals[i].classList.remove("active");
		// }
	}
	
	if(fltr == null){
		$('section').each(function () {
			if($(this).position().top < windowHeight - elementVisible || ($(this).position().top <= $(document).scrollTop() && ($(this).position().top + $(this).outerHeight()) > $(document).scrollTop())) {
				if($(this).attr('id') == 'projects') fltr = $('.filter-container').filterizr({layout: 'sameWidth'});
			}
		});
	}
}

$(document).ready(function() {
	logoAnimation();
	backToTop();

  
	$('#main-menu-collapse').on('show.bs.collapse', function () {
		$('#main-menu #main-menu-collapse.navbar-collapse').addClass('in');
		$('#main-menu .navbar-toggle').addClass('active');
	});

	$('#main-menu-collapse').on('hide.bs.collapse', function (e) {
		e.preventDefault();
		$('#main-menu .navbar-collapse.collapse').animate({
			opacity: 0,
			top: "-=100",
			height: "toggle"
		  }, 500, function() {
			$('#main-menu #main-menu-collapse.navbar-collapse').removeClass('in');
			$('#main-menu #main-menu-collapse.navbar-collapse').removeAttr('style');
			$('#main-menu .navbar-toggle').removeClass('active');
		});
	});
  
	$('#main-menu-collapse a').on('click', function () {
		$('#main-menu #main-menu-collapse.navbar-collapse').collapse('hide');
		$('#main-menu-collapse li.active').removeClass('active');
		$(this).parent().addClass("active");
		let section = $(this).attr("href");
		$( 'html, body' ).animate( { scrollTop: ($('html, body').scrollTop() + $(section).offset().top) }, 500 );
	});
  
	let section = location.hash;
	$('#main-menu-collapse li.active').removeClass('active');
	if(section != '') {
		$(this).find('.reveal').addClass('active');
		if(section == '#projects') fltr = $('.filter-container').filterizr({layout: 'sameWidth'});
		$('#main-menu-collapse li a[href="' + section + '"]').closest('li').addClass('active'); 
	}
	else $('#main-menu-collapse li a[href="#home"]').closest('li').addClass('active'); 
	
	$('.filter li').click(function() {
		$('.filter li').removeClass('active');
		$(this).addClass('active');
	});
	
	$('.more-details').on('click', function(){
		let id = $(this).attr("id");
		$('#popup .modal-dialog').load('views/' + id + '.html', function(response, status, xhr){
			
			$( "#popup .modal-dialog" ).html( response );

			$('#popup').on('shown.bs.modal', function () {
				let current = $('#popup').find('.slider-project');
		
				current.on('init', function () {
					current.css({visibility: 'visible', opacity: 1});
				});

				current.slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					accessibility: true,
					arrows: true,
					dots: false,
					centerMode: true,
					variableWidth: true,
					infinite: true,
					focusOnSelect: true,
					cssEase: 'linear',
					touchMove: true,
					prevArrow:'<button class="slick-prev"> < </button>',
					nextArrow:'<button class="slick-next"> > </button>',
				});
				$('#popup').find('.slick-current').focus();
				current.slick('refresh');
				current.on('afterChange',function(){
					$('#popup').find('.slick-current').focus();
				});
				$('#popup').on('hide.bs.modal', function () {
					current.slick('unslick');
					$('#popup').off('shown.bs.modal');
				});
				
			});
			
			
			$('#popup').modal('show');
			
		});
		
	});
	
});
  

$(window).on('load', function(){ 
	reveal();
	window.addEventListener("scroll", reveal);
});
	
