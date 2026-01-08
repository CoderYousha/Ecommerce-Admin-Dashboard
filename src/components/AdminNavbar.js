
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTachometerAlt, faShoppingCart, faCog, faUsers, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import '../styles/admin_navbar.css';


function AdminNavbar() {
     const choices = [
          {name: 'Dashboard', icon: faTachometerAlt, link: '/dashboard'},
          {name: 'Categories', icon: faLayerGroup, link: '/categories'},
          {name: 'Users', icon: faUsers, link: '/users'},
          {name: 'Settings', icon: faCog, link: '/settings'},
     ];

     return (
          <div className='w-1/5 float-left h-screen'>
               <nav className='fixed admin-navbar w-1/5 flex flex-col items-center border-r h-screen float-left'>
                    <div className="flex justify-between items-center w-3/5 my-4 py-3">
                         <div className='w-8 h-8 bg-purple-light-color rounded-md flex items-center justify-center'>
                              <FontAwesomeIcon icon={faShoppingCart} className='text-white' /> 
                         </div>
                         <span className='font-bold text-md'>Admin Panel</span>
                    </div>
                    <hr className='border w-full'/>
                    <div className='w-5/6 mt-5 flex flex-col items-center'>
                         {
                              choices.map((choice, index) => 
                                   <div className='choice mt-5 w-full' key={index}>
                                        <NavLink to={choice.link} className="cursor-pointer py-3 px-5 rounded-xl flex items-center">
                                             <FontAwesomeIcon icon={choice.icon} className='icon text-2xl text-gray-500 mr-5' />
                                             <span className='text-lg text-gray-500'>{choice.name}</span>
                                        </NavLink>
                                   </div>
                              )
                         }
                    </div>
                    
               </nav>
          </div>
     );
}

export default AdminNavbar;