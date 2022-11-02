import React from 'react'

import { useState, useEffect, useRef } from 'react';
import { NotionRenderer } from 'react-notion'
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import 'react-notion/src/styles.css';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import useStore from '../../store/store';

function MainArticle() {
    const [mainArticle, setMainArticle] = useState({})
    const [section1, setSection1] = useState(0)
    const [section2, setSection2] = useState(0)
    const [section3, setSection3] = useState(0)
    const { isEnglishMode } = useStore();
    useEffect(() => {
     
        const NOTION_PAGE_ID = '83fca179f8314fd784e541e3368df6a5';
        const NOTION_PAGE_ID_KR = '658634c7564b47a285670ec94982331a'
        fetch(`https://notion-api.splitbee.io/v1/page/${isEnglishMode ? NOTION_PAGE_ID : NOTION_PAGE_ID_KR}`)
            .then(res => res.json())
            .then((resJson) => {
                setMainArticle(resJson);

                setSection1(document.getElementById('section1').getBoundingClientRect().bottom)
                setSection2(document.getElementById('section2').getBoundingClientRect().bottom)
                setSection3(document.getElementById('section3').getBoundingClientRect().bottom)
            })
    }, [isEnglishMode])
 
    return (
        <>

    <Mainarticle>
    
        <NotionRenderer
  
  blockMap={mainArticle}
  fullPage={true}
  
  />
    </Mainarticle>

  </>
  )
}

export default MainArticle

const Mainarticle = styled.div`
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

