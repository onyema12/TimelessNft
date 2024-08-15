import React, { useState,useEffect } from 'react'
import './Artworks.css';
import './Transactions.css';
import { setGlobalState, useGlobalState } from '../store';

export default function Artworks() {
    const [nfts] = useGlobalState('nfts')
    const [end,setEnd] = useState(8);
    const [count] = useState(3)
    const [collection,setCollection]= useState([])

    const getCollection = ()=>{
              return nfts.slice(0,end)
    }

    useEffect(()=>{
        setCollection(getCollection())
    },[nfts,end])


    return (
        <div className=''>
            <div className="w-4/5 py-10 mx-auto">
                <h4 className='text-white text-3xl font-bold uppercase text-gradient'>
                    {collection.length > 0 ? 'Latest Artworks' : 'No Artworks Yet'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gaps-4 lg:gaps-3 py-2.5">
                    {collection.map((nft, i) => (
                        <Card key={i} nft={nft}/>

                    ))}
                </div>
                {collection.length > 0 && nfts.length > collection.length ? (
                     <button onClick={()=> setEnd(end + count)} className='TransactBtn text-sm'>Load More</button>
                ) : null }
               

            </div>
        </div>
    )
}

const Card = ({ nft }) => {
    const setNft=()=>{
        setGlobalState('nft', nft)
        setGlobalState('showModal','scale-100')
    }
       return (
        <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
        <img className='w-full object-cover shadow-lg shadow-black rounded-lg mb-3' src={nft.metadataURI} alt={nft.title} />
        <h4 className='text-white font-semibold'>{nft.title}</h4>
        <p className='text-gray-400 text-sm my-1'>{nft.description}</p>
        
        <div className="flex justify-between items-center mt-3 text-white">
            <div className="flex flex-col">
                <small className='text-xs'>Current Price</small>
                <p className='text-sm font-semibold'>{nft?.cost}</p>
            </div>

            <button onClick={setNft} className='ArtworkBtn text-sm'>View Details</button>
        </div>
    </div>
  )
       }
