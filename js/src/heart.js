/* when a user clicks, toggle the 'is-animating' class */
$(".heart").on('click touchstart', function(){
    $(this).toggleClass('is_animating');
  });
  
  /*when the animation is over, remove the class*/
  $(".heart").on('animationend', function(){
    $(this).toggleClass('is_animating');
  });
  