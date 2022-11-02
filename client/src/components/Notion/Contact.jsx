import React from 'react'
import styled, { ThemeProvider, withTheme } from 'styled-components';
import { useState, useEffect} from 'react';
import { NotionRenderer } from 'react-notion'
import useStore from '../../store/store';
function Contact() {
    const [contactAC, setcontactAC] = useState({})
         const {isEnglishMode} = useStore();
    useEffect(() => {
    

    const NOTION_CONTACT_ID = 'b0e5003aeb004ac38eab2f0927aaad0b';
    const NOTION_CONTACT_ID_KR ='007adf8cea5043a09e8d0343ad97a3f5'
   
    fetch(`https://notion-api.splitbee.io/v1/page/${isEnglishMode ? NOTION_CONTACT_ID : NOTION_CONTACT_ID_KR}`)
        .then((res) => res.json())
        .then((resJson) => { 
            setcontactAC(resJson)
        })
    }, [])
 
  return (
    <ContactAC>
    <NotionRenderer 
    blockMap={contactAC}
    fullPage={true}/>
    </ContactAC>
  )
}

export default Contact

const ContactAC = styled.div`
  @media screen and (max-width: 1170px) {
        width:98%;
    }
    width:100%;
    .notion{
        color : ${props => props.theme.color};
        caret-color : ${props => props.theme.color};
    }
    .notion-page-header{
    font-weight : 750;
    background-color : rgba(196, 232, 202,0.2) !important;
    }
    .notion-nav-title{
    color : ${props => props.theme.color};
    }
`
