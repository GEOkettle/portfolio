import React from 'react'
import styled, { keyframes } from 'styled-components'

function LoadingPage() {
  return (
   <SpinnerContainer>
          <LoadingSpinner>
      </LoadingSpinner>
    </SpinnerContainer>
  )
}

export default LoadingPage

const SpinnerContainer = styled.div`
    position:absolute;
    width: 100%;
    height: 100%;
`
const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }`

const LoadingSpinner = styled.div`
    position:relative;
    top: 50%;
    transform: translateY(-50%);
    transform: translateX(-50%);
    left : 50%;
    width: 50px;
  height: 50px;
  border: 10px dotted white; /* Light grey */
  border-top: 10px dotted green; /* Black */
  border-right: 10px dotted green; /* Black */
  border-radius: 50%;
  animation: ${spinner} 4s linear infinite;
`