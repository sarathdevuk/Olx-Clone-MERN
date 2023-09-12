import axios from '../../axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './View.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Store/Context';

function View () {

  const {user,refresh,setRefresh}=useContext(AuthContext)
  const [product, setProduct] = useState('')
  const id = useParams()
  const imgURL='http://localhost:5000/uploads/'
  console.log(id.id);
  useEffect (()=>{
    axios.get('/viewProduct/' + id.id ) .then((response)=>{
      setProduct(response.data.product)

    })
  },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
         src={ product.image? imgURL+product.image.filename :''}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price} </p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <p>{product.description}</p>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{user.details? user.details.name: ''}</p>
          <p>{user.details? user.details.number : ''}</p>
      </div>
      <div style={{ marginTop:'30px' }}><Link to={'/'}><button onClick={()=>{setRefresh(!refresh)}} className='btn btn-dark'> Back</button></Link></div>
        </div>
    </div>
  )

}
export default View