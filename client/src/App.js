import React from "react";
import {GoogleLogin} from "react-google-login";
import googleOauth from "./oauth2_cred.json";
import axios from "axios";

function App() {

  const successGoogle = async (successData)=>{
    try {
      const token = successData.tokenId;
      const response = await axios.post("http://localhost:8000/auth/google",
        {token},
        { headers: { "Content-Type": "application/json" } },
      );
      console.log(response);
    }catch(err) {
      console.log(err);
    }
  };

  const failureGoogle = (failureData)=>console.log(failureData);

  return (
    <div className="App">
      <div className="text-center">
        <h1>Login with Google</h1>
        <GoogleLogin
          clientId={googleOauth.web.client_id}
          buttonText="Login With Google"
          onSuccess={successGoogle}
          onFailure={failureGoogle}
          disabled={false}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
}

export default App;
