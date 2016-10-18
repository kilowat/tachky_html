$(document).ready(function(){
    $('body').click(function(e){
        var $t = $(e.target);
        var wrapper = $('.toggle-wrapper');

        $t = $($t.parent()).hasClass('toggle-btn')?$($t.parent()):$t;

        if($t.hasClass('toggle-btn')) {

            $('.toggle-btn.selected').each(function(key,value){

                if(!$(value).is($t)){
                    $(value).removeClass('selected');
                    $(value).next().hide('fast');
                }
            });

            $t.toggleClass('selected');
            //$t.next().slideToggle('fast');
            if($t.next().is(':visible')){
                $t.next().hide();
            }else{
                $t.next().slideDown('fast');
            }
        }
        if(!wrapper.is($t)  &&  wrapper.has($t).length === 0 && !$t.hasClass('toggle-btn')){
            $('.toggle-wrapper').hide('fast');
            $('.toggle-btn').removeClass('selected');
        }
    });
});