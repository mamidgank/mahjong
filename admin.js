const KEY="mahjongSimPro";

function load(){return JSON.parse(localStorage.getItem(KEY)||"{}")}
function save(x){localStorage.setItem(KEY,JSON.stringify(x))}

function refresh(){
  const d=load();
  info.innerText=d.player.balance;
  rate.value=d.settings.winRate;
  multi.value=d.settings.multi;
  force.checked=d.settings.forceWin;
}

function addCoin(){
  const d=load();
  d.player.balance+=parseInt(add.value||0);
  save(d);
  refresh();
}

function saveSet(){
  const d=load();
  d.settings.winRate=parseInt(rate.value||40);
  d.settings.multi=parseInt(multi.value||2);
  d.settings.forceWin=force.checked;
  save(d);
  refresh();
}

refresh();
