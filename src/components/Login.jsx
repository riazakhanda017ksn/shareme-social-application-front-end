import React from 'react';
import GoogleLogin from 'react-google-login'
import {useNavigate} from 'react-router-dom'
import {FcGoogle, fcGoogle} from 'react-icons/fc'
import sharemeVideo from '../video/shareme.mp4'
import img from '../../src/image/logowhite.png'
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate()
    const responseGoogle =(response)=>{
     localStorage.setItem('user',JSON.stringify(response.profileObj))
     const {name, googleId, imageUrl}=response.profileObj
     const doc ={
         _id:googleId,
         _type:'user',
         userName:name,
         image: imageUrl
     }
     client.createIfNotExists(doc)
     .then(()=>{
      navigate('/',{replace:true})
     })
    }
    
    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
              <video src={sharemeVideo}
              type='video/mp4'
              loop
              controls={false}
              muted
              autoPlay
              className='w-full h-full object-cover'
              />
              <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay w-full h-full'>
                <div className="p-5">
                    <img src={img} alt="" width='180px' />
                </div>
                <div className="shadow-2xl">
                    <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                    render={(renderProps)=>(
                        <button
                        type='button'
                        className='customize-button'
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}

                        >
                            <FcGoogle className='mr-3'/> Sign in with google

                        </button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy='single_host_origin'
                    >
                
                    </GoogleLogin>
                </div>
              </div>
            </div>
        </div>
    );
};

export default Login;