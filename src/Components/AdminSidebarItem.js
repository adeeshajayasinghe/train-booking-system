import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSidebarItem = ({item}) => {
  const [open, setOpen] = useState(false);
  
  if(item.children){
      return (
      <div className={open?'sidebar-item open':'sidebar-item'}>
        <div className="sidebar-title">
          <div className='icon-text'>
            {item.icon && <i className='admin-icon'>{item.icon}</i>}
            <p className='menu-text'>{item.title}</p>
          </div>
          <ExpandMoreIcon fontSize='medium' className='drop-down' onClick={() => setOpen(!open)}/>
        </div>
        <div className="sidebar-content">
          {item.children.map((child, index) => {
            return (
              <Link to={child.path} key={index} className='sidebar-subitem'>
                <p className='menu-text'>{child.title}</p>
              </Link>
            )
          })}
        </div>
      </div>
    )
  } else {
    return (
      // <div className='sidebar-item'>
      //   <div className="sidebar-title">
      //     <div className='icon-text'>
      //       {item.icon && <i className='admin-icon'>{item.icon}</i>}
      //       <p className='menu-text'>{item.title}</p>
      //     </div>
      //   </div>
      // </div>
      <Link to={item.path} className='sidebar-subitem'>
        <div className='sidebar-item'>
          <div className="sidebar-title">
            <div className='icon-text'>
              {item.icon && <i className='admin-icon'>{item.icon}</i>}
              <p className='menu-text'>{item.title}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default AdminSidebarItem;
