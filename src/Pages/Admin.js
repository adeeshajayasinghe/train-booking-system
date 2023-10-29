import React from 'react'
import AdminSidebar from '../Components/AdminSidebar';
import adminImg from '../images/admin_staff.jpg';


const Admin= () => {
 
  return (
    <div className='admin-layout'>
      <div className="sidebar-section">
        <AdminSidebar />
      </div>
      <div>
      
          <img src={adminImg} className='admin-img' alt='admin-img'/>
        
      </div>
    </div>
    
  )
}

export default Admin;