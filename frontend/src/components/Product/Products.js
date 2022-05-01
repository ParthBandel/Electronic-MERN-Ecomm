import React, {useEffect, Fragment, useState} from 'react'
import './Product.css'; 
import { useSelector, useDispatch} from 'react-redux';
import {clearError, getProduct} from '../../actions/productAction'; 
import Product from '../Home/Product'; 
import Loader from '../Loader/Loader';
import Pagination from 'react-js-pagination'; 
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from '../MetaData';   
import Header from '../Header/Header'; 


const Products = ({ match }) => {
    const dispatch = useDispatch(); 
    const alert = useAlert(); 

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
  
    const [ratings, setRatings] = useState(0);
    const categories = [
        "IOT", 
        "Student-used", 
        "New-Bought"
    ];
    const {
        products, 
        loading, error, productCount, resultPerPage, filteredProductsCount
     } = useSelector((state) => state.products); 

     const keyword = match.params.keyword; 

     const setCurrentPageNo = (e) =>{
         setCurrentPage(e);
     }

     const priceHandler = (event, newPrice) =>{
         setPrice(newPrice);
     }
     let count = filteredProductsCount; 

     useEffect(() => {
         if(error){
             alert.error(error); 
             dispatch(clearError());
         }

         dispatch(getProduct(keyword, currentPage, price, category, ratings));
     }, [dispatch, error, keyword, currentPage, price, category, ratings, alert]);

  return (
      <Fragment>
          {loading ? (
              <Loader />
          ) : (
              <Fragment>
                  <MetaData title="PRODUCTS ---ECOMMERCE"/>
                  <Header />
                  <h2 className='productsHeading'>Products</h2>

                  <div className='products'> 
                  <div className='container'>
                      {products && 
                      products.map((product) => (
                          <Product key={product._id} product={product}/>
                      ))}
                    </div>
                  </div> 
                  <div className='filterBox'>
                      <Typography>Price</Typography>
                      <Slider 
                      value={price}
                      onChange={priceHandler} 
                      valueLabelDisplay="auto"
                      aria-labelledby='range-slider'
                      min={0} 
                      max={25000}/>

                      <Typography>Categories</Typography>
                      <ul className='categoryBox'>
                          {categories.map((category) => (
                              <li 
                              className='category-link' 
                              key={category} 
                              onClick={() => setCategory(category)}>
                                  {category}
                              </li>
                          ))}
                      </ul>
                      <fieldset>
                          <Typography className='legend'>Ratings Above</Typography> 
                          <Slider 
                          value={ratings} 
                          onChange={(e, newRating) => {setRatings(newRating); }}
                          aria-labelledby="continous-slider" 
                          valueLabelDisplay='auto' 
                          min={0}
                          max={5}
                          />
                      </fieldset>
                  </div>
                  {resultPerPage < count && (
                      <div className='paginationBox'>
                          <Pagination 
                          activePage={currentPage} 
                          itemsCountPerPage={resultPerPage}
                          totalItemsCount={productCount} 
                          onChange={setCurrentPageNo} 
                          nextPageText="Next"
                          prevPageText="Prev" 
                          firstPageText="1st" 
                          lastPageText="Last" 
                          itemClass="page-item" 
                          linkClass="page-link"
                          activeClass="pageItemActive"
                          activeLinkClass="pageLinkActive"/>
                      </div>
                  )}
              </Fragment>
          )}
      </Fragment>
  );
};

export default Products