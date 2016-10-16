$(document).ready(function(){

    //catalog menu
    $('.toggle-btn').click(function(){
        $(this).toggleClass('selected');
        $(this).next().toggleClass('opened');
    });
    $('body').click(function(e){
        var $t = $(e.target);
        var wrapper = $('.toggle-wrapper');

        if(!wrapper.is($t)  &&  wrapper.has($t).length === 0 && !$t.hasClass('toggle-btn')){
            $('.toggle-wrapper').removeClass('opened');
            $('.toggle-btn').removeClass('selected');
        }
    });
//end catalog menu

    /*
//catalog menu
    $('.catalog-menu-btn').click(function(){
        $(this).toggleClass('selected');
        $('.catalog-menu-item-wrapper').toggleClass('opened');
    });
    $('body').click(function(e){
        var $t = $(e.target);
        var wrapper = $('.catalog-menu-item-wrapper');

        if(!wrapper.is($t)  &&  wrapper.has($t).length === 0 && !$t.is($('.catalog-menu-btn'))){
            $('.catalog-menu-item-wrapper').removeClass('opened');
            $('.catalog-menu-btn').removeClass('selected');
        }
    });
//end catalog menu
*/
//set input number
    $('input[type=number]').iLightInputNumber();
//end set input number
});