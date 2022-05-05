
import styled from 'styled-components'
import iconCommunity from '../../assets/img/icon-community.svg'
import iconPool from '../../assets/img/icon-pool.svg'
import iconFarm from '../../assets/img/icon-farms.svg'
import iconMarket from '../../assets/img/icon-market.svg'
import iconGamebase from '../../assets/img/icon-gamebase.svg'
import iconBlindBox from '../../assets/img/icon-blind-box.svg'
import iconHouseMoney from '../../assets/img/icon-house-money.svg'
import iconMagnify from '../../assets/img/icon-magnify.svg'


const Wrapper = styled.div`
font-weight:700;
letter-spacing:1.2px;
text-transform:uppercase;
height:100%;
width:250px;
border-right:1px solid rgb(181, 207, 214);
margin-left:10%;
`;

const Menu = () => {

  return (
    <Wrapper >
	 <div className="row g-0">
		 <div className="col-auto">
						<aside>
							<ul id="mainmenu" className="list-unstyled">
								<li>
									<a href="#" className="active">
										<img src={iconCommunity} className="icon"/><span className="text">Home</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src={iconCommunity} className="icon"/><span className="text">SWAP</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src={iconPool} className="icon"/><span className="text">TRADE</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src={iconFarm} className="icon"/><span className="text">BRIDGE</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src={iconMarket} className="icon"/><span className="text">DASHBOARD</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src={iconGamebase} className="icon"/><span className="text">GOVERNANCE</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src={iconBlindBox} className="icon"/><span className="text">POOLS</span>
									</a>
								</li>
								<li>
									<a href="#">
										<img src={iconHouseMoney} className="icon"/><span className="text">SOLARFLARE</span>
									</a>
								</li>
								<li >
									<a href="#">
										<img src={iconMagnify} className="icon"/><span className="text">METRICS</span>
									</a>	
								</li>	
							</ul>
						</aside>
						</div>
						</div>
    </Wrapper>
  )
}

export default Menu