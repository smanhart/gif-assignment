//create array to populate initial buttons
var topics = ["Powerpuff Girls", "Adventure Time", "Winnie The Pooh", "Fraggle Rock", "Jem and the Holograms", "Animaniacs"]


    
//function to create button for each item
    //for loop to run through array
function createButton() {
    $("#titleButtons").empty();

    for (var i=0; i < topics.length; i++) {
        var b = $("<button>");
        b.addClass("show");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#titleButtons").append(b);
    }
}
createButton();

//function to replace spaces with +
    //for loop to get all spaces

function grabGif() {
    var show = $(this).attr("data-name");

    // for(var i=0; i<show.length; i++) {
    var showNoSpace = show.replace(/ /g, "+")
    console.log(showNoSpace)
    // }
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + showNoSpace + "&api_key=9hUJ888Kc8SXY9TRfbZNZ6ge8p8GaVs2&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var gifContainer = $("<img>")
        console.log(response);
    })
}

//on click event for search button


//on click event for gif buttons
$(document).on("click", ".show", grabGif);
//pull info from api