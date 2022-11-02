import React from 'react'
import styled, { ThemeProvider, withTheme } from 'styled-components';
import { useState, useEffect} from 'react';
import { NotionRenderer } from 'react-notion'
import useStore from '../../store/store';
function CreditNotion() {
    const [contactAC, setcontactAC] = useState({})
         const {isEnglishMode} = useStore();
    useEffect(() => {
    

    const NOTION_CREDIT_ID = '65459f16b9ff4f2bbb6a297d9b302056';
    const NOTION_CREDIT_ID_KR ='08e3d64068764822860c2836e68a59ea'
   
    fetch(`https://notion-api.splitbee.io/v1/page/${isEnglishMode ? NOTION_CREDIT_ID : NOTION_CREDIT_ID_KR}`)
        .then((res) => res.json())
        .then((resJson) => { 
                
            setcontactAC(resJson)
        })
    }, [])
 
  return (
    <ContactAC  style={{zIndex:"3"}}>
    <NotionRenderer 

    blockMap={contactAC}
    fullPage={true}/>
    </ContactAC>
  )
}

export default CreditNotion

const ContactAC = styled.div`
  @media screen and (max-width: 1170px) {
      width:98%;
    }
    width:100%;
    .notion{
        color : ${props => props.theme.color};
        caret-color : ${props => props.theme.color};
    }
    position:absolute;
    top:5%;
    .notion-page-header{
    font-weight : 750;
    background-color : rgba(196, 232, 202,0.2) !important;
    }
    .notion-nav-title{
    color : ${props => props.theme.color};
    }
    z-index:2;
    
`
