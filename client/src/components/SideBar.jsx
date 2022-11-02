import React from 'react'
import styled, { ThemeProvider, withTheme } from 'styled-components';
import useStore from '../store/store';
import { ReactComponent as Door } from '../assets/si-glyph-door.svg';
import { useState, useEffect, useRef } from 'react';
function SideBar() {
    const { isDarkMode, inDarkMode, inLightMode, isEnglishMode } = useStore();
        const [onClickColor,setOnClickColor] = useState('')
       const setActiveColor = (e) => { 
        const color = e.target.href.split('#')[1]
        setOnClickColor(color)
    }
     useEffect( () => { 
        if (document.getElementsByClassName('active')[0]) { 
            console.log(document.getElementsByClassName('active'))
            document.getElementsByClassName('active')[0].classList.remove('active')
            }
            if (onClickColor) {
                
                document.getElementsByClassName(onClickColor)[0].classList.add('active')
        }
    
    }, [onClickColor])
    return (
      
       <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode}>

                    <Sidebar>
                  

                    <ul>
                    <li>
                    <Door width="15" height="15" />
                    <a href="#section1" className='section1' onClick={e => setActiveColor(e)}>{isEnglishMode ? 'Intro' : '자기소개'}</a>
                    </li>
                        
                    <li>
                    <Door width="15" height="15" />
                    <a  href="#section2" className='section2' onClick={e=>setActiveColor(e)}>{isEnglishMode ? 'Projects' : '프로젝트'}</a>
                    </li>
                    <li>
                    <Door width="15" height="15" />
                    <a  href="#section3" className='section3' onClick={e=>setActiveColor(e)}>{isEnglishMode ? 'Contact' : '연락처'}</a>
                    </li>
                    </ul>
                    
                </Sidebar>
                    </ThemeProvider>
  )
}

export default SideBar

const Sidebar = styled.div`
   @media screen and (max-width: 1170px) {
       display: none;
    }
   background:  ${props => props.theme.backgroundColor};
    padding: 10% 0 0 0;
    height: 100%;
    width:10%;
    position: fixed;
    bottom: 0;
    left: 0;
    border-right: ${props => props.theme.border};
        .active{
                 color:${props => props.theme.articleHoverCL};
                border-bottom: 2px solid ${props => props.theme.articleHoverCL};
                font-weight: 900;
                font-size:1.5rem;
                
                 }
             svg{ 
                 &:hover{
                width:30;
                height:30;
             }}
 
    ul{
        list-style: none;
        margin :100px auto;
        li{
            margin : 20px 0 20px 0;
            padding : 10px 0 10px 0;
            a{
                color:${props => props.theme.color};
                text-decoration: none !important;
                font-weight : 600;
               
                &:hover{
                    font-size:1.2rem;
                    color:${props => props.theme.articleHoverCL};
                    border-bottom: 2px solid ${props => props.theme.articleHoverCL};
                }
            
            }
        }
        }
        
`