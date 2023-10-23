import React ,{useEffect,useState}from 'react'
import AdminSidebar from '../Components/AdminSidebar';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
export default function RouteDetails() {
    const[orginalData,setorginalData] =useState();
    const[isDelete,setIsDelete]=useState(false);
    const[isEdit,setIsEdit]=useState(false);
    const[click,setClick]=useState(false);
    const[clickIndex,setclickIndex]=useState();
    const[clickPrice,setclickPrice]=useState(false);
    const [editIndex,seteditIndex]=useState();
    const[mouseEnter,setMouseEnter]=useState(false);
    const[isDropdownopen,setIsDropdownopen]=useState(false);
    const [editSubIndex,seteditSubIndex]=useState();
    const [deleteIndex,setdeleteIndex]=useState();
    const [deleteSubIndex,setdeleteSubIndex]=useState([]);
    const [routeDetails,setDetails]=useState([]);
    const handleEdit= (index) => {
      setIsEdit(true);
      seteditIndex(index);
    };
    const handleMouseEnter=(i)=>{
      setMouseEnter(true);
      seteditSubIndex(i);
    }
    const handleDeletePoint=(index,indx)=>{
      setIsDelete(true);
      setdeleteIndex(index);
      setdeleteSubIndex([...deleteSubIndex,indx]);
      setTimeout(()=>{
       setMouseEnter(false);
       
     },300)
     }
    const handleMouseLeave=()=>{
      setIsDropdownopen(false)
      setTimeout(()=>{
        setMouseEnter(false);
        
      },300)
     
    }

  const handlename=(e,index)=>{
     const newDetails=[...routeDetails];
     newDetails[index].name=e.target.value;
     setDetails(newDetails)
  };
  const handleClick=(index)=>{
    setClick(true);
    setclickIndex(index);
  };
  const handle2DClick=(i)=>{
    setclickPrice(true);
    seteditSubIndex(i);
  }
  const handleRouteNo=(e, index)=>{
    const newDetails=[...routeDetails];
     newDetails[index].routeNo=e.target.value;
     setDetails(newDetails)
  };
  const hadnlePrice1=(e,i, index)=>{
    const newDetails=[...routeDetails];
     newDetails[index].prices[0][i]=parseInt(e.target.value, 10);
     setDetails(newDetails)
  }
  const hadnlePrice2=(e,i, index)=>{
    const newDetails=[...routeDetails];
    console.log(e.target.value)
     newDetails[index].prices[1][i]=parseInt(e.target.value, 10);
     setDetails(newDetails)
  }
  const hadnlePrice3=(e,i, index)=>{
    const newDetails=[...routeDetails];
     newDetails[index].prices[2][i]=parseInt(e.target.value, 10);
     setDetails(newDetails)
  }
  const handleAddAbove=(index,indx)=>{
    const newDetails=[...routeDetails];
    if(indx===0){
    newDetails[index].prices[0]=['Add Data ',...newDetails[index].prices[0]];
    newDetails[index].prices[1]=['Add Data',...newDetails[index].prices[1]];
    newDetails[index].prices[2]=['Add Data ',...newDetails[index].prices[2]];
    }
    else{
    newDetails[index].prices[0]=[...newDetails[index].prices[0].slice(0,indx-1),'Add Data ',...newDetails[index].prices[0].slice(indx-1)];
    newDetails[index].prices[1]=[...newDetails[index].prices[1].slice(0,indx-1),'Add Data ',...newDetails[index].prices[1].slice(indx-1)];
    newDetails[index].prices[2]=[...newDetails[index].prices[2].slice(0,indx-1),'Add Data ',...newDetails[index].prices[2].slice(indx-1)];
    }
    setDetails(newDetails);
  }
  const handleAddBelow=(index,indx)=>{
    const newDetails=[...routeDetails];
    if(indx===newDetails[index].prices[0].length){
    newDetails[index].prices[0].push('Add Data')
    newDetails[index].prices[1].push('Add Data');
    newDetails[index].prices[2].push('Add Data');
    }
    else{
      
    newDetails[index].prices[0]=[...newDetails[index].prices[0].slice(0,indx),'Add Data ',...newDetails[index].prices[0].slice(indx)];
    newDetails[index].prices[1]=[...newDetails[index].prices[1].slice(0,indx),' Add Data',...newDetails[index].prices[1].slice(indx)];
    newDetails[index].prices[2]=[...newDetails[index].prices[2].slice(0,indx),'Add Data ',...newDetails[index].prices[2].slice(indx)];
    }
    setDetails(newDetails);
  };
  const handleAddNew=()=>{
    const newone={prices:[[0],[0],[0]],routeNo:"Enter Route No",name:"Enter Route Name"};
   const newDetails=[...routeDetails,newone];
   setDetails(newDetails);
  }
  const updatehandler= async(e,index)=>{
    console.log('first')
    e.preventDefault();
    if (deleteSubIndex){
      for(const i of deleteSubIndex){
        if (i===0){
          let newDetails= [...routeDetails];
          newDetails=newDetails[index].prices[0].shift();
          newDetails=newDetails[index].prices[1].shift();
          newDetails=newDetails[index].prices[2].shift();
          setDetails(newDetails);
        }
        else if(i===deleteSubIndex.length-1){
          let newDetails= [...routeDetails];
          newDetails[index].prices[0].pop();
          newDetails[index].prices[1].pop();
          newDetails[index].prices[2].pop()
          setDetails(newDetails);
        }
        else{
          let newDetails= [...routeDetails];
          newDetails[index].prices[0].splice(i,1);
          newDetails[index].prices[1].splice(i,1);
          newDetails[index].prices[2].splice(i,1);
          setDetails(newDetails)
        }
      }
    }
    if(routeDetails.length>orginalData.length){
      try{
        await axios.post('http://localhost:4000/routes/addroute',
      {
        newroute:routeDetails[routeDetails.length-1]
      })
      }
      catch(err){
        console.log("Erroe when adding a new Train")
      }
      
    }
    else{
     
      const id=routeDetails[index]._id;
    try{
      await axios.put(`http://localhost:4000/routes/update/${id}`,routeDetails[index])
    }
    catch(err){
      console.log(err)
    }
    }
    setorginalData(JSON.parse(JSON.stringify(routeDetails)));
    setdeleteSubIndex();
    setIsEdit(false);
    setIsDelete(false);
  }
  const cancelhandler=(e,index)=>{
    e.preventDefault();
    const newDetails=[...routeDetails];
    if(routeDetails.length>orginalData.length){
      newDetails.pop();
    }else{
      newDetails[index]=JSON.parse(JSON.stringify(orginalData[index]));
    }
    
    
    console.log(newDetails[index])
   setDetails(newDetails);
    setIsEdit(false);
    setIsDelete(false);
    setdeleteSubIndex();
  }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/routes`);
                console.log(res)
                  setDetails(res.data);
                 setorginalData(JSON.parse(JSON.stringify(res.data)))
                  
                  
            } catch (error) {
              console.error('Error fetching seats:', error);
            }
        };
      
        fetchData();
      }, []);
  return (
    <div className='admin-layout'>
      <div className="sidebar-section">
        <AdminSidebar />
      </div>
      <div className='details-container'>
      <div className='schedule-topic'>Routes</div>
      <div className='table-container'>
        <table className='table'>
          <thead className='table-head'>
            <tr>
              <td>Route</td>
              <td>Route No</td>
              <td className="column-to-fix">{"   "}</td>
              <td>First Class</td>  
              <td>Second Class</td>
              <td>Third Class</td>
              <td>Action</td>

            </tr>
          </thead >  
          <tbody className='table-body'>
           
            {routeDetails && routeDetails.map((route,index)=>{
               return(
                <tr>
                 <td className=' border-bottom'>
                 <div className={isEdit && editIndex===index ?"list-content edit":'list-content'} key={index}>
                      {isEdit && editIndex===index ?(
                        <div onClick={()=>handleClick(index)}>
                        {click ?( <input
                       type='text'
                       value={route.name}
                       onChange={(e) =>{handlename(e, index)}}
                       style={{ border: 'none', outline: 'none' ,width:'60px',backgroundColor:'#65bbcc'}}
                     />):(<>
                     <div className='list-content'>{route.name}</div>
                     </>)}
                      
                    </div>):
                      
                      (<>{route.name}</>)}
              
                </div>
                </td>
                <td className=' border-bottom'>
               
                <div className={isEdit && editIndex===index ?"list-content edit":'list-content'} key={index}>
                      {isEdit && editIndex===index ?(
                        <div onClick={()=>handleClick(index)}>
                        {click ?( <input
                       type='text'
                       value={route.routeNo}
                       onChange={(e) =>{handleRouteNo(e, index)}}
                       style={{ border: 'none', outline: 'none' ,width:'50px',backgroundColor:'#65bbcc'}}
                     />):(<>
                     <div className='list-content'>{route.routeNo}</div>
                     </>)}
                      
                    </div>):
                      
                      (<>{route.routeNo}</>)}
              
                </div>
                </td>
                <td className=' border-bottom'>
                    {route.prices[0] && route.prices[0].map((item,indx)=>(
                      <div className={isEdit && editIndex===index ?  "list-content edit":'list-content'} style={{cursor:'pointer'}} key={indx}>
                        {isEdit && editIndex===index? (<div onMouseEnter={()=>handleMouseEnter(indx)} onMouseLeave={handleMouseLeave}>
                         {mouseEnter && editSubIndex===indx?(
                           <div >
                           <DeleteIcon className='icon-small' style={{ fontSize: '18px'  }} onClick={()=>handleDeletePoint(index,indx)}/>    
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
                <td className=' border-bottom'>
                <div className='list-content' key={index}>
                    {route.prices[0].map((p1,i)=>(
                        <div className='list-content' key={i}>
                          <div className={isEdit && editIndex===index ?"list-content edit":'list-content'} key={index}>
                   {isEdit && editIndex===index?(
                    <div  onClick={()=>handle2DClick(i)} onMouseEnter={()=>handleMouseEnter(i)} onMouseLeave={handleMouseLeave}>
                      {editSubIndex===i && clickPrice? (
                         <input
                         type='number'
                         value=  {p1}
                         onChange={(e) =>{hadnlePrice1(e,i, index)}}
                         style={{ border: 'none', outline: 'none' ,width:'50px',backgroundColor:'#65bbcc'}}
                       /> ):
                       ((<div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>  {p1}</div>))}
                      </div>  ) : 
                       <div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>  {p1}</div>
                      }
                     </div>
                           
                        </div>
                    ))}
                </div>
                </td>
                
        
               
                
                <td className=' border-bottom'>
                <div className='list-content' key={index}>
                    {route.prices[1].map((p2,i)=>(
                        <div className='list-content' key={i}>
                          <div className={isEdit && editIndex===index ?"list-content edit":'list-content'} key={index}>
                   {isEdit && editIndex===index?(
                    <div  onClick={()=>handle2DClick(i)} onMouseEnter={()=>handleMouseEnter(i)} onMouseLeave={handleMouseLeave}>
                      {editSubIndex===i && clickPrice? (
                         <input
                         type='number'
                         value=  {p2}
                         onChange={(e) =>{hadnlePrice2(e,i, index)}}
                         style={{ border: 'none', outline: 'none' ,width:'50px',backgroundColor:'#65bbcc'}}
                       /> ):
                       ((<div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>  {p2}</div>))}
                      </div>  ) : 
                       <div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>  {p2}</div>
                      }
                     </div>
                            
                        </div>
                    ))}
                </div>
                </td>
                
                <td className=' border-bottom'>
                <div className='list-content' key={index}>
                    {route.prices[2].map((p3,i)=>(
                        <div className='list-content' key={i}>
                          <div className={isEdit && editIndex===index ?"list-content edit":'list-content'} key={index}>
                   {isEdit && editIndex===index?(
                    <div  onClick={()=>handle2DClick(i)} onMouseEnter={()=>handleMouseEnter(i)} onMouseLeave={handleMouseLeave}>
                      {editSubIndex===i && clickPrice? (
                         <input
                         type='number'
                         value=  {p3}
                         onChange={(e) =>{hadnlePrice3(e,i, index)}}
                         style={{ border: 'none', outline: 'none' ,width:'50px',backgroundColor:'#65bbcc'}}
                       /> ):
                       ((<div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>  {p3}</div>))}
                      </div>  ) : 
                       <div className={isDelete  && deleteIndex===index && deleteSubIndex.includes(i)?'delete':''}>  {p3}</div>
                      }
                     </div>
                           
                        </div>
                    ))}
                </div>
                </td>
                
                
                <td className=' border-bottom'>
                {
                        isEdit && editIndex===index?(<div>
                          <Button onClick={(e)=>updatehandler(e,index)}>Update</Button>
                          <Button onClick={(e)=>cancelhandler(e,index)}>Cancel</Button>
                          </div>):(
                              <div  className='icon-container'> 
                              <BorderColorIcon onClick={()=>handleEdit(index)} className='icon-normal'/>
                            </div>
                          )
                  }
                </td>
                
                </tr>
           )})}
           
        </tbody>
      </table>
      </div >
      <div  className='icon-container'> 
      <AddCircleOutlineIcon onClick={()=>handleAddNew()} className='icon-normal'/>
      </div>
      </div>
      </div>

  )
}
