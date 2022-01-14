import React,{useState} from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery,  } from '../utils/data';
import Spinner from './Spinner';
import MasonryLayout from './MasonryLayout'


const Feed = () => {
    const {categoryId}=useParams()
    const [loading, setLoading]=useState(false)
    const [pins,setPins]=useState(null)
    console.log(pins);
    useEffect(()=>{
        setLoading(true)
      if(categoryId){
         const query = searchQuery(categoryId)
         client.fetch(query).then((data)=>{
             setPins(data);
             setLoading(false)
         })
      }else{
        setLoading(true)
      client.fetch(feedQuery)
      .then((data)=>{
          setPins(data)
          setLoading(false)
      })
      }
    },[categoryId])

    if(loading) return <Spinner  message='We are adding new ideas to yours feed !'  />
    if(!pins?.length) return <div className='no-content'>
          <img src="https://i.ibb.co/684NQb6/sad-unscreen.gif" alt="" />
          <h3>No content upload yet!</h3>
        
        </div>
    return (
        <div>
            {pins && <MasonryLayout pins={pins}></MasonryLayout>}
         
        </div>
    );
};

export default Feed;