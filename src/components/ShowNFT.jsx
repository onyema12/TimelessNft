import React, { useState } from 'react'
import Identicon from 'react-identicons';
import { FaTimes } from 'react-icons/fa';
import './Transactions.css';
import { setGlobalState, useGlobalState,truncate, setLoadingMsg, setAlert } from '../store';
import { buyNFT } from '../Blockchain.services';

export default function ShowNFT() {
  const [modal] = useGlobalState('showModal');
  const [connectedAccount] = useGlobalState('connectedAccount')

  const [nft] = useGlobalState('nft')

  const onChangePrice=()=> {
    setGlobalState('nft',nft)
    setGlobalState('showModal','scale-0')
    setGlobalState('updateModal','scale-100')
  }



  const handlePurchase= async ()=>{
    setGlobalState('showModal','scale-0')
    setLoadingMsg('Intitalizing Purchase...')
    
 try { 
    setLoadingMsg('Purchasing awaiting Metamask approval...')

    await buyNFT(nft)
    setAlert("NFT Purchased...")
    window.location.reload()
 } catch (error) {
  console.log('Error updating price ',error)
    setAlert('Purchased failed...', 'red')
 }

  }

  const closeModal = () => {
    setGlobalState('showModal', 'scale-0');

  }


  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
      <div className="bg-[black] shadow-xl shadow-[#5429e365] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className='flex flex-col w-full'>
          <div className="flex justify-between w-full  items-center text-gray-400">
            <p className='font-semibold'>{connectedAccount == nft ? "Change Price" : "Buy NFT" }</p>
            <button type="button" onClick={closeModal} className='border-0 bg-transparent focus:outline-none' >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center w-full items-center rounded-xl mt-5">
            <div className="shrink-0 h-40 w-40 rounded-xl overflow-hidden ">
              <img className='h-full w-full object-cover cursor-pointer' src={nft?.metadataURI} alt={nft?.title} />
            </div>
          </div>
           
          <div className="flex flex-col justify-start rounded-xl mt-5">
            <h4 className='text-white font-semibold'>{nft?.title}</h4>
            <p className='text-gray-400 text-xs my-1'>{nft?.description} </p>

            <div className="flex justify-between items-center mt-3 text-white">
              <div className="flex justify-start items-center">
                <Identicon className="h-10 w-10 object-contain rounded-full mr-3" string={nft?.owner} size={50}/>

                <div className="flex flex-col justify-center items-start">
                  <small className='text-white font-bold'>@owner</small>
                  <small className='text-pink-800 font-semibold'>{nft?.owner ? truncate(nft?.owner,4,4,11) : ''}</small>
                </div>
              </div>

              <div className="flex flex-col text-white">
                <small className='text-xs'>Current Price</small>
                <p className='text-sm font-semibold'>{nft?.cost}</p>
              </div>
            </div>
          </div>
         
         {connectedAccount == nft?.owner ? (
           <button className='flex flex-row justify-center items-center
           w-full text-black text-md bg-white
           hover:bg-[black] py-2 px-5 rounded-full
           drop-shadow-xl border-solid border-3 
           hover:bg-transparent hover:text-[white]
           hover:border hover:border-[white]
           focus:outline-none focus:ring mt-5'
           onClick={onChangePrice}
           >Change Price</button>
         ) : (
            <button onClick={handlePurchase} className='flex flex-row justify-center items-center
              w-full text-black text-md bg-white
              hover:bg-[black] py-2 px-5 rounded-full
              drop-shadow-xl border-solid border-3 
              hover:bg-transparent hover:text-[white]
              hover:border hover:border-[white]
              focus:outline-none focus:ring mt-5'>Purchase</button>
         )}  
          </div>
        </div>
      </div>

  )
}
