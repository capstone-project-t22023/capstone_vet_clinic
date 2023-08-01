import React, { useState, useEffect, useContext } from 'react';
import ProgramContext from '../ProgramContext';
import Header from './Header';
import Footer from './Footer';
import UserCard from "./UserCard";

export default function Home() {

  const {user, authenticated} = useContext(ProgramContext);

  return (
    <div>
      <Header/>
        <div className={"container m5"}>
           <h1>Homepage</h1>
            <UserCard key={user.id} user={user} />
        </div>
      <Footer/>
    </div>
  )
}
