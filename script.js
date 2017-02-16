$('.save-button').on('click', function(){
  var idea = new Card ($('.user-title').val(), $('.user-body').val());
  createCardHtml(idea);
  stringify(idea);
  clearInputs();
  console.log("Number of objects in local storage: " + localStorage.length);
  addSpaceInConsole();
});

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
      <h2 class="title-text" contenteditable="true">${cardData.title}</h2>
      <button type="button" class="button delete-button"></button>
      <p class="body-text idea-text" contenteditable="true">${cardData.body}</p>
      <button type="button" class="button upvote-button"></button>
      <button type="button" class="button downvote-button"></button>
      <p class="card-quality idea-text">quality: ${cardData.quality}</p>
    </article>`
  );
  console.log("Here is the card id: " + cardData.id);
}

$('.idea-list').on('click', '.delete-button', function() {
  $(this).parent().remove(); //Removes from DOM
  var parentCardId = $(this).parent().attr('id');
  localStorage.removeItem(parentCardId); //Removes from storage
  console.log("terminated card id # : " + parentCardId);
  addSpaceInConsole();
});

function stringify(idea) {
  localStorage.setItem(idea.id, JSON.stringify(idea));
  console.log('Stringified working!');
}

function getData() {
  for (var key in localStorage) {
    var unstringify = JSON.parse(localStorage[key]);
   console.log("Reloaded a precious object! title:" + unstringify.title);
   createCardHtml(unstringify);
   addSpaceInConsole();
  }
}

$('.idea-list').on('focus', '.title-text, .body-text', function() {
    var grabCard = $(this).closest('.idea-card');
    var key = grabCard.attr('id');
    var getIdea = JSON.parse(localStorage.getItem(key));
    $(this).on('keyup', function(event) {
      if (event.keyCode === 13) {
         event.preventDefault()
        $(this).blur()
        return false
      }
    })

    $(this).on('blur', function() {
      getIdea.title = grabCard.find('.title-text').text();
      getIdea.body = grabCard.find('.body-text').text();
      localStorage.setItem(key, JSON.stringify(getIdea));
      console.log(getIdea)
    })
})

$('.idea-list').on('click', '.upvote-button', function(){
  var quality = $(this).siblings('.card-quality');
  var key = $(this).closest('.idea-card').attr('id');
  var parseIdea = JSON.parse(localStorage.getItem(key));
  // console.log(quality.text());
    switch (quality.text()){
      case 'swill':
        $(quality).text("plausable");
        break;
      case 'plausable':
        $(quality).text("genius");
        break;
      default:
       'swill'
  }
  parseIdea.quality = quality.text();
  localStorage.setItem(key, JSON.stringify(parseIdea));
  // console.log(getQuality)
})

$('.idea-list').on('click', '.downvote-button', function(){
  var quality = $(this).siblings('.card-quality');
  var key = $(this).closest('.idea-card').attr('id');
  var parseIdea = JSON.parse(localStorage.getItem(key));
  // console.log(quality.text());
    switch (quality.text()){
      case 'genius':
        $(quality).text("plausable");
        break;
      case 'plausable':
        $(quality).text("swill");
        break;
      default:
       'swill'
  }
  parseIdea.quality = quality.text();
  localStorage.setItem(key, JSON.stringify(parseIdea));
  // console.log(getQuality)
})

function addSpaceInConsole() {
  console.log("");
}

function clearInputs() {
  $('.user-title').val("");
  $('.user-body').val("");
}
