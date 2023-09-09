import React, { useEffect, useState } from "react";
import {UploadButton } from '@api.video/react-upload-button';
//import UserService from "../services/user.service";

export default function HomeComponent() {
  const [uploadToken, setUploadToken]=useState();
  
  useEffect(() => {
    const instantiateUploadToken = async () => {
      // Retrieve your upload tokens list
      const list = await fetch(
        '/api/uploadTokens',
        {
          method: 'GET',
        }
      )
      .then(res => res.json())
    
      // If an upload token is available
      if (list.data.length > 0) {
        setUploadToken(list.data[0].token)
        return
      }
    
      // If we do not have any upload token available, we create one
      const newUploadToken = await fetch(
        '/api/uploadTokens',
        {
          method: 'POST',
        }
      )
      .then(res => res.json())
      setUploadToken(newUploadToken.token)
    }
    instantiateUploadToken()
  }, [])
 
  // componentDidMount() {
  //   UserService.getPublicContent().then(
  //     response => {
  //       this.setState({
  //         content: response.data
  //       });
  //     },
  //     error => {
  //       this.setState({
  //         content:
  //           (error.response && error.response.data) ||
  //           error.message ||
  //           error.toString()
  //       });
  //     }
  //   );
  // }

    return (
      <div className="container">
        <header className="jumbotron">
          <h1>Upload your video here!</h1>
        </header>
        <div className="flex">
          <UploadButton >Click me to upload a video!</UploadButton>
        </div>
      </div>
    );
 
}