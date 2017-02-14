$('.save-button').on('click', function(){
  console.log("the save button is working!");
  var idea = new Card ($('.user-title').val(), $('.user-body').val());
  createCardHtml(idea);
  stringify(idea);
  clearInputs();
})

function Card (title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

function createCardHtml(idea) {
  $('.idea-list').prepend(
    `<article class="idea-card" id="${idea.id}">
      <span>
        <h2>${idea.title}</h2>
        <button type="button" class="button delete-button"></button>
      </span>
      <p>${idea.body}</p>
      <button type="button" class="button upvote-button"></button>
      <button type="button" class="button downvote-button"></button>
      <span>
        <p>${idea.quality}</p>
      </span>
    </article>`
  )
  console.log("Here is the card id: " + idea.id)
}

function stringify(idea) {
  var stringifiedCard = JSON.stringify(idea);
  console.log("Make sure this thing is stringified: " + stringifiedCard);
  localStorage.setItem(idea.id, stringifiedCard)
}

function clearInputs() {
  $('.user-title').val("");
  $('.user-body').val("");
}
