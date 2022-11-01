import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NotionRenderer } from 'react-notion'
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import 'react-notion/src/styles.css';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import useStore from '../store/store';
import { useScroll } from '../hook/useScroll';
import LoadingPage from './LoadingPage';
import ChannelService from './ChannelTalk/ChannelService';



// const notion = new NotionAPI();
// const recordMap = await notion.getPage('83fca179f8314fd784e541e3368df6a5')
export function Article(props) {
    
    return (
        <>
    
            <ArticleFrame >
                <Link to={props.link} >
                     <img style={{ height: '100px', width: '200px' }} src={props.imgsrc} />
                    {/* {props.imgsrc ?
                        <img style={{ height: '100px', width: '200px', borderRadius: "5%" }} src={props.imgsrc} />
                        :<div style={{ height: '100px', width: '200px', borderRadius: "5%" }}></div>
                    } */}
                    <div style={{height :'70px', overflow:'hidden'}}>

        <h2>{props.title}</h2>
                    </div>
        
                    <h4 style={{font:'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,monospace'}}>{props.description}</h4>
        {/* <h5 style={{font:"15px Arial, sans-serif"}}>{props.date}</h5> */}
                </Link>
                <CardLink to={props.link} >
                    <div  style={{font:'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,monospace',fontWeight:"bold"}}>{props.lan ? 'go to page' : '바로가기'}</div>
                </CardLink>
        </ArticleFrame>
        
    </>
  )
}

export default function About() {


    const {isDarkMode,inDarkMode,inLightMode,isEnglishMode} = useStore();
    const [mainArticle, setMainArticle] = useState({})
    const [contactAC, setcontactAC] = useState({})
    const [ArticleList, setArticleList] = useState([])
    const [section1,setSection1] = useState(0)
    const [section2,setSection2] = useState(0)
    const [section3,setSection3] = useState(0)
    const [isLoading,setIsLoading] = useState(true)
    const [onClickColor,setOnClickColor] = useState('')
    const { scrollY } = useScroll();



    const setActiveColor = (e) => { 
        
        const color = e.target.href.split('#')[1]
      
        setOnClickColor(color)
    }
    
    useEffect(() => {
        //chatbot
        ChannelIO('boot', {
        pluginKey: '57248d93-bea9-4afa-889a-0b5cba58121a'
        });
        ChannelIO('setAppearance', 'dark')

    const NOTION_PAGE_ID = '83fca179f8314fd784e541e3368df6a5';
    const NOTION_PAGE_ID_KR ='658634c7564b47a285670ec94982331a'
    const NOTION_CONTACT_ID = 'b0e5003aeb004ac38eab2f0927aaad0b';
    const NOTION_CONTACT_ID_KR ='007adf8cea5043a09e8d0343ad97a3f5'
    

    const NOTION_TABLE_ID = 'e0d1a00fc0cd4590afb5704f59bc72df';
    const NOTION_TABLE_ID_KR = 'a8442bd75a054f288b13d9cf6414bfd9'
    fetch(`https://notion-api.splitbee.io/v1/table/${isEnglishMode ? NOTION_TABLE_ID : NOTION_TABLE_ID_KR}`)
    .then(res =>res.json())
        .then((resJson) => {
        console.log(resJson)
        setArticleList(resJson);
    }).then(() => { 
        fetch(`https://notion-api.splitbee.io/v1/page/${isEnglishMode ? NOTION_PAGE_ID : NOTION_PAGE_ID_KR}`)
        .then(res => res.json())
            .then((resJson) => {
           
        setMainArticle(resJson);
        setIsLoading(false)
        setSection1(document.getElementById('section1').getBoundingClientRect().bottom)
        setSection2(document.getElementById('section2').getBoundingClientRect().bottom)
        setSection3(document.getElementById('section3').getBoundingClientRect().bottom)
    })
    }).then(() => { 
        fetch(`https://notion-api.splitbee.io/v1/page/${isEnglishMode ? NOTION_CONTACT_ID : NOTION_CONTACT_ID_KR}`)
            .then((res) => res.json())
            .then((resJson) => { 
                setcontactAC(resJson)
            })
    })
    }, [isEnglishMode])
    useEffect( () => { 
        if (document.getElementsByClassName('active')[0]) { 
            console.log(document.getElementsByClassName('active'))
            document.getElementsByClassName('active')[0].classList.remove('active')
            }
            if (onClickColor) {
                
                document.getElementsByClassName(onClickColor)[0].classList.add('active')
        }
    
    }, [onClickColor])
    //이거도씹하드코딩이네 login register about
      useEffect(() => {
        const body = document.body
        if (body.clientHeight >= body.scrollHeight) {
                
                   document.getElementById('up').style.display = 'none'
                } else { 
                   document.getElementById('up').style.display = ''
                   
               }
     },[document.body.scrollHeight])
    useEffect(() => {

        //개씹하드코딩이네
        if (document.getElementsByClassName("section1")[0]) { 

            if (section1 > scrollY) { 
                if (document.getElementsByClassName('active')[0]) { 
                    document.getElementsByClassName('active')[0].classList.remove('active')
                }   
                document.getElementsByClassName("section1")[0].classList.add('active')
            } else if ((section1 < scrollY) && (section2+section1-300 > scrollY)) {
                if (document.getElementsByClassName('active')[0]) { 
                    document.getElementsByClassName('active')[0].classList.remove('active')
                }
                document.getElementsByClassName("section2")[0].classList.add('active')
            }else if ((section2 < scrollY) && (section3 > scrollY)) {
            if (document.getElementsByClassName('active')[0]) { 
                document.getElementsByClassName('active')[0].classList.remove('active')
            }
            document.getElementsByClassName("section3")[0].classList.add('active')
        }
    }
    }, [scrollY])
    

    return (
        
        <ThemeProvider theme={isDarkMode ? inDarkMode : inLightMode}>
            <div style={{height:'20px'}}></div>
            {isLoading ? <LoadingPage/> :
                <MainFrame>
                    
                    <SideBar>
                  

                    <ul>
                    <li>
                    <a href="#section1"  className='section1' onClick={e => setActiveColor(e)}>{isEnglishMode ? 'Intro' : '자기소개'}</a>
                    </li>
                        
                    <li>
                    <a  href="#section2" className='section2' onClick={e=>setActiveColor(e)}>{isEnglishMode ? 'Projects' : '프로젝트'}</a>
                    </li>
                    <li>
                    <a  href="#section3" className='section3' onClick={e=>setActiveColor(e)}>{isEnglishMode ? 'Contact' : '연락처'}</a>
                    </li>
                    </ul>
                    
                </SideBar>
                <section id='section1'>
                    
    <MainArticle>
    
    <NotionRenderer 
  
  blockMap={mainArticle}
  fullPage={true}
  
  />
    </MainArticle>
                </section>
                <section id='section2' style={{minHeight:'50px'}}>
                </section>
   

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
                lan={isEnglishMode}
            ></Article>
            
            
            )
        } 
        )}
        </Articleboard>
                    
    <ContactSection id='section3' style={{ Height: '100px', width: '100%',padding:"0 0 100px 0" }}>
    <ContactAC>
    <NotionRenderer 
    blockMap={contactAC}
    fullPage={true}/>
    </ContactAC>
    </ContactSection>
    </MainFrame>
    }
        </ThemeProvider>
    )
}


const Articleboard = styled.div`
@media screen and (max-width: 1170px) {
    
    box-shadow: 0 0 0 0 inset ${props => props.theme.articleHoverCL};
}

box-shadow: 0 0 3px 3px inset ${props => props.theme.articleHoverCL};
border-radius: 20px;
display: flex;
flex-wrap : wrap;
align-items : center;
width: 50%;
justify-content: center ;
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
border-radius:20px;
border:1px solid inset;
box-shadow : 0 0 5px 5px   ${props => props.theme.backgroundColor};


`
const CardLink = styled(Link)`


transition: transform .2s;
-webkit-transition:-webkit-transform transform .2s;
&:hover{
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
}

padding: 8px 0 0 0;
 width :90%;
 height:10%;
 
 background-color:${props => props.theme.articleHoverCL};
 border-radius:10px;
 
`

const MainArticle = styled.div`
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

const MainFrame = styled.div`
 
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
    monospace;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    /* margin :0.5px 0 0 0 ; */
   
    background-color: ${props => props.theme.backgroundColor};

    
   
`

const SideBar = styled.div`
   @media screen and (max-width: 1170px) {
       display: none;
    }
   background:  ${props => props.theme.backgroundColor};
    height: 90%;
    width:15%;
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

const SvgDiv = styled.div`


`
const ContactSection = styled.div`

    display: flex;
    flex-wrap : wrap;
    align-items : right;
    max-width: 60%;
    margin : auto;
    flex-direction: column;
    justify-content: space-around;
    padding : 200px 0 0 60px;
    
        color : ${props => props.theme.color};
    
`
