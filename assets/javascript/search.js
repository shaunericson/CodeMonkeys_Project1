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
    var itemText = "<h2>Item " + itemTitleNum + ":&nbsp;" + itemTitleStr + "</h2>";

    //  Description
    // itemText += "<h6>Item Description: " + itemTextDesc + "</h6>";

    // Item URL
    if( CURR_DEBUG ) {
      console.log ("********************");
      console.log ("itemURL = " + itemURL);
      console.log ("********************");
    }
    itemText += " <span>Link to Thumb: <a href='" + itemURL + "'>" + itemURL + "</a></span>";
    if( CURR_DEBUG ) {
      console.log ("++++++++++++++++++++");
      console.log("itemText = " + itemText);
      console.log ("++++++++++++++++++++");
    }

    // APPEND TEXT
    screenCard.html(itemText);
    $("#foodsSelected").append(screenCard);
    var imageCard = $("<div>").attr("class", "card");
    if( CURR_DEBUG ) {
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
$("#category-btn").on("click", function () {
    $("#card-section").html("");
    var urlBase = "https://www.themealdb.com/api/json/v1/1/categories.php"
    var url = urlBase;
    if( DEBUG ) {
      console.log (url);
    }
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      if( DEBUG ) {
        console.log(result);
      }
      var numItems = result.categories.length;
      for (var i=0; i<numItems; i++) {
        var itemTitleNum = result.categories[i].idCategory;
        var itemTitleStr = result.categories[i].strCategory;
        var itemTextDesc = result.categories[i].strCategoryDescription;
        var itemURL = result.categories[i].strCategoryThumb;
        var imageHTML = "<img src=" + result.categories[i].strCategoryThumb + " alt='Food Category Pic'>";
        createJQuery(itemTitleNum, itemTitleStr, itemTextDesc, itemURL, imageHTML);
      }
    })
    .fail(function(err) {
      throw err;
    });
  });

// Cusine Button
$("#cuisine-btn").on("click", function () {
  $("#card-section").html("");
  var mySearchString = $("#q-search-term").val().trim();
  console.log("mySearchString = " + mySearchString);

  if (mySearchString) {
    var urlBase = "https://www.themealdb.com/api/json/v1/1/filter.php"
    var url = urlBase + '?a=' + mySearchString;
  } else {
    var urlBase = "https://www.themealdb.com/api/json/v1/1/random.php";
    var url = urlBase;
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
      var itemTextDesc = "";
      var itemURL = result.meals[i].strMealThumb;
      var imageHTML = "<img src=" + result.meals[i].strMealThumb + " alt='Food Meal Pic'>";

      createJQuery(itemTitleNum, itemTitleStr, itemTextDesc, itemURL, imageHTML);
    }
  })
  .fail(function(err) {
    throw err;
  });
});

// Random Drink Button
$("#random-drink-btn").on("click", function () {
  $("#card-section").html("");
  var mySearchString = $("#q-search-term").val().trim();
  console.log("mySearchString = " + mySearchString);

  var urlBase = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  var url = urlBase; 
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
    var numItems = result.drinks.length;
    for (var i=0; i<numItems; i++) {
      var itemTitleNum = result.drinks[i].idDrink;
      var itemTitleStr = result.drinks[i].strDrink;
      var itemTextDesc = "";
      var itemURL = result.drinks[i].strDrinkThumb;
      var imageHTML = "<img src=" + result.drinks[i].strDrinkThumb + " alt='Random Drink Pic'>";

      createJQuery(itemTitleNum, itemTitleStr, itemTextDesc, itemURL, imageHTML);
    }
  })
  .fail(function(err) {
    throw err;
  });
});


// var success = {};
// var resText = "";
// var data = {};

// function readFile(text) {
//   jQuery.get ('FoodDrinkMatrix.txt', function(txt){
//     $(".text-result").text(txt);
//   });
// };





var cuisCategory = {
  beef : {
    ID:     1,
    name:   "Beef",
    drinks: [
      12213,  // Singapore
      12214,  // Singapore Sling 
      12215 ] // Sling
  },
  chicken : {
    ID:     2,
    name:   "Chicken",
    drinks: [
      12113,  // Singapore2
      12114,  // Sling Singapore2
      12115 ] // Sling2
  },
};

var cuisRegion =  {
  american : {
    ID:     1,
    name:   "American",
    drinks: [
      12215,  // Singapore3
      12214,  // Singapore Sling3
      12213 ] // Sling3
  },
  british : {
    ID:     2,
    name:   "British",
    drinks: [
      12115,  // Singapore4
      12114,  // Sling Singapore4
      12113 ] // Sling4
  },
  canadian : {
    ID:     3,
    name:   "Canadian",
    drinks: [
      12015,  // Singapore5
      12014,  // Sling Singapore5
      12013 ] // Sling5
  }
};

/*

Name = Chinese
 
Name = Dutch
 
Name = French
 
Name = Greek
 
Name = Irish
 
Name = Italian
 
Name = Jamaican
 
Name = Malaysian
 
Name = Mexican
 
Name = Moroccan
 
Name = Russian
 
Name = Spanish
 
Name = Thai
 
Name = Vietnamese
 
*/

// $("#select-btn").on("click", function (event) {
/*         $("#dropdownMenuButton").on("click", function (event) {
  event.preventDefault();
  $("#card-section").html("");
  var foodCatSearchString = $("#food-cat-drop").val();
  console.log("foodCatSearchString = " + foodCatSearchString);

  // var urlBase = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  var urlBase = "https://www.themealdb.com/api/json/v1/1/list.php"
  var url = urlBase + "?c=" + foodCatSearchString; 
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
      var itemTitleNum = result.meals[i].strArea;
      var itemTitleStr = result.meals[i].strCategory;
      var itemTextDesc = result.meals[i].strCategoryDescription;
      var itemURL = result.meals[i].strCategoryThumb;
      var imageHTML = "<img src=" + itemURL + " alt='Food Category Pic'>";
      createJQuery(itemTitleNum, itemTitleStr, itemTextDesc, itemURL, imageHTML);
    }
})
  .fail(function(err) {
    throw err;
  });
});    */

// $("#select-btn").on("click", function (event) {
// $("#dropdownMenuButton").on("click", function (event) { // Takes action before selection
$(".dropdown-item").on("click", function (event) { //
  event.preventDefault();
  $("#card-section").html("");
  // var cuisAreaSearchString = $("#cuis-area-drop").val();
  console.log($(this));
  var cuisAreaSearchString = $(this).text();
  console.log("cuisAreaSearchString = " + cuisAreaSearchString);

  // var urlBase = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  var urlBase = "https://www.themealdb.com/api/json/v1/1/filter.php";
  var url = urlBase + "?a=" + cuisAreaSearchString; 
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
