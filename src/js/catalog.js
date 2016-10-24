$(document).ready(function(){
  $('#ajax-show-more').click(function(){
    var $wrapper = $('#catalog-view');
    var requestUrl = '/ajax_catalog.html';
    var btn = $(this);
    btn.prop('disabled', true);
    $.ajax({
      url:requestUrl,
      method:'get',
      data:{
        
      }
    }).done(function(res){
      btn.prop('disabled', false);
      console.log(res);
      $wrapper.append(res);
    });
  });
});