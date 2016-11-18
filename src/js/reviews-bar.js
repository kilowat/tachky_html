(function () {

  var arrCount = [];

  $('.reviews-bar').each(function (key, value) {
    arrCount.push($(value).data('count'));
  });

  var maxCount = arrCount.sort().pop();

  $('.reviews-bar').each(function (key, value) {
    var curValue = $(value).data('count');
    var curProcent = (100/maxCount)*curValue;
    $(value).css('width', curProcent+"%");
    $(value).append('<div class="r-int">'+curValue+'</div>')
  });

})();