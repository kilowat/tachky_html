$(document).ready(function () {
  //set input number
  $('input[type=number]').iLightInputNumber();

  //run tip
  $(".vtip").tipTip();

  //run sliderprice

 $('.slider-gaps').limitslider({
    values: [1, 400],
    gap: 1,
    step: 1,
    min:1,
    max:400,
    label: true,
    showRanges: true,
     slide: function(event, ui) {
      console.log(ui.values[0]);
      console.log(ui.values[1]);
    },
    ranges: [false, {
      styleClass: 'range-glow'
    }, false, true]
  });
  
});