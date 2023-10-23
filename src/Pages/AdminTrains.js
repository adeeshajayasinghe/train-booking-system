import React from 'react'
import AdminSidebar from '../Components/AdminSidebar';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteConfirm from '../Components/DeleteConfirm';
import FormControl from '@mui/joy/FormControl';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AdminTrains = () => {
  const[orginalData,setorginalData] =useState();
  const [tarinDetails,setDetails]=useState();
  const[category,setCategory]=useState();
  const[isDelete,setIsDelete]=useState(false);
  const[isEdit,setIsEdit]=useState(false);
  const[mouseEnter,setMouseEnter]=useState(false);
  const[click,setClick]=useState(false); // for 2D array
  const[classClick,setclassClick]=useState(false)
  const[click1D,setClick1D]=useState(false);// for 1D
  const [editIndex,seteditIndex]=useState();
  const [editSubIndex,seteditSubIndex]=useState();
  const[editClassIndex,seteditClassIndex]=useState();
  const [deleteIndex,setdeleteIndex]=useState();
  const [deleteSubIndex,setdeleteSubIndex]=useState([]);
  const[deleteConfirm,setDeleteConfirm]=useState(false);
  const[isDropdownopen,setIsDropdownopen]=useState(false);
  const[selectedClass,setselectedClass]=useState([]);
  const[selectedRoutes,setselectedRoutes]=useState([]);
  const [selectedDate,setselectedDate]=useState('');
  const[trainName,setTrainName]=useState([]);
  const[id,setId]=useState();
  const handleEdit= (index) => {
    setIsEdit(true);
    seteditIndex(index);
    setselectedClass(tarinDetails[index].class);
    setselectedRoutes(tarinDetails[index].routes)
    console.log(tarinDetails[index]._id)
    setId(tarinDetails[index]._id ? tarinDetails[index]._id: 0)
    console.log(id)
  };
  
  const handleMouseEnter=(i)=>{
    setMouseEnter(true);
    seteditSubIndex(i);
  }
  const handleMouseLeave=()=>{
    setIsDropdownopen(false)
    setTimeout(()=>{
      setMouseEnter(false);
      
    },300)
   
  }
  const handleDeleteStation=(index,indx)=>{
   setIsDelete(true);
   setdeleteIndex(index);
   setdeleteSubIndex([...deleteSubIndex,indx]);
   setTimeout(()=>{
    setMouseEnter(false);
    
  },300)
  }
  const handleClick=(i)=>{
    setClick(true);
    seteditSubIndex(i);
    
  }
  const handleClassClick=(i)=>{
    setclassClick(true)
    seteditClassIndex(i);
  }
  const handleClick1D=(i)=>{
    setClick1D(true);
    setselectedDate(tarinDetails[editIndex].dates)
  }
  const hadnleName=(e,index)=>{
    const newDetails=[...tarinDetails];
    newDetails[index].trainName=e.target.value;
   setDetails(newDetails);
  }
  const hadnleStation=(e,i,index)=>{
    const newDetails=[...tarinDetails];
    newDetails[index].stations[i]=e.target.value;
   setDetails(newDetails);
  }
  const hadnleArriavl=(e,i,index)=>{
    const newDetails=[...tarinDetails];
    newDetails[index].arrivalTimes[i]=e.target.value;
   setDetails(newDetails);
  }
  const hadnleDepartures=(e,i,index)=>{
    const newDetails=[...tarinDetails];
    newDetails[index].departureTimes[i]=e.target.value;
   setDetails(newDetails);
  }
  const handleDestination=(e,index)=>{
    const newDetails=[...tarinDetails];
    newDetails[index].destination=e.target.value;
   setDetails(newDetails);
  }
  const handleOrigin=(e,index)=>{
    const newDetails=[...tarinDetails];
    newDetails[index].origin=e.target.value;
   setDetails(newDetails);
  }
  const handletrainNo=(e,index)=>{
    const newDetails=[...tarinDetails];
    newDetails[index].trainNo=e.target.value;
   setDetails(newDetails);
  }
  const handleDates=(e,index)=>{
    const newDetails=[...tarinDetails];
    newDetails[index].dates=e.target.value;
    setselectedDate(newDetails[index].dates)
   setDetails(newDetails);
  }
  const handleClass=(e,index,value)=>{
    setselectedClass(prevSelectedClass => {
      const updatedSelectedClass = e.target.checked
        ? [...prevSelectedClass, value]
        : prevSelectedClass.filter(c => c !== value);
  
      const newDetails = [...tarinDetails];
      if(newDetails[index].class[0]==="Enter class"){
        newDetails[index].class=newDetails[index].class.shift();
      }
      newDetails[index].class = updatedSelectedClass;
      setDetails(newDetails);
      
      return updatedSelectedClass;
    });
  };
  const handleRoutes=(e,index,value)=>{
    
    setselectedRoutes(prevSelectedRoute => {
      const updatedSelectedRoute = e.target.checked
        ? [...prevSelectedRoute, value]
        : prevSelectedRoute.filter(c => c !== value);
  
      const newDetails = [...tarinDetails];
      if(newDetails[index].routes[0]==="Enter Routes"){
        newDetails[index].routes=newDetails[index].routes.shift();
      }
      newDetails[index].routes = updatedSelectedRoute;
      setDetails(newDetails);
      
      return updatedSelectedRoute;
    });
    console.log(tarinDetails[index].routes)
  };
  const hadnleseatsAvailability=(e,i, index)=>{
    const newDetails=[...tarinDetails];
    newDetails[index].seatsAvailability[i]=e.target.value;
    setDetails(newDetails);
  };
  const handleAddAbove=(index,indx)=>{
    const newDetails=[...tarinDetails];
    if(indx===0){
    newDetails[index].stations=['Add Data ',...newDetails[index].stations];
    newDetails[index].arrivalTimes=['Add Data',...newDetails[index].arrivalTimes];
    newDetails[index].departureTimes=['Add Data ',...newDetails[index].departureTimes];
    }
    else{
    newDetails[index].stations=[...newDetails[index].stations.slice(0,indx-1),'Add Data ',...newDetails[index].stations.slice(indx-1)];
    newDetails[index].arrivalTimes=[...newDetails[index].arrivalTimes.slice(0,indx-1),'Add Data ',...newDetails[index].arrivalTimes.slice(indx-1)];
    newDetails[index].departureTimes=[...newDetails[index].departureTimes.slice(0,indx-1),'Add Data ',...newDetails[index].departureTimes.slice(indx-1)];
    }
    setDetails(newDetails);
  }
  const handleAddBelow=(index,indx)=>{
    const newDetails=[...tarinDetails];
    if(indx===newDetails[index].stations.length){
    newDetails[index].stations.push('Add Data')
    newDetails[index].arrivalTimes.push('Add Data');
    newDetails[index].departureTimes.push('Add Data');
    }
    else{
      console.log(newDetails[index].stations)
    newDetails[index].stations=[...newDetails[index].stations.slice(0,indx),'Add Data ',...newDetails[index].stations.slice(indx)];
    newDetails[index].arrivalTimes=[...newDetails[index].arrivalTimes.slice(0,indx),' Add Data',...newDetails[index].arrivalTimes.slice(indx)];
    newDetails[index].departureTimes=[...newDetails[index].departureTimes.slice(0,indx),'Add Data ',...newDetails[index].departureTimes.slice(indx)];
    }
    setDetails(newDetails);
  }
  const updatehandler= async(e,index)=>{
    console.log('first')
    e.preventDefault();
    if (deleteSubIndex){
      for(const i of deleteSubIndex){
        if (i===0){
          let newDetails= [...tarinDetails];
          newDetails=newDetails[index].stations.shift();
          newDetails=newDetails[index].arrivalTimes.shift();
          newDetails=newDetails[index].departureTimes.shift();
          setDetails(newDetails);
        }
        else if(i===deleteSubIndex.length-1){
          let newDetails= [...tarinDetails];
          newDetails[index].stations.pop();
          newDetails[index].arrivalTimes.pop();
          newDetails[index].departureTimes.pop()
          setDetails(newDetails);
        }
        else{
          let newDetails= [...tarinDetails];
          newDetails[index].stations.splice(i,1);
          newDetails[index].arrivalTimes.splice(i,1);
          newDetails[index].departureTimes.splice(i,1);
          setDetails(newDetails)
        }
      }
    }
    if(tarinDetails.length>orginalData.length){
      try{
        await axios.post('http://localhost:4000/trains/addtrain',
      {
        newtrain:tarinDetails[tarinDetails.length-1]
      })
      }
      catch(err){
        console.log("Erroe when adding a new Train")
      }
      
    }
    else{
     
      const id=tarinDetails[index]._id;
    try{
      await axios.put(`http://localhost:4000/trains/update/${id}`,tarinDetails[index])
    }
    catch(err){
      console.log(err)
    }
    }
    setorginalData(JSON.parse(JSON.stringify(tarinDetails)));
    setdeleteSubIndex();
    setIsEdit(false);
    setIsDelete(false);
  }
  const cancelhandler=(e,index)=>{
    e.preventDefault();
    const newDetails=[...tarinDetails];
    if(tarinDetails.length>orginalData.length){
      newDetails.pop();
    }else{
      newDetails[index]=JSON.parse(JSON.stringify(orginalData[index]));
    }
    
    console.log(newDetails[index])
   setDetails(newDetails);
    setselectedDate(orginalData[index].dates)
    setIsEdit(false);
    setIsDelete(false);
    setdeleteSubIndex();
  }
 const trainDeleteHandler=(index)=>{
    setDeleteConfirm(false);
    const newDetails=[...tarinDetails];
    newDetails.splice(index,1);
   setDetails(newDetails);
 }
 useEffect(()=>{
  const fetchName=async()=>{
    try{
      const {data}=await axios.get('http://localhost:4000/trains/getTrainName');
      setTrainName(data)
    }
    catch(err){
      console.log(err)
    }
  }
  fetchName();
},[])
const fetchData=async() => {
  setIsEdit(false);
  setIsDelete(false);
        try {
            const res = await axios.get(`http://localhost:4000/trains/trainDetails/${category}`);
            console.log(res)
              setDetails(res.data);
             setorginalData(JSON.parse(JSON.stringify(res.data)))
              
              
        } catch (error) {
          console.error('Error fetching seats:', error);
        }
    };
   
    
 
  return (
    <div className='admin-layout'>
      <div className="sidebar-section">
        <AdminSidebar />
      </div>
      <div className='details-container'>
      <div className='origin'>
      <FormControl sx={{ width: 240 }}>
                <Autocomplete
                    value={category}
                    onChange={(event, newValue) => {
                        setCategory(newValue);
                        console.log(category)
                    }}
                    inputValue={category}
                    onInputChange={(event, newInputValue) => {
                        setCategory(newInputValue);
                    }}
                    // disablePortal
                    id="combo-box-demo"
                    options={trainName}
                    sx={{ width: 240 }}
                    renderInput={(params) => <TextField {...params}  size="small" label="Select Train" /> }
                />
                </FormControl>
                <div className='submit-btn'>
                  <Button onClick={()=>fetchData()}>Confirm</Button>
                </div>
      </div>
      {deleteConfirm && <DeleteConfirm onClose={()=>trainDeleteHandler(editIndex)} id={id}></DeleteConfirm>}
        <div className='schedule-topic'>Change Stations & Time</div>
        <div className='table-container'>
        <table className='table'>
          <thead className='table-head'>
            <tr>
              <td>Train</td>
              <td>Train No</td>
              <td className="column-to-fix">{"   "}</td>
              <td>Station</td>  
              <td>Depar</td>
              <td>Arriv</td>
              <td>Desti</td>
              <td>Origin</td>
              <td>Dates</td>
              <td>Routes</td>
              <td>Classes</td>
              <td>NOfSeats</td>
              <td>Action</td>

            </tr>
          </thead >  
          <tbody className='table-body'>
          {tarinDetails && tarinDetails.map((train,index)=>{
            return(
              <tr key={{index}}>
                  <td>
                    <div className='add-icon list-content'>
                    
                    {isEdit? editIndex===index?(
                      <div onClick={()=>handleClick1D(index)}>
                        {click1D ?(
                          <div>
                           <input
                       type='text'
                       value={train.trainName}
                       onChange={(e) =>{hadnleName(e, index)}}
                       style={{ border: 'none', outline: 'none' ,width:'60px',backgroundColor:'#65bbcc'}}
                     />
                     <DeleteIcon className='icon-small' style={{ fontSize: '18px'  }} onClick={()=>setDeleteConfirm(true)}/>
                     </div>):(<>
                     <div className='list-content'>{train.trainName}</div>
                     <DeleteIcon className='icon-small' style={{ fontSize: '18px'  }} onClick={()=>setDeleteConfirm(true)}/>
                     </>)}
                      
                    
                    </div>):( <div className='list-content'>{train.trainName}</div> ):(<div className='list-content'>{train.trainName}</div>)}
                    </div>
                  </td>
                  <td>
                  <div className={isEdit && editIndex===index ?"list-content edit":'list-content'} >
                      {isEdit && editIndex===index ?(
                        <div onClick={()=>handleClick1D(index)}>
                        {click1D ?( <input
                       type='text'
                       value={train.trainNo}
                       onChange={(e) =>{handletrainNo(e, index)}}
                       style={{ border: 'none', outline: 'none' ,width:'30px',backgroundColor:'#65bbcc'}}
                     />):(<>
                     <div className='list-content'>{train.trainNo}</div>
                     </>)}
                      
                    </div>):
                      (<div>
                        {train.trainNo}
                        </div>)}
                    
                    </div>
                   
                  </td>
                  <td className=' border-bottom'>
                    {train.stations && train.stations.map((item,indx)=>(
                      <div className={isEdit && editIndex===index ?  "list-content edit":'list-content'} style={{cursor:'pointer'}} key={indx}>
                        {isEdit && editIndex===index? (<div onMouseEnter={()=>handleMouseEnter(indx)} onMouseLeave={handleMouseLeave}>
                         {mouseEnter && editSubIndex===indx?(
                           <div >
                           <DeleteIcon className='icon-small' style={{ fontSize: '18px'  }} onClick={()=>handleDeleteStation(index,indx)}/>    
                           <AddIcon className='icon-small' style={{ fontSize: '18px' }} onClick={()=>setIsDropdownopen(true)}></AddIcon>
                           {isDropdownopen?(<div className='drop-down-container'>
                           <p  onClick={()=>handleAddAbove(index,indx)} className='active-btn'>Add to Above</p>
                           <p onClick={()=>handleAddBelow(index,indx)} className='active-btn'>Add to Below</p>
                           </div>):
                           (<></>)}
                           </div>):
                           (<div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(indx)?'delete':''}>{indx}</div>)}
                           
                          </div>):
                          (<div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(indx)?'delete':''}>{indx}</div> )} 
                      </div> ))}
                  </td>
                  <td className='border-bottom'>{train.stations && train.stations.map((station,i)=>{
                    return(<div className={isEdit && editIndex===index ?"list-content edit":'list-content'} key={index}>
                       {isEdit && editIndex===index?(
                        <div  onClick={()=>handleClick(i)} onMouseEnter={()=>handleMouseEnter(i)} onMouseLeave={handleMouseLeave}>
                          {editSubIndex===i && click? (
                             <input
                             type='text'
                             value={station}
                             onChange={(e) =>{hadnleStation(e,i, index)}}
                             style={{ border: 'none', outline: 'none' ,width:'50px',backgroundColor:'#65bbcc'}}
                           />
                          ):
                          ((<div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>{station}</div>))}
                        </div>) :
                           
                           <div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>{station}</div>
                          }
                       </div>);})}
                  </td>
                  <td className='border-bottom'>{train.arrivalTimes && train.arrivalTimes.map((arrival,i)=>{
                   return(<div className={isEdit && editIndex===index ?"list-content edit":'list-content'} key={index}>
                   {isEdit && editIndex===index?(
                    <div  onClick={()=>handleClick(i)} onMouseEnter={()=>handleMouseEnter(i)} onMouseLeave={handleMouseLeave}>
                      {editSubIndex===i && click? (
                         <input
                         type='time'
                         value={arrival}
                         onChange={(e) =>{hadnleArriavl(e,i, index)}}
                         style={{ border: 'none', outline: 'none' ,width:'40px',backgroundColor:'#65bbcc'}}
                       /> ):
                       ((<div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>{arrival}</div>))}
                      </div>  ) : 
                       <div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>{arrival}</div>
                      }
                     </div>); })}
                  </td>
                  <td className='border-bottom'>{train.departureTimes && train.departureTimes.map((departure,i)=>{
                    return(<div className={isEdit && editIndex===index ?"list-content edit":'list-content'} key={i}>
                    {isEdit && editIndex===index?(
                     <div  onClick={()=>handleClick(i)} onMouseEnter={()=>handleMouseEnter(i)} onMouseLeave={handleMouseLeave}>
                      {editSubIndex===i && click? (
                         <input
                         type='time'
                         value={departure}
                         onChange={(e) =>{hadnleDepartures(e,i, index)}}
                         style={{ border: 'none', outline: 'none' ,width:'40px',backgroundColor:'#65bbcc'}} /> ):
                         ((<div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>{departure}</div>))}
                        </div>) :
                         
                      <div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>{departure}</div>
                      }
                    </div>); })}
                  </td>
                  <td>
                    <div className={isEdit && editIndex===index ?"list-content edit":'list-content'} >
                      {isEdit && editIndex===index ?(
                        <div onClick={()=>handleClick1D(index)}>
                        {click1D ?( <input
                       type='text'
                       value={train.destination}
                       onChange={(e) =>{handleDestination(e, index)}}
                       style={{ border: 'none', outline: 'none' ,width:'40px',backgroundColor:'#65bbcc'}}
                     />):(<>
                     <div className='list-content'>{train.destination}</div>
                     </>)}
                      
                    </div>):
                      (<div>
                        {train.destination}
                        </div>)}
                    
                    </div>
                   
                  </td>
                  <td>
                  <div className={isEdit && editIndex===index ?"list-content edit":'list-content'} >
                      {isEdit && editIndex===index ?(
                        <div onClick={()=>handleClick1D(index)}>
                        {click1D ?( <input
                       type='text'
                       value={train.origin}
                       onChange={(e) =>{handleOrigin(e, index)}}
                       style={{ border: 'none', outline: 'none' ,width:'40px',backgroundColor:'#65bbcc'}}
                     />):(<>
                     <div className='list-content'>{train.origin}</div>
                     </>)}
                      
                    </div>):
                      (<div>
                        {train.origin}
                        </div>)}
                    
                    </div>
                   
                  </td>
                  <td>
                  <div className={isEdit && editIndex===index ?"list-content edit":'list-content'} >
                      {isEdit && editIndex===index ?(
                        <div onClick={()=>handleClick1D(index)} style={{textAlign:'left'}}>
                        {click1D ?(
                        <div>  
                      <input
                       type='radio'
                       value="Daily"
                       checked={selectedDate==="Daily"}
                       onChange={(e) =>{handleDates(e, index)}}
                       style={{ border: 'none', outline: 'none' ,width:'30px',backgroundColor:'#65bbcc'}}/>
                       <label>Daily</label>
                       <br></br>
                       <input
                       type='radio'
                       value="Weekdays"
                       checked={selectedDate==="Weekdays"}
                       onChange={(e) =>{handleDates(e, index)}}
                       style={{ border: 'none', outline: 'none' ,width:'30px',backgroundColor:'#65bbcc'}}/>
                       <label>WeekDays</label>
                       <br></br>
                       <input
                       type='radio'
                       value='Weekends'
                       checked={selectedDate==="Weekends"}
                       onChange={(e) =>{handleDates(e, index)}}
                       style={{ border: 'none', outline: 'none' ,width:'30px',backgroundColor:'#65bbcc'}}/>
                       <label>WeekEnds</label>
                       </div>)
                       :(<><div className='list-content'>{train.dates}</div> </>)}
                      
                    </div>):
                      (<div>
                        {train.dates}
                        </div>)}
                    
                    </div>
                   
                  </td>
                  <td>
                    
                  <div style={{textAlign:'left'}}> 
                       <input
                      type='checkbox'
                      value={1}
                      id='Main Line'
                      onChange={(e)=>{isEdit && editIndex===index && handleRoutes(e,index,1)}}
                      checked={(isEdit && editIndex===index && (selectedRoutes.includes(1))) |(train.routes.includes(1))}
                      style={{ border: 'none', outline: 'none', width: '30px', backgroundColor: '#65bbcc' }}
                      
                    />
                     <label for='Main Line'>Main Line</label>
                    <br></br>
                  
                    <input
                    type='checkbox'
                    value={2}
                    id='Matale Line'
                    checked= {isEdit && editIndex===index?selectedRoutes.includes(2):train.routes.includes(2)}
                    onChange={(e)=>{isEdit && editIndex===index && handleRoutes(e,index,2)}}
                    style={{ border: 'none', outline: 'none' ,width:'30px',backgroundColor:'#65bbcc'}}
                    
                  />
                   <label for='Matale Line'>Matale Line</label>
                  <br></br>
                  
                  <input
                  type='checkbox'
                  value={3}
                  id='Nothern Line'
                  onChange={(e)=>{isEdit && editIndex===index && handleRoutes(e,index,3)}}
                  checked= {isEdit && editIndex===index?selectedRoutes.includes(3):train.routes.includes(3)}
                  style={{ border: 'none', outline: 'none' ,width:'30px',backgroundColor:'#65bbcc'}}
                  
                />
                <label for='Nothern Line'>Nothern Line</label>
                <br></br>
                <input
                      type='checkbox'
                      value={4}
                      id='Mannar Line'
                      onChange={(e)=>{isEdit && editIndex===index && handleRoutes(e,index,4)}}
                      checked={(isEdit && editIndex===index && (selectedRoutes.includes(4))) |(train.routes.includes(4))}
                      style={{ border: 'none', outline: 'none', width: '30px', backgroundColor: '#65bbcc' }}
                      
                    />
                     <label for='Mannar Line'>Mannar Line</label>
                    <br></br>
                    <input
                      type='checkbox'
                      value={5}
                      id='Batticaloa Line'
                      onChange={(e)=>{isEdit && editIndex===index && handleRoutes(e,index,5)}}
                      checked={(isEdit && editIndex===index && (selectedRoutes.includes(5))) |(train.routes.includes(5))}
                      style={{ border: 'none', outline: 'none', width: '30px', backgroundColor: '#65bbcc' }}
                      
                    />
                     <label for='Batticaloa Line'>Batticaloa Line</label>
                    <br></br>
                    <input
                      type='checkbox'
                      value={6}
                      id='Trincomalee Line'
                      onChange={(e)=>{isEdit && editIndex===index && handleRoutes(e,index,6)}}
                      checked={(isEdit && editIndex===index && (selectedRoutes.includes(6))) |(train.routes.includes(6))}
                      style={{ border: 'none', outline: 'none', width: '30px', backgroundColor: '#65bbcc' }}
                      
                    />
                     <label for='Trincomalee Line'>Trincomalee Line</label>
                    <br></br>
                    <input
                      type='checkbox'
                      value={7}
                      id='Puttalam Line'
                      onChange={(e)=>{isEdit && editIndex===index && handleRoutes(e,index,7)}}
                      checked={(isEdit && editIndex===index && (selectedRoutes.includes(7))) |(train.routes.includes(7))}
                      style={{ border: 'none', outline: 'none', width: '30px', backgroundColor: '#65bbcc' }}
                      
                    />
                     <label for='Puttalam Line'>Puttalam Line</label>
                    <br></br>
                    <input
                      type='checkbox'
                      value={8}
                      id='Kelani Valley Line'
                      onChange={(e)=>{isEdit && editIndex===index && handleRoutes(e,index,8)}}
                      checked={(isEdit && editIndex===index && (selectedRoutes.includes(8))) |(train.routes.includes(8))}
                      style={{ border: 'none', outline: 'none', width: '30px', backgroundColor: '#65bbcc' }}
                      
                    />
                     <label for='Kelani Valley Line'>Kelani Valley Line</label>
                    <br></br>
                    <input
                      type='checkbox'
                      value={9}
                      id='Coastal Line'
                      onChange={(e)=>{isEdit && editIndex===index && handleRoutes(e,index,9)}}
                      checked={(isEdit && editIndex===index && (selectedRoutes.includes(9))) |(train.routes.includes(9))}
                      style={{ border: 'none', outline: 'none', width: '30px', backgroundColor: '#65bbcc' }}
                      
                    />
                     <label for='Coastal Line'>Coastal Line</label>
                    <br></br>
                     </div>
                  
                  </td>
                  <td>
                    
                      <div style={{textAlign:'left'}}>
                       
                        <input
                       type='checkbox'
                       value='First Class'
                       id='First Class'
                       onChange={(e)=>{isEdit &&  editIndex===index && handleClass(e,index,'First Class')}}
                       checked={(isEdit && editIndex===index && (selectedClass.includes('First Class'))) |(train.class.includes('First Class'))}
                       style={{ border: 'none', outline: 'none', width: '30px', backgroundColor: '#65bbcc' }}
                       
                     />
                      <label for='First Class'>1st</label>
                     <br></br>
                   
                     <input
                     type='checkbox'
                     value='Second Class'
                     id='Second Class'
                     checked= {isEdit && editIndex===index?selectedClass.includes('Second Class'):train.class.includes('Second Class')}
                     onChange={(e)=>{isEdit &&  editIndex===index && handleClass(e,index,'Second Class')}}
                     style={{ border: 'none', outline: 'none' ,width:'30px',backgroundColor:'#65bbcc'}}
                     
                   />
                    <label for='Second Class'>2nd</label>
                   <br></br>
                   
                   <input
                   type='checkbox'
                   value='Third Class'
                   id='Third Class'
                   onChange={(e)=>{isEdit && editIndex===index && handleClass(e,index,'Third Class')}}
                   checked= {isEdit && editIndex===index?selectedClass.includes('Third Class'):train.class.includes('Third Class')}
                   style={{ border: 'none', outline: 'none' ,width:'30px',backgroundColor:'#65bbcc'}}
                   
                 />
                 <label for='Third Class'>3rd</label>
                      </div>
                   
                  </td>
                  <td className='border-bottom'>{train.seatsAvailability && train.seatsAvailability.map((seats,i)=>{
                    return(<div className={isEdit && editIndex===index ?"list-content edit":'list-content'} key={i}>
                    {isEdit && editIndex===index?(
                     <div  onClick={()=>handleClassClick(i)}  >
                      {editClassIndex===i && classClick? (
                         <input
                         type='number'
                         value={seats}
                         onChange={(e) =>{hadnleseatsAvailability(e,i, index)}}
                         style={{ border: 'none', outline: 'none' ,width:'40px',backgroundColor:'#65bbcc'}} /> ):
                         ((<div>{seats}</div>))}
                        </div>) :
                         
                      <div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>{seats}</div>
                      }
                    </div>); })}
                  </td>
                  
                  <td>
                    <div className='action'>
                      {
                        isEdit && editIndex===index?(<div>
                          <Button onClick={(e)=>updatehandler(e,index)}>Update</Button>
                          <Button onClick={(e)=>cancelhandler(e,index)}>Cancel</Button>
                          </div>):
                            (<div>
                              <div  className='icon-container'> 
                              <BorderColorIcon onClick={()=>handleEdit(index)} className='icon-normal'/>
                              </div>
                              <div>
                                <AddCircleOutlineIcon className='icon-normal' onClick={()=>setDetails([...tarinDetails,
                                  {trainName:'Enter Train Name',
                                   stations:['Enter Name'],
                                   arrivalTimes:['Enter time'],
                                   departureTimes:['Enter time'],
                                   origin:'Enter Origin',
                                   destination:'Enter Destination',
                                   dates:'Enter Dates',
                                   routes:['Enter Routes'],
                                   class:['Enter class'],
                                   seatsAvailability:['Enter Num ','Enter Num ','Enter Num '],
                                   seatArrangement:[0]
                                   }])}/>
                              </div>
                              
                                </div> )}
                    </div>
                  </td>
                </tr>
                )
              })}
              
             </tbody> 
        </table>
    </div>
      </div>
      
    </div>
  )
}

export default AdminTrains;