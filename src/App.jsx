import Header from "./components/Header"
import "./components/Header.css";
import Artworks from "./components/Artworks";
import Transactions from "./components/Transactions";
import Footer from "./components/Footer";
import CreateNFT from "./components/CreateNFT";
import ShowNFT from "./components/ShowNFT";
import UpdateNFT from "./components/UpdateNFT";
import Loading from "./components/Loading";
import Alert from "./components/Alert";
import { useEffect } from "react";
import {Route} from "react-router-dom";
import { getAllNFTs, isWalletConnected } from "./Blockchain.services";
import Carousel from "./components/Carousel";

const App = () => {
  useEffect(async ()=>{
    await isWalletConnected()
    await getAllNFTs()
  
  },[])
  return (
  <div >


         <Header/>
        <Artworks/>
        <Carousel/>
        <Transactions/>
       <Footer/>
      
       <CreateNFT/>
       <ShowNFT/>
       <UpdateNFT/>
       <Loading/>
       <Alert/>
       


  
  </div>

  )
}

export default App
