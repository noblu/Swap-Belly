import React from 'react';
import { Suspense } from 'react'
import styled from 'styled-components'
import './App.css'
import Header from './Component/Header/Header'
import Menu from './Component/Menu/Menu';
import Home from './pages/Home';


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  height: 100vh;
  width: 100%;
  background: rgb(192, 227, 237);
  color: #000;
  padding: 5px 5px;
  align-items: center;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 90%;
  justify-content: space-between;
  flex:1;
  border-bottom: 1px solid rgb(181, 207, 214);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  padding-right: 20px;
  
`

const BodyWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
  z-index: 1;
  height: calc(100% - 80px);
  display: flex;
  align-items: center;
`

const SwapMenu = styled.div`
flex:1;
width: 100%;
height: 100%;
display: flex;
padding-top: 100px;
justify-content: center;

`

const Marginer = styled.div`
  margin-top: 5rem;
`

function App(): JSX.Element {
  const nodeRef = React.useRef(null)
  return (
    <Suspense fallback={null} >
       <AppWrapper  ref={nodeRef}>
       <HeaderWrapper  >
        <Header />
       </HeaderWrapper>
       <BodyWrapper >
        <Menu />
        <SwapMenu >
          <Home/>
        </SwapMenu>
       </BodyWrapper>
       <Marginer/>
       </AppWrapper>
       
      </Suspense>
  )
}

export default App
