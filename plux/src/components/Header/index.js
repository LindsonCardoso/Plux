import { useContext , useState, useEffect } from 'react';

import styled from "styled-components";
import './header.css'

//component
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'

import SidebarItem from "./SideBarData"

//icons
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FlatColor from "react-icons/fc";
import { IconContext } from "react-icons/lib";

//img
import avatar from '../../assets/avatar.png'


//styled
const Nav = styled.div`
  background: var(--white);
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
  
const NavIcon = styled(Link)`
  font-size: 2rem;
  height: 80px;
  display: flex;
 
  align-items: center;
  
  justify-content: flex-end;
  padding: 2rem;
 
   

`;
  
const SidebarNav = styled.nav`
  background: white;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;

 
`;
  
const SidebarWrap = styled.div`
  width: 100%;

  
`;
  
const TitleIcon = styled.span`

  font-size: 1.6rem;
  margin: auto;
  font-weight: bold;
  color: var(--green-500);


`;

const TitleLogo = styled.h1`

  font-size: 1.6rem;
  margin: auto;
  font-weight: bold;
  color: var(--green-500);
  text-align: center;

`;


export const Header = () => {

    const { user } = useContext(AuthContext)

    const [sidebar, setSidebar] = useState(false);
  
    const showSidebar = () => setSidebar(!sidebar);
   
    return (
    <>
    <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars size={24} style={{color: "black"}} onClick={showSidebar} />
          </NavIcon>
          <TitleLogo
          
          >
            PluX
          </TitleLogo>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <TitleIcon>PluX</TitleIcon>
              <AiIcons.AiOutlineArrowLeft size={24} onClick={showSidebar} style={{color: "black"}} />
            </NavIcon>
            <SidebarItem/>        
          </SidebarWrap>
        </SidebarNav>
     
      </IconContext.Provider>
    </>
   ) 
}