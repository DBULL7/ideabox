$('.save-button').on('click', function(){
  console.log("this click event is working");
  generateIdea();
})


function generateIdea (){
  new Card($('.user-title').val(), $('.user-body').val());
  console.log("that's an unoriginal idea");
}


function Card ($title, body) {
  this.title = $title;
  this.body = body;
  $('.idea-list').prepend(this.createCardHtml());
}

Card.prototype.createCardHtml = function(){
  console.log(`<article class="idea-card">
      <span>
        <h2>${title}</h2>
        <button type="button" class="button delete-button"></button>
      </span>
      <p>${body}</p>
      <button type="button" class="button upvote-button"></button>
      <button type="button" class="button downvote-button"></button>
      <span>
        <p>quality: swill</p>
      </span>
    </article>`
  );

}
