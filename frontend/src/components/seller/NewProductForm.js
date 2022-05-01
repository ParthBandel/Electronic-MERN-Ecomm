import React, {useEffect, useRef, useState} from 'react';
import './NewProduct.css';
import { createProduct , clearError} from '../../actions/productAction';
import {useDispatch, useSelector} from 'react-redux';
import {NEW_PRODUCT_RESET} from '../../constants/productConstants'
import { useHistory } from 'react-router-dom';
import {useAlert} from 'react-alert';


const NewProductForm = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setcountInStock] = useState(0);
    const [images, setImages] = useState();
    const [imagePreview, setimagePreview] = useState();

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError());
        }
        if (success) {
            alert.success("Product successfully created");
            dispatch({ type: NEW_PRODUCT_RESET });
            history.push("/products");
          }
        }, [dispatch, error, history, success, alert]);

    const submitHandler = (e) =>{
        e.preventDefault();
        console.log(name);
        dispatch(createProduct({
            name: name,
            price: price,
            description: description, 
            countInStock: countInStock,
            category: category, 
            images: images,
        })); 
    } 
    const createProductImage = (e) => { 
        if(e.target.name === "images"){
            const reader = new FileReader();
            reader.onload = () =>{
                if(reader.readyState === 2){
                    setImages(reader.result);
                }
            };
            console.log(reader);
            reader.readAsDataURL(e.target.files[0]);  
            console.log(reader);
        }
    };
    const categories = ["Please Select","IOT","Home Appliances","Books", "Furniture"];

  return(
      <div className="card">
          <form className="form" onSubmit={submitHandler}>
              <div className="control">
                  <label htmlFor="name">Product Name: </label>
                  <input type="text" required className="name" name="name" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="control">
                  <label htmlFor="description">Product Description: </label>
                  <textarea className="description" name="description" required cols="30" rows="3"  placeholder="Product Description" value={description} 
                  onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div className="control">
                  <label htmlFor="price">Product Price: </label>
                  <input type="number" required className="price" name="price" placeholder="Product Price" 
                   onChange={(e) => setPrice(e.target.value)}/>
              </div>
              <div className="control">
                  <label htmlFor="category">Product Category: </label>
                  <select name="category" placeholder="Product Category" 
                  onChange={(e) => setCategory(e.target.value)}>
                      {categories.map((cate) => (
                          <option key={cate} value={cate}>{cate}</option>
                      ))}
                  </select>
              </div>
              <div className="control">
                  <label htmlFor="items">Number of Items: </label>
                  <input type="number" name="countInStock" required className="CountInStock" placeholder="No. of Items" onChange={(e) => setcountInStock(e.target.value)}/>
              </div>
              <div className="control">
                  <label htmlFor="image">Product Image file: </label>
                  <input type="file" required name="images" className="images" accept="image/*" 
                  placeholder="Product Image" onChange={createProductImage}/>
              </div>
              <div className="actions">
                  <button>Add Product</button>
              </div>
          </form>
      </div>
  );
};

export default NewProductForm;