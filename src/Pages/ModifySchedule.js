import React from 'react'
import AdminSidebar from '../Components/AdminSidebar';

const ModifySchedule = () => {
  return (
    <div className='admin-layout'>
      <div className="sidebar-section">
        <AdminSidebar />
      </div>
      <div className='review'>
        <h2>Modify Schedule</h2>
      </div>
    </div>
  )
}

export default ModifySchedule;