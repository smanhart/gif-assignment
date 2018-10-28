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
   

function grabGif() {
    var show = $(this).attr("data-name");

    var showNoSpace = show.replace(/ /g, "+")
    console.log(showNoSpace)
    
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + showNoSpace + "&api_key=9hUJ888Kc8SXY9TRfbZNZ6ge8p8GaVs2&limit=10"
    //pull info from api
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        var results = response.data
        
        for(var i=0; i<results.length; i++) {
            var gifContainer = $("<div>");

            var imageURL = results[i].images.fixed_height_still.url;   
            var gifImage = $("<img>")
            gifImage.attr("src", imageURL);
            gifImage.attr("data-active", results[i].images.fixed_height.url)
            gifImage.attr("data-still", imageURL); 
            gifImage.attr("data-state", "still").addClass("gif");

            var p = $("<p>");
            p.text("Rating: " + results[i].rating)

            var b = $("<button>")
                .addClass("fav")
                .text("Add To Favorites");

            gifContainer.append(p);
            
            gifContainer.append(gifImage);
            gifContainer.append(b);
            $(".gifHolder").prepend(gifContainer);
        }

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
$("form").on("submit", function(event) {
    event.preventDefault();

    var userTitle = $("#titleInput").val().trim();
    topics.push(userTitle);
    createButton();
    
})

//on click event for show buttons
$(document).on("click", ".show", grabGif);

//on click for favorates button
$(document).on("click", ".fav", function(){
    $(".favorites").empty();
    var favSrc = $($(this)).parent().children("img").attr("src");
    var favActive = $($(this)).parent().children("img").attr("data-active");
    var favStill = $($(this)).parent().children("img").attr("data-still");
    favArray.push({favGifSrc: favSrc, favGifActive: favActive, favGifStill: favStill});
    // localStorage.clear();
    localStorage.setItem("favArray", JSON.stringify(favArray));
    console.log(favArray);
    createFavs();
})

//grabs info from local storage and puts on page
function createFavs() {
    var retrieveArray = JSON.parse(localStorage.getItem("favArray"));
    // $(".favorites").clear();
    console.log(retrieveArray);
    for (var i=0; i<retrieveArray.length; i++) {

        var getFavSrc = retrieveArray[i].favGifSrc
        var getFavActive = retrieveArray[i].favGifActive
        var getFavStill = retrieveArray[i].favGifStill
        
        var newFav = $("<img>")
            .addClass("gif")
            .attr("data-active", getFavActive)
            .attr("data-still", getFavStill)
            .attr("data-state", "still")
            .attr("src", getFavSrc);
        
        $(".favorites").prepend(newFav); 
    }
}
createFavs();


