$(document).ready(function(){

    $('.catalog-menu-btn').click(function(){
        $(this).toggleClass('selected');
        $('.catalog-menu-item-wrapper').toggleClass('opened');
    });

});