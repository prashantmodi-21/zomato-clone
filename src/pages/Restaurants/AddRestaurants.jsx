import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { addRestaurants } from '../../redux/apiCalls';

const AddRestaurants = () => {
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    name: "",
    cuisines: [],
    services: [],
    locality: [],
    rating: ""
  })
  const [file, setFile] = useState({})

  const addRestaurant = ()=>{

  const date = new Date()
  const storage = getStorage(app);
  const storageRef = ref(storage, `images/${date.getTime()}-${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      console.log(error)
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        addRestaurants(dispatch, {name: fields.name, cuisines: fields.cuisines, services: fields.services, locality: fields.locality, rating: fields.rating, image: downloadURL})
       });
    }
  );
}
  return (
    <>
        <div className='p-8'>
          <h1 className='text-4xl pb-4'>Add Restaurant</h1>
          <div id='form w-full'>
            <label htmlFor="">Name<input type="text" placeholder='Restaurant Name' name='name' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Cuisines<input type="text" placeholder='Cuisines' name='cuisines' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value.split(",")})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Services<input type="text" placeholder='Services' name='services' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value.split(",")})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Locality<input type="text" placeholder='Locality' name='locality' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value.split(",")})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Rating<input type="text" placeholder='Rating' name='rating' onChange={(e)=> setFields({...fields, [e.target.name]: e.target.value})} className=' p-2 outline-0 rounded border w-full my-2'/></label>
            <label htmlFor="">Banner Image<input type="file" onChange={(e)=> setFile(e.target.files[0])} className='p-2 rounded text-sm border w-full my-2'/></label>
            <button className='p-2 bg-red-400 text-white block rounded my-2' onClick={()=> addRestaurant()}>Submit</button>
          </div>
        </div>
        </>
  )
}

export default AddRestaurants
