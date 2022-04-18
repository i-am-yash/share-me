import React from 'react';
import { useState,useRef,useEffect } from 'react';
import {HiMenu} from 'react-icons/hi';
import { AiFillCloseCircle} from 'react-icons/ai';
import { Link,Route,Routes} from 'react-router-dom';

import {Sidebar,UserProfile} from '../components/index';
import {client} from '../client';
import logo from '../assets/logo.png';
 import Pins from './Pins';
 import {userQuery} from '../utils/data';
import { fetchUser } from '../utils/fetchUser';
 const Home = () => {


   const [toggleSidebar, settoggleSidebar] = useState(false);
   const [user, setuser] = useState(null)
   const scrollRef= useRef(null);


   const userInfo=fetchUser();
  //  console.log(userInfo);
  useEffect(() => {
    const query =userQuery(userInfo?.googleId);
    client.fetch(query)
    .then((data)=>{
setuser(data[0])
    })
  }, []);
  // at start set up the scroll at the start of the page
  useEffect(() => {
   scrollRef.current.scrollTo(0,0) 
  }, [])
  

  

  return <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
    <div className='hidden md:flex h-screen flex-intial'> 
    {/* mobile Sidebar */}
     <Sidebar user={user && user}/>   {/*means if user exist pass the user */}
     
    </div>
    <div className='flex md:hidden flex-row'>
      
    <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>{settoggleSidebar(true)}}/>
    <Link to='/'>
      <img src={logo} alt='logo' className='w-28'/>
     </Link>
     <Link to={`user-profile/${user?._id}`}>
      <img src={user?.image} alt='logo' className='w-28'/>
     </Link>
    </div>

    {/* if toggleSidebar is true then render this */}
      {toggleSidebar && (
        <div className='fixed w-4/5 bg-white h-screen  overflow-y-auto shadow-md z-10 animate-slide-in' >
          <div className='absolute w-full flex justify-end items-center  p-2'>
            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={()=>settoggleSidebar(false)}/>
            </div>
            {/* desktop Sidebar */}
            <Sidebar  user={user && user} closeToggle={settoggleSidebar} />
        </div>
      )}
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
        <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>    

  </div>
}
export default Home;
