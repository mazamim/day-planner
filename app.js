
var localData=[]
//display today date

//  var todayDate = moment().format("dddd, MMMM Do")
 var todayDate = moment().format("dddd, MMMM Do YYYY,h:mm:ss a")
$("#todayDate").text(todayDate);

function displayTime(){
    var todayDate = moment().format("dddd, MMMM Do YYYY,h:mm:ss a")
    $("#todayDate").text(todayDate);
}
setInterval(displayTime, 1000);


function renderFromLocal(){

  var data = JSON.parse(localStorage.getItem("data"));
  if (data !== null){
    localData=data;
   
  }
  else{
    return
  }
}

renderFromLocal()

// date from local storage
// var localData=[
//     {
//         DDate:'2021-12-21T09:00:00+11:00',
//         description:'Need to sleep alot i feel sleepy9',
//         status:'completed'
//     },
//     {
//         DDate:'2021-12-21T10:00:00+11:00',
//         description:'Need to sleep alot i feel sleepy10',
//         status:'pending'
//     }

// ]
//get current date and time

//set class dependon the time





 var data=generateData(9,17)


// parametets eg 9 ,18
function generateData (start,end){
    const items = []
    for (let hour = start; hour < end+1; hour++) {
        let description=""
       var timetoDisplay=moment({ hour }).format("h:mm:ss a")
     var timeforCalculation=moment({ hour }).format()

localData.forEach((element)=>{

        if(element.DDate=== timeforCalculation){
            description=element.description
      
        }
})

    
        items.push({
          time:timeforCalculation,
          description:description,
          status:'pending'
      })

      createElements(timetoDisplay,description,timeforCalculation);
     // items.push(moment({ hour, minute: 60 }).format('h:mm A'))
    }
    return items
  }


//   create Elements
function createElements(timetoDisplay,description,timeforCalculation){
    parentContainer=document.getElementById("parentContainer")
    const parentDiv = document.createElement("div");
        parentDiv.classList.add('row')
    const div1 = document.createElement("div");
                div1.classList.add("col","hour")
        const timeP=document.createElement('p')
        timeP.innerHTML=timetoDisplay
    const div2 = document.createElement("div");
    const txtArea=document.createElement('textarea')
        txtArea.classList.add("textarea")
        txtArea.textContent=description
   const div3 = document.createElement("div");
        const saveP = document.createElement('p')
       const ico = document.createElement('i')
             
        ico.setAttribute('id',Math.floor(Math.random()*100));
      
        ico.classList.add("fa" ,"fa-floppy-o")
        ico.setAttribute("style", "font-size: 30px; padding-top:10px");
   

  
      // get current time and check 

            x=moment(timeforCalculation)
            y=moment()
            var duration = moment.duration(x.diff(y))
        var durationInmin = (duration._data.hours*60)+duration._data.minutes
      if (durationInmin<=0 && durationInmin>-60){
        div2.classList.add("col-8","present")
   
      }
      if (durationInmin<=-60){
        div2.classList.add("col-8","past")

      }

      if (durationInmin>0){
        div2.classList.add("col-8","future")
    
      }


     
        
    div3.classList.add("col-xs-12", "col-sm-1", "saveBtn")

    parentContainer.appendChild(parentDiv);
    parentDiv.appendChild(div1)
        div1.appendChild(timeP)
        timeP.textContent=timetoDisplay
    parentDiv.appendChild(div2)
         div2.appendChild(txtArea)
     
    parentDiv.appendChild(div3)
            div3.appendChild(saveP)
            saveP.appendChild(ico)
            ico.addEventListener('click',handleSumbit)
      

}


function handleSumbit(event){
  var btnClicked = $(event.target);

  //get text area value
   var description = btnClicked.parent('p').parent('div').parent('div')[0].children[1].children[0].value

   //get time value
   var initialTime = btnClicked.parent('p').parent('div').parent('div')[0].children[0].children[0].innerHTML
   var date = moment().format('L');
  //required format   DDate:'2021-12-21T09:00:00+11:00
  var timeAndDate = moment(date + ' ' + initialTime).format();
var obj=
{
  DDate:timeAndDate,
  description:description

}

alertify.confirm('Day-Planner', 'Do you want to save changes?', ()=>
{ 
localData.push(obj);
window.localStorage.setItem("data", JSON.stringify(localData));
  alertify.success('Ok') 
} , 
()=>
{
   alertify.error('Cancel')
   btnClicked.parent('p').parent('div').parent('div')[0].children[1].children[0].value=""
  });




 
}