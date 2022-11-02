import React from 'react';
import { useState,useEffect } from 'react';
import useStore from '../../store/store';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link, Routes, Route, Outlet } from "react-router-dom";
export default function RegisterPage() {
 
    const navigate = useNavigate();
    const { registerfetch,isEnglishMode } = useStore();

    const [userID , setUserID] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [ PW, setPW ] = useState('');
    const [PWCheck, setPWCheck] = useState('');
    const [error, setError] = useState([]);

    const onIDHandler = (e) => { 
        setUserID(e.target.value)
    }
    const onEmailHandler = (e) => { 
        setEmail(e.target.value)
    }
    const onNameHandler = (e) => { 
        setName(e.target.value)
    }
    const onPWHandler = (e) => { 
        setPW(e.target.value)
    }
    const onPWCheckHandler = (e) => { 
        setPWCheck(e.target.value)
    }

    const onSubmitHandler = (e) => { 
        e.preventDefault()

        if(PW!==PWCheck){
            alert("비밀번호가 일치하지 않습니다.")
            return
        }
        let registerInfo = {
            userid: userID,
            email: email,
            name: name,
            password: PW
        }
        registerfetch(registerInfo)
            .then( res =>  {
                if (res.error) { 
                     console.log(res.error.message)
                    // setError([res.error.message]);
                    let errorSplit = res.error.message.split('/')
                    for (var i in errorSplit) { 
                            // console.log(errorSplit)
                        if (errorSplit[i] !== '') { 
                            if (errorSplit[i].slice(0, 1) == ',') { 
                            errorSplit[i] = errorSplit[i].substring(1)
                            }
                            const err = errorSplit[i].trim()
                            
                            if (err !=='') {
                            setError(oldarray => [...oldarray, err])
                            }
                            
                            //mysweetalert2로 교체하자거
                            
                            alert(error[i])
                        }
                    }
                } else if(res.success){ 
                    alert("환영합니다^오^")
                    navigate('/login')
                }
              
            })
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
   
      <RegisterFrame>
          <RegisterContainer>
               <span style={{fontSize:"1.5rem",fontWeight:"700"}}> {isEnglishMode ? "Sign Up" : '회원가입'}</span>
              <form  style={{ margin:"25px 0 0 0"}} onSubmit={onSubmitHandler}>
              <InputDiv>
              <label>{isEnglishMode ? 'ID' : '아이디' }</label>
                <input  onChange={e=> onIDHandler(e)} value={userID} type="text"  />
            </InputDiv>
              <InputDiv>
              <label>{isEnglishMode ? 'Email' : '이메일' } </label>
                <input  onChange={e=> onEmailHandler(e)} value={email} type="email" />
            </InputDiv>
              <InputDiv>
              <label>{isEnglishMode ? 'Name' : '이름' } </label>
                <input  onChange={e=> onNameHandler(e)} value={name} type="text" />
            </InputDiv>
              <InputDiv>
              <label>{isEnglishMode ? 'Password' : '비밀번호' }</label>
                <input   onChange={e=> onPWHandler(e)} value={PW} type="password" />
            </InputDiv>
              <InputDiv>
              <label>{isEnglishMode ? 'Confirm Password' : '비밀번호 확인' } </label>
                <input onChange={e=> onPWCheckHandler(e)} value={PWCheck} type="password" />
            </InputDiv>
            <RegisterButton type="submit">{isEnglishMode ? 'Sign Up' : '회원가입' }</RegisterButton>
              </form>
              <br />
            <hr />
                  <p style={{textShadow:"0 0 1px gray",fontWeight:"100"}}>already a user? <StyledLink to="/login">{isEnglishMode ? "Sign In" : '로그인'}</StyledLink></p>
          </RegisterContainer>
     </RegisterFrame>

  )
}
const RegisterFrame = styled.div`
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
    width: 30%;
    height: 70%;
    align-items:center;
    justify-content: space-evenly;
    
    `

    const RegisterContainer = styled.div`

    width: 60%;
    height:80%;
    align-items:center;
    justify-content:center;
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
const RegisterButton = styled.button`
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

const StyledLink=styled(Link)`
    text-decoration:underline;
    color:black;
    &:hover{
        color: #1DA756;
    }

`   