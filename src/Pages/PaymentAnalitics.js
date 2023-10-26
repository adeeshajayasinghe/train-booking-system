import React, { useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar'
import { Line } from 'react-chartjs-2'
import {Chart as chartjs, CategoryScale, LinearScale, scales, PointElement, LineElement} from 'chart.js'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PaymentAnaliticsPerTrain from './PaymentAnaliticsPerTrain';
import PaymentAnaliticsPerDate from './PaymentAnaliticsPerDate';

const PaymentAnalytics = () => {
    chartjs.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        
    )
    const [perTrain,setPerTrain]=useState(false);
    const [perDate,setPerDate]=useState(false);
    
    const hadnlePerDate=()=>{
        setPerDate(true);
       
        setPerTrain(false);
    };
    const hadnlePerTrain=()=>{
      setPerDate(false);
      
      setPerTrain(true);
  };
  const hadnlePerRoute=()=>{
    setPerDate(false);
   
    setPerTrain(false);
};
    
const data = {
  labels: [],
  datasets: [
    {
      label: 'Payment Analysis',
      data: [],
      backgroundColor:'rgba(17, 124, 181, 0.5)',
      borderColor: 'rgb(7, 46, 59)', 
      borderWidth: 2,
    },
  ],
};
    return (
        
        <div className='admin-layout'>
            <div className="sidebar-section">
        <AdminSidebar />
      </div>
      <div className='paymentAnalysisContainer'>
      <div className='modify-topic'>Payments Variation </div>
       <div className='radio-btn-grp'>   
       <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Select Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Revenue Per Train" onClick={hadnlePerTrain} />
        <FormControlLabel value="male" control={<Radio />} label="Revenue Per Date" onClick={hadnlePerDate}/>
        
      </RadioGroup>
    </FormControl>
   
    {perTrain && <PaymentAnaliticsPerTrain ></PaymentAnaliticsPerTrain>}
   
    {perDate && <PaymentAnaliticsPerDate ></PaymentAnaliticsPerDate>}
    </div>
    <div className='chart'>
      {!(perTrain|perDate) && <Line data={data}></Line>}
    </div>
      </div>
      
        
        </div>
      
    );
  };
  
  export default PaymentAnalytics;

  
  
  
  
