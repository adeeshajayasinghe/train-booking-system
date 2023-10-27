import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context'
import Alert from '@mui/material/Alert';


const Search = () => {
    const inputRef = React.useRef(null);
    const [from, setFrom] = React.useState(stations[0]);
    const [inputFrom, setInputFrom] = React.useState('');
    const [to, setTo] = React.useState(stations[0]);
    const [inputTo, setInputTo] = React.useState('');
    const [dest, setDest] = React.useState('');
    // const [date, setDate] = React.useState('');
    const [passengers, setPassengers] = React.useState('');
    // const [returnDate, setReturnDate] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

    const {date, getTrainList, handlePassengerCount, handleDate, handleFrom, handleTo} = React.useContext(AppContext);
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate "From" and "To" fields
        if (!from || !to) {
            if (!from) {
                setErrorMessage('Please select your origin station.');
            }
            if (!to) {
                setErrorMessage('Please select your destination station.');
            }
            return;
        }
        handleFrom(from.label);
        handleTo(to.label);
        try {
            const response = await axios.post('https://stage-pilot-train-booking-system.onrender.com/search', {
                from: from.label,
                to: to.label,
                date,
                passengers
                // returnDate
            });
            console.log(response.data);
            getTrainList(response.data);
            navigate('/dashboard');
        }catch(error) {
            // console.log(err);
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            }
        }
    };
    React.useEffect(() => {
        const totalPassengers = parseInt(passengers) + 1;
        handlePassengerCount(totalPassengers);
    }, [passengers]);

  return (
    <section className='hero'>
      <div className='hero-center'>
        <article className='hero-info'>
          <br />    
          <br />
          <br />
          <br />
        </article>
        <form className="review-search" onSubmit={handleSubmit}>
            <h2>Search Trains</h2>
           
            <div className='search-fields'>
                <div className='origin'>
                <FormControl sx={{ width: 240 }}>
                <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" size="sm">
                        From
                </FormLabel>
                <Autocomplete
                    value={from}
                    onChange={(event, newValue) => {
                        setFrom(newValue);
                    }}
                    inputValue={inputFrom}
                    onInputChange={(event, newInputValue) => {
                        setInputFrom(newInputValue);
                    }}
                    // disablePortal
                    id="combo-box-demo"
                    options={stations}
                    sx={{ width: 240 }}
                    renderInput={(params) => <TextField {...params}  size="small" label="Choose here" /> }
                />
                </FormControl>
               
                </div>
                <div className='dest'>
                <FormControl sx={{ width: 240 }}>
                <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" size="sm">
                        To
                </FormLabel>
                <Autocomplete
                    value={to}
                    onChange={(event, newValue) => {
                        setTo(newValue);
                    }}
                    inputValue={inputTo}
                    onInputChange={(event, newInputValue) => {
                        setInputTo(newInputValue);
                    }}
                    // disablePortal
                    id="combo-box-demo"
                    options={stations}
                    sx={{ width: 240 }}
                    renderInput={(params) => <TextField {...params}  size="small" label="Choose here" /> }
                />
                </FormControl>
                </div>
                <div className='dest'>
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
                    value={date} onChange={(event) => handleDate(event.target.value)}
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
            placeholder='Choose a value'
            slotProps={{
            input: {
                ref: inputRef,
                min: 1,
                step: 1,
            },
    
            }}
            value={passengers} onChange={(event) => setPassengers(event.target.value)}
            />
            </FormControl>
            </div>
            {/* <div className='dest'>
            <FormControl sx={{ width: 240 }}>
                <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button" size="sm">
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
                    value={returnDate} onChange={(event) => setReturnDate(event.target.value)}
            />
            </FormControl>
            </div> */}
            </div>
            {/* {errorMessage && <p className='error-msg'>{errorMessage}</p>} */}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
};

const stations = [
    { label: "Ahangama" },
    { label: "Aluthgama" },
    { label: "Ambalangoda" },
    { label: "Ambalangoda" },
    { label: "Ambewela" },
    { label: "Anuradhapura" },
    { label: "Anuradhapura Town" },
    { label: "Avissawella" },
    { label: "Badulla" },
    { label: "Bandarawela" },
    { label: "Batticaloa" },
    { label: "Beliatta" },
    { label: "Bentota" },
    { label: "Beruwala" },
    { label: "China bay" },
    { label: "Chunnakam" },
    { label: "Colombo Fort" },
    { label: "Demodara-Ella" },
    { label: "Diyathalawa" },
    { label: "Ella" },
    { label: "Eraur" },
    { label: "Galgamuwa" },
    { label: "Galle" },
    { label: "Galoya" },
    { label: "Gampaha" },
    { label: "Gampola" },
    { label: "Habaraduwa" },
    { label: "Habarana" },
    { label: "Hali Ela" },
    { label: "Haputhale" },
    { label: "Hatton" },
    { label: "Hikkaduwa" },
    { label: "Hingurakgoda" },
    { label: "Jaffna" },
    { label: "Kakirawa" },
    { label: "Kalutara South" },
    { label: "Kamburugamuwa" },
    { label: "Kandy" },
    { label: "Kankesanthurai" },
    { label: "Kanthale" },
    { label: "Kilinochchi" },
    { label: "Kodikamam" },
    { label: "Koggala" },
    { label: "Kurunegala" },
    { label: "Madhupara" },
    { label: "Mahawa" },
    { label: "Makumbura" },
    { label: "Mannar" },
    { label: "Maradhana" },
    { label: "Matale" },
    { label: "Matara" },
    { label: "Medawachchiya" },
    { label: "Mirigama" },
    { label: "Mirissa" },
    { label: "Moratuwa" },
    { label: "Mount Lavinia" },
    { label: "NAGOLLAGAMA" },
    { label: "Nanu Oya" },
    { label: "Nawalapitiya" },
    { label: "Nawalapitya" },
    { label: "Nugegoda" },
    { label: "Omantha" },
    { label: "Pallai" },
    { label: "Panadura" },
    { label: "Peradeniya" },
    { label: "Polgahawela" },
    { label: "Polonnaruwa" },
    { label: "Puwakpitiya" },
    { label: "Ragama" },
    { label: "Rambukkana" },
    { label: "Rathmalana" },
    { label: "Return Colombo" },
    { label: "Return Waga" },
    { label: "Talaimannar Pier" },
    { label: "Thambalagamuwa" },
    { label: "Thambuththegama" },
    { label: "Thandikulam" },
    { label: "Trincomalee" },
    { label: "Unawatuna" },
    { label: "Valachchena" },
    { label: "Vauniya" },
    { label: "Veyangoda" },
    { label: "Veyangoda" },
    { label: "Waduwwa" },
    { label: "Weligama" },
    { label: "Welikanda" },
    { label: "Wellawa" },
    { label: "Wellawatte" }
];

export default Search;