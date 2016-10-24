  $(document).ready(function () {
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
    $('.filter .ic_arrow-up2').click(function () {
      var self = this;
      $(this).parent().next().slideToggle(function () {
        $(self).toggleClass('selected');
      });
    });

    $('.filter').on('ifChanged', function (e) {
      showButton($(e.target));
    });

    $('.filter').on('change', function (e) {
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
      console.log(el);
    }

  });