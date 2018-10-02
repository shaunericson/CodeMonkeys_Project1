// Food n' Drink Search

$(document).ready(function(){
  // VARS
  // -------------------------------------------
  var DEBUG = false;
  var CURR_DEBUG = true;

  // FUNCTIONS
  // -------------------------------------------
  function createJQuery (itemTitleNum, itemTitleStr, itemURL, imageHTML, catIDin, regIDin) {
    var screenCard = $("<div>")
        .attr("class", "card")
        .attr("width", "18rem");
    var screenCardTitle =$("<h5>")
        .addClass("card-title")
        .attr("id",'item-link');
    var screenCardBody = $("<div>")
        .attr("class", "card-body")
    var goFindDrinks = $("<a>")
        .addClass("btn btn-primary go-find-btn")
        .attr("href", "#")
        .attr("role", "button")
        .attr("data-cat-id", catIDin)
        .attr("data-reg-id", regIDin)
        .attr("data-id", itemTitleNum)
        // .text("go-find-btn" + itemTitleNum + catIDin + regIDin);
        .text("Select");
        // .onclick(getDrinks(this.getAttribute(data-id),     // Jeff's vectored to 
        //                    this.getAttribute(data-cat-id),
        //                    this.getAttribute(data-reg-id)));

    // Title
    var itemText = "<h5 id='item-link'><a href='" + itemURL + "'>" + itemTitleStr + "</a></h5>";

    // Item URL
    if( DEBUG ) {
      console.log ("********************");
      console.log ("itemTitleNum = " + itemTitleNum);
      console.log ("itemTitleStr = " + itemTitleStr);
      console.log ("itemURL = " + itemURL);
      console.log("itemText = " + itemText);
      console.log ("imageHTML = " + imageHTML);
      console.log ("********************");
    };

    // APPEND TITLE
    screenCardTitle.html(itemText);
    screenCard.append(screenCardTitle);

    // APPEND SELECT BUTTON FOR THIS MEAL
    screenCard.append(goFindDrinks);

    // APPEND IMAGE  
    screenCardBody.html(imageHTML);
    screenCard.append(screenCardBody);

    // APPEND CARD TO PAGE
    $("#foodsSelected").append(screenCard);
  };

  // Display the Drinks for this meal selection
  function showDrinksJQuery (mealIdDrinksIn) {
    mealIdDrinksIn.map(function (array, index) {
      console.log(array );
      console.log( index);
      var drinkCard = $("<div>")
        .attr("class", "card")
        .attr("id", "drink-selected") // TBD Not used?
        .attr("width", "18rem");
      var drinkCardTitle =$("<h5>")
        .attr("class", "card-title");
        // .attr("id", "drink-title"); // TBD Not used?
      var drinkCardBody = $("<div>")
        .attr("class", "card-body");
        // .attr("id", "drink-body"); // TBD Not used?

      // Drink URL from appropriate FoodDrinkObjects cuisType/cuisRegion.cat/reg.drinks[]
      var baseURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php";
      var drinkIDtoGet = array;
      var searchURL = "?i=" + drinkIDtoGet;
      var url = baseURL + searchURL;
      
      console.log ( drinkIDtoGet );
      console.log ( array);
      console.log ( searchURL = "?i=" + drinkIDtoGet);
      console.log ( url = baseURL + searchURL);

      if( CURR_DEBUG ) {
        console.log (url);
      };
  
      // Do AJAX call with this url to get drink name and pic
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
        if( CURR_DEBUG ) {
          console.log(result);
        }
        var drinkTitleNum = result.drinks[0].idDrink;
        var drinkTitleStr = result.drinks[0].strDrink;
        var drinkURL = result.drinks[0].strDrinkThumb;
        var drinkImageHTML = "<img src=" + drinkURL + " alt='Drink Pic' class='drink-image'>";

        //  Title
        var drinkText = "<h5 id='drink-link'><a href='" + drinkURL + "'>" + drinkTitleStr + "</a></h5>";

        if( CURR_DEBUG ) {
          console.log ("********************");
          console.log ("drinkTitleNum = " + drinkTitleNum);
          console.log ("drinkTitleStr = " + drinkTitleStr);
          console.log ("drinkURL = " + drinkURL);
          console.log ("drinkText = " + drinkText);
          console.log ("drinkImageHTML = " + drinkImageHTML);
          console.log ("********************");
        }

        // APPEND TITLE
        drinkCardTitle.html(drinkText);
        drinkCard.append(drinkCardTitle);

        // ADD BUTTON TO SELECT DRINK AND STORE MEAL/DRINK PAIR IN FIREBASE
        
        
        // APPEND IMAGE
        drinkCardBody.html(drinkImageHTML);
        drinkCard.append(drinkCardBody);

        // APPEND CARD TO PAGE
        $("#drinksSelected").append(drinkCard);
      } )
      .fail(function(err) {
        throw err;
      });
    })
  };

  // BUTTON Section 
  // ===================================================
  // Cusine Button and Region Button Combined
  // -------------------------------------------
  $(".dropdown-item").on("click", function (event) {
    event.preventDefault();
    $("#foodsSelected").html(""); // Clears Panel
    $("#drinksSelected").html(""); // Clears Panel
    var cuisSearchString = $(this).text();
    var btnType = $(this).attr("data-type");
    var urlBase = "https://www.themealdb.com/api/json/v1/1/filter.php";
    if ( btnType === "cat") {
      var url = urlBase + "?c=" + cuisSearchString; 
      var catID = $(this).attr("id");
      var regID = null;
    };
    if ( btnType === "area") {
      var url = urlBase + "?a=" + cuisSearchString; 
      var catID = null;
      var regID = $(this).attr("id");;
    };
    if( CURR_DEBUG ) {
      console.log ("--------------------");
      console.log($(this));
      console.log("cuisSearchString = " + cuisSearchString);
      console.log("catID = " + catID);
      console.log("regID = " + regID);
      console.log ("--------------------");
  };

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
        var imageHTML = "<img src=" + itemURL + " alt='Food Category Pic' class='item-image'>";
        createJQuery(itemTitleNum, itemTitleStr, itemURL, imageHTML, catID, regID);
      }
    })
    .fail(function(err) {
      throw err;
    });
  });

  // Select Button on each meal presented
  // -------------------------------------------
  // Go find drinks for this selection...
  $("#foodsSelected").on("click", ".go-find-btn", function () { // ADDED ".go-find-btn" to get JS to dive into the object
      console.log("WE GOT HERE, via .go-find-btn,  SELECTED A MEAL!!!");
      console.log("===========================");
      console.log(this);
      console.log("===========================");
      event.preventDefault();
      $("#drinksSelected").html(""); // Clears Panel, but need to represent meal selected
      var mealID = $(this).attr("data-id");
      var getDrinkCatID = $(this).attr("data-cat-id");
      var getDrinkRegID = $(this).attr("data-reg-id");
      var mealID = $(this).attr("data-id");
      if( CURR_DEBUG ) {
        console.log($(this));
        console.log("mealID = " + mealID);
        console.log("getDrinkCatID = " + getDrinkCatID);
        console.log("getDrinkRegID = " + getDrinkRegID);
      }

      if (getDrinkCatID !== undefined) {
        var mealIdDrinks = cuisType[getDrinkCatID].drinks;
        if( DEBUG ) {
          console.log("cuisType = ", cuisType);
          console.log(cuisType);
          console.log("cuisType.getDrinkCatID = ", cuisType.getDrinkCatID);
          console.log( cuisType[getDrinkCatID]);
          console.log("cuisType.getDrinkCatgID.drinks = ", cuisType[getDrinkCatID].drinks);
          console.log( mealIdDrinks);
        }
      };
      // Instead of if/else, this construct leaves the hooks in to select based on BOTH later.
      if (getDrinkRegID !== undefined) {
        var mealIdDrinks = cuisRegion[getDrinkRegID].drinks;
        if( DEBUG ) {
          console.log("cuisRegion = ", cuisRegion);
          console.log(cuisRegion);
          console.log("cuisRegion.getDrinkRegID = ", cuisRegion.getDrinkRegID);
          console.log( cuisRegion[getDrinkRegID]);
          console.log("cuisRegion.getDrinkRegID.drinks = ", cuisRegion[getDrinkRegID].drinks);
        }
      };
      if( CURR_DEBUG ) {
        console.log( mealIdDrinks);
      }
      showDrinksJQuery(mealIdDrinks); 
    } );
});
