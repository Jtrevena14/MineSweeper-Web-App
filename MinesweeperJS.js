const row = 16;
const col = 16;
document.getElementById("board").style.gridTemplateColumns="repeat("+col+",1fr)";
document.getElementsByClassName("main_board")[0].style.width=toString(row*10);

let bombs = Array(row).fill().map(() => Array(col).fill(0));
let board = Array(row).fill().map(() => Array(col).fill(0));
let num_bombs=0;

function scramble(a){
    let difficulty = a;
    for(let i = 0; i<board.length;i++){
        for(let j = 0; j<board[0].length;j++){
            if(difficulty%3==0){
                bombs[i][j] = Math.floor(Math.random()*2);
            }
            difficulty++;
        }
    }
}
scramble(1);

for(let i = 0; i<board.length;i++){
    for(let j = 0; j<board[0].length;j++){
        if(i<bombs.length-1 && bombs[i+1][j]==1){
            board[i][j]++;
        }
        if(i>0 && bombs[i-1][j]==1){
            board[i][j]++;
        }
        if(j<bombs.length-1 && bombs[i][j+1]==1){
            board[i][j]++;
        }
        if(j>0 && bombs[i][j-1]==1){
            board[i][j]++;
        }
        if(i<bombs.length-1 && j<bombs.length-1 && bombs[i+1][j+1]==1){
            board[i][j]++;
        }
        if(i>0 && j<bombs.length-1 && bombs[i-1][j+1]==1){
            board[i][j]++;
        }
        if(i<bombs.length-1 && j>0 && bombs[i+1][j-1]==1){
            board[i][j]++;
        }
        if(i>0 && j>0 && bombs[i-1][j-1]==1){
            board[i][j]++;
        }
        if(bombs[i][j]==1){
            board[i][j]=9;
            num_bombs++;
        }
    }
}
let oldZeros = new Set();
function spread(a){
    oldZeros.add(a);
    getColor(a);
    if(parseInt(a-col)>=0){
        var temp = document.getElementById(parseInt(a-col));
        if(temp.innerText!=9){
            temp.classList.add("revealed");
        }
        if(temp.innerText==0 && !oldZeros.has(a-col)){
            spread(a-col);
        }
        getColor(a-col);
    }
    if(parseInt(a+col)<=(row*col)-1){
        var temp = document.getElementById(parseInt(a+col));
        if(temp.innerText!=9){
            temp.classList.add("revealed");
        }
        if(temp.innerText==0 && !oldZeros.has(a+col)){
            spread(a+col);
        }
        getColor(a+col);
    }
    if(a%col!=0){
        var temp = document.getElementById(a-1);
        if(temp.innerText!=9){
            temp.classList.add("revealed");
        }
        if(temp.innerText==0 &&  !oldZeros.has(a-1)){
            spread(a-1);
        }
        getColor(a-1);
    }
    if(a%col!=col-1){
        var temp = document.getElementById(a+1);
        if(temp.innerText!=9){
            temp.classList.add("revealed");
        }
        if(temp.innerText==0 && !oldZeros.has(a+1)){
            spread(a+1);
        }
        getColor(a+1);
    }
    if(parseInt(a-col)>0 && a%col!=col-1){
        var temp = document.getElementById(parseInt(a-col)+1);
        if(temp.innerText!=9){
            temp.classList.add("revealed");
        }
        if(temp.innerText==0 && !oldZeros.has(parseInt(a-col)+1)){
            spread(parseInt(a-col)+1);
        }
        getColor(parseInt(a-col)+1);
    }
    if(parseInt(a-col)>0 && a%col!=0){
        var temp = document.getElementById(parseInt(a-col)-1);
        if(temp.innerText!=9){
            temp.classList.add("revealed");
        }
        if(temp.innerText==0 && !oldZeros.has(parseInt(a-col)-1)){
            spread(parseInt(a-col)-1);
        }
        getColor(parseInt(a-col)-1);
    }
    if(parseInt(a+col)<(row*col)-1 && a%col!=col-1){
        var temp = document.getElementById(parseInt(a+col)+1);
        if(temp.innerText!=9){
            temp.classList.add("revealed");
        }
        if(temp.innerText==0 && !oldZeros.has(parseInt(a+col)+1)){
            spread(parseInt(a+col)+1);
        }
        getColor(parseInt(a+col)+1);
    }
    if(parseInt(a+col)<(row*col)-1 && a%col!=0){
        var temp = document.getElementById(parseInt(a+col)-1);
        if(temp.innerText!=9){
            temp.classList.add("revealed");
        }
        if(temp.innerText==0 && !oldZeros.has(parseInt(a+col)-1)){
            spread(parseInt(a+col)-1);
        }
        getColor(parseInt(a+col)-1);
    }
}

let counter=0;
for(let i = 0; i<board.length;i++){
    for(let j = 0; j<board[0].length;j++){
        var element = document.createElement("a");
        var id = document.createAttribute("id");
        id.value = counter;
        element.setAttributeNode(id);
        var onclic = document.createAttribute("onclick");
        onclic.value = "revealCell("+counter+")";
        element.setAttributeNode(onclic);
        var onmoused = document.createAttribute("onmousedown");
        onmoused.value = "mouseDown("+counter+")";
        element.setAttributeNode(onmoused);
        element.appendChild(document.createTextNode(board[i][j]));
        document.getElementById('board').appendChild(element);
        counter++;
    }
}
var myList = document.getElementById("board");
var listitems = myList.getElementsByTagName("a");
function getColor(i){
    if(document.getElementById(i).classList == "revealed" && document.getElementById(i).innerText==0){
        document.getElementById(i).style.color="transparent";
    }
    if(document.getElementById(i).classList == "revealed" && document.getElementById(i).innerText==1){
        document.getElementById(i).style.color="blue";
    }
    if(document.getElementById(i).classList == "revealed" && document.getElementById(i).innerText==2){
        document.getElementById(i).style.color="darkgreen";
    }
    if(document.getElementById(i).classList == "revealed" && document.getElementById(i).innerText==3){
        document.getElementById(i).style.color="red";
    }
    if(document.getElementById(i).classList == "revealed" && document.getElementById(i).innerText==4){
        document.getElementById(i).style.color="indigo";
    }
    if(document.getElementById(i).classList == "revealed" && document.getElementById(i).innerText==5){
        document.getElementById(i).style.color="darkred";
    }
    if(document.getElementById(i).classList == "revealed" && document.getElementById(i).innerText==6){
        document.getElementById(i).style.color="darkcyan";
    }
    if(document.getElementById(i).classList == "revealed" && document.getElementById(i).innerText==7){
        document.getElementById(i).style.color="black";
    }
}

function mouseDown(a){
    if(a=="resetbutton"){
        document.getElementById("resetbutton").style.borderStyle="inset";
    }
    if(document.getElementById(a).classList != "revealed"){
        document.getElementById(a).classList.add("hover");
    }
    document.body.onmouseup = function(){
        document.getElementById(a).classList.remove("hover");
    }    
}

function revealCell(a){
    oldZeros = new Set();
    document.getElementById(a).classList.add("revealed");
    if(document.getElementById(a).innerText == 0){
        spread(a);
    }
    if(document.getElementById(a).innerText == 9){
        document.getElementById("board").style.backgroundColor="red";
    }
    getColor(a);
    checkEnd();
}

function resetBoard(){
    document.location.reload();
}
function checkEnd(){
    let num_revealed = 0;
    for(i=0; i<listitems.length;i++){
        if(listitems[i].classList == "revealed"){
            num_revealed++;
            if(num_revealed+num_bombs == row*col){
                document.getElementById("board").style.backgroundColor = "green";
            }
        }
    }
}

