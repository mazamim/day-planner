//display today date
var todayDate = moment()
var todayDate = moment().format("dddd, MMMM Do")
$("#todayDate").text(todayDate);

 var data=generateData(9,17)


// parametets eg 9 ,18
function generateData (start,end){
    const items = []
    for (let hour = start; hour < end+1; hour++) {
      let time=moment({ hour }).format('h:mm A')
      let description=""
        items.push({
          time:time,
          description:description,
          status:'pending'
      })

      createElements(time,description);
     // items.push(moment({ hour, minute: 60 }).format('h:mm A'))
    }
    return items
  }


//   create Elements
function createElements(time,description){
    parentContainer=document.getElementById("parentContainer")
    const parentDiv = document.createElement("div");
        parentDiv.classList.add('row')
    const div1 = document.createElement("div");
                div1.classList.add("col","hour")
        const timeP=document.createElement('p')
        timeP.innerHTML=time
    const div2 = document.createElement("div");
        const txtArea=document.createElement("textarea");
        txtArea.classList.add("textarea")
   const div3 = document.createElement("div");
        const saveP = document.createElement('p')
        const ico = document.createElement('i')
        ico.classList.add("fa" ,"fa-floppy-o")
        ico.setAttribute("style", "font-size: 30px; padding-top:10px");
   
  
  
      
    div2.classList.add("col-8","past")
        
    div3.classList.add("col-xs-12", "col-sm-1", "saveBtn")

    parentContainer.appendChild(parentDiv);
    parentDiv.appendChild(div1)
        div1.appendChild(timeP)
        timeP.textContent=time
    parentDiv.appendChild(div2)
        div2.appendChild(txtArea)
    parentDiv.appendChild(div3)
            div3.appendChild(saveP)
            saveP.appendChild(ico)
}



