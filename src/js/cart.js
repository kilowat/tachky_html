cart = (function(){

  function updateCounterUp($block){
    var $counterValue = $block.find('.counter-value');
    var $counter = $block.find('.counter');
    var count = parseInt($counterValue.text());
    $counterValue.text(++count);
    if(count > 0){
      $counter.addClass('action-red');
    }
  }
  function updateCounterDown($block){
    var $counterValue = $block.find('.counter-value');
    var $counter = $block.find('.counter');
    var count = parseInt($counterValue.text());
    if(count == 0) return;
    $counterValue.text(--count);
    if(count < 1){
      $counter.removeClass('action-red');
    }
  }

  function dropMsgAnimation($wrapper, $text){
    var pos = $wrapper.offset();
    var $msg = $text.hide();
    var stopTop = -30;
    var startTop = -50;
    var leftPos = 0;
    var dropMs = 300;
    var removeMs = 500;
    $wrapper.find('.counter').append($msg);
    $msg.css('top', startTop+'px');
    $msg.show();
    $msg.animate({
      top: stopTop+"px"
    }, dropMs, 'easeOutBounce', function(){
      setTimeout(function(){
        $msg.fadeOut('fast', function(){
        //  $msg.remove();
        });
      }, removeMs);
    });
  }

  var addToCart = function(){

  };

  var addToCompare = function(item){
      var $workBlock = $('#compared-added-block');
      var $e = $(item);
      if($e.hasClass('selected')){
        $e.removeClass('selected');
        updateCounterDown($workBlock);
      }else{
        $e.addClass('selected');
        dropMsgAnimation($workBlock, $('<div class="added-msg">Добавленно в сравнение</div>'));
        updateCounterUp($workBlock);
      }
  }

  var addToBookMark = function(item){
      var $workBlock = $('#bookmark-added-block');
      var $e = $(item);
      if($e.hasClass('selected')){
        $e.removeClass('selected');
        updateCounterDown($workBlock);
      }else{
        $e.addClass('selected');
        dropMsgAnimation($workBlock, $('<div class="added-msg">Добавленно в закладки</div>'));
        updateCounterUp($workBlock);
      }
  }

  return {
    addToCart: addToCart,
    addToCompare: addToCompare,
    addToBookMark: addToBookMark,
  }
})();
