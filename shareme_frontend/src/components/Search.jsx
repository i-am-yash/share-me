import React,{useState,useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import {FeedQuery, SearchQuery} from '../utils/data';
import Spinner from './Spinner';

const Search = ({searchTerm}) => {
   const [pins, setpins] = useState(null)
  const [loading, setloading] = useState(false)

  useEffect(() => {
   if(searchTerm!=''){
     setloading(true);
     const query=SearchQuery(searchTerm.toLowerCase());
    //  console.log(query+" shd")
     client.fetch(query)
     .then((data)=>{
       setpins(data)
       setloading(false)
     });
   }
   else{
   //  setloading(false);
     
     client.fetch(FeedQuery)
     .then((data)=>{
       //console.log(data)
       setpins(data)
       setloading(false)
     });
   }
  }, [searchTerm])
  
  return (
    <div>
      {loading && <Spinner  message="Searching for pins..."/>}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length===0 && searchTerm!=='' && !loading &&(
        <div className='mt-10 text-center text-xl'>
          No Pins Found!
          </div>
      )}
    </div>
  );
};

export default Search














// import React,{useState,useEffect} from 'react'
// import MasonryLayout from './MasonryLayout'
// import { client } from '../client'
// import {FeedQuery, SearchQuery} from '../utils/data';
// import Spinner from './Spinner';

// const Search = ({ searchTerm }) => {
//   const [pins, setPins] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (searchTerm !== '') {
//       setLoading(true);
//       const query = SearchQuery(searchTerm.toLowerCase());
//       client.fetch(query).then((data) => {
//         setPins(data);
//         setLoading(false);
//       });
//     } else {
//       client.fetch(FeedQuery).then((data) => {
//         setPins(data);
//         setLoading(false);
//       });
//     }
//   }, [searchTerm]);

//   return (
//     <div>

//       {loading && <Spinner message="Searching pins" />}
//       {pins?.length !== 0 && <MasonryLayout pins={pins} />}
//       {pins?.length === 0 && searchTerm !== '' && !loading && (
//         <div className="mt-10 text-center text-xl ">No Pins Found!</div>
//       )}
//     </div>
//   );
// };

// export default Search;