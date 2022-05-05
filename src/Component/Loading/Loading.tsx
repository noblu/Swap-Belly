
import styled from 'styled-components'

const Wrapper = styled.div`
border: 10px solid #f3f3f3;
border-top: 10px solid #3498db;
border-radius: 50%;
width: 30px;
height: 30px;
animation: spin 1s linear infinite;

@keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`

const Loading = () => {
  return (
    <Wrapper></Wrapper>
  )
}

export default Loading