; (function ($) {
    "use strict"


    var nav_offset_top = $('header').height() + 50;
    /*-------------------------------------------------------------------------------
      Navbar 
    -------------------------------------------------------------------------------*/

    //* Navbar Fixed  
    function navbarFixed() {
        if ($('.header_area').length) {
            $(window).scroll(function () {
                var scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();

    /*----------------------------------------------------*/
    /*  Simple LightBox js
    /*----------------------------------------------------*/
    $(document).ready(function () {
        var progressBar = $(".progress-bar");
        
        progressBar.each(function () {
            var $this = $(this);
            var targetValue = parseInt($this.attr("aria-valuenow"), 10); // Target percentage value
            
            // Ensure initial state is set to 0% before starting animation
            $this.css("width", "0%");
            $this.closest('.skill_item').find('.counter').text("0%");
            
            // Use requestAnimationFrame to handle smooth animation
            function animateProgressBar(timestamp) {
                var duration = 500; // Total animation duration in milliseconds
                var startTime = $this.data('startTime') || timestamp;
                $this.data('startTime', startTime);
    
                var progress = timestamp - startTime;
                var progressPercentage = Math.min(progress / duration * targetValue, targetValue);
                $this.css("width", progressPercentage + "%");
                $this.closest('.skill_item').find('.counter').text(Math.round(progressPercentage) + "%");
                
                if (progressPercentage < targetValue) {
                    requestAnimationFrame(animateProgressBar); // Continue animation
                }
            }
    
            requestAnimationFrame(animateProgressBar); // Start animation
        });
    });
    

})(jQuery)