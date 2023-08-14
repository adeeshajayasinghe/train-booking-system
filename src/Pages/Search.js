import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

const Search = () => {
    const inputRef = React.useRef(null);
  return (
    <section className='hero'>
      <div className='hero-center'>
        <article className='hero-info'>
          <br />
          <br />
          <br />
          <br />
        </article>
        <form className="review-search">
            <h2>Search Trains</h2>
            <div className='search-fields'>
                <div className='origin'>
                <FormControl sx={{ width: 240 }}>
                    <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" size="sm">
                        From
                    </FormLabel>
                    <Select
                    placeholder="Choose station"
                    size="sm"
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
                    <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" size="sm">
                        To
                    </FormLabel>
                    <Select
                    placeholder="Choose station"
                    size="sm"
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
                <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" size="sm">
                    Date
                </FormLabel>
                <Input
                type="date"
                size="sm"
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
            <div className='route'>
            <div className='origin'>
            <FormControl sx={{ width: 240 }}>
            <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" size="sm">
            Passengers
            </FormLabel>
            <Input
            type="number"
            size="sm"
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
            <div className='dest'>
            <FormControl sx={{ width: 240 }}>
                <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" size="sm">
                    Return date(optional)
                </FormLabel>
            <Input
                type="date"
                size="sm"
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
            <div className='route'>
            <div className='submit-btn'>
                <Button type="submit">Search</Button>
            </div>
            <div className='submit-btn'>
                <Button>Reset</Button>
            </div>
            </div>
            
        </form>
        {/* <article className='hero-images'>
            <img src={loginimg} className='login-img' alt='login' />
        </article> */}
      </div>
      
    </section>
  )
}

export default Search;