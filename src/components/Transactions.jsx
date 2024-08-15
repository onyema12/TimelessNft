import React, {useEffect , useState} from 'react'
import './Transactions.css';
import {BiTransfer} from 'react-icons/bi';
import {MdOpenInNew} from 'react-icons/md';
import { truncate, useGlobalState } from '../store';
export default function Transactions() {
    const [transactions] = useGlobalState('transactions')
    const [end,setEnd] = useState(3);
    const [count] = useState(3)
    const [collection,setCollection]= useState([])

    const getCollection = ()=>{
      return transactions.slice(0,end)
}

useEffect(()=>{
setCollection(getCollection())
},[transactions,end])


  return (
    <div>
        <div className="w-4/5 py-10 mx-auto">
           <h4 className='text-white text-3xl font-bold uppercase text-graident'>
           {collection.length > 0 ? 'Latest Transactions' : 'No Transactions Yet'}
            </h4>
        
           <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-x-6 md:gaps-4 lg:gaps-2 py-2.5">
                    {collection.map((tx, i) => (
                       <Transaction key={i} tx={tx}/>

                    ))}
           </div>
           
           {collection.length > 0 && transactions.length > collection.length ? (
                     <button onClick={()=> setEnd(end + count)} className='TransactBtn text-sm'>Load More</button>
                ) : null }

           

        </div>
    </div>
  )
}

const Transaction=({tx})=>(
    <div className="flex justify-between items-center border border-white text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
       <div className="rounded-md shadow-sm shadow-white p-2">
           <BiTransfer/>
       </div>

       <div className="">
        <h4 className='text-sm'>Fund Transfered</h4>
        <small className='flex just
         items-center'>
            <span className='mr-1'>Received by</span>
            <a className='text-white mr-2' href="#" target="_blank">{truncate(tx.owner,4,4,11)}</a>
                <MdOpenInNew/>
        </small>
       </div>
       <p className='text-sm font-medium'>{tx.cost}</p>
    </div>
)


