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

  var showMobileMenu = function(id){
    var $id = $('#'+id);
    var width = $id.width();

    if(!$id.is(":visible")){
      open();
    }


    function open(){
      $id.css('left', -width+"px");
      $id.show();
      $id.animate({
        left: 0
      });
    }
  }

  var closeMobileMenu = function(id){
    var $id = $('#'+id);
    var width = $id.width();

    if($id.is(":visible")){
      close();
    }
    function close(){
      $id.animate({
        left: -width+"px"
      }, function(){
        $id.hide();
      });
    }

  }

  return {
    showPopupBox: showPopupBox,
    showMobileMenu: showMobileMenu,
    closeMobileMenu: closeMobileMenu,
  }

})();
