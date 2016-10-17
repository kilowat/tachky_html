/**
Vertigo Tip by www.vertigo-project.com
Requires jQuery
*/

this.vtip = function(cl) {
    this.xOffset = -10; // x distance from mouse
    this.yOffset = 35; // y distance from mouse
    var cl = cl||'.vtip';
    $(cl).unbind().hover(
        function(e) {
            
            this.t = this.title;
            this.title = ''; 
            this.top = (e.pageY + yOffset);
            this.left = (e.pageX + xOffset);
            //console.log(this.left);

            $('body').append( '<p id="vtip"><img id="vtipArrow" />' + this.t + '</p>' );
            if(($('#vtip').width()+$('#vtip').width()+100)+this.left>innerWidth){
                this.left = this.left-($('#vtip').width());
                $('#vtipArrow').css('right','0px');
            }

            $('p#vtip #vtipArrow').attr("src", 'images/vtip_arrow.png');
            $('p#vtip').css("top", this.top+"px").css("left", this.left+"px").fadeIn("slow");

        },
        function() {
            this.title = this.t;
            $("p#vtip").remove();
        }
    ).mousemove(
        function(e) {
            this.top = (e.pageY + yOffset);
            this.left = (e.pageX + xOffset);
            if(($('#vtip').width()+$('#vtip').width()+100)+this.left>innerWidth){
                this.left = this.left-($('#vtip').width());
                $('#vtipArrow').css('right','0px');
            }
            $("p#vtip").css("top", this.top+"px").css("left", this.left+"px");
        }
    );            
    
};

jQuery(document).ready(function($){
    vtip('a');
    vtip();
})