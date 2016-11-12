$(document).ready(function () {
  //set input number
  $('input[type=number]').iLightInputNumber();

  //run tip
  $(".vtip").tipTip();

  //run checkbox
  $('input').iCheck({
    checkboxClass: 'icheckbox_flat',
    radioClass: 'iradio_flat'
  });

  //customize select
  $('select').selectize();
  
  $('.bxslider').bxSlider({
    pagerCustom: '#bx-pager',
    controls: false
  });
  
  //product detail drop down dop props
  $('.dop-prop .show-next').click(function(){ 
    var self = $(this);
    $('.dop-prop .drop-down').slideToggle('fast',function(){
      self.toggleClass('selected');
    });
  });
  
});