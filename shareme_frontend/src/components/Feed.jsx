import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'   // used to get id of route url
import {client} from '../client'
import { FeedQuery, SearchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const  Feed = () => {
  const [loading, setloading] = useState(false);
  const [pins, setPins] = useState(null);
  const {categoryId} =useParams();   // in url /category/categoryId.

useEffect(() => {
  setloading(true)


  if(categoryId){
    //fetching all the pins for the specific categoryId
    const query= SearchQuery(categoryId);
    client.fetch(query)
    .then((data)=> {
      setPins(data);
      setloading(false);
    })
  }else{
      client.fetch(FeedQuery)
      .then ((data)=> {
        setPins(data);
        setloading(false);
      });
  }

  
}, [categoryId])


  if(loading)return <Spinner message="We are adding new ideas to your feed!"/>
  if(!pins?.length){
  //  console.log(pins);
    return <h2>No pins available</h2>
  }
  return (
    
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed