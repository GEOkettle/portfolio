import React from 'react';
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import 'react-notion/src/styles.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useStore from '../../store/store';


export default function Article(props) {
     const {isDarkMode,inDarkMode,inLightMode,isEnglishMode} = useStore();
    return (
      
            
                
        <>
                
            <ArticleFrame >
                <Link to={props.link} >
                     <img style={{ height: '100px', width: '200px',margin:"0",padding:"0"}} src={props.imgsrc} />   
                    <div style={{height :'70px', overflow:'hidden'}}>

        <h1>{props.title}</h1>
                    </div>
        
                    <h4 style={{font:'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,monospace'}}>{props.description}</h4>
        {/* <h5 style={{font:"15px Arial, sans-serif"}}>{props.date}</h5> */}
                </Link>
                <CardLink to={props.link} >
                    <div  style={{font:'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,monospace',fontWeight:"bold"}}>{isEnglishMode ? 'go to page' : '바로가기'}</div>
                </CardLink>
        </ArticleFrame>
        
    </>
          
   
  )
}


const CardLink = styled(Link)`


transition: transform .2s;
-webkit-transition:-webkit-transform  .5s;
&:hover{
    transform: scale(1.1);
    -webkit-transform: scale(1.1) !important;
}
&:active{
 background-color:white;
}

padding: 8px 0 0 0;
 width :90%;
 height:10%;
 
 background-color:${props => props.theme.tr};
 color:${props => props.theme.color};
 border-radius:10px;
 
`

const ArticleFrame = styled.div`
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    
display:flex;
flex-direction:column;
align-items:center;
background: ${props => props.theme.articleBG};
text-align : center;
a{
    text-decoration : none !important;
    color :${props => props.theme.color};

}
    transition: transform .2s;
    &:hover{
    transform: scale(1.1);
    }
padding: 12px;
margin: 20px 25px;
width: 200px;
height:300px; 
border:1px solid inset;
box-shadow : 0 0 5px 5px   ${props => props.theme.backgroundColor};


`

