"use client";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Banner from "./components/banner";
//import Blog from "./components/Blog";
import Card from "./components/Card";
import Footer from "./components/footer";
import Main from "./components/main";
//import Navbar from "./components/navbar";
import './globals.css';

const Home: React.FC = () => {
  return (
    <>
      <Main />
      <Card />
      <Banner />
      <Footer />
    </>
  )
};

export default Home;
