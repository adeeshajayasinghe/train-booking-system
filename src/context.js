import React, { useState} from 'react'
import sublinks from './data'

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
    const [userType, setUserType] = useState('');

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
    function handleUserType(type){
        setUserType(type);
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
    return(
        <AppContext.Provider value={{
            isSidebarOpen, isSubMenuOpen, openSidebar, openSubMenu, closeSidebar, closeSubMenu, location, page, firstName, lastName, mobile, email, password, userType, handleFirstName, handleLastName, handleMobile, handleEmail, handlePassword, handleUserType
        }}>{children}</AppContext.Provider>
    );
}
   
export {AppContext, AppProvider}


