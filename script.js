$('.save-button').on('click', function(){
  console.log("this click event is working");
  generateIdea();
})


function generateIdea (){
  var userTitle = $('.user-title');
  var userBody = $('.user-body');
  var cardArray = []
  new Card(userTitle.value, userBody.value);
  console.log("that's an unoriginal idea");
  console.log(cardArray.title)
}


function Card (title, body, quality) {
  // var userTitle = $('.user-title');
  // var userBody = $('.user-body');
  this.title = title;
  this.body = body;
  $('.idea-list').prepend(this.createCardHtml());
}

Card.prototype.createCardHtml = function(){
  var userTitle = $('.user-title');
  var userBody = $('.user-body');
  return `<article class="idea-card">
      <span>
        <h2>${userTitle.val()}</h2>
        <button type="button" class="button delete-button"></button>
      </span>
      <p>${userBody.val()}</p>
      <button type="button" class="button upvote-button"></button>
      <button type="button" class="button downvote-button"></button>
      <span>
        <p>quality: swill </p>
      </span>
    </article>`
}
