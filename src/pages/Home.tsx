import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import Belly from '../assets/img/Belly-logo.png'
import Binance from '../assets/img/binance-coin-bnb-logo.png'
import Ethereum from '../assets/img/eth.png'
import { AiOutlineDown } from 'react-icons/ai';
import { ethers } from 'ethers'
import Loading from '../Component/Loading/Loading'
import { Dropdown } from 'semantic-ui-react'


const Wrapper = styled.div`
width: 500px;
height: 630px;
border: 3px solid #9393af;
color: white;
border-radius: 10px;
text-align: center;
`
const AppWrapper = styled.div`
display: flex;
align-items: center;
border-radius: 5px;
border: 3px solid #9393af;
padding: 10px;
margin: 30px;
justify-content: space-between;
cursor: pointer;
`
const InputSelect = styled.input`
padding: 20px;
border: 0;
outline: none;
background-color: transparent;
width: 90%;
color: #000;
font-weight: bold;

`
const H3 = styled.h3`
font-size: 1.5rem;
padding-top: 20px;
color: #000;
`

const InputAmount = styled.div`
background-color: rgb(192, 227, 237);
width: 88%;
border-radius: 5px;
border: 3px solid #9393af;
margin-left: 30px;
`;

const ButtonSubmit = styled.button<any>`
background-color: ${(props)=>props.color} ;
width: 88%;
border-radius: 5px;
margin-top: 20px;
padding: 20px;
cursor:${(props)=>props.cursor};
display: flex;
justify-content: center;
margin-left: 30px;
font-weight: bold;
&:hover{
    background-color: ${(props)=>props.hover};
}
`



const Home = () => {
  const nodeRef = React.useRef(null)
  const [amount, setAmount] = React.useState('')
  const [showLoading, setShowLoading] = React.useState(false)
  const [selected, setSelected] = useState("in");
  const [selectedCoin, setSelectedCoin] = useState();
  const textInput = useRef(null);
 
  const bscOneNetwork = [
    {
      image:{
        avatar: true,
        src: Binance
    },
    value:"BSC", 
    text: "Binance Smart Chain" 
  },
  {
    image:{
    avatar: false,
    src: Ethereum
  },
   value: "OPE",
   text: "Open Piece"
  }
      ]
  
  
  const onChangeOne =(event:any, result:any) => {
    setSelectedCoin(result.value)
    // console.log("event", result.value);
      setSelected(result.value);
  };

  const onChangeTwo = (event: any, result:any): void => {
    // console.log("event", result.value);
    setSelected(result.value);
  };


  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner();
  let contract = new ethers.Contract(import.meta.env.VITE_BUSD_TOKEN_ADDRESS,import.meta.env.VITE_BUSD_TOKEN_ABI, signer);


  const handleChangeAmount = (e: any) => {
    setAmount(e.target.value)
  }


  const resetpage = () => {
    window.location.reload();
  }

/***************BSC TO OPEPIECE******************/ 
  

  const handleSubmitTransferFromBsc = async() => {
    if(window.ethereum.networkVersion == 97  || window.ethereum.networkVersion == 56){
    setShowLoading(true)
    const parsedPrice = ethers.utils.parseEther(amount);
    let contractTransfer = await contract.transfer(import.meta.env.VITE_TRASFER_ADDRESS, parsedPrice);
    let tx = await contractTransfer.wait();
    // console.log(tx,'tx');
    const response = await fetch(`${import.meta.env.VITE_API_BSC_ONE_URL_TESTNET || import.meta.env.VITE_API_BSC_ONE_URL_MAINNET}/${tx.transactionHash}`)
    if(response.status === 200){
       alert('Successfully transfer');
        setShowLoading(false)
    }
     else {
      alert('transfer failed');
      setShowLoading(false)
    } 
    setAmount('')
   
    } else {
      alert('Please connecting to Open Piece network');
    }
     resetpage()
    }
   

/***************OPEPIECE TO BSC******************/

  const handleSubmitTransferFromOpenpieceToBsc = async() => {
    if(window.ethereum.networkVersion == 141 || window.ethereum.networkVersion == 54){
    setShowLoading(true)
    const tx = await provider.getSigner().sendTransaction({
        to: import.meta.env.VITE_TRASFER_ADDRESS,
        value: ethers.utils.parseEther(amount)
    })
    let transferTx = await tx.wait();
    // console.log(transferTx,'tx');
    const response = await fetch(`${import.meta.env.VITE_API_ONE_BSC_URL_TESTNET || import.meta.env.VITE_API_ONE_BSC_URL_MAINNET}/${transferTx.transactionHash}`)
        if(response.status === 200){
          alert('Successfully transfer');
          setShowLoading(false)
        }else{
          alert('transfer failed');
          setShowLoading(false)
        } 
        setAmount('')
      } else{
        alert('Please connecting to Binance Chain Smart network ');
      }
     resetpage()
    }

  return (
    <Wrapper  ref={nodeRef}>
      <H3>Orion Bridge</H3>
        <AppWrapper>
          <div className='asset__belly'>
            Asset
          </div>
          <div className='img___belly'>
          <img src={Belly} alt='' width={30} height={30}  />
          <div className='img-belly'>Belly</div>
          <AiOutlineDown/>
          </div>
        </AppWrapper>
        <div className='network'>Network :</div>
        <AppWrapper>
          <div className='from__belly'>
            From
          </div>
          <Dropdown
          placeholder= 'Select'
          fluid
          selection
          scrolling
          options={bscOneNetwork }
          onChange={onChangeOne}
          value={selected === "in" ? "BSC" : "OPE"}
          className='dropdown__belly'
         
        />
      </AppWrapper>
        <AppWrapper>
          <div className='to__belly'>
            To
          </div>
          <Dropdown
          placeholder= 'Select '
          fluid
          selection
          scrolling
          options={bscOneNetwork}
          onChange={onChangeTwo}
          className='dropdown__belly'
          value={selected === "in" ? "OPE" : "BSC"}
        />
        </AppWrapper>
        <div className='network'>Balance :</div>
        < InputAmount>
        <InputSelect placeholder='Amount' value={amount} onChange = {handleChangeAmount} ref={textInput}/>
        </InputAmount>
       {amount == '' ? 
        ( 
            <ButtonSubmit type='button'
              disabled = {true} 
              color={showLoading ? "#212128" : "#9393af"} 
            > 
              Select Asset
            </ButtonSubmit>
        )
        :
       <>
       {
            <ButtonSubmit type='button'
              onClick={
                 selectedCoin ?
                  handleSubmitTransferFromOpenpieceToBsc
                  :
                  handleSubmitTransferFromBsc
              }
              disabled = {showLoading} 
              color={showLoading ? "#212128" : "#9393af"}  
              cursor= {showLoading? '#545462':'pointer'}
              hover={showLoading ? "" : " #88889f"}
            >
              {
                showLoading  ? <Loading /> :'Select Asset'
              }
            </ButtonSubmit>
       } 
      </>
    }
    </Wrapper>
 
    )
}

export default Home


