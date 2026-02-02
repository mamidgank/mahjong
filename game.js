const KEY="mahjongSimPro";

function load(){return JSON.parse(localStorage.getItem(KEY)||"{}")}
function save(x){localStorage.setItem(KEY,JSON.stringify(x))}

let db=load();
if(!db.player){
  db.player={balance:3000};
  db.settings={winRate:40,forceWin:false,multi:2};
  save(db);
}

const symbols=["🀄","🀙","🀚","🀛","🀜","🀝","💰"]; // scatter = 💰

let freeSpins=0;

function refresh(){
  bal.innerText=load().player.balance;
}
refresh();

function randSym(){
  return symbols[Math.floor(Math.random()*symbols.length)];
}

function buildGrid(arr){
  grid.innerHTML="";
  arr.forEach(s=>{
    const d=document.createElement("div");
    d.className="cell";
    if(s==="💰") d.classList.add("scatter");
    d.textContent=s;
    grid.appendChild(d);
  });
}

function spin(){

  let db=load();
  let bet=parseInt(document.getElementById("bet").value);

  if(freeSpins===0){
    if(db.player.balance<bet){
      result.innerText="Coin tidak cukup";
      return;
    }
    db.player.balance-=bet;
  }

  save(db);
  refresh();

  result.innerText="Spinning...";

  // animasi shuffle
  let ticks=0;
  const anim=setInterval(()=>{
    let temp=[];
    for(let i=0;i<20;i++) temp.push(randSym());
    buildGrid(temp);
    if(++ticks>6){
      clearInterval(anim);
      finishSpin(bet);
    }
  },90);
}

function finishSpin(bet){

  let db=load();
  let out=[];
  let scatter=0;

  for(let i=0;i<20;i++){
    let s=randSym();
    out.push(s);
    if(s==="💰") scatter++;
  }

  buildGrid(out);

  if(scatter>=3){
    freeSpins+=20;
    result.innerText="SCATTER! +20 Free Spins";
  }

  let win = db.settings.forceWin ||
            Math.random()*100 < db.settings.winRate;

  if(win){
    let multi = freeSpins>0 ? db.settings.multi*2 : db.settings.multi;
    let prize = bet*multi;
    db.player.balance+=prize;
    result.innerText="WIN "+prize;
    grid.classList.add("winGlow");
    setTimeout(()=>grid.classList.remove("winGlow"),800);
  }

  if(freeSpins>0){
    freeSpins--;
    freeInfo.innerText="Free Spins: "+freeSpins;
  } else freeInfo.innerText="";

  save(db);
  refresh();
    }
// ===== INIT GRID SAAT LOAD =====
function initGrid(){
  let temp=[];
  for(let i=0;i<20;i++){
    temp.push(randSym());
  }
  buildGrid(temp);
}

initGrid();
