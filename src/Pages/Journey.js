import React, { useState } from 'react'
import data from '../services-data'
import SingleQuestion from '../Questions'

const Journey = () => {
  const [questions, setQuestions] = useState(data)
  return (
    <section className='hero2'>
    <div className='content-center'>
     <div className='services-main'>
      <div className='services-container'>
        <h3>FAQs</h3>
        <div className='info'>
          {questions.map((question) => {
              return (
                <SingleQuestion key={question.id} {...question}></SingleQuestion>
              );
          })}
        </div>
      </div>
     </div>
    </div>  
  </section>
  )
}

export default Journey;
