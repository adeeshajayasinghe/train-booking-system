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
    return(
        <AppContext.Provider value={{
            isSidebarOpen, isSubMenuOpen, openSidebar, openSubMenu, closeSidebar, closeSubMenu, location, page, firstName, lastName, mobile, NIC, email, password, trainList, priceList, trainID, classIndex, trainName, trainNo, passengerCount, OTP, adminEnable, openPopup, date, from, to,  handleFirstName, handleLastName, handleMobile, handleNIC, handleEmail, handlePassword, getTrainList, handleTrainID, handleClassIndex, handleTrainName, handleTrainNo, handlePassengerCount, handleOTP, handleAdmin, handlePopup, handleDate, handleFrom, handleTo
        }}>{children}</AppContext.Provider>
    );
}
   
export {AppContext, AppProvider}


