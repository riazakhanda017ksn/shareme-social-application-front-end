import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'
import logo from '../image/sidebarlogo.png'
import {categories} from '../utils/data'


const Sidebar = ({closeToggle,user}) => {
      const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray  hover:text-black transition-all duration-200 ease-in-out capitalize normal-text'
      const isActiveStyle = 'flex items-center px-5 gap-3 font-bold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize'

        const handleCloseSidebar = () => {
          if (closeToggle) closeToggle(false);
        };

    
    return (
        <div className="flex flex-col justify-between bg-white h-full min-w-210  ">
             <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
        <NavLink to='/'
         className={({isActive })=>isActive ? isActiveStyle : isNotActiveStyle}
         onClick={handleCloseSidebar}
        >
        <RiHomeFill/>
        Home
        </NavLink>
        <h3 className='mt-2 px-5 text-base 2xl:text-xl discover-text'>
            Discover Categories
        </h3>
        {
            categories.slice(0,categories.length-1).map((category)=>(
            <NavLink 
            to={`/category/${category.name}`}
            className={({isActive })=>isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
            key={category.name}
            >
              
                <img src={category.image} className='w-6 h-6 rounded-full shadow-sm object-cover' alt="" />
              
            {
                category.name
            }
            </NavLink>
            ))
        }
        </div>
        </div>
          {
              user && (
                  <Link
                  to={`user-profile/${user._id}`}
                  className='flex  mb-3 gap-1 p-2 items-center bg-white rounded-lg  mx-1'
                  onClick={handleCloseSidebar}
                  >
                
                 <img src={user.image} className='w-10 h-10 rounded-full user-profile' alt="user-profile" />
                 <p className='mt-1 font-bold text-gray' style={{color:'#000000', fontSize:'15px'}} >{user.userName}</p>
                 <IoIosArrowForward className='mt-1 font-bold'/>
                  </Link>
              )
          }
        
        </div>
    );
};

export default Sidebar;