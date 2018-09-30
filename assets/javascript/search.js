// Food n' Drink Search

$(document).ready(function(){
  // VARS
  // -------------------------------------------
  var DEBUG = false;
  var CURR_DEBUG = true;

  // FUNCTIONS
  // -------------------------------------------
  function createJQuery (itemTitleNum, itemTitleStr, itemURL, imageHTML) {
    // var screenCard = $("<div>").attr("class", "card");
    var screenCard = $("<div>").attr("id", "foodsSelected");
    //  Title
    var itemText = "<h5 id='item-link'><a href='" + itemURL + "'>" + itemTitleStr + "</a></h5>";

    // Item URL
    if( DEBUG ) {
      console.log ("********************");
      console.log ("itemTitleNum = " + itemTitleNum);
      console.log ("itemTitleStr = " + itemTitleStr);
      console.log ("itemURL = " + itemURL);
      console.log("itemText = " + itemText);
      console.log ("********************");
    }

    // APPEND TEXT
    screenCard.html(itemText);
    $("#foodsSelected").append(screenCard);
    var imageCard = $("<div>").attr("class", "card");
    imageCard.attr("id", "item-image");
    if( DEBUG ) {
      console.log ("====================");
      console.log ("imageHTML = " + imageHTML);
      console.log ("====================");
    }

    // APPEND IMAGE
    imageCard.html(imageHTML);
    $("#foodsSelected").append(imageCard);
  }  

    // BUTTON Section 
    // -------------------------------------------

// Random Drink Button
// $("#random-drink-btn").on("click", function () {
//   $("#card-section").html("");
//   var mySearchString = $("#q-search-term").val().trim();
//   console.log("mySearchString = " + mySearchString);

//   var urlBase = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
//   var url = urlBase; 
//   if( CURR_DEBUG ) {
//     console.log (url);
//   }
//   $.ajax({
//     url: url,
//     method: 'GET',
//   }).done(function(result) {
//     if( CURR_DEBUG ) {
//       console.log(result);
//     }
//     var numItems = result.drinks.length;
//     for (var i=0; i<numItems; i++) {
//       var itemTitleNum = result.drinks[i].idDrink;
//       var itemTitleStr = result.drinks[i].strDrink;
//       var itemTextDesc = "";
//       var itemURL = result.drinks[i].strDrinkThumb;
//       var imageHTML = "<img src=" + result.drinks[i].strDrinkThumb + " alt='Random Drink Pic'>";

//       createJQuery(itemTitleNum, itemTitleStr, itemTextDesc, itemURL, imageHTML);
//     }
//   })
//   .fail(function(err) {
//     throw err;
//   });
// });





// Cusine Button and Region Button Combined
$(".dropdown-item").on("click", function (event) {
  event.preventDefault();
  $("#foodsSelected").html("");
  var cuisSearchString = $(this).text();
  var btnType = $(this).attr("data-type");
  var urlBase = "https://www.themealdb.com/api/json/v1/1/filter.php";
  if ( btnType === "cat") {
    var url = urlBase + "?c=" + cuisSearchString; 
  }
  if ( btnType === "area") {
    var url = urlBase + "?a=" + cuisSearchString; 
  }
  if( DEBUG ) {
    console.log ("--------------------");
    console.log($(this));
    console.log("cuisSearchString = " + cuisSearchString);
    console.log ("--------------------");
  }

  if( CURR_DEBUG ) {
    console.log (url);
  }
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    if( CURR_DEBUG ) {
      console.log(result);
    }
    var numItems = result.meals.length;
    for (var i=0; i<numItems; i++) {
      var itemTitleNum = result.meals[i].idMeal;
      var itemTitleStr = result.meals[i].strMeal;
      var itemURL = result.meals[i].strMealThumb;
      var imageHTML = "<img src=" + itemURL + " alt='Food Category Pic'>";
      createJQuery(itemTitleNum, itemTitleStr, itemURL, imageHTML);
    }
})
  .fail(function(err) {
    throw err;
  });
});

});
