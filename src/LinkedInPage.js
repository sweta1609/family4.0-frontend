
import React, { useEffect, useState } from 'react';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import axios from 'axios';

export function LinkedInPage() {
  const [authorizationCode, setAuthorizationCode] = useState('');
  const [profileData, setProfileData] = useState(null);

  const handleLinkedInLogin = () => {
    const storedState = localStorage.getItem('linkedin_oauth2_state');
    const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77qjcm4ppq3637&redirect_uri=http://localhost:3001&state=${storedState}&scope=r_liteprofile%20r_emailaddress`;

    window.location.href = authorizationUrl;
  };



  useEffect(() => {
    const extractCodeFromURL = () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      if (code) {
        setAuthorizationCode(code);
        window.history.replaceState({}, document.title, url.origin + url.pathname);
        exchangeAuthorizationCodeForAccessToken(code);
      }
    };
    extractCodeFromURL();
  }, []);

  const exchangeAuthorizationCodeForAccessToken = async (code) => {
    try {
      const response = await axios.post('http://localhost:3000/getAccessToken', { code });
      const accessToken = response.data.access_token;
      console.log('Access Token:', accessToken);
    } catch (error) {
      console.error('Failed to retrieve access token:', error);
    }
  };



  return (
    <>
      <img
        onClick={handleLinkedInLogin}
        src={linkedin}
        alt="Sign in with LinkedIn"
        style={{ maxWidth: '180px', cursor: 'pointer' }}
      />
      <p>Authorization Code: {authorizationCode}</p>
      <p>{profileData}</p>
    </>
  );
}



