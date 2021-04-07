class Food{
    
    constructor(){
        this.image = loadImage("Milk.png");
        this.foodStock = 0;
        this.lastFed;
        this.input = createInput("NAME YOUR PET");
        this.petN = createElement('h2');
        this.savebutton = createButton("SAVE");
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    deductFoodStock(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock - 1;
        }
    }

    bedroom(){
        imageMode(CENTER);
        image(bedroom,350,250,700,500);
    }

    garden(){
        imageMode(CENTER);
        image(garden,350,250,700,500);
    }

    washroom(){
        imageMode(CENTER);
        image(washroom,350,250,700,500);
    }

    display(){

        this.input.position(850,100);
        this.savebutton.position(950,75);

        this.savebutton.mousePressed(()=>{
            this.input.hide();
            this.savebutton.hide();
            this.petN.html(this.input.value());
            this.petN.position(925,75);
        })

        var x = 55;
        var y = 50;

        imageMode(CENTER);

        if(this.foodStock !== 0){
            for(var i = 0; i<this.foodStock; i++){
                if(i % 10 === 0){
                    x = 75;
                    y = y + 70;
                }
                image(this.image,x,y,70,70);
                x = x + 30;
            }
        }
    }

}