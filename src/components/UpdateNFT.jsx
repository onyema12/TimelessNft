import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa';
import './Transactions.css';
import { setAlert, setGlobalState, setLoadingMsg, useGlobalState } from '../store';
import { updateNFT } from '../Blockchain.services';
export default function UpdateNFT() {

      const [modal]=useGlobalState  ('updateModal');
       const [nft] = useGlobalState ('nft')
   
      const [price, setPrice] = useState(nft?.cost)
     
    
      const handleSubmit= async (e)=>{
        e.preventDefault();
       
        if(!price || price <= 0) return;

        setGlobalState('modal', 'scale-0')
        setLoadingMsg('Intitalizing price update...')
        
     try { 
        setLoadingMsg('Price updating...')
        setGlobalState('updateModal','scale-0')

        await updateNFT({id:nft.id, cost: price})
        setAlert("Price Updated...")
        window.location.reload()
     } catch (error) {
      console.log('Error updating price ',error)
        setAlert('Update failed...', 'red')
     }

      }

      const closeModal=()=>{
        setGlobalState('updateModal','scale-0');
        resetForm()
      }

      const resetForm=()=>{
        setPrice('')

      }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
         <div className="bg-[black] shadow-xl shadow-[#5429e365] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                <div className="flex justify-between w-full  items-center text-gray-400">
                    <p className='font-semibold'>Card NFT</p>
                    <button type="button" onClick={closeModal} className='border-0 bg-transparent focus:outline-none' >
                        <FaTimes/>
                    </button>
                </div>

                <div className="flex justify-center w-full items-center rounded-xl mt-5">
                    <div className="shrink-0 h-20 w-20 rounded-xl overflow-hidden ">
                        <img className='h-full w-full object-cover cursor-pointer' src={nft?.metadataURI} alt={nft?.title} />
                    </div>
                </div>
           

               <div className="flex justify-between w-full items-center bg-gray-800 rounded-xl mt-5">
                      <input type="number" onChange={(e)=> setPrice(e.target.value)} value={price} className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-offset-0 bg-transparent border-0' name="price" min={0.01} step={0.01}  required />
               </div>

            
               <button className='flex flex-row justify-center items-center
              w-full text-black text-md bg-white
              hover:bg-[black] py-2 px-5 rounded-full
              drop-shadow-xl border-solid border-3 
              hover:bg-transparent hover:text-[white]
              hover:border hover:border-[white]
              focus:outline-none focus:ring mt-5'>Update Now</button>
            </form>
         </div>
    </div>
  )
}
