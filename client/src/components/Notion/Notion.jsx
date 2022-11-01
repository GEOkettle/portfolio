import React from 'react';
import {useState,useEffect} from 'react';
import { NotionRenderer } from "react-notion";
import { useParams } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import useStore from '../../store/store';
import {Link} from 'react-router-dom';
import LoadingPage from '../LoadingPage';
import { useScroll } from '../../hook/useScroll';

import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";


export default function Notion() {
     const [onClickColor, setOnClickColor] = useState('')
   
     
    const {isDarkMode,inDarkMode,inLightMode,isEnglishMode} = useStore();

    const { slug } = useParams()
    const [blockMap, setBlockMap] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [anchorList, setAnchorList] = useState([])
    const { scrollY } = useScroll();
 
    const setActiveColor = (e) => { 
    const color = e
    setOnClickColor(color)
    }
    
    const notionSlugToId = async (slug)=> { 
    const NOTION_TABLE_ID = 'e0d1a00fc0cd4590afb5704f59bc72df';
    const NOTION_TABLE_ID_KR = 'a8442bd75a054f288b13d9cf6414bfd9'
    
        const database = await fetch(`https://notion-api.splitbee.io/v1/table/${isEnglishMode ? NOTION_TABLE_ID : NOTION_TABLE_ID_KR}`).then(res =>res.json())                   
        try {
        const notion = database.filter(notion => notion.slug === slug).pop();
        return notion.id
        } catch {
        return null
        }
    }

    useEffect(() => { 
        if (document.getElementsByClassName('active')[0]) { 
            document.getElementsByClassName('active')[0].classList.remove('active')
            }
            if (onClickColor) {
                if (document.getElementsByClassName('active')[0]) { 
                    document.getElementsByClassName('active')[0].classList.remove('active')
                    }
                
                document.getElementsByClassName(onClickColor)[0].classList.add('active')
        }
    
    }, [onClickColor])
    

    useEffect(async () => { 
        const notionId = await notionSlugToId(slug)
        const notionData = await fetch(`https://notion-api.splitbee.io/v1/page/${notionId}`).then(res => res.json())
        setIsLoading(false)
        setBlockMap(notionData)
        

    }, [isEnglishMode])
    useEffect(() => { 
        //직접돔에 접근 할 수 밖에없겠
        const h1 = document.getElementsByClassName("notion-h1")
        const array =[]
        for (let i = 0; i < h1.length; i++) { 
            const section =document.createElement('section')
            section.setAttribute('id', 'anchor' + (i + 1))
            section.setAttribute('style','min-height:25px')
            h1[i].insertAdjacentElement('beforebegin',section)
            array.push(h1[i].innerHTML)
        }
        setAnchorList(array)
    }, [blockMap])

return (
    <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode}>
        {isLoading ? <LoadingPage /> :
        <>
        <BackToMain>
                    <StyledLink to="/about">{ isEnglishMode? "←Back To Main" : "←메인으로"}</StyledLink>
        </BackToMain>
    <MainFrame>
        <NotionRenderer
            fullPage={true}
            blockMap={blockMap}
            />
        </MainFrame>
        <GoToSuggestion>
            {anchorList.map((txt, idx)=>{ 
            return (
            <Adiv key={idx} style={{margin:'5px 0 0 0'}}>
            <StyledA onClick={() => setActiveColor('anchor' + (idx + 1) )} className={'anchor' + (idx + 1) } href={'#anchor' + (idx + 1)}>{idx + 1}{txt}</StyledA>
        </Adiv>
        )
        })}
        </GoToSuggestion>
            </>
        }

    </ThemeProvider>
)
}

const MainFrame = styled.div`
min-height: 100vh;
background-color: ${props => props.theme.backgroundColor};
 .notion{
        //darkmodechange
        color : ${props => props.theme.color};
        caret-color : ${props => props.theme.color};
    }
    .notion-page-header{
        //darkmodechange
        font-weight : 750;
        background-color : rgba(196, 232, 202,0.2) !important;
        /* box-shadow: 0px 5px 10px #C4E8CA; */
    }
    .notion-nav-title{
       color : ${props => props.theme.color};
    }
`
const BackToMain = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 20%;
    margin :20% auto;
    height: 100vh;
    @media screen and (max-width: 1170px) {
        
        display:none;
    }
    `
const GoToSuggestion = styled.div`
    @media screen and (max-width: 1170px) {
        
        display:none;
    }
    position: fixed;
    top: 0;
    right: 0;
    width: 20%;
    margin :20% auto;
    height: 100vh;
  
`

const StyledLink = styled(Link)`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    /* font-size: 1.5rem; */
     font-weight : 600;
    text-decoration: none;
    padding: 50% 0 0 10%;
    color: ${props => props.theme.color};
    &:hover{
    color:${props => props.theme.articleHoverCL};
    text-decoration: underline;
    }
`
const StyledA = styled.a`
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
   text-decoration: none;
    font-weight : 600;
    color: ${props => props.theme.color};
    &:hover{
    color:${props => props.theme.articleHoverCL};
 
    }

    `

const Adiv = styled.div`
@media screen and (max-width: 1180px) {
    padding: 0 0 0 10px;
    }
.active{
    color:${props => props.theme.articleHoverCL};
    text-decoration:underline;
    font-weight: 900;
    }
    
`