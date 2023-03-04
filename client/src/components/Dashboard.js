import React from "react";
import { useNavigate } from 'react-router-dom';

import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card'
import { Button } from 'primereact/button';
import { useState, useEffect } from "react";
import { ListBox } from 'primereact/listbox';
import { InputText } from "primereact/inputtext";

import { InputTextarea } from 'primereact/inputtextarea';
import { Skeleton } from 'primereact/skeleton';
import { useSessionStorage } from 'primereact/hooks';
import { InputNumber } from 'primereact/inputnumber';
import { useLocation } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    
    
    const [authenticated, setAuthenticated] = useState(false);
    const [meetingFile, setMeetingFile] = useState(["null"]);

  useEffect(() => {
    // Your authentication logic here
    const isAuthenticated = authenticate();
    setAuthenticated(isAuthenticated);
  }, []);



const authenticate = async () => {
  
    const response = await fetch('/api/authenticate', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      
    });
     
    
    if (response.ok) {
        
        setMeetingFile(await response.json())
      return response;
      
    }
    else{
        // Redirect the user to the home page

    //   console.log("authentication failed")
      navigate('/login')
    }
  };
  

  const[listCount,setListCount] = useState('')
  

  const handleLogout = async () =>{
    const response = await fetch('/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        
      });
      setAuthenticated(false)
      navigate('/login')
      
  }
    



    const [formData, setFormData] = useState({
        id:0,
        title: '',
        desc: '',
        hour: '',
        minute:'',
        time:'',
        date:'',
        
      });

      

      
    


    const meetings = [
        
    ];
    // console.log(meetings)

    

    const [date, setDate] = useState(null);
    let t = ""
    let hour = "0"
    let minutes ="0"
    let year =""
    let day =""
    let month =""
    let weekDay =""
    let amOrPm =""
    let fullDate =""

    const [time, setTime] = useState(null);
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    
    
    if(date){
            const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    
     month = monthList[date.getMonth()];
    
           
           day = date.getDate();
           year = date.getFullYear();
           weekDay = weekDays[date.getDay()];
    
           fullDate = day+" "+month+" "+year+", "+weekDay;
    
    
        
       
       
        
      }
      const getDate =(date) => {
        const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];


 month = monthList[date.getMonth()];

       
       day = date.getDate();
       year = date.getFullYear();
       weekDay = weekDays[date.getDay()];

       fullDate = day+" "+month+" "+year+", "+weekDay;

       return fullDate;
      }
    if(time){
         hour = time.getHours();
         minutes = time.getMinutes().toString().padStart(2, '0');
          amOrPm = hour < 12 ? "AM" : "PM";
if (hour > 12) {
  hour -= 12;
} else if (hour === 0) {
  hour = 12;
}
hour = hour.toString().padStart(2, '0');
         t = hour +" : "+minutes+" "+amOrPm;
    }
    
    const getTime= (time) => {
        hour = time.getHours();
        minutes = time.getMinutes().toString().padStart(2, '0');
         amOrPm = hour < 12 ? "AM" : "PM";
if (hour > 12) {
 hour -= 12;
} else if (hour === 0) {
 hour = 12;
}
hour = hour.toString().padStart(2, '0');
        t = hour +" : "+minutes+" "+amOrPm;

        return t;
    }
    const itemTemplate = (option,index) => {
        return (
          <div onClick={(e)=>{clicked(e)}} className="p-d-flex h-2rem flex-row align-items-center flex p-ai-center">
            <div className="p-mr-2 mx-3">{option.title}</div>
            <div className="p-mr-2 mx-3">{option.time}</div>
            <Button className="p-1 mr-7 bg-black-alpha-80 absolute right-0" icon="pi pi-pencil"/>
            <Button onClick={(e)=>{remove(e,option,index)}} className="p-1 mx-2 bg-red-500 absolute right-0" icon="pi pi-trash"/>
          </div>
        );
      };

      const remove =async (event,option,index) =>{
        
        
       const updatedMeet = reOrderAndFilter(option)
        
        const response = await fetch('/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMeet),
          });
          
          const data = await response.json()
          
        //    console.log(data)
           updateMeetingCountDown()
      }

const reOrderAndFilter = (option) =>
{
    if(meetingFile.length ==1){
        const sendMeetFile = []
        setMeetingFile(sendMeetFile)
        console.log(meetingFile)
        return sendMeetFile
        }

        else{
            const sendMeetFile =  reOrderId(meetingFile.filter(obj => obj.id !== option.id))
       setMeetingFile(sendMeetFile)
       return sendMeetFile
        }
}

      const updateMeetingCountDown=() =>
      {


        setFormData({...formData,['id']:meetingFile.length-1})
         
        //  console.log(meetingFile.length)
        // console.log(formData['id'])
      }

      const reOrderId=(meetingFile) =>{
        let i=0
        meetingFile.forEach(element => {
            element.id = i++
        });
        return meetingFile;
      }

      const clicked =(event) =>{

      }
      const modify =(event) =>{

      }
      
      const addMeeting = async (event) => {
        event.preventDefault();
       
        
        const response = await fetch('/addMeeting', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({formData}),
        });
         setMeetingFile(await response.json())
         updateMeetingCount()
      };

      const updateMeetingCount =() =>{
        
            setFormData({...formData,['id']:meetingFile.length+1})
         
         console.log(meetingFile.length+1)
        // console.log(formData['id'])
      } 

   
      const handleInputChange = (event) => {
        
        const { name, value } = event.target;
        if(name === "title")
        setFormData({ ...formData, [name]: value.toUpperCase() });
        else if(name==="desc")
        setFormData({ ...formData, [name]: value.charAt(0).toUpperCase() + value.slice(1) });
        


        else {
            
        setFormData({ ...formData, [name]: value});
        }

        

        
      };

      const addTime =(event) =>{
        
        
        const name =event.target
            setFormData({ ...formData, ["time"]: getTime(event.value)});
      }
      const addDate=(event)=>{
        console.log(event)
            setFormData({ ...formData,["date"]: getDate(event.value)});
      }


      const handleNumberInput = (event) =>{
        handleInputChange();
        // setValue(event.value)
      }
     
      
        
            return (
                <div>
                    
                <div className="w-full h-screen flex justify-content-center ">
                <div className="card flex justify-content-center surface-50 w-4">
        
                <Card className="flex h-5 flex-row justify-content-center" >
                         <Calendar  className="my-2 mx-2 text-sm"  name="time" value={value} onChange={(e) => {setTime(e.value);addTime(e)}} timeOnly hourFormat="12" inline/>
        
                    </Card>
               
                    <Calendar className="my-2 h-26rem" name="date" id="calendar-dateonly" value={date} onChange={(e) => {setDate(e.value);addDate(e)}} inline dateFormat="dd/mm/yy"/>
                </div>
                <div className="form-details h-screen w-3 flex flex-column align-items-center bg-primary">
        
        
        <form onSubmit={addMeeting} id="form" className="flex flex-column w-full justify-content-center align-items-center">
                <span className="p-input-icon-left mt-6 m-4 mb-3">
                    
            <i className="pi pi-pencil" />
            <InputText className="w-20rem" name="title" placeholder="Title"  onChange={handleInputChange} required />
        </span>
        <InputTextarea className="m-4 w-20rem" autoResize placeholder="Description" name="desc" onChange={handleInputChange} rows={4} cols={30} />
         <Card  className="w-20rem flex justify-content-center bg-blue-600" >
        <span className=" flex flex-row m-1 mb-0">
           
        <div className="card flex mx-2 justify-content-center">
                    <InputNumber value={value} name="hour" onValueChange={(e) => {setValue(e.value);handleInputChange(e)}} showButtons buttonLayout="vertical" style={{ width: '3rem' }} 
                            decrementButtonClassName="p-button-secondary" placeholder="Hr" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-angle-up
                            " decrementButtonIcon="pi pi-angle-down
                            " min={0} max={12} />
                </div>
                <div className="card mx-2 flex justify-content-center">
                    <InputNumber value={value1}  name="minute" onValueChange={(e) => {setValue1(e.value);handleInputChange(e)}} showButtons buttonLayout="vertical" style={{ width: '3rem' }} 
                            decrementButtonClassName="p-button-secondary" placeholder="Min" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-angle-up
                            " decrementButtonIcon="pi pi-angle-down
                            " min={0} max={59}/>
                </div>
                
            
        </span></Card>
        
        <Button type="submit"  className = "bg-blue-500 shadow-6 text-lg mx-8 my-4 w-6" label="Add Meeting" icon="pi pi-plus" />
        </form>
        
        <Button onClick={handleLogout} className = "bg-red-400 shadow-6 mx-8 my-3 w-9 h-2 text-2xl" label="Logout" icon="pi pi-sign-out" />
                </div>
                
                <div className="w-4 h-4 flex flex-column align-items-center justify-content center surface-50">
                <div className=" w-11 m-2">
                    
                        <Card className=" flex flex-column h-8 rem my-2">
                        <h4 id="calendar-timeonly">{t?t:<Skeleton width="8rem" height="2rem"></Skeleton>}</h4>
                        <h5 className="my-1"> {fullDate ? fullDate: <Skeleton height="1.5rem" className="mb-2"></Skeleton>}</h5>
                        </Card>
                    
                       
                        <Card className=" p-0 h-10rem">
                            <h3 className="my-0">{formData.title?formData.title:<Skeleton height="1.5rem" className="mb-2"></Skeleton>}</h3>
                        <h6  className="my-2">{formData.desc?formData.desc:<Skeleton height="1.5rem" className="mb-2"></Skeleton>}</h6>
                        <div className="flex flex-row my-3">
                            <h5>Duration : </h5>
                        <h5  className="mx-1">{formData.hour?formData.hour+" Hr":<Skeleton height="1.5rem" width="4rem" className="mb-2"></Skeleton>}</h5>
                        <h5  className="mx-1">{formData.minute?formData.minute+" Mins":<Skeleton height="1.5rem" width="4rem" className="mb-2"></Skeleton>}</h5>
                        </div>
                   </Card>
                         
                    
                </div>
                
                
        
                <div className="card w-11 p-2 shadow-5 flex justify-content-center">  
                    <ListBox value={meetings}  options={meetingFile.slice().reverse()} optionLabel="ID" listStyle={{ maxHeight: '290px' }} itemTemplate={itemTemplate} className=" w-full" />
                </div>
                </div>
                </div>
                
                </div>
            )
           
        }
       


    

        
  


export default Dashboard;
