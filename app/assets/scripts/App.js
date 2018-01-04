
$( document ).ready(function() {

  // Get started with all modules here
  console.log("App.js is ready")

  /* hamburger animation and function as nav-overlay trigger */
  $('#hamburger__trigger-overlay').on('click', function(event){
    event.preventDefault();
    $('.nav-overlay').toggleClass('open close');
    $('.site-wrapper').toggleClass('nav-overlay--open nav-overlay--close');
    $(this).toggleClass('is-active');
  });

  /* BUTTON EFFECT Radomir */
  $('.button--effect-radomir').click(function(){
    $(this).addClass("button--click");
    //remove class button--click after animation
    $('.button--effect-radomir').one('webkitAnimationEnd oAnimationEnd msAnimationEnd mozAnimationEnd animationEnd', function(){
      $(this).removeClass("button--click")
    })
  })

  /* BUTTON EFFECT Ripple */
  $('.ripple-effect').click( function(e){
    var circle = document.createElement( 'div' );
    var d = Math.max($(this).innerWidth(), $(this).innerHeight());
    circle.className = 'ripple';
    $(this).append(circle);
    $('.ripple').css('width', d + 'px');
    $('.ripple').css('height', d + 'px');
    $('.ripple').css('left', e.clientX - $(this).offset().left -d/2 + 'px');
    $('.ripple').css('top', e.clientY - $(this).offset().top - d/2 + 'px');
    //remove ripple element after animation
    $('.ripple-effect').one('webkitAnimationEnd oanimationend msAnimationEnd mozAnimationEnd animationEnd', function(){
      $('.ripple').remove();
    });
  });

  //initialize material form multiple select
  $('select').material_select();

});
