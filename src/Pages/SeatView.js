import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../context';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const SeatView = () => {
  const [seatingData, setSeatingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedSeats, setClickedSeats] = useState([]);
  const [submitted, setSubmitted] = useState(false); // Track form submission
  const { trainName, trainNo, classIndex, trainID, passengerCount } = useContext(AppContext);
  const [fullArray, setFullArray] = useState([]); 
  const [originalSeatingData, setOriginalSeatingData] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/trains/${trainID}`);
        setFullArray(response.data.seatsArrangement);
        setOriginalSeatingData(response.data.seatsArrangement[classIndex]);
        setSeatingData(response.data.seatsArrangement[classIndex]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching seats:', error);
        setLoading(false);
      }
    };
    fetchSeats();
  }, []);

  const handleSeatClick = (seatIndex) => {
    if (!submitted) {
      if (clickedSeats.length < passengerCount) {
        const updatedClickedSeats = [...clickedSeats, seatIndex];
        setClickedSeats(updatedClickedSeats);
  
        const updatedSeatingData = [...seatingData];
        updatedSeatingData[seatIndex] = updatedSeatingData[seatIndex] === 0 ? 1 : 0;
        setSeatingData(updatedSeatingData);
      } else {
        alert(`You can only select ${passengerCount} seats.`);
      }
    }
  };

  const handleSubmit = () => {
    const updatedFullArray = fullArray;
    updatedFullArray[classIndex] = seatingData;
    axios
      .put(`http://localhost:4000/trains/${trainID}`, { updatedData: updatedFullArray })
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        setClickedSeats([]); // Clear clicked seats
        setSubmitted(true); // Mark the form as submitted
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleRevertChanges = () => {
   setSeatingData(originalSeatingData);
   setClickedSeats([]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const groupedSeatingData = [];
  const seatsPerRow = 4; // Number of seats per row
  for (let i = 0; i < seatingData.length; i += seatsPerRow) {
    groupedSeatingData.push(seatingData.slice(i, i + seatsPerRow));
  }

  return (
    <section className='hero'>
      <div className='hero-center'>
        <article className='hero-info'>
        <br />
          <br />
          <br />
          <br />
          <div className='review'>
            <div className='seat-top'>
              <h2>Seat view</h2>
              <div className='seat-sub'>
                <p className='no-sub'>{trainNo}</p>
                <p className='name-sub'>{trainName}</p>
                <p>{
                  classIndex === 0 ? 'First class' : (classIndex === 1 ? 'Second class' : 'Third class')
                  }</p>
              </div>
            </div>
            <div className='review-top'>
            <div className='seating-container'>
              {groupedSeatingData.map((row, rowIndex) => (
                <div key={rowIndex} className='seat-row'>
                  {row.map((seatStatus, columnIndex) => (
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '5px',
                        margin: '0 10px 10px 0', 
                      }}
                      key={columnIndex}
                      className={`seat ${seatStatus === 0 ? 'empty' : 'occupied'} ${
                        clickedSeats.includes(rowIndex * seatsPerRow + columnIndex) ? 'clicked' : ''
                      }`}
                      onClick={seatStatus === 0 ? () => handleSeatClick(rowIndex * seatsPerRow + columnIndex) : undefined}
                    >
                    </Box>
                  ))}
                </div>
              ))}
            </div>
            <div className='seatview-btn'>
              <div className='legend'>
                  <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '5px',
                    margin: '0 10px 10px 0', 
                  }}
                  className='empty'>
                  </Box>
                  <p>Available seats</p>
                </div>
                <div className='legend'>
                  <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '5px',
                    margin: '0 10px 10px 0', 
                  }}
                  className='occupied'>
                  </Box>
                  <p>occupied seats</p>
                </div>
                <br />
                <br />
              <Button sx={{
                    width: 170,
                    height: 40,
                    borderRadius: '5px',
                    margin: '0 10px 10px 0', 
                  }}
                  variant='contained'
                  onClick={handleSubmit}>
                Proceed
              </Button>
              <Button sx={{
                    width: 170,
                    height: 40,
                    borderRadius: '5px',
                    margin: '0 10px 10px 0', 
                  }}
                  variant='outlined' 
                  onClick={handleRevertChanges}>
                Revert Changes
              </Button>
            </div>
            </div>
            
          </div>
        </article>
      </div>
    </section>
  );
};

export default SeatView;
