// This adds the .active class to the navbar link of whatever page the user is on
   $(function(){
       $(".nav-link").each(function(){
               if ($(this).attr("href") == window.location.pathname){
                       $(this).parent().addClass("active");
               }
       });
    });


$('.scoreboard:nth(0)').before('<div class="place col-2 gold">Gold:</div>');
$('.scoreboard:nth(1)').before('<div class="place col-2 silver">Silver:</div>');
$('.scoreboard:nth(2)').before('<div class="place col-2 bronze">Bronze:</div>');
$('.scoreboard:nth(3)').before('<hr id="hr_scores">');