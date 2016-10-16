$(document).ready(function(){
    $('body').click(function(e){
        var $t = $(e.target);
        var wrapper = $('.toggle-wrapper');

        $t = $($t.parent()).hasClass('toggle-btn')?$($t.parent()):$t;

        if($t.hasClass('toggle-btn')) {

           $('.toggle-btn.selected').each(function(key,value){

               if(!$(value).is($t)){
                   console.log(value);
                   $(value).removeClass('selected');
                   $(value).next().slideUp('fast');
               }
           });

            $t.toggleClass('selected');
            $t.next().toggle('fast');
        }

        if(!wrapper.is($t)  &&  wrapper.has($t).length === 0 && !$t.hasClass('toggle-btn')){
            $('.toggle-wrapper').hide('fast');
            $('.toggle-btn').removeClass('selected');
        }
    });

//end catalog menu
    
//set input number
    $('input[type=number]').iLightInputNumber();
//end set input number
});