/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import { useEffect } from 'react';
// import {}

const PinsDetail = ({user}) => { 
  const {pinId} = useParams()
  const [pins,setPins]=useState()
  const [pinDetail,setPinDetail]=useState()
  const [comment,setComment] = useState('')
  const[addingComment,setAddingComment] = useState(false)
 
  console.log('pins',pins);
  console.log('pinId',pinId);

  ///  add comment
  const addComment =()=>{
        setAddingComment(true)
        client.patch(pinId)
        .setIfMissing({comments:[]})
        .insert('after','comments[-1]',[{
            comment,
            _key:uuidv4(),
            postedBy:{
                _type:'postedBy',
                _ref:user._id
            }
        }])
        .commit()
        .then(()=>{
            fetchPinDetails()
            setComment('')
            setAddingComment(false)
        })
    }
  
    const fetchPinDetails =()=>{
        const query = pinDetailQuery(pinId)
        if(query){
            client.fetch(`${query}`)
            .then((data)=>{
                setPinDetail(data[0])
                console.log(data);
            if(data[0]){
              const query1 = pinDetailMorePinQuery(data[0])
                client.fetch(query1)
                .then((res)=>setPins(res))
            }
            })
        }
    }

    useEffect(()=>{
    fetchPinDetails()
    },[pinId])
    if(!pinDetail) return ( 
       <Spinner message='Loading image............' />
         )
    return (
    <>
        <div className='flex xl-flex-row flex-col m-auto bg-white' style={{maxWidth:'1500px', borderRadius:'32px'}}>
           <div className="flex justify-center items-center md:items-start flex-initial">
               <img src={pinDetail?.image && urlFor(pinDetail?.image).url()} 
               className='rounded-t-3xl rounded-b-lg' 
               alt="user-post" 
               />
           </div>
           <div className="w-full p-5 flex-1 xl:min-w-620">
               <div className="flex items-center justify-between">
                   <div className="flex gap-2 items-center">
                   <a
                  href={`${pinDetail?.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
                   </div>
                   <a href={pinDetail.destination} target="_blank" rel="noopener noreferrer" className='text-gray'>
                       {pinDetail?.destination.slice(0,30)}
                   </a>
               </div>
             <div className='about_pic'>
             <h1 >{pinDetail.title}</h1>
             <p className="mt-2">The picture is related to - {pinDetail.about}</p>
             </div>
             <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={pinDetail?.postedBy?.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{pinDetail?.postedBy.userName}</p>
            </Link>
             
             <h2 className='users-comment'>Users Comments</h2>
             <div className="max-h-370 overflow-y-auto">
                 {
                     pinDetail?.comments?.map((comment,i)=>(
                         <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={comment.comment}>
                          <img 
                          src={comment.postedBy?.image}
                          className='w-7 h-7 rounded-full cursor-pointer img-of-user'
                          alt="" />
                          <div className="flex flex-col">
                              <p className='user-weight'>{comment.postedBy?.userName}</p>
                              <p className='comment-of user'>{comment.comment}</p>
                          </div>
                         </div>
                     ))}
                 </div>
                      <div className="flex flex-wrap mt-6 gap-3">
                      <Link to={`/user-profile/${pinDetail?.postedBy._id}`}>
                        <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
                     </Link>
                     <input type="text" placeholder='add comment...............' value={comment} 
                     className='input-fields'
                     onChange={(e)=>{setComment(e.target.value)}}
                     required
                     />
                     <button className='add-comment' onClick={addComment}> {addingComment ? 'Done' : 'Add Comment'}</button>
            </div>
           </div>
        </div>

        {
          pins?.length > 0 && (
              <div className='similar_to_like_this'>
                  <h2>Similar to this</h2>
              </div>
              
          )
        }
        {pins ? (
                <MasonryLayout pins={pins}/>
            ):(
                <Spinner message="Loading more pins" />
            )
        }
        </>
    );
};

export default PinsDetail;