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
    controls: false,

  });

  //product detail drop down dop props
  $('.dop-prop .show-next').click(function () {
    var self = $(this);
    $('.dop-prop .drop-down').slideToggle('fast', function () {
      self.toggleClass('selected');
    });
  });

  //run lenta slider
  $('.product-lenta').slick({
    slidesToShow: 5,
    slidesToScroll: 5
  });

  //run tabs
  $("#product-tabs").tabs({
    classes: {
      "ui-tabs": "product-tabs"
    },
    activate: function (event, ui) {
      localStorage.selectedTab = ui.newTab.index() + 1;
    },
    active: localStorage.selectedTab ? localStorage.selectedTab - 1 : 0
  });

  //dorp down btn
  $('.drop-down-btn').click(function () {
    var self = $(this);
    $(self.next()).slideToggle('fast', function () {
      self.toggleClass('selected');
    });
  });

//slick top block
(function(){
    var obj = $('.top-panel');
    var offset = obj.offset();
    var topOffset = offset.top;
    var marginTop = obj.css("marginTop");

    $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();

      if (scrollTop >= topOffset){

        obj.css({
          marginTop: 0,
          position: 'fixed',
          top: 0,
        });
      }

      if (scrollTop < topOffset){

        obj.css({
          marginTop: 0,
          position: 'relative',
        });
      }
    });
  })();

});
