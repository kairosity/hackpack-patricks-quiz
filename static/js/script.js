// This adds the .active class to the navbar link of whatever page the user is on
   $(function(){
       $(".nav-link").each(function(){
               if ($(this).attr("href") == window.location.pathname){
                       $(this).parent().addClass("active");
               }
       });
    });


$('.scoreboard:nth(0)').before('<div class="place col-4 gold"><h4 class="gold-h4">Gold:</h4></div>');
$('.scoreboard:nth(1)').before('<div class="place col-4 silver"><h4 class="silver-h4">Silver:</h4></div>');
$('.scoreboard:nth(2)').before('<div class="place col-4 bronze"><h4 class="bronze-h4">Bronze:</h4></div>');
$('.scoreboard:nth(3)').before('<hr id="hr_scores">');