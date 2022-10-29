import React from 'react';
import axios from '../plugins/axios';
import useStore from '../store/store';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
export default function ToUp() {
   
     const navigate = useNavigate();
const { setLoginStatus,
        loginStatus,
        setAccessToken,
        isDarkMode,
        inDarkMode,
        inLightMode,
        setIsDarkMode,
        isEnglishMode,
        setIsEnglishMode
        } = useStore()
    

    const changeLan = () => {
        setIsEnglishMode(!isEnglishMode)
    }
      const logoutHandler =() =>{
    axios.get("/api/users/logout")
     .then(res=>{
       if(res.data.logoutsuccess){
         
        setLoginStatus(false); 
        setAccessToken('');
        navigate('/login')
        
         
     }else{
         alert("Logout failed")
 
     }
   })
    }
    const goToUp = () => { 
        console.log('dmld?')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

  return (
      <div style={{ position: 'relative', zIndex: '1' }}>
          <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode } >

    {loginStatus ? 
        (<Frame>
      
      <Up onClick={goToUp}><FontAwesomeIcon icon={faArrowUp} size={"2x"}  color={isDarkMode ? "#d1cfcf" : "#000000"} /></Up>
      </Frame> )
        : (<Frame>
           
                      <Up onClick={goToUp}><FontAwesomeIcon icon={faArrowUp} size={"2x"}  color={isDarkMode ? "#d1cfcf" : "#000000"}  /></Up>
           
     </Frame>) }    
            </ThemeProvider>
      </div>
  )
}

const Frame = styled.div`
height : 6rem;
display : flex;

color : ${props => props.theme.colorCT};
box-shadow:${props => props.theme.navShadow};
justify-content : right;

align-items : center;
font-size : 1.5rem;
font-family: 'Gugi', cursive;
width : 100%;
position : fixed;
bottom : 0;
`;

const Up = styled.div`
    margin: 0 130px 0 0;
    border: 3px solid ${props => props.theme.colorCT};
    width: 60px;
    height: 60px;
    border-radius : 50%;
    cursor: pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    
`
