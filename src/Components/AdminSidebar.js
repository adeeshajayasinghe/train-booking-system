import React from 'react'
import AdminSidebarItem from './AdminSidebarItem';
import {AdminSidebarData} from './AdminSidebarData';

const AdminSidebar = () => {
  return (
    <div className='admin-sidebar'>
        {AdminSidebarData.map((item, index) => {
            return <AdminSidebarItem key={index} item={item}/>
        })}
    </div>
  )
}

export default AdminSidebar;
