  // This code is for the dropdown in the regsitration form to select the county
  $(document).ready(function(){
    $('select').formSelect();
  });

// This adds the .active class to the navbar link of whatever page the user is on
   $(function(){
       $(".nav-link").each(function(){
               if ($(this).attr("href") == window.location.pathname){
                       $(this).parent().addClass("active");
               }
       });
    });