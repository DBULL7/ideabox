var cardArray = [];

$('.save-button').on('click', function(){
  console.log("the save button is working!");
  var idea = new Card ($('.user-title').val(), $('.user-body').val());
  createCardHtml(idea);
  addToCardArray(idea);
  stringify(idea);
  clearInputs();
})

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
      <span>
        <h2 contenteditable="true">${cardData.title}</h2>
        <button type="button" class="button delete-button"></button>
      </span>
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

function stringify() {
  var stringifiedCardArray = JSON.stringify(cardArray);
  console.log("Make sure this thing is stringified: " + stringifiedCardArray);
  localStorage.setItem('uid', stringifiedCardArray);
}

function getData() {
  var ideaObject = localStorage.getItem('uid');
  var unstringify = JSON.parse(ideaObject)
  console.log("The retrieved data is " + unstringify);
  unstringify.forEach(function (card) {
    console.log(card);
    createCardHtml(card);
    addToCardArray(card);
  });


}

function addToCardArray(newCard){
  cardArray.push(newCard);
  console.log(cardArray);
}

function clearInputs() {
  $('.user-title').val("");
  $('.user-body').val("");
}
