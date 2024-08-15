import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa';
import APE from './APE.jpg';
import './Transactions.css';
import { setGlobalState, setLoadingMsg, useGlobalState,setAlert } from '../store';
import {mintNFT} from '../Blockchain.services'

import { uploadFileToIPFS,uploadJSONToIPFS } from '../pinata.js';

export default function CreateNFT() {

      const [modal]=useGlobalState  ('modal');

      const [title,setTitle] = useState('');
      const [price, setPrice] = useState('')
      const [description, setDescription] = useState('')
      const [fileUrl, setFileUrl] = useState('')
      const [imgBase64, setImgBase64] = useState(null)
 
      
      async function uploadMetadataToIPFS() {
        //Make sure that none of the fields are empty
        if( !title || !description || !price || !fileUrl)
        {
            // updateMessage("Please fill all the fields!")
            return -1;
        }

        const nftJSON = {
            title, description, price, image: fileUrl
        }

        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }



     const handleSubmit= async(e)=>{
        e.preventDefault();
        
        if(!title || !description || !price) return;
        
        setGlobalState('modal','scale-0');
        setLoadingMsg('Uploading to IPFS...');
        
        try{
             await uploadMetadataToIPFS();
             console.log("price ",price)
             console.log("price ",price.toString())
             setLoadingMsg("Uploaded, approve transaction now...")
             const metadataURI=fileUrl
             const nft={title, description, metadataURI, price}
             await mintNFT(nft);

              resetForm();
              setAlert('Minting Completed...');
              window.location.reload();
        }catch(e){
             console.log("Error uploading file: ",e);
              setAlert("Minting Failed:",'red');
        }


      }


        const changeImage=async (e)=>{

        var file=e.target.files[0];
        const reader=new FileReader();
        if(e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
       
        reader.onload = (readerEvent)=>{
        const f=readerEvent.target.result;
          setImgBase64(f);
        }

        try{
          const response= await uploadFileToIPFS(file);
          if(response.success == true){
            console.log("Uploaded image to Pinata:",response.pinataURL)
            setFileUrl(response.pinataURL);
          }
        }catch(e){
          console.log("Error during file upload ",e)
        }

      }

      const closeModal=()=>{
        setGlobalState('modal','scale-0');
        resetForm()
      }

      const resetForm=()=>{
        setFileUrl('')
        setImgBase64(null)
        setTitle('')
        setPrice('')
        setDescription('')
      }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
         <div className="bg-[black] shadow-xl shadow-[#5429e365] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                <div className="flex justify-between w-full  items-center text-gray-400">
                    <p className='font-semibold'>Add NFT</p>
                    <button type="button" onClick={closeModal} className='border-0 bg-transparent focus:outline-none' >
                        <FaTimes/>
                    </button>
                </div>

                <div className="flex justify-center w-full items-center rounded-xl mt-5">
                    <div className="shrink-0 h-20 w-20 rounded-xl overflow-hidden ">
                        <img className='h-full w-full object-cover cursor-pointer' src={imgBase64 || APE} alt="APE" />
                    </div>
                </div>

                <div className="flex justify-between w-full items-center bg-gray-800 rounded-xl mt-5">
                    <label className='block' > 
                        <span className='sr-only'>Choose Profile Photo</span>
                        <input type="file" onChange={changeImage} className='block w-full text-sm text-slate-500 file:mr-4 
                        file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                         hover:file:bg-[#1d2631] focus:outline-none cursor-pointer focus:ring-offset-0' accept='image/jpg, image/JPG, image/JPEG, image/gif, image/png , image/webp' required />
                    </label>
                </div>

                <div className="flex justify-between w-full items-center bg-gray-800 rounded-xl mt-5">
                      <input type="text" onChange={(e)=> setTitle(e.target.value)} value={title} className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-offset-0 bg-transparent border-0' placeholder='Title' name="title" required />
               </div>

               <div className="flex justify-between w-full items-center bg-gray-800 rounded-xl mt-5">
                      <input type="number" onChange={(e)=> setPrice(e.target.value)} value={price} className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-offset-0 bg-transparent border-0' placeholder='Price (ETH)' name="price" min={0.01} step={0.01}  required />
               </div>

               <div className="flex justify-between w-full items-center bg-gray-800 rounded-xl mt-5">
                      <textarea type="text" onChange={(e)=> setDescription(e.target.value)} value={description} className='block w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-offset-0 bg-transparent border-0 h-20 resize-none' placeholder='Description' name="description" required ></textarea>
               </div>
           
               <button   onClick={handleSubmit} className='flex flex-row justify-center items-center
              w-full text-black text-md bg-white
              hover:bg-[black] py-2 px-5 rounded-full
              drop-shadow-xl border-solid border-3 
              hover:bg-transparent hover:text-[white]
              hover:border hover:border-[white]
              focus:outline-none focus:ring mt-5'>Mint Now</button>
            </form>
         </div>
    </div>
  )
}
