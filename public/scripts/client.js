/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
    const renderTweets = function (tweets) {

        let $tweet;
        for (let tweet of tweets) {

            $tweet = createTweetElement(tweet);

            $('#tweets-container').prepend($tweet);

        }
    }
    const renderTime = function (tweet) {
        return moment(tweet.created_at).fromNow();
      };

    const createTweetElement = function (tweet) {
    // const time = renderTime(tweet);
    const $tweet = $(`
    <article class="tweet">
    <header class="tweet-header">
      <div>
        <img src=${tweet.user.avatars}>
        <span>${tweet.user.name}</span>
      </div>
      <div>
        <span class="hide">${tweet.user.handle}</span>
    </div>
    </header>
    <div class="tweet-content"> <p>${tweet.content.text}</p></div>
    <footer>
      <p class="published-date">${moment(tweet.created_at).fromNow()}</p>
      <span id="tweet-icons">
        <img src="/images/flag24.png">
        <img src="/images/retweet30px.png">
        <img src="/images/heart.png">
      </span>
    </footer>
  
</article>
`);

    return $tweet;
    }

    //   renderTweets(data);


    function loadTweets() {
        $.get("/tweets")
            .then((data) => {
                $("#tweets-container").empty();
                renderTweets(data);
            })
            .catch((err) => console.log(err));
    }
    loadTweets();

    $("form").on("submit", function (event) {

        event.preventDefault();
        const text = event.target.text.value;

        if (text === "") {
            // alert("tweet can't be empty");
            $(".error").html("Error: Tweet can't be empty!!").css("display", "block");
        setTimeout(() => {
        $(".error").css("display", "none");
      }, 4000);

        } else if (text.length > 140) {
            // alert("too long");
            $(".error")
        .html("Error: Your tweet content is too long!!")
        .css("display", "block");
        setTimeout(() => {
        $(".error").css("display", "none");
      }, 4000);
        }else{
            const formData = $("form").serialize();
            const data = escape(formData)
            console.log(data);
            $.post("/tweets/", data)
               .then(() => {
                loadTweets();
                $("form")[0].reset();
                $(".counter").html("<strong>140</strong>");
        })
        .catch((err) => console.log(err));
        }

       


    });

    const escape = function (str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };
    


});