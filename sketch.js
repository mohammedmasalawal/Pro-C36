var dog,happyDog,sadDog;
var dogImg;
var foodS,foodStock;
var database;

var feed;
var addFood

var fedTime,lastFed;

var foodObj;

var MILKimg;
var milk;

var changeGameState,readGameState;
var bedroom,garden,washroom;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
  sadDog = loadImage("deadDog.png");

  MILKimg = loadImage("Milk.png");

  bedroom = loadImage("Bed Room.png");
  garden = loadImage("Garden.png");
  washroom = loadImage("Wash Room.png");

}

function setup() {
  createCanvas(700,500);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  readGameState = database.ref('gameState');
  readGameState.on("value",(data)=>{
    gameState = data.val();
  })

  foodObj = new Food();

  feed = createButton("FEED YOUR PET");
  feed.position(750,60);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD FOR YOUR PET");
  addFood.position(550,60);
  addFood.mousePressed(addFoods);

  dog = createSprite(600,250,5,5);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  
}


function draw() {  
  background(46,159,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val()
  });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("LAST FED : " + lastFed%12 + " PM",300,75);
  }else if(lastFed === 0){
    text("LAST FED : 12 AM",300,75);
  }else{
    text("LAST FED : " + lastFed + " AM",300,75);
  }

  if(readGameState !== "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  currentTime = hour();
  if(currentTime === (lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime === (lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }

  drawSprites();

}

function feedDog(){

  dog.addImage(happyDog);

  if(foodS>0){
  milk = createSprite(550,300,70,70);
  milk.addImage(MILKimg);
  milk.scale = 0.09;
}

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}