import React from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Checkbox from '@mui/joy/Checkbox';
import Radio from '@mui/joy/Radio';
import Box from '@mui/joy/Box';


const Admin= () => {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <section className='hero'>
      <div className='admin-center'>
        <div className='review-admin'>
          <h2>Add trains</h2>
          <form>
            <div className='route'>
              <div className='origin'>
                <FormControl>
                      <FormLabel>Train name</FormLabel>
                      <Input placeholder="Enter here" variant="soft" size="sm" />
                </FormControl>
              </div>
              <div className='dest'>
                    <FormControl>
                        <FormLabel>Train No</FormLabel>
                        <Input placeholder="Enter here" variant="soft" size="sm"/>
                    </FormControl>
                </div>
            </div>
            <div className='route'>
              <div className='origin'>
                <FormControl>
                      <FormLabel>Origin</FormLabel>
                      <Input placeholder="Enter here" variant="soft" size="sm" />
                </FormControl>
              </div>
              <div className='dest'>
                    <FormControl>
                        <FormLabel>Destination</FormLabel>
                        <Input placeholder="Enter here" variant="soft" size="sm"/>
                    </FormControl>
                </div>
            </div>
            <div className='route'>
              <div className='origin'>
                <FormControl>
                      <FormLabel>Routes</FormLabel>
                      <Input
                        endDecorator={<Button>Add</Button>} size='sm'
                        variant="soft"
                        sx={{
                          "--Input-gap": "-55px"
                        }}
                      ></Input>
                </FormControl>
              </div>
              <div className='origin'>
                <FormControl>
                        <FormLabel>Arrival Times</FormLabel>
                        <Input
                          endDecorator={<Button>Add</Button>} size='sm'
                          variant="soft"
                          sx={{
                            "--Input-gap": "-55px"
                          }}
                        ></Input>
                  </FormControl>
              </div>
              <div className='dest'>
                <FormControl>
                        <FormLabel>Depature Times</FormLabel>
                        <Input
                          endDecorator={<Button>Add</Button>} size='sm'
                          variant="soft"
                          sx={{
                            "--Input-gap": "-55px"
                          }}
                        ></Input>
                  </FormControl>
                </div>
            </div>

            <div className='origin'>
                  <FormControl>
                        <FormLabel>Dates</FormLabel>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Radio
                            checked={selectedValue === 'a'}
                            onChange={handleChange}
                            value="a"
                            name="radio-buttons"
                            label="Daily"
                            variant="soft"
                            className='radio-box'
                            slotProps={{ input: { 'aria-label': 'A' } }}
                          />
                          <Radio
                            checked={selectedValue === 'b'}
                            onChange={handleChange}
                            value="b"
                            name="radio-buttons"
                            label="Weekdays"
                            variant="soft"
                            className='radio-box'
                            slotProps={{ input: { 'aria-label': 'B' } }}
                          />
                          <Radio
                            checked={selectedValue === 'c'}
                            onChange={handleChange}
                            value="c"
                            name="radio-buttons"
                            label="weekends"
                            variant="soft"
                            className='radio-box'
                            slotProps={{ input: { 'aria-label': 'C' } }}
                          />
                        </Box>
                  </FormControl>
        
              
            </div>
            <div className='origin'>
                <FormControl>
                        <FormLabel>Classes</FormLabel>
                        <div>
                        <Checkbox className='chk-box' label="First class"  variant="soft"/>
                        <Checkbox className='chk-box' label="Second class"  variant="soft"/>
                        <Checkbox className='chk-box' label="Third class"  variant="soft"/>
                        </div>
                        
                  </FormControl>
              </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Admin;