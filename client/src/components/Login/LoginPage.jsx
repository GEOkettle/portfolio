import React from 'react';
// import styled from 'styled-components';
import { useState,useEffect} from 'react';
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

                    setLoginStatus(true);
                    setAccessToken(res.accessToken);
                 
                } else { 
                
                    alert(res.message);
                }
            });
        
        
    }

 useEffect(() => {
        const body = document.body
        if (body.clientHeight <= body.scrollHeight) {
                   console.log('scroll :' +body.scrollHeight)
                      console.log('client : ' +body.clientHeight)
                   document.getElementById('up').style.display = 'none'
                } else { 
                   document.getElementById('up').style.display = 'block'
                   
               }
     },[document.body.scrollHeight])


  return (
      <>
          <LoginFrame>
              <LoginContainer>
                  <span style={{fontSize:"1.5rem",fontWeight:"700"}}> {isEnglishMode ? "Sign In" : '로그인'}</span>
                  <form onSubmit={e => onSubmitHandler(e)} style={{ margin:"25px 0 0 0"}}>
                
            <InputDiv>
              <label>{isEnglishMode ? "ID" : '아이디'}</label>
                <input type="text" id='userID' name='userID' value={userID} onChange={e=>onUseridHandler(e)}  />
            </InputDiv>
            <InputDiv >
              <label>{isEnglishMode ? "Password" : '비밀번호'}</label>
                <input type="password" id='password' name='password' value={password} onChange={e=>onPasswordHandler(e)} />
            </InputDiv>
            <LoginButton type='submit'> {isEnglishMode ? "Sign In" : '로그인'}</LoginButton>
            </form>
            <br />
            <hr />
                  <p style={{textShadow:"0 0 1px gray",fontWeight:"100"}}>not a member? <StyledLink to="/register">{isEnglishMode ? "Sign Up" : '회원가입'}</StyledLink></p>
              </LoginContainer>
      </LoginFrame>
      </>
  )
}

const LoginFrame = styled.div`
    @media screen and (min-width: 900px) and (max-width: 1190px) {
        width:30%;
        overflow-y:scroll;
    }
    @media screen  and (min-width: 650px)  and (max-width: 900px) {
        width:50%;
        height:50%;
        overflow-y:scroll;
    }
    @media screen  and (min-width: 501px)  and (max-width: 650px) {
        width:60%;
        height:45%;
        overflow-y:scroll;
    }
    @media screen and (max-width: 500px) {
        width:70%;
        overflow-y:scroll;
    }
    position:absolute;
    top: 55%;
    left:50%;
     transform: translate(-50%, -50%);
     background-color:white;
    /* border:1px solid #24db70; */
    border-radius:15px;
    box-shadow : 0 0 2px 2px  white;
    display:flex;
    flex-direction:row;
    width: 20%;
    height: 55%;
    align-items:center;
    justify-content: space-evenly;
    
    `
const LoginContainer = styled.div`

    width: 60%;
    height:80%;
    align-items:center;
    justify-content:center;
`

const LoginButton = styled.button`
width: 100%;
height:33px;
margin: 20px 0 0 0;
background-color:black;
color:white;
border:none;
box-shadow: 0 0 2px 2px inset black;
border-radius:5px;
cursor: pointer;
&:hover{
    background-color: #1DA756;
    box-shadow: 0 0 2px 2px inset #1DA756;
}
`
const InputDiv = styled.div`
    min-height: 60px;
    display:flex;
    flex-direction:column;
    margin: 10px 0 0 0;
    label{
        color:grey;
        font-size:0.8rem;
        margin: 0 0 5px 0%;
    }
    input{
        height:35px;
        border:none;
    box-shadow: 0 0 1px 1px inset grey;
    border-radius:5px;
    }
`
const StyledLink=styled(Link)`
    text-decoration:underline;
    color:black;
    &:hover{
        color: #1DA756;
    }

`