//////////////////////////////////////
// Lecture: Hoisting

















///////////////////////////////////////
// Lecture: Scoping



var a = 'Hello!';
first();
function first() {
    var b = 'Hi!';
    second();
    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}


var Person = function(name,yob,job){
    this.name = name;
    this.yob = yob;
    this.job = job;
    this.calcAge = function(){
        console.log(2019-yob);
    }
};

var praj = new Person('Prajwal',1999,'Android');
praj.calcAge();


function interviewQuestion(job){

 return function(name){
    if(job==='designer'){
      console.log(name+' can you explain what UX is?')
    }
     else   if(job==='pokemonmaster'){
      console.log(name+' can you explain what type pikachu is?')
    }
     else{
      console.log(name+' Where do you work?')
  }
}
}

interviewQuestion('designer')('Prajwal');
interviewQuestion('pokemonmaster')('Sam');
interviewQuestion('memeer')('Sam');
// Example to show the differece between execution stack and scope chain


var Question =  function(question, ans, correct) {
  this.question = question;
  this.ans = ans;
  this.correct = correct;
}


var firstQ = new Question('What type is Pikachu?',['Grass','Electric','Fire'],1);
var secondQ =new  Question('What type is Charizard?',['Grass','Electric','Fire'],2);
var thirdQ = new Question('What type is Bulbasaur?',['Grass','Electric','Fire'],0);



var QuestionList = [firstQ,secondQ,thirdQ];
console.log(QuestionList);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var randomQ = QuestionList[getRandomInt(3)]
console.log(randomQ.question);
for(var i=0;i<randomQ.ans.length;i++){
    console.log(i+" "+randomQ.ans[i]);
}

var prompt = prompt(randomQ.question);

if(prompt==randomQ.correct){
    console.log("Correct Answer!!");
}
else{
    console.log("You suck!, Try again");
}
/*
var a = 'Hello!';
first();
function first() {
    var b = 'Hi!';
    second();
    function second() {
        var c = 'Hey!';
        third()
    }
}
function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

