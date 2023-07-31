import React, { useState, useEffect, useContext } from 'react';
import ProgramContext from '../ProgramContext';
import Header from './Header';
import Footer from './Footer';

export default function Home() {

  const {user, authenticated} = useContext(ProgramContext);

  return (
    <div>
      <Header/>
      
      <Footer/>
    </div>
  )
}
