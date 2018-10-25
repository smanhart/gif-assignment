//create array to populate initial buttons
var topics = ["Powerpuff Girls", "Adventure Time", "Winnie The Pooh", "Bob's Burgers", "Fraggle Rock", "Jem and the Holograms", "Animaniacs"]
var favArray = []
var stillURL
var activeURL 
    
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
    //pull info from api
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);

        var results = response.data
        
        

        for(var i=0; i<results.length; i++) {
            var gifContainer = $("<div>");

            // var imageURL = results[i].images.fixed_height_still.url;   
            var imageURL = response.data[i].images.fixed_height_still.url
            var gifImage = $("<img>")
            gifImage.attr("src", imageURL);
            gifImage.attr("data-active", results[i].images.fixed_height.url)
            gifImage.attr("data-still", imageURL); 
            gifImage.attr("data-state", "still").addClass("gif");

            var p = $("<p>");
            p.text("Rating: " + results[i].rating)

            var b = $("<button>")
                .addClass("fav")
                .text("Add Favorite");

            gifContainer.append(p);
            
            gifContainer.append(gifImage);
            gifContainer.append(b);
            $(".gifHolder").prepend(gifContainer);
        }

        // stillURL = results[i].images.fixed_height_still.url
        // activeURL = results[i].images.fixed_height.url
    })
}

//on click for gifs to activate
$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    console.log(this)
    if(state === "still") {
        $(this).attr("src", $(this).attr("data-active"))
        $(this).attr("data-state", "animate");
    }
      else {$(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

      }
});


//on click event for search button
$("#search").on("click", function() {
    event.preventDefault();

    var userTitle = $("#titleInput").val().trim();
    topics.push(userTitle);
    createButton();
    
})

// x

//on click event for show buttons
$(document).on("click", ".show", grabGif);

//on click for favorates button
$(document).on("click", ".fav", function(){
    var favSrc = $($(this)).parent().children("img").attr("src");
    var favActive = $($(this)).parent().children("img").attr("data-active");
    var favStill = $($(this)).parent().children("img").attr("data-still");
    localStorage.setItem("favGifSrc", favSrc);
    localStorage.setItem("favGifActive", favActive);
    localStorage.setItem("favGifStill", favStill);
    createFavs();
})

//grabs info from local storage and puts on page
function createFavs() {
    var getFavSrc = localStorage.getItem("favGifSrc");
    var getFavActive = localStorage.getItem("favGifActive");
    var getFavStill = localStorage.getItem("favGifStill")
    var newFav = $("<img>")
        .addClass("gif")
        .attr("data-active", getFavActive)
        .attr("data-still", getFavStill)
        .attr("data-state", "still")
        .attr("src", getFavSrc);
    $(".favorites").prepend(newFav); 
}
createFavs();
//create an array globally
    //update it with the function, inside of createvfavs
    //push array to local storage, inside of click event


    

//ask why I had to use results instead of response.data.etc
//ask why I couldn't reassign variables
//ask about ajax link
