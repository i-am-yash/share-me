 import React,{useState} from 'react'
import { urlFor,client } from '../client'
import {Link,Navigate,useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'

import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import { fetchUser } from '../utils/fetchUser'



const Pin = ({pin:{postedBy,image,_id,destination,save }})=> { // destructuring props components
 const [postHovered, setPostHovered] = useState(false);
 const user= fetchUser();
 const Navigate=useNavigate()
 
 //filer used to return array of item that matches the conditon
 //!0-> means true else means false
 //if length of output is 0 means no user exist so it should give output as false
 // !!0= !true = false. 
 const alreadySaved=!!save?.filter((item)=> item.postedBy._id=== user?.googleId)?.length;
 const savePin=(id)=>{
   if(!alreadySaved) {
    // alreadySaved=true;
    
    // saving the post in sanity
     client
     .patch(id)
     .setIfMissing({ save: []})
     .insert ('after','save[-1]', [{
       _key:uuidv4(),
       userId:user?.googleId,
       postedBy: {
        _type:'postedBy',
         _ref:user?.googleId
       }
     }])
     .commit()
     .then( ()=>{
       window.location.reload();
      
     })
   }
 }
const deletePin=(id)=>{
  client
  .delete(id)
  .then (()=>{
    window.location.reload();
  })

}

  return (
    <div className='m-2'>
      <div 
      onMouseEnter={()=>setPostHovered(true)}
      onMouseLeave={()=>setPostHovered(false)}
      onClick={ ()=> Navigate(`/pin-detail/${_id}`)}
      className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
      <img className='rounded-lg w-full ' alt='user-post' src={urlFor(image).width(250).url()}/>
      {postHovered && (
      <div
       className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
      style={{height:'100%'}}
      >
        <div className='flex items-center justify-between'>
          <div className='flex gap-2'>
            <a
            href={`${image?.asset?.url}?dl=`}// allows to download that specific image
            download
           onClick={(e)=> e.stopPropagation()} //onclick happens only once and wont redirect to /pin-detail onclick written above
            className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
            >
               {/*download icon in pin */}
            <MdDownloadForOffline/>     

            </a>
            </div>
            
            {alreadySaved ? (
                <button 
                className='bg-red-500 text-white opacity-70 hover:opacity-100 rounded-3xl font-bold text-base px-5 py-1 hover:shadow-md outline-none '
                >
               {save?.length} Saved
                </button>
            ):(
              <button type='button'
              onClick={(e)=> {
                e.stopPropagation();
                savePin(_id)
              }
              }

              className='bg-red-500 text-white opacity-70 hover:opacity-100 rounded-3xl font-bold text-base px-5 py-1 hover:shadow-md outline-none '
              >
                Save
              </button>
            )
            }
          </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {
                // console.log("destination is "+destination)
              }
              { destination && (
                <a 
                href={destination}
                target='_blank' // to open in new page
                rel='noreferrer'
                className='bg-white flex items-center  gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md '
                
                >
                  <BsFillArrowUpRightCircleFill/>
                
                  {destination.length>15 ? `${destination.slice(0,15)}...`:destination}

                </a>
              )}
              {postedBy?._id === user?.googleId && (
                <button
                type='button'
                onClick={(e)=> {
                  e.stopPropagation();
                  deletePin(_id)
                }
                }
                className='bg-white p-2  opacity-70 hover:opacity-100 rounded-3xl font-bold text-base text-dark hover:shadow-md outline-none '
             
                >
                  <AiTwotoneDelete/>
                </button>
              )}

            </div>
        </div>
      )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
<img
className="w-8 h-8 rounded-full object-cover"
src={postedBy?.image}
alt="user-profile"
/>
<p className="font-semibold capitalize">{postedBy?.userName}</p>
</Link>
</div>
);
};

export default Pin;







 