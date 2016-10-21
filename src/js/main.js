$(document).ready(function () {
  //set input number
  $('input[type=number]').iLightInputNumber();

  //run tip
  $(".vtip").tipTip();

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
    ranges: [false, {
      styleClass: 'range-glow'
    }, false, true]
  });

  $('#min-price').next().change(function () {
    $(".slider-gaps").limitslider('values', 0, $(this).val());
  });
  $('#max-price').next().change(function () {
    $(".slider-gaps").limitslider('values', 1, $(this).val());
  });
});