// variables and constants
let inputDir = {x:0,y:0};
// const foodSound = new Audio('food.mp3');
// const gameSound = new Audio('game.mp3');
// const gameOverSound = new Audio('gameOver.mp3');
// const moveSound = new Audio('move.mp3');
let speed = 5;
let score = 0;
let hscore=0;
let lastPaintTime = 0;
let snakeArray = [{x:13,y:15}];
food = {x:6,y:7};
// functions

function main(ctime)
{
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake)
{
    // if you bumb into your self
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }        
    }
    if(snake[0].x>=22 || snake[0].x<=0 || snake[0].y>=22 || snake[0].y<=0)
    {
        return true;
    }
}
// let hiscoreval;
// let hscore=localStorage.getItem('hiscore');
// if(hscore === null)
// {
//     hiscoreval=0;
//     localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
// }
// else{
//     hiscoreval=JSON.parse(hscore);
//     document.getElementById('hscore').innerHTML='High Score : '+hiscoreval;
// }
function gameEngine()
{
    // part-1 : updating the snake array
    if(isCollide(snakeArray))
    {
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to pplay again!");
        snakeArray = [{x:13,y:15}];
        if(score>hscore)
        {
            hscore=score;
            document.getElementById('hscore').innerHTML='High Score : '+hscore;
        }
        score = 0;
        document.getElementById('score').innerHTML='Score : '+score;
    }

    // if you eaten the food then increment the score and regenerate the food
    if(snakeArray[0].x == food.x && snakeArray[0].y == food.y)
    {
        score++;
        // if(score>hiscoreval)
        // {
        //     hiscoreval=score;
        //     localStorage.setItem('hscore',JSON.stringify(hiscoreval));
        //     document.getElementById('hscore').innerHTML='High Score : '+hiscoreval;
        // }
        if(score>hscore)
        {
            hscore=score;
            document.getElementById('hscore').innerHTML='High Score : '+hscore;
        }
        document.getElementById('score').innerHTML='Score : '+score;
        snakeArray.unshift({x : snakeArray[0].x  + inputDir.x, y : snakeArray[0].y  + inputDir.y})
        let a=2;
        let b=19;
        food = {x: Math.round(a + (b-a)*Math.random()), y : Math.round(a + (b-a)*Math.random())}
    }

    // moving the snake
    for(let i = snakeArray.length-2 ; i>=0 ; i--)
    {
        // const element=Array[i];
        // with the help of this we can create new object and we avoid refrence problem
        snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // part-2 : display the snake and food

    // display snake
    game_board.innerHTML = "";
    snakeArray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index == 0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        game_board.appendChild(snakeElement);
    })

    // display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    game_board.appendChild(foodElement);
}
// main logic


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1} //start the game
    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;

        default:
            break;
    }
})