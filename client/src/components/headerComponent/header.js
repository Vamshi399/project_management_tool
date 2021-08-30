/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { component } from 'react';
import logo from './logo.png';
import { FaCamera } from "react-icons/fa";
import Cookies from 'js-cookie';
import axios from 'axios';
function Header() {
  var isUserLoggedIn = Cookies.get('access_token') != null && Cookies.get('access_token') != "";
  var username = Cookies.get("username");
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  axios.get(process.env.PUBLIC_URL + "Assets/images/profile/" + username + ".jpg").then((response) => {
    if (response.statusText == "OK") {
      document.getElementById("profileImg").src = process.env.PUBLIC_URL + "Assets/images/profile/" + username + ".jpg";
    }
  }).catch((error) => {
    console.log(error)
  })
  const handleImageUpload = async e => {
    const [file] = e.target.files;
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file, username + ".jpg");

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      const { fileName, filePath } = res.data;
      alert("Your profile image updated successfully");
      window.location.reload();
    } catch (err) {
      console.log("There was a problem with the server");
    }
  };
  return (
    <header>
      <div style={{
        margin: "0px",
        paddingTop: "0px"
      }}>
        <div className="logo">
          <img src={process.env.PUBLIC_URL + 'logo.png'} alt='logo' style={{

            width: "2.6em",
            height: '2.1em',
            borderRadius: "50%",
            left:"-50px",
            position: "absolute"
          }} />

        </div>
      Project Management Tool
      <h4 className="scroll">Collaboration tool for people to work virtually </h4>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"

        }}
        >
          {isUserLoggedIn === true ? <div class="unameText" style={{fontSize:"1.2rem"}}>Hi, {username}</div> : <div></div>}
          {isUserLoggedIn === true ? <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}

            style={{
              display: "none"
            }}
          /> : <div></div>}
          <div
            onClick={() => imageUploader.current.click()}
          >
           
            {isUserLoggedIn === true ?
              <img id="profileImg" class="bi bi-person"
                src="https://api.iconify.design/bi-person.svg"
                alt="Not Found"
                style={{
                  right: "30px",
                  top: "10px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50px",
                  backgroundColor: "white",
                  position: "absolute"
                }}
              ></img> : <div></div>}
            {isUserLoggedIn === true ?
              <FaCamera
                style={{
                  right: "50px",
                  height: "30px",
                  top: "86px",

                  color: "black",
                  position: "absolute"
                }}
                
              /> : <div></div>}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;