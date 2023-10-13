import React, {useState} from 'react'
import sublinks from './data'
// import sublinks from './data'

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSubMenuOpen, setISSubMenuOpen] = useState(false);
    const [location, setLocation] = useState({});
    const [page, setPage] = useState({page:'', links:[]});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [NIC, setNIC] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [trainList, setTrainList] = useState([]);
    const [priceList, setPriceList] = useState([]);
    const [trainName, setTrainName] = useState('');
    const [trainID, setTrainID] = useState(null);
    const [classIndex, setClassIndex] = useState(null);
    const [trainNo, setTrainNo] = useState(null);
    const [passengerCount, setPassengerCount] = useState(1);
    const [OTP, setOTP] = useState('');
    const [adminEnable, setAdminEnable] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [date, setDate] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [classPrice, setClassPrice] = useState(0);
    const [fullArray, setFullArray] = useState([]);
    const [clickedSeats, setClickedSeats] = useState([]);
    const [seatingData, setSeatingData] = useState([]);
    const [seatNumbers, setSeatNumbers] = useState([]);
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [refNumber, setRefNumber] = useState('');
    const [className, setClassName] = useState('');
    const [cancelRef, setCancelRef] = useState('');
    const [seatArrangement, setSeatArrangement] = useState([]);
    function handleFirstName(first){
        setFirstName(first);
    }
    function handleLastName(last){
        setLastName(last);
    }
    function handleMobile(mob){
        setMobile(mob);
    }
    function handleNIC(nic){
        setNIC(nic);
    }
    function handleEmail(mail){
        setEmail(mail);
    }
    function handlePassword(pass){
        setPassword(pass);
    }
    function openSidebar(){
        setSidebarOpen(true);
    }
    function closeSidebar(){
        setSidebarOpen(false);
    }
    function openSubMenu(text, coordinates){
        const page = sublinks.find((link) => link.page === text);
        setPage(page);
        setLocation(coordinates);
        setISSubMenuOpen(true);
    }
    function closeSubMenu(){
        setISSubMenuOpen(false);
    }
    function getTrainList(details){
        setTrainList(details[0]);
        setPriceList(details[1]);
    }
    function handleTrainName(trainName){
        setTrainName(trainName);
    }
    function handleTrainID(trainID){
        setTrainID(trainID);
    }
    function handleClassIndex(index){
        setClassIndex(index);
    }
    function handleTrainNo(trainNo){
        setTrainNo(trainNo);
    }
    function handlePassengerCount(passengerCount){
        setPassengerCount(passengerCount);
    }
    function handleOTP(otp){
        setOTP(otp);
    }
    function handleAdmin(bool){
        setAdminEnable(bool);
    }
    function handlePopup(bool){
        setOpenPopup(bool);
    }
    function handleDate(date){
        setDate(date);
    }
    function handleFrom(from){
        setFrom(from);
    }
    function handleTo(to){
        setTo(to);
    }
    function handleClassPrice(price){
        setClassPrice(price);
    }
    function handleFullArray(array){
        setFullArray(array);
    }
    function handleClickedSeats(seats){
        setClickedSeats(seats);
    }
    function handleSeatingData(data){
        setSeatingData(data);
    }
    function handleSeatNumbers(seatNumbers){
        setSeatNumbers(seatNumbers);
    }
    function handleDepartTime(time){
        setTimeFrom(time);
    }
    function handleArrivalTime(time){
        setTimeTo(time);
    }
    function handleRefNumber(ref){
        setRefNumber(ref);
    }
    function handleClassName(className){
        setClassName(className);
    }
    function handleCancelRef(ref){
        setCancelRef(ref);
    }
    function handleSeatArrangement(arrangement){
        setSeatArrangement(arrangement);
    }
    return(
        <AppContext.Provider value={{
            isSidebarOpen, isSubMenuOpen, openSidebar, openSubMenu, closeSidebar, closeSubMenu, cancelRef, location, page, firstName, lastName, mobile, NIC, email, password, trainList, priceList, trainID, classIndex, trainName, trainNo, passengerCount, OTP, adminEnable, openPopup, date, from, to, classPrice, fullArray, clickedSeats, seatingData, seatNumbers, timeFrom, timeTo, refNumber, className, seatArrangement, handleFirstName, handleLastName, handleMobile, handleNIC, handleEmail, handlePassword, getTrainList, handleTrainID, handleClassIndex, handleTrainName, handleTrainNo, handlePassengerCount, handleOTP, handleAdmin, handlePopup, handleDate, handleFrom, handleTo, handleClassPrice, handleFullArray, handleClickedSeats, handleSeatingData, handleSeatNumbers, handleDepartTime, handleArrivalTime, handleRefNumber, handleClassName, handleCancelRef, handleSeatArrangement
        }}>{children}</AppContext.Provider>
    );
}
   
export {AppContext, AppProvider}


