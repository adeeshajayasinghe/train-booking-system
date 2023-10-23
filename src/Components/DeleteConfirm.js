import React from 'react'
import Button from '@mui/joy/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 const DeleteConfirm=(props) =>{
  const{onClose,id}=props
  const navigate=useNavigate();
  console.log(id)
    const handleDelete = async (id)=>{
      onClose();
      if(id){
        await axios.delete(`http://localhost:4000/trains/${id}`,(req,res)=>{
          if(res){
            window.alert("Successfuly Deleted")
          }
        });
        navigate('/modify-schedules')
      }
      else{
        navigate('/modify-schedules')
      }
        };
  return (
    <div className='form'>
        <span className='closeForm' onClick={onClose}>&times;</span>
        <h4>Delete This Train Details?</h4>
        <div className='action'>
        <div ><Button onClick={onClose}>Cancel</Button></div>
        <div ><Button onClick={()=>{handleDelete(id);}}>Delete</Button></div>
        </div>
    </div>
  )
}


export default DeleteConfirm;