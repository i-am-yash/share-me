import React from 'react';
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc' // google logo 
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
 import {client} from '../client';

//remove cors error by going to sanity studio and then add url to cors 
 const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    //console.log(response);
    //console.log(process.env.REACT_APP_GOOGLE_API_PROJECT_ID);
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'> 
      <video
        src={shareVideo} 
        type="video.mp4"
        loop
        controls={false}
        muted
        autoPlay
        className="w-full h-full object-cover"
      />
      <div className=' absolute  flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay'>
        <div className='p-5'>
            <img src={logo} width="130px" alt="logo"/> 
        </div>
        <div className='shadow-2xl'>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={  (renderProps)=>( // in google login it is written in '()' not '{}' 
                                        // eg ()=>() right 
                                        // eg ()={} wrong... i dont now why
                <button 
                type='button'
                className='bg-mainColor flex items-center justify-center rounded-lg p-3 cursor-pointer outline-none'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                >
                  <FcGoogle className='mr-4' /> Sign in with Google

                </button>
            )} 
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy='single_host_origin' 

          />
        </div>
          
      </div>
      </div>
  </div>;
};
export default Login;
