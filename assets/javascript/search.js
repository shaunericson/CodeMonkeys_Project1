$(document).ready(function(){
  var DEBUG = false;
  var CURR_DEBUG = true;

function createJQuery (itemTitleNum, itemTitleStr, itemTextDesc, itemURL, imageHTML) {
  // for (var i=0; i<num; i++) {

    var screenCard = $("<div>").attr("class", "card");
    //  Title
    var itemText = "<h2>Item " + itemTitleNum + ">&nbsp;" + itemTitleStr + "</h2>";
    
    //  Description
    itemText += "<h6>Item Description: " + itemTextDesc + "</h6>";

    // Item URL
    if( DEBUG ) {
      console.log ("********************");
      console.log ("itemURL = " + itemURL);
      console.log ("********************");
    }
    itemText += " <span>Link to Thumb: <a href='" + itemURL + "'>" + itemURL + "</a></span>";
    // itemText += "<img src=" + itemURL + " alt='Food Category Pic'>";
    if( DEBUG ) {
      console.log ("++++++++++++++++++++");
      console.log("itemText = " + itemText);
      console.log ("++++++++++++++++++++");
    }

    // APPEND TEXT
    screenCard.html(itemText);
    $("#card-section").append(screenCard);
    var imageCard = $("<div>").attr("class", "card");
    if( DEBUG ) {
      console.log ("====================");
      console.log ("imageHTML = " + imageHTML);
      console.log ("====================");
    }

    // APPEND IMAGE
    imageCard.html(imageHTML);
    $("#card-section").append(imageCard);
  }  

// };


  $("#category-btn").on("click", function () {
    $("#card-section").html("");
    // Built by LucyBot. www.lucybot.com
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
      // console.log(JSON.parse(result));
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
  // var mySearchNumOfRecords = $("#num-of-reccords").val().trim();
  console.log("mySearchString = " + mySearchString);

  // Built by LucyBot. www.lucybot.com
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
      var itemTextDesc = ""; // result.meals[i].strCategoryDescription;
      var itemURL = result.meals[i].strMealThumb;
      var imageHTML = "<img src=" + result.meals[i].strMealThumb + " alt='Food Meal Pic'>";

      createJQuery(itemTitleNum, itemTitleStr, itemTextDesc, itemURL, imageHTML);
    }
  })
  .fail(function(err) {
    throw err;
  });
});


// 
// Random Drink Button
$("#random-drink-btn").on("click", function () {
  $("#card-section").html("");
  var mySearchString = $("#q-search-term").val().trim();
  // var mySearchNumOfRecords = $("#num-of-reccords").val().trim();
  console.log("mySearchString = " + mySearchString);

  // Built by LucyBot. www.lucybot.com
  var urlBase = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  var url = urlBase; // + '?a=' + mySearchString;
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
      var itemTextDesc = ""; // result.meals[i].strCategoryDescription;
      var itemURL = result.drinks[i].strDrinkThumb;
      var imageHTML = "<img src=" + result.drinks[i].strDrinkThumb + " alt='Random Drink Pic'>";

      createJQuery(itemTitleNum, itemTitleStr, itemTextDesc, itemURL, imageHTML);
    }
  })
  .fail(function(err) {
    throw err;
  });
});


});
