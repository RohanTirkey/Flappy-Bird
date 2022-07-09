// JAVASCRIPT CODE //


// select cvs
const cvs = document.getElementById("bird");
const ctx = cvs.getContext("2d");

// game vars and conts
let frames = 0;
const Degree = Math.PI/180;

// load spirit image
const sprite = new Image();
sprite.src = "img/sprite.png";

// game state 

const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

// control the game
cvs.addEventListener("click",function(evt){

    switch(state.current) {
        case state.getReady : 
            state.current = state.game;
            break;
        case state.game : 
            bird.flap();
            break;
        case state.over :
            state.current = state.getReady;
            break;

    }

});

// background
const bg = {
    sX : 0 , 
    sY : 0 ,
    w : 275 ,
    h : 226 ,
    x : 0 ,
    y : cvs.height - 224 ,

    draw : function() {
        ctx.drawImage(sprite , this.sX , this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        ctx.drawImage(sprite , this.sX , this.sY,this.w,this.h,this.x+this.w,this.y,this.w,this.h);

    }

}

// foreground
const fg = {
    sX : 276 , 
    sY : 0 ,
    w : 224 ,
    h : 112 ,
    x : 0 ,
    y : cvs.height - 112 ,

    draw : function() {
        ctx.drawImage(sprite , this.sX , this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        ctx.drawImage(sprite , this.sX , this.sY,this.w,this.h,this.x+this.w,this.y,this.w,this.h);

    }

}


// bird
const bird = {
    animation: [
        {sX : 276 , sY : 112} ,
        {sX : 276 , sY : 139} ,
        {sX : 276 , sY : 164} ,
        {sX : 276 , sY : 139}
    ],

    x : 50,
    y : 150,
    w : 34,
    h : 26,
 
    frame : 0,
    gravity : 0.05 , 
    jump : 2 ,
    speed : 0,
    rotation :0,

    draw : function() {
        let bird = this.animation[this.frame];
        
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rotation);
        
        ctx.drawImage(sprite,bird.sX,bird.sY,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);

    } ,

    flap : function() {
        this.speed -= this.jump;
    },

    update : function() {
        // if game state is ready state  , bird will flap slow
        this.period = state.current == state.getReady?15:8;
        // increase the frame by 1 , 
        this.frame += frames%this.period == 0 ? 1 : 0;
        // frame goes from 0 to 3
        this.frame = this.frame%this.animation.length;

        if(state.current == state.getReady) {
            this.y = 150;
            this.rotation = 0*Degree;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;
            
            if(this.y + this.h/2 >= cvs.height - fg.h){
                this.y = cvs.height - fg.h - this.h/2;
                if(state.current == state.game){
                    state.current = state.over;
                }
            }

            if(this.speed >= this.jump) {
                this.rotation = 90*Degree;
            } else {
                this.rotation = -25*Degree;
            }

        }

    }

}

// get ready message

const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : cvs.width/2 - 173/2,
    y : 80,
    
    draw: function(){
        if(state.current == state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}

// game over

const gameover = {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : cvs.width/2 - 225/2,
    y : 90,
    
    draw: function(){
        if(state.current == state.over){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
        }
    }
}


// draw 
function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0,0,cvs.width , cvs.height);
    
    bg.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameover.draw();
}



//  update
function update() {
    bird.update();
}

// loop 
function loop(){
    update();
    draw();
    frames++;
    
    requestAnimationFrame(loop);
}
loop();