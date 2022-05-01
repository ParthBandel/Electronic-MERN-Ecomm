import React, {Fragment, useEffect} from 'react';
import './ProductList.css';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch} from 'react-redux';
import {getAdminProduct, clearError, deleteProduct} from '../../actions/productAction';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import MetaData from '../MetaData';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import {useAlert} from 'react-alert'


const ProductList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch(); 
    const {error, products } = useSelector(state => state.products);
    const {error: deleteError, isDeleted} = useSelector(state => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearError());
        }

        if(deleteError){
            alert.error(error); 
            dispatch(clearError());
        }

        if(isDeleted){
            alert.success("Succesfully Deleted");
            history.push("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminProduct());
    }, [dispatch, error, deleteError, isDeleted, history]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, width: 250},
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 100,
          width: 180,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          width: 170,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 270,
          width: 300,
        },
    
        {
          field: "actions",
          width: 200,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
    
      const rows = [];
    
      products &&
        products.forEach((item) => {
          rows.push({
            id: item._id,
            stock: item.countInStock,
            price: item.price,
            name: item.name,
          });
        });

  return (
    <Fragment>
        <MetaData title={`ALL PRODUCTS - Admin`}/>

        <div className='dashboard'>
            <SideBar />
            <div className='productListContainer'>
                <h1 id="productListHeading">ALL PRODUCTS</h1>

                <DataGrid 
                rows={rows}
                columns={columns} 
                pageSize={10}
                disableSelectionOnClick
                className='productListTable' 
                autoHeight 
                />
            </div>
        </div>
    </Fragment>
  )
}

export default ProductList