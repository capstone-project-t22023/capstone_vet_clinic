import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import {Box, Button, Paper, Container, Typography} from '@mui/material';
import ProgramContext from '../ProgramContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserCard from "../components/user/UserCard";

export default function Dashboard() {

  const {user, authenticated} = useContext(ProgramContext);

  return (
    <div>
      <Header/>
        <Container maxWidth="lg" sx={{mt: 5, mb: 5, p:3, bgcolor: 'primary.50'}}>
            <Typography component="h1" variant="h3">Dashboard</Typography>
            <UserCard key={user.id} user={user} />
        </Container>
      <Footer/>
    </div>
  )
}
