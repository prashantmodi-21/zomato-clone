import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addMenuItem, deleteMenu, getMenu } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../../firebaseConfig';
import { Link } from 'react-router-dom';

const AddMenuItem = () => {
  const { user } = useSelector(state => state.admin)
  const { menuItems } = useSelector(state => state.menu)
  const dispatch = useDispatch()
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
          addMenuItem(dispatch, { ...fields, restId: user.restaurantId, image: downloadURL });
        });
      }
    );

  }
  useEffect(() => {
    getMenu(dispatch, user.restaurantId)
  }, [])
  console.log(menuItems)
  return (
    <>
      <div className='p-8'>
        <h1 className='text-4xl pb-4'>Add Menu Item</h1>
        <div id='form w-full'>
          <label htmlFor="">Dish Name<input type="text" placeholder='Name' name='dish' onChange={(e) => setFields({ ...fields, [e.target.name]: e.target.value })} className=' p-2 outline-0 rounded border w-full my-2' /></label>
          <label htmlFor="">Dish Image<input type="file" onChange={(e) => setFile(e.target.files[0])} className=' p-2 outline-0 rounded border w-full my-2' /></label>
          <label htmlFor="">Category<input type="text" name='category' onChange={(e) => setFields({ ...fields, [e.target.name]: e.target.value.split(",") })} placeholder='Category' className=' p-2 outline-0 rounded border w-full my-2' /></label>
          <label htmlFor="">Price<input type="text" name='price' onChange={(e) => setFields({ ...fields, [e.target.name]: e.target.value })} placeholder='Price' className=' p-2 outline-0 rounded border w-full my-2' /></label>
          <label htmlFor="">Rating<input type="text" name='rating' onChange={(e) => setFields({ ...fields, [e.target.name]: e.target.value })} placeholder='Rating' className=' p-2 outline-0 rounded border w-full my-2' /></label>
          <button className='p-2 bg-red-400 text-white block rounded my-2' onClick={() => handleMenuItem()}>Submit</button>
        </div>
        <div className='my-4'>
          <h1 className='text-2xl sm:text-4xl'>Menu Items</h1>
        </div>
        <table className='w-full text-center text-sm sm:text-md'>
          <thead>
            <tr className='border-b'>
              <th className='p-2 sm:px-4 py-2'>Id</th>
              <th className='p-2 sm:px-4 py-2'>Name</th>
              <th className='p-2 sm:px-4 py-2'>Image</th>
              <th className='p-2 sm:px-4 py-2'>Price</th>
              <th className='p-2 sm:px-4 py-2'>Rating</th>
              <th className='p-2 sm:px-4 py-2'>Buttons</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr className='border-b' key={item._id}>
                <td className='p-2 sm:px-4 py-2'>{item._id}</td>
                <td className='p-2 sm:px-4 py-2'>{item.dish}</td>
                <td className='p-2 sm:px-4 py-2'><img src={item.image} alt="dish" width="80px" /></td>
                <td className='p-2 sm:px-4 py-2'>{item.price}</td>
                <td className='p-2 sm:px-4 py-2'>{item.rating}</td>
                <td className='space-x-2'><i className="fa-solid fa-trash bg-red-400 text-white rounded p-2" onClick={() => deleteMenu(dispatch, item._id)}></i><Link to={`/updatemenuitem/${item._id}`}><i className="fa-solid fa-pen bg-blue-400 text-white rounded p-2"></i></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AddMenuItem
