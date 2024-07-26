import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateMenuItem } from '../../redux/apiCalls';
import { app } from '../../firebaseConfig';

const UpdateMenuItem = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { menuItems } = useSelector(state => state.menu)
  const selectedDish = menuItems.find(item => item._id === id)

  const [fields, setFields] = useState({
    dish: "",
    category: [],
    price: "",
    rating: ""
  })

  const [file, setFile] = useState({})

  const handleMenuItem = () => {

    const storage = getStorage(app);
    const storageRef = ref(storage, `menuItem/${new Date().getTime()}-${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
      (snapshot) => {
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateMenuItem(dispatch, { ...fields, id: selectedDish._id, image: downloadURL });
        });
      }
    );
  }

  useEffect(() => {
    setFields({ dish: selectedDish.dish, category: selectedDish.category, price: selectedDish.price, rating: selectedDish.rating })
  }, [selectedDish])
  return (
    <>
      <div className='p-8'>
        <h1 className='text-4xl pb-4'>Update Menu Item</h1>
        <div id='form w-full'>
          <label htmlFor="">Dish Name<input type="text" placeholder='Name' name='dish' value={fields.dish} onChange={(e) => setFields({ ...fields, [e.target.name]: e.target.value })} className=' p-2 outline-0 rounded border w-full my-2' /></label>
          <label htmlFor="">Dish Image<input type="file" onChange={(e) => setFile(e.target.files[0])} className=' p-2 outline-0 rounded border w-full my-2' /></label>
          <label htmlFor="">Category<input type="text" name='category' value={fields.category} onChange={(e) => setFields({ ...fields, [e.target.name]: e.target.value.split(",") })} placeholder='Category' className=' p-2 outline-0 rounded border w-full my-2' /></label>
          <label htmlFor="">Price<input type="text" name='price' value={fields.price} onChange={(e) => setFields({ ...fields, [e.target.name]: e.target.value })} placeholder='Price' className=' p-2 outline-0 rounded border w-full my-2' /></label>
          <label htmlFor="">Rating<input type="text" name='rating' value={fields.rating} onChange={(e) => setFields({ ...fields, [e.target.name]: e.target.value })} placeholder='Rating' className=' p-2 outline-0 rounded border w-full my-2' /></label>
          <button className='p-2 bg-red-400 text-white block rounded my-2' onClick={() => handleMenuItem()}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default UpdateMenuItem
