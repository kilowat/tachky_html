$(document).ready(function(){

//catalog menu
    $('.catalog-menu-btn').click(function(){
        $(this).toggleClass('selected');
        $('.catalog-menu-item-wrapper').toggleClass('opened');
    });
//end catalog menu

//set input number
    $('input[type=number]').iLightInputNumber();
//end set input number
});