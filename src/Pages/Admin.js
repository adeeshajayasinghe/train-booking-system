import React from 'react'
import AdminSidebar from '../Components/AdminSidebar';
import AddTrain from './AddTrain';

const Admin= () => {
 
  return (
    <div className='admin-layout'>
      <div className="sidebar-section">
        <AdminSidebar />
      </div>
      <div>
        <AddTrain />
      </div>
    </div>
    
  )
}

export default Admin;