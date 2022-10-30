import React from 'react'
import {useEffect,useRef} from 'react'
import styled, { keyframes } from 'styled-components'

function Credit() {
    const canvasRef = useRef(null)
    ChannelIO('boot', {
        pluginKey: '57248d93-bea9-4afa-889a-0b5cba58121a'
        });
        ChannelIO('setAppearance', 'dark')
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = document.body.scrollWidth;
        canvas.height = document.body.scrollHeight;
    

        const context = canvas.getContext('2d');

        const katakana = 'abcdefghijklmnopqrstuvwxyz';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        
        const alphabet = katakana + latin + nums;
        
        const fontSize = 8;
        const columns = canvas.width/fontSize;
        
        const rainDrops = [];
        
    for( let x = 0; x < columns; x++ ) { rainDrops[x]=1; } const draw=()=> {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);
    
        context.fillStyle = '#0F0';
        context.font = fontSize + 'px monospace';
    
        for(let i = 0; i < rainDrops.length; i++) { const text=alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            context.fillText(text, i*fontSize, rainDrops[i]*fontSize); if(rainDrops[i]*fontSize> canvas.height &&
            Math.random() > 0.975){
            rainDrops[i] = 0;
            }
            rainDrops[i]++;
            }
            };
    
            setInterval(draw, 60);
      }, [])
    useEffect(() => {
        const body = document.body
        console.log(body.scrollHeight)
        console.log(body.clientHeight)
        if (body.clientHeight >= body.scrollHeight-1) {
                
                document.getElementById('up').style.display = 'none'
                } else { 
                document.getElementById('up').style.display = ''
            }
},[document.body.scrollHeight])
    return (

            
      <canvas ref={canvasRef} style={{width:'100%',height:'99.6%',scroll:"hidden",margin:'0',padding:'0'}} >
          
      </canvas>
   
  )
}

export default Credit
