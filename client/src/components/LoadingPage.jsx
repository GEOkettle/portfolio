import React from 'react'
import {useEffect,useState,useRef} from 'react'
import styled, { keyframes } from 'styled-components'

function LoadingPage() {
       const canvasRef = useRef(null)
    const [canvasTag, setCanvasTag] = useState([])
  return (

          <LoadingSpinner>
      </LoadingSpinner>

  )
}

export default LoadingPage


const spinner = keyframes`

  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  `

const LoadingSpinner = styled.div`
display:flex;
flex-direction:column;
align-items:center;
    position:relative;
    /* top: 50%; */
    /* transform: translateY(-50%); */
    transform: translateX(-50%);
    /* left : 50%; */
    width: 50px;
  height: 50px;
  border: 10px dotted white; /* Light grey */
  border-top: 10px dotted green; /* Black */
  border-right: 10px dotted green; /* Black */
  border-radius: 50%;
  animation: ${spinner} 4s linear infinite;
`