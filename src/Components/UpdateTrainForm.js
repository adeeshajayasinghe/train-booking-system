import React from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 const UpdateTrainForm= ({onClose,name,stations,arrivals,departures})=> {
  const navigate= useNavigate();
  const submitHandler=async()=>{
   navigate('/modify-schedules');
  }
  return (
    <div className='form'>
        <span  onClick={onClose} className='closeForm'>&times;</span>
        <h2>Update Train Details</h2>
        <form onSubmit={submitHandler}>
            <div className='route'>
              <div className='origin'>
                <FormControl>
                      <FormLabel>Train name</FormLabel>
                      <Input defaultValue={name} placeholder="Enter here" variant="soft" size="sm" />
                </FormControl>
              </div>
              <div className='dest'>
                    <FormControl>
                        <FormLabel>Station Name</FormLabel>
                        <Input defaultValue={stations} placeholder="Enter here" variant="soft" size="sm"/>
                    </FormControl>
                </div>
            </div>
            <div className='route'>
              <div className='origin'>
                <FormControl>
                      <FormLabel>Arrival Time</FormLabel>
                      <Input defaultValue={arrivals}  placeholder="Enter here" variant="soft" size="sm" />
                </FormControl>
              </div>
              <div className='dest'>
                    <FormControl>
                        <FormLabel>Departure Time</FormLabel>
                        <Input defaultValue={departures} placeholder="Enter here" variant="soft" size="sm"/>
                    </FormControl>
                </div>
                <div className='submit-btn'>
                <Button type="submit">Save Changes</Button>
            </div>
            </div>
          </form>
    </div>
  )
}

export default UpdateTrainForm;
