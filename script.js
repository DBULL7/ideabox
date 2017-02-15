// var cardArray = [];

$('.save-button').on('click', function(){
  var idea = new Card ($('.user-title').val(), $('.user-body').val());
  createCardHtml(idea);
  // addToCardArray(idea);
  stringify(idea);
  clearInputs();
  console.log("Number of objects in local storage: " + localStorage.length)
  addSpaceInConsole();
})

$('.delete-button').on('click')

getData();

function Card (title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

function createCardHtml(cardData) {
  $('.idea-list').prepend(
    `<article class="idea-card" id="${cardData.id}">
      <h2 contenteditable="true">${cardData.title}</h2>
      <button type="button" class="button delete-button"></button>
      <p contenteditable="true">${cardData.body}</p>
      <button type="button" class="button upvote-button"></button>
      <button type="button" class="button downvote-button"></button>
      <span>
        <p>${cardData.quality}</p>
      </span>
    </article>`
  )
  console.log("Here is the card id: " + cardData.id)
}

$('.idea-list').on('click', '.delete-button', function() {
  $(this).parent().remove(); //Removes from DOM
  var parentCardId = $(this).parent().attr('id');
  localStorage.removeItem(parentCardId); //Removes from storage
  console.log("terminated card id # : " + parentCardId)
  addSpaceInConsole();
  // console.log(id);
});


function stringify(idea) {
  localStorage.setItem(idea.id, JSON.stringify(idea));
  console.log('Stringified working!');
  // localStorage.setItem('idea.id', stringifiedCardArray);
}


function getData() {
  for (var key in localStorage) {
    var unstringify = JSON.parse(localStorage[key])
   console.log("Reloaded a precious object! title:" + unstringify.title);
   createCardHtml(unstringify);
   addSpaceInConsole()
    // var ideaObject = localStorage.getItem([key]);
    // var unstringify = JSON.parse(ideaObject)
    // console.log("The retrieved data is " + unstringify);
    // unstringify.forEach(function (card) {
    //   console.log(card);
    // createCardHtml(unstringify);
    // addToCardArray(unstringify);
  }
}

function addSpaceInConsole() {
  console.log("");
}

// function addToCardArray(newCard){
//   cardArray.push(newCard);
//   console.log(cardArray);
// }

function clearInputs() {
  $('.user-title').val("");
  $('.user-body').val("");
}
