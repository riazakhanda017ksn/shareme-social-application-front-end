/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import {GoogleLogout} from 'react-google-login'
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const UserProfile = () => {
    const [user,setUser]=useState()
    const [pins,setPins] = useState()
    const [text,setText] = useState('Created')
    const [activeBtn,setActiveBtn] = useState('created')
    const navigate = useNavigate()
    const {userId} =useParams()

    ///
    useEffect(()=>{
      const query = userQuery(userId)
      client.fetch(query)
      .then((data)=>{setUser(data[0])})
    },[userId])

   ///
   useEffect(()=>{
    if(text === 'Created'){
        const createPinsQuery = userCreatedPinsQuery(userId)
        client.fetch(createPinsQuery).then((data)=>{
            setPins(data)
        })
    }else{
        const savedPinsQuery = userSavedPinsQuery(userId)
        client.fetch(savedPinsQuery).then((data)=>{
            setPins(data)
        })
    }
   },[text,userId])

    const logout=()=>{
        localStorage.clear()
        navigate('/login')
    }

    if(!user){
        return <Spinner message='Loading profile'/>
    }

    ///
const activeBtnStyles = 'bg-red-500 text-white font-normal p-2 rounded-full w-20 outline-none mt-3';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none mt-3';
    return (
        <div className='relative pb-2 h-full justify-center items-center'>
           <div className="flex flex-col pb-5">
               <div className="relative flex flex-col mb-7">
                   <div className="flex flex-col justify-center items-center">
                       <img src="https://source.unsplash.com/1600x500/?cat,nature,travel" alt="user-pic" className='object-cove' />
                       <img src={user?.image} className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover ' alt="user-img" />
                       <h1 className='username'>{user?.userName}</h1>
                       <div className="logout">
                           {
                               userId === user._id && (
                                   <GoogleLogout
                                   
                                   clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                                render={(renderProps) => (
                                 <button
                                className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                               type="button"
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                               >
                              <AiOutlineLogout color="red" fontSize={21} />
                             </button>
                             )}
                          onLogoutSuccess={logout}
                         cookiePolicy="single_host_origin"
                                   
                                   
                                   />
 
                               )
                           }
                      </div>
                   </div>
                   <div className="text-center mb-7">
                       <button
                       type='button'
                       onClick={(e)=>{setText(e.target.textContent);
                        setActiveBtn('created')
                        }}
                        className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
                       >
                         Created
                       </button>
                       <button
                       type='button'
                       onClick={(e)=>{setText(e.target.textContent);
                        setActiveBtn('saved')
                        }}
                        className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                       >
                         Saved
                       </button>
                   </div>
                   {
                       pins?.length ?(
                        <div className='px-2'>
                        <MasonryLayout pins={pins}/>
                        </div>
                       ):(
                         <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
                              No Pins Found!
                         </div>
                       )
                   }
               </div>
           </div>
        </div>
    );
};

export default UserProfile;