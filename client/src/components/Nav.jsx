import React from 'react';
import axios from '../plugins/axios';
import useStore from '../store/store';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link, Routes, Route, Outlet } from "react-router-dom";
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import LogoWhite from '../assets/LogoWhite.png';
import Logo from '../assets/Logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon,faSun } from "@fortawesome/free-solid-svg-icons";
export default function Nav() {
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
    
    const changeMode = () => { 
        setIsDarkMode(!isDarkMode)
       
    }
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

  return (
      <div style={{ position: 'relative', zIndex: '1' }}>
          <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode } >

    {loginStatus ? 
        (<Frame>
      <LogoFrame>
      <img onClick={changeMode}  src={isDarkMode ? Logo : LogoWhite} alt="logo" style={{width:"50px",height:"50px",margin:"13% 5% 0 0"}} />  
      <h2>Portfolio</h2>
      </LogoFrame>
        
        <StyledLink to="/about">{isEnglishMode? 'Projects' : '프로젝트' }</StyledLink> 
        <StyledLink to="/credit">{isEnglishMode? 'Credit' : '크레딧' }</StyledLink> 
                
                <StyledSpan onClick={changeLan}>
                {isEnglishMode? '한/영' : 'En/Kor' }
                    </StyledSpan>
                    <StyledSpan>
            <FontAwesomeIcon onClick={changeMode} icon={isDarkMode ? faMoon : faSun} size={"2x"}  color={isDarkMode ? "#d1cfcf" : "#000000"} />  
                </StyledSpan>   
       <StyledButton onClick={logoutHandler}>  {isEnglishMode? 'LogOut' : '로그아웃' }</StyledButton> 
      </Frame> )
        : (<Frame>
            <LogoFrame>
            <img onClick={changeMode}  src={isDarkMode ? Logo : LogoWhite} alt="logo" style={{width:"50px",height:"50px",margin:"13% 5% 0 0"}} />  
            <h2>Portfolio</h2>
            </LogoFrame>
            <StyledLink to="/about">{isEnglishMode? 'Projects' : '프로젝트' }</StyledLink> 
            <StyledLink to="/credit">{isEnglishMode? 'Credit' : '크레딧' }</StyledLink> 
                <StyledSpan onClick={changeLan}>
                {isEnglishMode? '한/영' : 'En/Kor' }
                    </StyledSpan>
                    <StyledSpan>
            <FontAwesomeIcon onClick={changeMode} icon={isDarkMode ? faMoon : faSun} size={"2x"}  color={isDarkMode ? "#d1cfcf" : "#000000"} />  
                </StyledSpan>
                  <div>
                
                          <StyledLink2 to="/login">
                          
                              {isEnglishMode ? 'Sign In' : '로그인'}
                          </StyledLink2>/  
                 
            <StyledLink2 to="/register">{isEnglishMode? 'Sign Up' : '회원가입' }</StyledLink2>
            </div>
     </Frame>) }    
            </ThemeProvider>
      </div>
  )
}

const Frame = styled.div`
 @media screen and (max-width: 1170px) {
        height : 3rem;
    }
height : 4.5rem;
display : flex;
background-color : ${props => props.theme.backgroundColorNV};
color : ${props => props.theme.colorCT};
box-shadow:${props => props.theme.navShadow};
border-bottom :  ${props => props.theme.navBorder};
justify-content : space-around;
align-items : center;
font-size : 1.1rem;
 font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight:bold;
/* font-family: 'Stick No Bills', sans-serif; */
width : 100%;
position : fixed;
top : 0;
`;

//align-items : center flex상태에서 위로 몰린 텍스트 중앙을 정렬*

const LogoFrame = styled.div`
   @media screen and (max-width: 1180px) {
        img{
            display:none;
        }
        font-size:0.5rem;
        display:none;
    }
display:flex;
font-size :1.3rem;

img{
    border-radius : 10%;
    /* box-shadow:0px 5px 5px #cbc4c433; */
    margin: 0 0.5rem;
}
`;

const StyledLink = styled(Link)`
@media screen and (max-width: 500px) {
        font-size:1rem;
        &:hover{
    font-size:1.1rem;
    }
    }
text-decoration : none;
color :${props => props.theme.colorCT};
transition: transform .2s;
&:hover{
color :${props => props.theme.navHoverCL};
transform: scale(1.2);

}


`
const StyledLink2 = styled(Link)`
    &:hover{
    color :${props => props.theme.navHoverCL};
        font-size: 1.5rem;
    }
@media screen and (max-width: 500px) {
        font-size:1rem;
        &:hover{
        color :${props => props.theme.navHoverCL};
        font-size:1.1rem;
    }
    }
text-decoration : none;
color :${props => props.theme.colorCT};
transition: transform .2s;
`
const StyledSpan = styled.span`
@media screen and (max-width: 500px) {
    font-size:0.8rem;
    &:hover{
    font-size:0.9rem;
    }
    }
text-decoration : none;
color :${props => props.theme.colorCT};
transition: transform .2s;
&:hover{
color :${props => props.theme.navHoverCL};
transform: scale(1.2);


}
cursor: pointer;
`

const StyledButton = styled.button`
&:hover{
color :${props => props.theme.navHoverCL};
font-size:1.8rem;
}
@media screen and (max-width: 1170px) {
    font-size:0.8rem;
    &:hover{
    font-size:1.1rem;
    }
    }
font-size : 1.5rem;
/* font-family: 'Gugi', cursive;*/
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
    monospace;
    
margin : 0 1rem;
min-width : 4rem;
min-height : 2rem;
background: none;
border : none;
cursor : pointer;
color : ${props => props.theme.colorCT};
background-color :  ${props => props.theme.backgroundColorNV};
border-radius : 0.5rem;
`;

