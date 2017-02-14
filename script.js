$('.save-button').on('click', function(){
  console.log("the save button is working!");
  var idea = new Card ($('.user-title').val(), $('.user-body').val());
  createCardHtml(idea);
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
        <h2>${cardData.title}</h2>
        <button type="button" class="button delete-button"></button>
      </span>
      <p>${cardData.body}</p>
      <button type="button" class="button upvote-button"></button>
      <button type="button" class="button downvote-button"></button>
      <span>
        <p>${cardData.quality}</p>
      </span>
    </article>`
  )
  console.log("Here is the card id: " + cardData.id)
}

function stringify(ideaObj) {
  var stringifiedCard = JSON.stringify(ideaObj);
  console.log("Make sure this thing is stringified: " + stringifiedCard);
  localStorage.setItem('uid', stringifiedCard);

}

function getData() {
  var ideaObject = localStorage.getItem('uid');
  console.log("The retrieved data is " + ideaObject);
  createCardHtml(ideaObject);
}

function clearInputs() {
  $('.user-title').val("");
  $('.user-body').val("");
}
