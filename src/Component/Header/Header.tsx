import React, { useState, useCallback} from 'react';
import Belly from '../../assets/img/Belly-logo.png'
import Metasmak from '../../assets/img/metamask-logo.png'
import styled from 'styled-components';
import { ethers } from 'ethers';
import Binance from '../../assets/img/binance-coin-bnb-logo.png'
import Ethereum from '../../assets/img/eth.png'
import { Dropdown } from 'semantic-ui-react'

const AppWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;


`;

const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex: 0 35%;
`
const Button = styled.button<any>`
height: 45px;
border-radius: 4px;
margin-left: 5px;
width: 250px;
cursor: pointer;
transition: all 0.2s ease-in-out;
background-color: rgb(192, 227, 237);
`
const WrapperLogo = styled.div`
display: flex;
align-items: center;
color: #3e816e;
justify-content: space-between;
width: 150px;
position: relative;
margin-left:15% ;

`

const H1 = styled.h1`
position: absolute;
top: -20px;
right: -20px;
font-size: 2.5rem;
`

const SwapMetasmak = styled.div`
width: 100%;
font-size: 1rem;

`

const Header = () => {  

   let providers = new ethers.providers.Web3Provider(window.ethereum);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
   const [provider, setProvider] = useState(null);
   // const [isConnected, setIsConnected] = useState(false);
   const [selected, setSelected] = useState("in");

   const onChange = (event: any, result: any): void => {
   //   console.log("event", result.value);
     setSelected(result.value);
 };

   const networkOptions = [
      {
        image:{
          avatar: true,
          src: Binance
      },
      value:"BSC", 
      text: "Binance Smart Chain",
    },
      {
        image:{
        avatar: true,
        src: Ethereum
      },
      value: "Belly" ,
       text: "Open Piece",
    }
    ]
    
   

   const connectWalletHandler = useCallback( () => {
		if (window.ethereum && defaultAccount == null) {
         // @ts-ignore
         setProvider(providers);
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then((result: React.SetStateAction<null>[]) => {
				setConnButtonText('Wallet Connected');
				setDefaultAccount(result[0]);
			})
			.catch((error: { message: React.SetStateAction<null>; }) => {
				alert(error.message);
			});

		} else if (!window.ethereum){
			alert('Need to install MetaMask');
			
		}
	}, [defaultAccount, providers]);

    return (
       <AppWrapper >
          <WrapperLogo>
         <img className='logo__belly' src={Belly} width={50} height={50}   alt="Belly" />
         <H1>BELLY</H1>
          </WrapperLogo>
        
         <Wrapper>
         <Dropdown
          placeholder='Select Network'
          fluid
          selection
          scrolling
          options={networkOptions}
          className='network__dropdown'
          onChange={onChange}
          value={selected === "in" ? "BSC" : 'Belly'}
          
      />
          <Button onClick={connectWalletHandler}> {defaultAccount ? 
          (
             <SwapMetasmak>
                <img className='metasmak__belly' src={Metasmak} width={20} height={20}  alt="Metasmak"  />
                 <span>{
                  //  @ts-ignore
                 defaultAccount.slice(0,6)
                 }...{
                  //  @ts-ignore
                 defaultAccount.slice(-6)
                 }</span> 
             </SwapMetasmak>
            
             ) : 'Connect Wallet'}</Button>
         </Wrapper>
       </AppWrapper>
    )
}
export default Header

