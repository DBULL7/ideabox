$('.save-button').on('click', function(){
  console.log("this click event is working");
  generateIdea();
})

function generateIdea (){
  var $userTitle = $('.user-title');
  var $userBody = $('.user-body');
  var cards = new Card($userTitle.val(), $userBody.val());
  console.log("that's an unoriginal idea");
  var cardArray = [];
  cardArray.push(cards);
  cardArray.forEach(function(input, index, array){
    console.log({
      currentValue: input,
      currentIndex: index,
      fullArray: array
    });
  });
  for (var i = 0; i < cardArray.length; i++){
    var storage = JSON.stringify(cardArray);
    localStorage.setItem('cardStorage', storage);
    console.log(cards);
    console.log(cardArray[i]);
  }
}

function Card ($title, $body, $id, $quality) {
  this.title = $title;
  this.body = $body;
  this.id = $id;
  this.quality = $quality;
  $('.idea-list').prepend(this.createCardHtml());
}

Card.prototype.createCardHtml = function(){
  return `<article class="idea-card">
      <span>
        <h2>${this.title}</h2>
        <button type="button" class="button delete-button"></button>
      </span>
      <p>${this.body}</p>
      <button type="button" class="button upvote-button"></button>
      <button type="button" class="button downvote-button"></button>
      <span>
        <p>quality: ${this.quality} </p>
      </span>
    </article>`
}
