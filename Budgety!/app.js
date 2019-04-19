var budgetController = (function(){
    
    var Expense = function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage=-1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome>0){
            this.percentage=Math.round((this.value/totalIncome)*100);
        }
        else{
            this.percentage=-1;
        }
    };
    
    Expense.prototype.getPercentage=function(){
        return this.percentage;
    };
    
    var Income = function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    
    var allExpenses = [];
    var allIncomes =[];
    var totalExpenses=0;
    
    var calcTotal = function(type){
      var sum=0;
      data.allItems[type].forEach(function(cur){
          sum += cur.value;
      });
        data.totals[type]=sum;
    };
    
    var data ={
        allItems:{
            inc:[],
            exp:[]
        },
        
        totals:{
            exp:0,
            inc:0
        },
        budget:0,
        percentage:-1
    };
    return{
        addItem:function(type,des,val){
            var newItem,ID;
            if(data.allItems[type].length>0){
                ID= data.allItems[type][data.allItems[type].length-1].id+1;
               
            }
            else{
                ID=0;
            }
            
             
            if(type === 'exp'){
                newItem = new Expense(ID,des,val);
            }
            else if(type==='inc'){
                newItem = new Income(ID,des,val);
            }
            
            data.allItems[type].push(newItem);
            return newItem;
            
        },
        
        deleteItem:function(type,id){
            var ids,index;
            ids= data.allItems[type].map(function(curr){
                return curr.id;
                
            });
            index = ids.indexOf(id);
            if(index>=9){
                data.allItems[type].splice(index,1);
            }
        },
        
        calculateBudget:function(){
            calcTotal('exp');
            calcTotal('inc');
            data.budget = data.totals.inc-data.totals.exp;
            data.percentage=Math.floor((data.totals.exp/data.totals.inc)*100);
        },
        
        calcPercentages:function(){
            data.allItems.exp.forEach(function(curr){
                curr.calcPercentage(data.totals.inc);
            });
        },
        
        getPercentages:function(){
            var allpercent = data.allItems.exp.map(function(cur){
                    return cur.getPercentage();
            });
            return allpercent;
        },
        
        getBudget:function(){
            return{
                budget:data.budget,
                percent:data.percentage,
                totalinc:data.totals.inc,
                totalexp:data.totals.exp
            }
        }
    };
    
    
})();

var UIController =  (function(){
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue:'.add__value',
        inputButton:'.add__btn',
        incomeContainer:'.income__list',
        expenseContainer:'.expenses__list',
        budgetLabel:'.budget__value',
        incomeLabel:'.budget__income--value',
        expenseLabel:'.budget__expenses--value',
        percentageLabel:'.budget__expenses--percentage',
        container:'.container',
        expensePercentage:'.item__percentage',
        date:'.budget__title--month'
    };
    
    var formatnumber=function(num,type){
           var numsplit,int,dec,type,sign;
           num = Math.abs(num);
           num=num.toFixed(2);
           
           numsplit=num.split('.');
           int = numsplit[0];
           if(int.length>3){
               int = int.substr(0,int.length-3)+','+int.substr(int.length-3,3);
           }
           
           dec=numsplit[1];
           
           type==='exp'?sign='-':sign='+';
           return sign+' '+int+'.'+dec;
       };
    
     var nodeListforEach = function(list,callback){
        for(var i=0;i<list.length;i++){
             callback(list[i],i);
         }
       };
    
   return{
       getinput:function(){
           return{
               type:document.querySelector(DOMstrings.inputType).value,
               description:document.querySelector(DOMstrings.inputDescription).value,
               value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
           };
       },
       
       addListItem: function(obj,type){
           var html,newHtml,element;
           if(type==='inc'){
                    element = DOMstrings.incomeContainer;
                    html ='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
           }
    
           else if(type==='exp'){
                    element = DOMstrings.expenseContainer;
                    html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
           }
           
           newHtml=html.replace('%id%',obj.id); 
           newHtml=newHtml.replace('%description%',obj.description); 
           newHtml=newHtml.replace('%value%',formatnumber(obj.value,type)); 
           
           document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
      
       },
       
       deletelistItem:function(selectorID){
           var ele = document.getElementById(selectorID);
           ele.parentNode.removeChild(ele);
           
       },
       
       clearFields:function(){
           var fields,fArray;
           
           fields= document.querySelectorAll(DOMstrings.inputDescription +', ' + DOMstrings.inputValue);
           fArray=Array.prototype.slice.call(fields);
           
           fArray.forEach(function(curr,i,arr){
               curr.value="";           
         });
           fArray[0].focus();
       },
       
       displaybudget:function(obj){
           
           obj.budget>0?type='inc':type='exp';
           document.querySelector(DOMstrings.budgetLabel).textContent=formatnumber(obj.budget,type);
           document.querySelector(DOMstrings.incomeLabel).textContent=formatnumber(obj.totalinc,'inc');
           document.querySelector(DOMstrings.expenseLabel).textContent=formatnumber(obj.totalexp,'exp');
           
           
           if(obj.percentage>0){
               document.querySelector(DOMstrings.percentageLabel).textContent=obj.percentage+'%';
           }
           else{
                document.querySelector(DOMstrings.percentageLabel).textContent='---';
           }
       },
       
       displayPercentages:function(percentages){
        var fields = document.querySelectorAll(DOMstrings.expensePercentage);  

           
        nodeListforEach(fields,function(curr,ind){
            if(percentages[ind]>0){
                curr.textContent = percentages[ind] + '%';
            }
            else{
                curr.textContent='---';
            }
           
        });   
       },
       
       displayMonth:function(){
          
           var now,year,month,months;
           
           now = new Date();
           year = now.getFullYear();
           
           months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
           month = now.getMonth();
           
           document.querySelector(DOMstrings.date).textContent = months[month]+' - '+ year;
       },
       
       changeType:function(){
         
           var fields = document.querySelectorAll(DOMstrings.inputType+','+
                                                  DOMstrings.inputDescription+','+ 
                                                  DOMstrings.inputValue);
           
                   nodeListforEach(fields,function(curr){
        
                        curr.classList.toggle('red-focus');
                   }); 
           
           document.querySelector(DOMstrings.inputButton).classList.toggle('red');
        },
       
       getDOMstrings:function(){
           return DOMstrings;
       }
   }; 
})();




var controller = (function(budgtctrl,UIctrl){
    
    var setupevntListeners = function(){
            var DOM = UIctrl.getDOMstrings();
    
   document.querySelector(DOM.inputButton).addEventListener('click',function(){
       controlAddItem();
   }); 
    
    document.addEventListener('keypress',function(event){
        
        if(event.keyCode===13 || event.which===13){
            controlAddItem();
        }
        
    });
        
        document.querySelector(DOM.container).addEventListener('click',ctrlDelItem);
        
        document.querySelector(DOM.inputType).addEventListener('change',UIctrl.changeType);
    };
    
    var updateBudget = function(){
        budgtctrl.calculateBudget();
        var budget = budgtctrl.getBudget();
        UIctrl.displaybudget(budget);
    };
    
    var updatePercentages = function(){
        budgtctrl.calcPercentages();
        var percentages = budgtctrl.getPercentages();
        UIctrl.displayPercentages(percentages);
    };
    
    var controlAddItem = function (){
        var input = UIctrl.getinput();
        //console.log(input);
        if(input.description!==""&& !isNaN(input.value) && input.value>0){
        newItem = budgtctrl.addItem(input.type,input.description,input.value);   
        UIctrl.addListItem(newItem,input.type);
        UIctrl.clearFields();
        updateBudget();
        updatePercentages();    
    
        }

    };
    
    var ctrlDelItem =  function(event){
        var delID,splitID,type,ID;
        delID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(delID){
            splitID = delID.split('-');
            type=splitID[0];
            ID=splitID[1];
            budgtctrl.deleteItem(type,parseInt(ID));
            UIctrl.deletelistItem(delID);
            updateBudget();
            updatePercentages();
        }
    };
    
    return {
        init:function(){
            console.log("Application has started");
            UIctrl.displayMonth();
            UIctrl.displaybudget({
                budget:0,
                percent:0,
                totalinc:0,
                totalexp:0
            });
            setupevntListeners();
        
        }
    };
    
    

})(budgetController,UIController);


controller.init();