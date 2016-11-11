$(document).ready(function () {
  var setFilter = '#set-filter';
  var filter = '.filter';
  //run sliderprice
  $('.slider-gaps').limitslider({
    values: [parseInt($('#min-price').val()), parseInt($('#max-price').val())],
    gap: 1,
    step: 1,
    min: parseInt($('#min-price').val()),
    max: parseInt($('#max-price').val()),
    label: true,
    showRanges: true,
    slide: function (event, ui) {
      $('#min-price').next().val(ui.values[0]);
      $('#max-price').next().val(ui.values[1]);
    },
    stop: function () {
      showButton($('.slider-gaps'));
    },
    ranges: [false, {
      styleClass: 'range-glow'
      }, false, true]
  });

  //slide filter propery
  $(filter + ' .ic_arrow-up2').click(function () {
    var self = this;
    $(this).parent().next().slideToggle(function () {
      $(self).toggleClass('selected');
    });
  });

  $(filter).on('ifChanged', function (e) {
    showButton($(e.target));
  });

  $(filter).on('change', function (e) {
    var $t = $(e.target);

    if ($t.hasClass('min-price')) {
      $(".slider-gaps").limitslider('values', 0, $t.val());
    }
    if ($t.hasClass('max-price')) {
      $(".slider-gaps").limitslider('values', 0, $t.val());
    }
    showButton($t);
  });

  function showButton(el) {
    var count = 0;
    $(setFilter).remove()
      //run ajax request 
      //todo
      ////**waiting**///

    //when done run this//
    $('body').append(getBlock(count, el));
    $(setFilter).fadeIn('fast');
    //////////////////////////
  }

  function getBlock(count, el) {
    var count = count || 0;
    var y = el.offset().top - $(setFilter).height() / 2;
    var x = $('.sidebar').outerWidth() + $('.sidebar').offset().left;
    var block = '<div id="set-filter" style="top:' + y + 'px;left:' + x + 'px;display:none;">' +
      '<div class="triangle"></div>' +
      '<div class="found-fl">Выбрано товаров: ' + count + '</div>' +
      '<div class="show-from-filter"><a href="#">Показать</a></div>' +
      '</div>';
    return block;
  }

  $('body').click(function (e) {
    var $t = $(e.target);

    if ($(setFilter).length === 0)
      return

    if ($t.parents().filter(setFilter).length === 0 && $t.parents().filter(filter).length === 0) {
      $(setFilter).fadeOut('fast', function () {
        $(this).remove();
      })
    }
  });
});