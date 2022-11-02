import React from 'react';
import {useEffect} from 'react';
import 'prismjs/themes/prism-tomorrow.css'; // only needed for code highlighting
import 'react-notion/src/styles.css';
import styled  from 'styled-components';
import { useScroll } from '../hook/useScroll';
import LoadingPage from './LoadingPage';
import ChannelService from './ChannelTalk/ChannelService';

import ArticleBoard from './Notion/ArticleBoard'
import MainArticle from './Notion/MainArticle';
import SideBar from './SideBar';
import Contact from './Notion/Contact';

export default function About() {
    const { scrollY } = useScroll();
    useEffect(() => {
        //chatbot
        ChannelIO('boot', {
        pluginKey: '57248d93-bea9-4afa-889a-0b5cba58121a'
        });
        ChannelIO('setAppearance', 'dark')

    }, [])
 
    //이거도씹하드코딩이네 login register about
      useEffect(() => {
        const body = document.body
        if (body.clientHeight >= body.scrollHeight) {
                
                   document.getElementById('up').style.display = 'none'
                } else { 
                   document.getElementById('up').style.display = ''
                   
               }
      }, [document.body.scrollHeight])
    
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
        <>
    <div style={{height:'20px'}}></div>
        <MainFrame>
        
        <SideBar />
    
        <section id='section1'>     
        <MainArticle />   
        </section>
                
        <section id='section2' style={{minHeight:'50px'}}>
        </section>

        <ArticleBoard />
                
        <ContactSection id='section3' style={{ Height: '100px', width: '100%',padding:"0 0 100px 0" }}>
        <Contact/>
        </ContactSection>
        </MainFrame>
    
        </>
    )
}




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
