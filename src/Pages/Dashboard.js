import React from 'react'
import {AppContext} from '../context'
import { useContext } from 'react';
import Train from '../images/Train-img.png';
import { Link } from 'react-router-dom';
import { Button } from '@mui/joy';


const ClassMenus = ({ trainName, trainNo, classes, seatsAvailability, trainID }) => {
  const {handleTrainID, handleTrainName, handleClassIndex, handleTrainNo} = useContext(AppContext);
  return (
    <div>
      {classes.map((className, index) => (
        <div key={className} className="review-des">
          <div className='seat-text'>
            <p className='class-type'>{className}</p>
            <p className='avail-text'>Available: {seatsAvailability[index]}</p>
            <Link to={`/seatview`} >
            <Button onClick={() => {
              handleTrainID(trainID);
              handleTrainName(trainName);
              handleTrainNo(trainNo);
              if (className === "First class") handleClassIndex(0);
              else if (className === "Second class") handleClassIndex(1);
              else if (className === "Third class") handleClassIndex(2);
              }} size="sm">select</Button>
          </Link>
          </div>

        </div>
      ))}
    </div>
  );
};

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
            <img src={Train} alt={train.trainName}/>
          </div>
          <p>Train No: {train.trainNo}</p>
          <p>Origin: {train.origin}</p>
          <p>Destination: {train.destination}</p>
          <p>Dates: {train.dates}</p>
          <ClassMenus trainName={train.trainName} trainNo={train.trainNo} classes={train.class} seatsAvailability={train.seatsAvailability} trainID = {train._id}/>
          {/* <Link to={`/seatview`}>
            <Button onClick={() => handleTrainNo(train._id)}>Search</Button>
          </Link> */}
        </div>
      ))}
    </div>
      </div>  
    </section>
    
  )
}

export default Dashboard;
