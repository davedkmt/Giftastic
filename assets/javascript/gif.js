var topics = ["The Lion King", "The Parent Trap", "Bad Boys", "X-Men"];


function renderButtons() {

  $("#movies-view").empty();


  for (var i = 0; i < topics.length; i++) {


    var a = $("<button>");

    a.addClass("movie");

    // a.attr("data-name", topics[i]);

    a.text(topics[i]);

    $("#movies-view").append(a);
  }
}


$("#add-movie").on("click", function(event) {

  event.preventDefault();


  var movie = $("#movie-input").val().trim();

  topics.push(movie);

  renderButtons();
});


// Starting new function for the ajax call
function movieOne() {
  var movies = $(this).attr("data-name");
  console.log(movies);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movies + "&limit=10&api_key=ojOde3HCV5zgk4JKv8K1n6i1gwGwr7XY";

  // ajax call
  $.ajax({
      url: queryURL,
      method: "GET"
    })

    .done(function(response) {
      console.log(response.data);

      var results = response.data;
      // for loop goes through each gif and adds these variables
      for (var i = 0; i < results.length; i++) {

        // dynamically creating divs and image to
        // Put data as a data-still when it generates

        var gifDiv = $('<div class=gifs>');
        var gifImage = $('<img>');

        gifImage.attr('src', results[i].images.fixed_height_still.url);
        gifImage.attr('title', "Rating: " + results[i].rating);
        gifImage.attr('data-still', results[i].images.fixed_height_still.url);
        gifImage.attr('data-state', 'still');
        gifImage.addClass('gif');
        gifImage.attr('data-animate', results[i].images.fixed_height.url);

        var rating = results[i].rating;
        var p = $('<p>').text('Rating: ' + rating);
        gifDiv.append(gifImage);
        gifDiv.append(p);

        $("#gifs-appear-here").prepend(gifDiv);
      }

    });
}

// Animating gifs
$(document).on('click', '.gif', function() {
  var state = $(this).attr('data-state');
  if (state == 'still') {
    $(this).attr('src', $(this).data('animate'));
    $(this).attr('data-state', 'animate');
  } else {
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
  }
});

// Displaying gifs
$(document).on("click", ".movie", movieOne);



renderButtons();
