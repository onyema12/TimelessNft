import React from 'react'
import './Intro.css';
import doll from './doll.jpg'
import APE from './APE2.jpg';
import Identicon from 'react-identicons'
import { setGlobalState, truncate, useGlobalState } from '../store';

export default function Intro() {
     const [connectAccount] = useGlobalState('connectedAccount')
    return (
        <div id="about">
            <div className="about-text">
                <h1 className="text-white text-5xl">Discover the unique  Digital Arts,
                    <span className='text-gradient'>NFTs</span> Collections
                </h1>

                <p class="about-text-p text-gray-500 font-semibold text-sm nt-3">Mint and Collect the hottest NFTs around.</p>

                <div className="smg-btn">
                    <button onClick={()=> setGlobalState('modal','scale-100')} className='btn1'>Create NFT</button>
                    <button className='btn2'>Explore</button>
                </div>

                <div className="w-3/4 flex justify-between items-center mt-5">
                    <div className="text-white">
                        <p className="font-bold">123k</p>
                        <small className='Collect-Small text-gray-300'>Users</small>
                    </div>

                    <div className="text-white">
                        <p className='font-bold'>152k</p>
                        <small className='Collect-Small text-gray-300'>Artworks</small>
                    </div>

                    <div className="text-white">
                        <p className='font-bold'>200k</p>
                        <small className='Collect-Small text-gray-300'>Artists</small>
                    </div>
                </div>

            </div>

            <div className="about-model shadow-xl shadow-black md:w-1/4 mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800">
             <img className='h-65 w-full object-cover' src={APE} alt="Hero" />

             <div className="flex justify-start items-center p-3">
                <Identicon className="h-10 w-10 object-contain rounded-full mr-3" 
                 string={connectAccount}  size={50}/>
                 <div className="">
                     <p className='text-white font-semibold'>{truncate(connectAccount,4,4,11)}</p>
                     <small className='text-pink-800 font-bold'>@you</small>
                </div>
           </div>
          </div>



        </div>

    )
}
