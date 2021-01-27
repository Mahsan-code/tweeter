$(document).ready(function() {
    // --- our code goes here ---
    $('#tweet-text').on('keyup', function(event){
        let lenChar = $(this).val().length;
        let remain = 140 - lenChar;
        const counter = $(this).parent().find(".counter");
        if(remain < 0){
            counter.addClass("red");

        }
        if(remain >= 0){
            counter.removeClass("red");
        }
        counter.val(remain);
        });
  });