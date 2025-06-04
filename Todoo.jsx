import React, {useState,useEffect} from "react";

function Todoo(){

const [tasks,setTasks]=useState([ ]);
const[time,setTime]=useState("");
const[date,setDate]=useState("");

const[currentTime,setCurrenttime]=useState(new Date());
const[currentDate,setCurrentdate]=useState(new Date());




function addtask(){
    
   const  thetask=document.getElementById("newtask").value;
   const time=document.getElementById("timechange").value;
   const date=document.getElementById("datechange").value;
    if (thetask.trim() === "" || time === "" || date === "" ) return;
    setTime(time);
    setDate(date);
    setTasks(t =>[...t,  {thetask,time, date}]);

    document.getElementById("newtask").value="";
    document.getElementById("timechange").value="";
    document.getElementById("datechange").value="";
    
}
function deletetask(index){
   
    setTasks(tasks.filter((element,i)=> i!==index));

}
const  handletimeChange=(event) =>{
    setTime(event.target.value);
 };

 const  handledateChange=(event) =>{
    setDate(event.target.value);
 };


useEffect(() => {
  const interval = setInterval(() => {
    setCurrenttime(new Date());
  }, 1000);

  return () => clearInterval(interval); // Cleanup
}, []);


function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    } else {
        console.warn("Text-to-speech not supported in this browser.");
        // Optionally, provide an alternative for browsers that don't support it
    }
}

useEffect(() => {
  

  tasks.forEach(task => {
    const taskstime=task.time+":00";
    const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear();
const cdate = `${year}-${month}-${day}`; // Format matching input type="date"

    if (taskstime === currentTime.toLocaleTimeString('en-GB') && cdate=== task.date) {
     const textToRead=`Don't forget to  ${task.thetask}  `;
      speak(textToRead);
        alert(`Don't forget to  ${task.thetask} !` );
       

    }
  });
}, [currentTime, tasks]);




    return(
        <div className="container_to_do">
            <h1 className="title">
                To-Do-List
            </h1>
              <h1 className="timecurrent">Current Time: {currentTime.toLocaleTimeString()}</h1>
              
            <div >

  
  <span className="ball"></span>
  <span className="ball"></span>
  <span className="ball"></span>
  <span className="ball"></span>
  <span className="ball"></span>
  <span className="ball"></span>
</div>
            

        
                
            <div className="input_button">
            <input className="input" id="newtask" type="text" placeholder="Enter a task..."/>
            <input className="time" id="timechange"  type="time" onChange={handletimeChange} /> 
            <input className="date" id="datechange" type="date" onChange={handledateChange}/>
            <button className="Addbutton" onClick={addtask}> Add new task</button> <br/>
            </div>
            
            <ul>
             {tasks.map((task, index) => (
            <li key={index} className="to_do_list">
                <div className="container_task">
                    <div className="tasks">
                        <div className="thetask">
                       {task.thetask} 
                        <div className="taskinfo">
                            at {task.time} on  {task.date}
                        </div>       
                    </div>
                    </div>
                      
                 <button className="deletebutton" onClick={() => deletetask(index)}>Delete</button>
                </div>

                 
            </li>
                     ))}

                </ul>
                

        </div>
    );

}

export default Todoo