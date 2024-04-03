import React from 'react'
import Header2 from './Header2';
import styled from 'styled-components';
import First2 from './First2';
import Recipe2 from './Recipe2';
import Write2 from './Write2';
import ContactSection from './ContactSection';
import AboutSection from './AboutSection';
import LastSection from './LastSection';
import Recipes from './Recipes';

const AfterLogin = () => {
  return (
    
    <AfterHeader>
        <Header2/>
        <First2/>
        <Recipes/>
        <Write2/>
        <ContactSection/>
        <AboutSection/>
        <LastSection/>
    </AfterHeader>
  )
}

export default AfterLogin;

const AfterHeader = styled.div`
    
`;