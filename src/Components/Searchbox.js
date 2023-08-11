import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
const Searchbox = () => {
    const inputRef = React.useRef(null);
  return (
    <article className='review' id='searchbox'>
        <div className='route'>
            <div className='origin'>
                <FormControl sx={{ width: 240 }}>
      <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
        From
      </FormLabel>
      <Select
        placeholder="Choose station"
        slotProps={{
          button: {
            id: 'select-field-demo-button',
            'aria-labelledby': 'select-field-demo-label select-field-demo-button',
          },
        }}
      >
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="fish">Fish</Option>
        <Option value="bird">Bird</Option>
      </Select>
    </FormControl>
            </div>
            <div className='dest'>
                <FormControl sx={{ width: 240 }}>
      <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
        To
      </FormLabel>
      <Select
        placeholder="Choose station"
        slotProps={{
          button: {
            id: 'select-field-demo-button',
            'aria-labelledby': 'select-field-demo-label select-field-demo-button',
          },
        }}
      >
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="fish">Fish</Option>
        <Option value="bird">Bird</Option>
      </Select>
    </FormControl>
            </div>
            <div className='date'>
            <FormControl sx={{ width: 240 }}>
      <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
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
            />
</FormControl>
            </div>

            
        </div>
        <div className='second-route'>
            <div className='passengers'>
            <FormControl sx={{ width: 240 }}>
      <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
        Passengers
      </FormLabel>
      <Input
        type="number"
        placeholder='Choose a value'
        slotProps={{
          input: {
            ref: inputRef,
            min: 1,
            step: 1,
          },
        }}
      />
</FormControl>
            </div>
            <div className='date'>
            <FormControl sx={{ width: 240 }}>
      <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
        Return date(optional)
      </FormLabel>
      <Input
          	type="date"
                slotProps={{
                input: {
                    min: '2018-06-07T00:00',
                    max: '2018-06-14T00:00',
                },
                }}
            />
</FormControl>
            </div>
        </div>
          
    </article>
  )
};

export default Searchbox