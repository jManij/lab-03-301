'use strict';

console.log('working');


//Holds all Animal Object
const allAnimals = [];

//Animal Object Constructor
const Animal = function(title, url, description, keyword, horns) {
  this.title = title;
  this.url = url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
};

//Rendering with handlebars
Animal.prototype.renderWithHandleBars = function() {
  const source = $('#animals-template').html();
  const template = Handlebars.compile(source);
  const newHtml = template(this);

  $('#animals').append(newHtml);
};

//Populate items on filters
Animal.prototype.filterWithJQuery = function() {
  const $selectEl = $('<option></option>');
  $selectEl.attr('value', this.keyword).text(this.keyword);

  $('header>select').append($selectEl);
};


Animal.getAllAnimalsFromFile = () => {  
  //Determine which json file to look into. 
  const filePath = $('body').attr('id') === 'index' ? './data/page-1.json' : '../data/page-2.json';
  const fileType = 'json';

  $.get(filePath, fileType).then(myAnimalJSON => {
    myAnimalJSON.forEach(animal => {
      // new Animal(animal.title, animal.url, animal.description, animal.keyword, animal.horns);
      allAnimals.push(new Animal(animal.title, animal.image_url, animal.description, animal.keyword, animal.horns));
    });

    //Render each animal with handle bar function
    allAnimals.forEach(animal => {
      animal.renderWithHandleBars();
      animal.filterWithJQuery();
    });

  });
};


Animal.getAllAnimalsFromFile();

