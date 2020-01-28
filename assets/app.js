let topics = ["scary-movies", "puppies", "travel", "hogwarts", "half-marathon", "marvel", "web-development", "beaches", "telenovela", "friends", "babies"];

//creating for loop of array topics to create buttons 
for (var i = 0; i < topics.length; i++) {
    var button = $("<button>" + topics[i] + "</button>");
    $("#buttondiv").append(button);
    $(button).attr("data-topic", topics[i]);
}
grabDiv();

function grabDiv() {
    $("button").on("click", function () {
        var gifDiv = $("#gifs");
        gifDiv.empty();
        var topic = $(this).attr("data-topic");
        //insert topic into search query url 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=9VvdGDteXjtoutbZAzo7B4EuEnljAm61&limit=10";

        console.log("topic " + topic);
        console.log("queryURl " + queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            let results = response.data;

            //for loop of results
            for (var j = 0; j < results.length; j++) {

                //Create divs; excludes gifs with pg-13 and r ratings

                if (results[j].rating !== "r" && results[j].rating !== "pg-13") {

                    let rating = results[j].rating;

                    let p = $("<p>").text("Rating: " + rating);

                    let topicStillImage = $("<img>");

                    topicStillImage.attr("src", results[j].images.fixed_height_still.url);
                    gifDiv.append(p);
                    gifDiv.append(topicStillImage);
                };;

                if ($("img").on("click", function () {
                    topicStillImage.attr(results[j].images.fixed_height.url);
                    console.log("results " + results[j]);
                }));
            }
    })
});
};
//take user input and create new button and append to existing buttons
//add user input to query search and pull gifs

$("#form-submit").on("click", function (event) {
    event.preventDefault();
    var newTopic = $("#user-input").val().trim();
    topics.push(newTopic);
    var button = $("<button>" + newTopic + "</button>");
    $("#buttondiv").append(button);
    $(button).attr("data-topic", newTopic);
    grabDiv();
}); 