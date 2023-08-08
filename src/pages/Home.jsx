import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import {Box, Button, Paper, Container, Typography} from '@mui/material';
import ProgramContext from '../ProgramContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCard from "../components/user/UserCard";

export default function Home() {

  const {user, authenticated} = useContext(ProgramContext);

  return (
    <div>
      <Header/>
        <Container maxWidth="lg" sx={{mt: 5, mb: 5, p:3, bgcolor: 'primary.50'}}>
            <Typography component="h1" variant="h3">Homepage</Typography>
            {!authenticated ? <Link to={"/login"}>Login</Link> : "You are logged in! Welcome " + user.firstname + "!"}
        </Container>
      <Footer/>
    </div>
  )
}
