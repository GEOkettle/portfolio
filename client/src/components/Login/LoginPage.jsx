import React from 'react';
// import styled from 'styled-components';
import { useState} from 'react';
import useStore from '../../store/store';
import styled from 'styled-components';
import Logo from '../../assets/Logo.png';
import { Link, Routes, Route, Outlet } from "react-router-dom";

export default function LoginPage() {
    //state for login info
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');

    

    //
    const { loginfetch,loginStatus,setLoginStatus,setAccessToken,isEnglishMode} = useStore();
   
    //prevent default submit
    const onUseridHandler = (e) => { 
        setUserID(e.target.value);
    }
    const onPasswordHandler = (e) => { 
        setPassword(e.target.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();

        let loginInfo = {
            userid: userID,
            password: password
    
        }
     
        loginfetch(loginInfo)
            .then(res => {

                if (res.loginsuccess) {
                    // console.log('res.accessToken'+res.accessToken)
                    setLoginStatus(true);
                    setAccessToken(res.accessToken);
                 
                } else { 
                
                    alert(res.message);
                }
            });
        
        
    }




  return (
    <StyledLogin>
    
    <StyledIntroduction>
        <StyledImageContainer>
    <img src={Logo} alt="logo" />  
      </StyledImageContainer>
        <p>
        {isEnglishMode ? "Sign in to Geo's Portfolio" : '로그인'}          
      
      </p>
    </StyledIntroduction>   

      <StyledForm onSubmit={e => onSubmitHandler(e)}>
        <div >
        <label htmlFor="userID">{isEnglishMode ? "ID : " : '아이디 :'}</label>
        <StyledInput type="text" id='userID' name='userID' value={userID} onChange={e=>onUseridHandler(e)}  />
        </div>
                
        <div>
        <label htmlFor="password">{isEnglishMode ? "PW : " : '암호 :'}  </label>
        <StyledInput  type="password" id='password' name='password' value={password} onChange={e=>onPasswordHandler(e)}  />    
        </div>
              
        <div>
        <StyledButton type='submit'> {isEnglishMode ? "Sign in" : '로그인'}   </StyledButton>          
        <StyledButton><StyledLink to="/register">{isEnglishMode ? "Sign up" : '회원가입'}</StyledLink></StyledButton>          
        </div>
        </StyledForm>
          
      </StyledLogin>
  )
}


const StyledLogin = styled.div`
padding: 1rem;

width : 50%;
min-height : 30rem;
margin : auto;
position:relative;
top:250px;
border-radius : 1.5rem;
font-family: 'Orbitron', sans-serif;
background-color :#E8E8E8;

`;
const StyledIntroduction = styled.div`
align-items : center;
display : flex;
flex-direction : column;
justify-content : space-around;
font-size : 1.5rem;
height : 40%;
`;
const StyledImageContainer = styled.div`

`
const StyledForm = styled.form`
margin : 1rem auto;
height : 15rem;
align-items : center;
display : flex;
flex-direction : column;
justify-content : space-around;
background-color : black;
width : 50%;
color : white;
border-radius : 1rem;
`;

const StyledButton = styled.button`
font-family: 'Orbitron', sans-serif;
margin : 0 1rem;
min-width : 4rem;
min-height : 2rem;
background: none;
border : 1px solid white;
cursor : pointer;
color : black;
background-color : white;
border-radius : 0.5rem;
&hover{
    color :#0C6D10;
}
`;

const StyledLink = styled(Link)`
text-decoration : none;
color : black;
&hover{
    color :#0C6D10;
}
`
const StyledInput = styled.input`
    height : 2rem;
    width : 15rem;
    border-radius : 0.5rem;
    border : 1px solid white;
`;