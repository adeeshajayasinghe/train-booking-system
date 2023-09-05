import React from 'react'
import {AppContext} from '../context'
import { useContext } from 'react';
import Train from '../images/Train.png';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const {trainList} = useContext(AppContext);
 
  return (
    <section className='hero'>
      <div className='content-center'>
      <div className="train-cards">
      {trainList.map((train) => (
        <div key={train._id} className="train-card">
          <h2>{train.trainName}</h2>
          <div className='train-img'>
          <Link to={{
                  pathname: `/Form/${train.trainName}`,
                   }}>
           <img src={Train} alt={train.trainName} />
           </Link>
            
        
          </div>
          <p>Train No: {train.trainNo}</p>
          <p>Origin: {train.origin}</p>
          <p>Destination: {train.destination}</p>
          <p>Dates: {train.dates}</p>
          {/* ... additional details ... */}
        </div>
      ))}
    </div>
      </div>  
    </section>
    
  )
}

export default Dashboard;
