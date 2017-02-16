//On page load get cards from local storage: line 71
getData();

//Disable save button on page load: line 203
disableSaveBtn();



//////////////Save Button Event Listener/////////////////



//When save is clicked generate new card and store it
$('.save-button').on('click', function(){
  var idea = new Card ($('.user-title').val(), $('.user-body').val());
  createCardHtml(idea);
  stringify(idea);
  clearInputs();
  disableSaveBtn();
  console.log("Number of objects in local storage: " + localStorage.length);
  addSpaceInConsole();
});



////////////////Construtor and Html Generator////////////



//Card Construtor
function Card (title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}


//create unique element in the DOM taking data from Construtor
function createCardHtml(cardData) {
  $('.idea-list').prepend(
    `<article class="idea-card" id="${cardData.id}">
      <h2 class="title-text" contenteditable="true">${cardData.title}</h2>
      <button type="button" class="button delete-button" aria-label="delete button"></button>
      <p class="body-text idea-text" contenteditable="true">${cardData.body}</p>
      <button type="button" class="button upvote-button" aria-label="up vote button"></button>
      <button type="button" class="button downvote-button" aria-label="down vote button"></button>
      <p class="card-quality idea-text">quality: ${cardData.quality}</p>
    </article>`
  );
  console.log("Here is the card id: " + cardData.id);
}



//////////////////////Delete Button/////////////////////



//Event listener for delete button
$('.idea-list').on('click', '.delete-button', function() {
  $(this).parent().remove(); //Removes from DOM
  var parentCardId = $(this).parent().attr('id');
  localStorage.removeItem(parentCardId); //Removes from storage
  console.log("terminated card id # : " + parentCardId);
  addSpaceInConsole();
});



/////////////////////Persistence//////////////////////



//For each item in local storage, parse it, and recreate it in the DOM
function getData() {
  for (var key in localStorage) {
    var unstringify = JSON.parse(localStorage[key]);
   console.log("Reloaded a precious object! title:" + unstringify.title);
   createCardHtml(unstringify);
   addSpaceInConsole();
  }
}



///////////////////Saves edits to Cards///////////////////



//When focused it parses the card from local storage, when unfocused it stringifies the title and body back into local storage
$('.idea-list').on('focus', '.title-text, .body-text', function() {
    var grabCard = $(this).closest('.idea-card');
    var key = grabCard.attr('id');
    var getIdea = JSON.parse(localStorage.getItem(key));
    $(this).on('keyup', function(event) {
      if (event.keyCode === 13) {
         event.preventDefault();
        $(this).blur();
        return false;
      }
    });

    $(this).on('blur', function() {
      getIdea.title = grabCard.find('.title-text').text();
      getIdea.body = grabCard.find('.body-text').text();
      localStorage.setItem(key, JSON.stringify(getIdea));
      console.log(getIdea);
    });
});



/////////////////Upvote and Downvote Buttons///////////////



//Upvote button event listener
$('.idea-list').on('click', '.upvote-button', function(){
  var quality = $(this).siblings('.card-quality');
  var key = $(this).closest('.idea-card').attr('id');
  var parseIdea = JSON.parse(localStorage.getItem(key));
  // console.log(quality.text());
    switch (quality.text()){
      case 'quality: swill':
        $(quality).text("quality: plausible");
        break;
      case 'quality: plausible':
        $(quality).text("quality: genius");
        break;
      default:
       $(quality).text('quality: genius');
  }
  parseIdea.quality = quality.text();
  localStorage.setItem(key, JSON.stringify(parseIdea));
});


//Downvote button event listener
$('.idea-list').on('click', '.downvote-button', function(){
  var quality = $(this).siblings('.card-quality');
  var key = $(this).closest('.idea-card').attr('id');
  var parseIdea = JSON.parse(localStorage.getItem(key));
  // console.log(quality.text());
    switch (quality.text()){
      case 'quality: genius':
        $(quality).text("quality: plausible");
        break;
      case 'quality: plausible':
        $(quality).text("quality: swill");
        break;
      default:
        $(quality).text('quality: swill');

  }
  parseIdea.quality = quality.text();
  localStorage.setItem(key, JSON.stringify(parseIdea));
});



//////////////////////////Search///////////////////////////



//Event listener, takes search field value
$('.search-box').on('keyup', function(){
  var search = $(this).val().toLowerCase();
  var cards = $('.idea-card');
  cards.each(function(i, card){
    var cardText = $(card).text().toLowerCase();
    var textMatch = cardText.indexOf(search) !== -1;
    $(card).toggle(textMatch);
  });
});



///////////////////////Convenient Functions/////////////////



//Stringify new input and store it
function stringify(idea) {
  localStorage.setItem(idea.id, JSON.stringify(idea));
  console.log('Stringified working!');
}


//Makes it easier to read/understand the console
function addSpaceInConsole() {
  console.log("");
}


//Clears the input fields
function clearInputs() {
  $('.user-title').val("");
  $('.user-body').val("");
}


//Disables save button if input fields are empty
$('.user-title, .user-body').on('keyup', function(){
  disableSaveBtn();
});


function disableSaveBtn() {
  var $userTitle = $('.user-title').val();
  var $userBody = $('.user-body').val();
  if ($userTitle === "" || $userBody === "") {
    $('.save-button').prop('disabled', true);
  } else {
    $('.save-button').prop('disabled', false);
  }
}
