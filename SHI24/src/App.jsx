import './App.css'
import CarbonFootprint from './components/Calculater/CarbonFootprint';
import ChatBot from './components/ChatBot/ChatBot';
import Header from './components/Header/Header'
import axios from 'axios'
import { useState } from 'react'
import Test from './components/ChatBot/test';
import Electricity from './components/Calculater/Electricity';
import { Outlet } from 'react-router-dom';
import CarbonCreditsCalculator from './components/Calculater/CarbonCreditsCalculator';

function App() {

  return (
    <>
      <Header />

      <Outlet />

      <ChatBot />

      {/* <CarbonCreditsCalculator /> */}

    </>
  );

}

export default App
