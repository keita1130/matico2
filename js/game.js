const APPLICATION_KEY = "ea7bd7453e687e059da3ccc29dd99f171770a60846e87247dba7316911b73ed6";
const CLIENT_KEY = "2fc497bf70e237954e9053cf6813ab1328fef1becf70ce25db9e88ce251a7219";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";
let TestClass = ncmb.DataStore(DBName);

const MAX = 3;
let count = 0;
let timer = null;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);

  for (let i=0; i<size*size; i++) {
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num"+i);
    s.addEventListener("click", function(){
      if (this.textContent == q[qNum][1]) {
        //alert("正解");
        count++;
        if (count == MAX) {
          save(timer-1);
          load(timer);
          clearTimeout(timer);
          alert("Game clear!");

        }
        correct.play();
        while (cells.firstChild) {
          cells.removeChild(cells.firstChild);
        }
        gameStart();
      } else {
        wrong.play();
      }
    });
    cells.appendChild(s);
    if (i % size == size - 1) {
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" + p);
  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime()
                              - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()", 1000);
}

function save(time) {
  let test = new TestClass();
  let key = "massage";

  let value = time;
  test.set(key, parseInt(value));
  test.save()
  .then (function(){
    console.log("成功");
  })
  .catch(function(err){
    console.log("エラー発生: " + err);
  });
}

function load(time) {
  TestClass
  .order("massage")
  .fetchAll()
  .then(function(results){
    for (let i=0; i<results.length; i++) {
      console.log(results[i].massage);
    }
    if(time<results[0].massage){
      alert("High score! :" + timer);
    }
  })
  .catch(function(err){
    console.log("エラー発生: " + err);
  });
}
