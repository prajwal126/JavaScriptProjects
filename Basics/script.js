var firstName="John";
var bool = true;
console.log(firstName);
console.log(bool);

//var lastName= prompt("What is his last name?");
//console.log(lastName);


var Jheight,Jmass,Mheight,Mmass;
Jheight=1.7;
Jmass= 60;
Mheight=1.4;
Mmass=65;

var JBMI=Jmass/(Jheight*Jheight);
var MBMI=Mmass/(Mheight*Mheight);
var BMI= JBMI>MBMI;
console.log("Is Mark's BMI higher than Marks?"+ BMI);

var job='programmer';

switch(job)
    {
        case 'teacher': console.log("John is a teacher"); break;
        case 'programmer':  console.log("John is a programmer"); break;
        default:  console.log("John is jobless"); break;
    }

var Jteam=97+134+105;
var Mteam=116+94+113;
var Javg,Mavg;
var sum=0;
var Mary=97+134+105;
/*Jteam.forEach(function(jscore){
     sum+=jscore;          
}); */
Javg=Jteam/3;
/*Mteam.forEach(function(mscore){
     sum+=mscore;          
}); */
Mavg=Mteam/3; 
var Maryavg= Mary/3;

if(Javg>Mavg && Javg>Maryavg){
    console.log("J team wins");
}
else if(Mavg>Javg && Mavg>Maryavg ){
    console.log("M team wins");
}
else if(Maryavg>Javg && Maryavg>Mavg) {
    console.log("Mary wins");
}
else{
    console.log("Draw");
}



var bill = [124,48,268];
var tip;
var tips=[];
var finalAmt=[];
for(var i=0;i<bill.length;i++){
    tip = tipCalc(bill[i]);
    tips.push(tip);
    finalAmt.push(bill[i]+tip);
}
console.log(tips);
console.log(finalAmt);

function tipCalc(bill){
    
     if(bill<50){
        return  0.2*bill;
    }
    else if(bill>50 && bill<200){
         return 0.15*bill;
    }
    else {
        return 0.1*bill;
    }
}

var JohnO = { name : "John",
              mass:100,
              height:1.7,
              calcBMI:function(){
              var JBMI= this.mass/(this.height*this.height);
              this.BMI=JBMI;
              return JBMI;
            }};
var MarkO = { name : "Mark",
              mass:65,
              height:1.4,
              calcBMI:function(){
              var MBMI= this.mass/(this.height*this.height);
              this.BMI=MBMI;
              return MBMI;
            }};

JohnO.calcBMI();
MarkO.calcBMI();
console.log(JohnO);
console.log(MarkO);

if(JohnO.BMI>MarkO.BMI)
    {
        console.log("John's BMI is greater!");
    }
else
    {
        console.log("Mark's BMI is greater!");
    }

var PTips=[];
var PTotalB=[];
var STips=[];
var STotalB=[];
var praj = {
    Name: "Prajwal",
    Bills: [124,48,268,180],
    calcTip : function(Bill){
        for(var i=0;i< Bill.length;i++){
            if(Bill[i]<50){
               PTips.push(0.2*Bill[i]);
               PTotalB.push(Bill[i]+0.2*Bill[i]);
            }
            else if(Bill[i]>50 && Bill[i]<200){
                PTips.push (0.15*Bill[i]);
                PTotalB.push(Bill[i]+0.15*Bill[i]);
            }
            else {
                PTips.push(0.1*Bill[i]);
                PTotalB.push(Bill[i]+0.1*Bill[i]);
            }
        }
    },
    Ptips : PTips,
    PTotal : PTotalB
};

var sam = {
    Name: "Samanyu",
    Bills: [77,375,110,45],
    calcTip : function(Bill){
        for(var i=0;i< Bill.length;i++){
            if(Bill[i]<100){
               STips.push(0.2*Bill[i]);
               STotalB.push(Bill[i]+0.2*Bill[i]);
            }
            else if(Bill[i]>100 && Bill[i]<300){
                STips.push (0.1*Bill[i]);
                STotalB.push(Bill[i]+0.1*Bill[i]);
            }
            else {
                STips.push(0.25*Bill[i]);
                STotalB.push(Bill[i]+0.25*Bill[i]);
            }
        }
    },
    Stips : STips,
    STotal : STotalB
};


praj.calcTip(praj.Bills);
sam.calcTip(sam.Bills);
console.log(praj,sam);

function avgTip(tip){
    var sum=0;
   for(var i=0;i<tip.length;i++) {
       sum+=tip[i];
   }
    var avg = sum/tip.length;
    console.log(avg);
    return avg;
};
//avgTip(praj.Ptips);
//avgTip(sam.Stips);

if(avgTip(praj.Ptips)>avgTip(sam.Stips)){
    console.log("Prajwal tipped more!");
}
else{
     console.log("Samanyu tipped more!");
}
