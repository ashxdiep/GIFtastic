// making a variable for the array topic animals
var animals = ["monkey", "dog", "cat", "hamster", "goat", "pig", "wolf", "tiger",
"crow", "dragon", "cow", "sloth", "cockatoo", "turtle", "iguana", "toad", "frog",
"lion", "elephant", "giraffe", "zebra", "bear", "hippotamus", "crocodile", "lizard"];

//make a loop to make buttons for each topic in the array
for (var i = 0; i < animals.length; i++){

  //make the button
  var butt = $("<button>");
  //put data attribute of the animal inside the button
  $(butt).attr("data-animal", animals[i]);
  console.log($(butt).attr("data-animal"));


  //make a paragraph tag for button and put the name inside the button
  $(butt).html("<p>" + animals[i] + "</p>");

  //put the button inside the document
  $("#buttons").append(butt);
}

//for input button when someone inputs to make a new button
$("#submitted").on("click", function(event){
  // prevent page from refreshing when form tries to submit itself
  event.preventDefault();

  //change the value to that input
  var animal = $("#animalButton").val().trim();
  $("#animalButton").val(animal);

  //make the button
  var newButt = $("<button>");
  //put data attirbute of the animal inside the button
  $(newButt).attr("data-animal", animal);


  //put the name inside the button
  $(newButt).html("<p>" + animal + "</p>");

  //put the button inside the document
  $("#buttons").append(newButt);

});

//when one of the buttons is clicked
$("button").on("click", function(event){
  //clear the gifs that was there previously before
  $("#allgifs").empty();
  //make a variable and take the data attribute from that button
  var search = $(this).attr("data-animal");
  console.log("This attribute: " + search);

  //get the website for api to pull from (store it in variable)
  var url = "https://api.giphy.com/v1/gifs/search?api_key=e93422c652cb4c3281f9af8fa5cb58b2&q=" + search + "&limit=10&lang=en";

    //after done processing it in ajax
    $.ajax({
        url: url,
        method: "GET"
      })
      .done(function(response) {
    //for each of ten gifs
    console.log(response);
    for (var i =0; i < 10; i++){

      //make a div element for both rating and image
      var dividend = $("<div>");


      //mmake a paragraph element and put rating inside of it
      $(dividend).append("<p> Rating: " + response.data[i].rating + "</p>");

      //make an image element
      var dagif = $("<img>");

      //get the image and make an image element (starts with a still picture)
      $(dagif).attr("src", response.data[i].images.fixed_width_still.url);

      //give the image a data-state: still
      $(dagif).attr("data-state", "still");

      //give the imate a data-still and data-animate
      $(dagif).attr("data-still", response.data[i].images.fixed_width_still.url);
      $(dagif).attr("data-animate", response.data[i].images.fixed_width.url);
      $(dagif).attr("id", "gif");

      //append gif into dividend
      $(dividend).append(dagif);

      //append it to the document
      $("#allgifs").append(dividend);
    }
    });

  });

  //when an image is clicked on
  $(document).on("click", "#gif", function() {
    console.log("was just clicked on");

    //check the data state of the gif
    var state = $(event.target).attr("data-state");
    console.log("The state is " + state);

    //if the data state is still
    if (state === "still"){
      console.log("Confirming it is still");
      //change the image src to data animate value
      var animate = $(event.target).attr("data-animate");
      $(event.target).attr("src", animate );
      console.log("checking that it is now animate " + $(event.target).attr("src"));

      //change the data state to animate
      $(event.target).attr("data-state", "animate");
    }
    //else
    else{

      //change image src to data still value
      var still = $(event.target).attr("data-still");
      $(event.target).attr("src", still);

      //change the data state to still
      $(event.target).attr("data-state", "still");
    }
});
