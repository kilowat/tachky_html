utils = (function(){

  var showPopupBox = function(e){
     var $e = $(e);
     var $message = $e.next();
     var id = $e.attr('id');

     if($message.length === 0 ){
       $message = $($e.parent().next());
     }

     $e.parent().addClass('selected');

     if ($message.css('display') != 'block') {
       $message.show();

       var firstClick = true;
       $(document).bind('click.'+id, function(e) {
         if (!firstClick && $(e.target).closest('.show-box').length == 0) {
           $e.parent().removeClass('selected');
           $message.hide();
           $(document).unbind('click.'+id);
         }
         firstClick = false;
       });
     }
   };

  return {
    showPopupBox: showPopupBox,
  }

})();
