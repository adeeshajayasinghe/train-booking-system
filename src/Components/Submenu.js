import React, { useRef, useEffect, useContext } from 'react'
import { AppContext } from '../context'
import {Link} from 'react-router-dom'
const Submenu = () => {
  const {isSubMenuOpen, location, page:{page, links}} = useContext(AppContext);
  const container = useRef(null);
  useEffect(() => {
    const submenu = container.current;
    const {center, bottom} = location;
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`
  }, [location])
  return (
    <aside className={isSubMenuOpen?'submenu show':'submenu'} ref={container}>
      <h4>{page}</h4>
      <div className="submenu-center col-2">
        {links.map((link, index) => {
          const {label, icon, url} = link;
          return (
            // <a href={url} key={index}>{icon}{label}</a>
            <Link to={url} key={index}>{icon}{label}</Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Submenu
