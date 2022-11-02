import React from 'react';
import { useState, useEffect, useRef } from 'react';
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import 'react-notion/src/styles.css';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import useStore from '../../store/store';



import Article from './Article';

export default function ArticleBoard() {
    const { isDarkMode, inDarkMode, inLightMode, isEnglishMode } = useStore();
    const [ArticleList, setArticleList] = useState([])

     useEffect(() => {  
    const NOTION_TABLE_ID = 'e0d1a00fc0cd4590afb5704f59bc72df';
    const NOTION_TABLE_ID_KR = 'a8442bd75a054f288b13d9cf6414bfd9'
    fetch(`https://notion-api.splitbee.io/v1/table/${isEnglishMode ? NOTION_TABLE_ID : NOTION_TABLE_ID_KR}`)
    .then(res =>res.json())
        .then((resJson) => {
        setArticleList(resJson)
   
        })
    },[])
    return (
    
        <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode}>
       
                        
        <Articleboard>
           {ArticleList.map((blog, index) => {
               return (
                   <Article
                   imgsrc={blog.img}
                   title={blog.Name}
                   description={blog.description}
                   date={blog.date}
                   link={'/notion/' + blog.slug}
                   key={index}
                   ></Article>
                   
                   
                   )
                } 
                )}
          </Articleboard>
        
        </ThemeProvider>
                
  )
}
const Articleboard = styled.div`

@media screen and (max-width: 1170px) {
    
    box-shadow: 0 0 0 0 inset ${props => props.theme.cardFrame};
}

box-shadow: 0 0 3px 3px inset ${props => props.theme.cardFrame};
border-radius: 20px;
display: flex;
flex-wrap : wrap;
align-items : center;
width: 50%;
justify-content: center ;
`

