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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [trainList, setTrainList] = useState([]);
    const [trainName, setTrainName] = useState('');
    const [trainID, setTrainID] = useState(null);
    const [classIndex, setClassIndex] = useState(null);
    const [trainNo, setTrainNo] = useState(null);
    const [passengerCount, setPassengerCount] = useState(1);
    function handleFirstName(first){
        setFirstName(first);
    }
    function handleLastName(last){
        setLastName(last);
    }
    function handleMobile(mob){
        setMobile(mob);
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
    function getTrainList(trains){
        setTrainList(trains);
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
    return(
        <AppContext.Provider value={{
            isSidebarOpen, isSubMenuOpen, openSidebar, openSubMenu, closeSidebar, closeSubMenu, location, page, firstName, lastName, mobile, email, password, trainList, trainID, classIndex, trainName, trainNo, passengerCount, handleFirstName, handleLastName, handleMobile, handleEmail, handlePassword, getTrainList, handleTrainID, handleClassIndex, handleTrainName, handleTrainNo, handlePassengerCount
        }}>{children}</AppContext.Provider>
    );
}
   
export {AppContext, AppProvider}


