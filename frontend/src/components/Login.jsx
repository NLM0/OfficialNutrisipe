/* eslint-disable camelcase */
import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import shareVideo from '../assets/jok.mp4';
import logo from '../assets/logoss.png';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const userResponse = jwt_decode(response.credential);

    localStorage.setItem('user', JSON.stringify(userResponse));
    const { name, sub, picture } = userResponse;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
      id: sub,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <GoogleOAuthProvider
            clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`}
            className="shadow-2xl"
          >
            <GoogleLogin
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
