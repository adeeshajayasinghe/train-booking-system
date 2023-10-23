import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as chartjs, CategoryScale, LinearScale, scales, PointElement, LineElement} from 'chart.js'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
export default function PaymentAnaliticsPerRoute() {
  const[date,setDate]=useState('');
  const[dataSet,setdataSet]=useState([]);
  const[labelSet,setlabelSet]=useState([]);
  const[max,setMax]=useState(100);
  const[category,setCategory]=useState();
  const[month,setMonth]=useState();
  const options=[{label:"Monthly"},{label:"Daily"}]
  const now = new Date();
  const Months = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];
  const Currentmonth = Months[now.getMonth()];
  
    chartjs.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        
    )
   
    const data = {
      labels: labelSet,
      datasets: [
        {
          label: 'Payment Analysis Per Route',
          data: dataSet,
          backgroundColor:'rgba(17, 124, 181, 0.5)',
          borderColor: 'rgb(107, 46, 59)', 
          borderWidth: 2,
        },
      ],
    };
    var option={
        maintainAspectRatio:false,
        scales:{
            y:{
                beginAtZero:false,
                grid:{
                    display:false
                },
                title: {
                    display: true,
                    text: 'Rupees', // Label for y-axis
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                  },
            },
            x:{
                grid:{
                    display:false
                } ,
                title: {
                    display: true,
                    text: 'Train', // Label for x-axis
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                  }, 
            },
            min: 0,  // Set the minimum value for the y-axis
            max: max,
        },
        legends:{
            labels:{
                fontSize:26
            }
        },
        plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  var label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += context.parsed.y;
                  return label;
                }
              }
            }
          }
      }
 
    
    const handleDate=async(d)=>{
      setDate(d);
       console.log(date)
      
    }  
    const fetchData=async()=>{
      setdataSet([]);
      setlabelSet([]);
      if(date){
       await axios.get(`http://localhost:4000/booking/revenue/perroute/date/${date}`)
       .then(response=>{
        const data = response.data;
            console.log(data);
            if (data) {
              data.forEach(r => {
                setdataSet(prevData => [...prevData, r.price]);
                setlabelSet(prevLabels => [...prevLabels, r.trainName]);
                
                console.log(labelSet);
              });
              setMax(Math.max(...dataSet));
            }
       })
       .catch(error => {
        console.error('Error fetching daily data:', error);
      });
       }
      
      
     };
     const fetchMonthlyData = () => {
      setdataSet([]);
      setlabelSet([]);
      if (month) {
        const monthNo = Months.indexOf(month) + 1;
        axios.get(`http://localhost:4000/booking/revenue/perroute/month/${monthNo}`)
          .then(response => {
            const data = response.data;
            console.log(data);
            if (data) {
              data.forEach(r => {
                setdataSet(prevData => [...prevData, r.price]);
                setlabelSet(prevLabels => [...prevLabels, r.trainName]);
                
                console.log(labelSet);
              });
              setMax(Math.max(...dataSet));
            }
          })
          .catch(error => {
            console.error('Error fetching monthly data:', error);
          });
      }
    };
    
     useEffect(()=>{
      setMonth(Currentmonth);
     },[])
  return (
    <div className='paymentAnalysisContainer'>
    <div className='chart'>
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
                    options={options}
                    sx={{ width: 240 }}
                    renderInput={(params) => <TextField {...params}  size="small" label="Choose here" /> }
                />
                </FormControl>
                {category && category.label==="Daily" && 
                 <div>
                  <br></br>
                 <FormControl sx={{ width: 240 }}>
                <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" >
                    Date
                </FormLabel>
                <Input
                type="date"
                
                    slotProps={{
                    input: {
                        min: '2018-06-07T00:00',
                        max: '2018-06-14T00:00',
                    },
                    }}
                    value={date} onChange={(event) =>{event.preventDefault(); handleDate(event.target.value);}}
                />
                </FormControl>
                  <div className='submit-btn'>
                  <Button onClick={()=>fetchData()}>Confirm</Button>
              </div>  
              </div>  }
               {category && category.label==="Monthly" && 
               <div>
                <br></br>
                 <FormControl sx={{ width: 240 }}>
                 <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" >
                    Month
                </FormLabel>
                <Autocomplete
                    value={month}
                    onChange={(event, newValue) => {
                        setMonth(newValue);
                        console.log(month)
                    }}
                   
                    // disablePortal
                    id="combo-box-demo"
                    options={Months}
                    sx={{ width: 240 }}
                    renderInput={(params) => <TextField {...params}  size="small" label="Choose here"/> }
                />
                </FormControl>
                <div className='submit-btn'>
                  <Button onClick={()=>fetchMonthlyData()}>Confirm</Button>
              </div>
                </div>}
              
               
      <br></br>
      
      <Line data={data}
      height={300}
  
      options={option}
     
      />
        </div>
      </div>
  
  )
}
