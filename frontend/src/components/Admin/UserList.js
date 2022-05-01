import React, {Fragment, useEffect} from 'react'
import './ProductList.css';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {getAllUsers, clearError, deleteUser} from '../../actions/userAction';
import {DELETE_USER_RESET} from '../../constants/userConstants';

const UserList = ({ history }) => {
    const dispatch = useDispatch(); 

    const {error, users} = useSelector((state) => state.allUsers);

    const {
        error: deleteError, 
        isDeleted, 
        message
    } = useSelector((state) => state.profile);
    
    const deleteUserHandler = (id) =>{
        dispatch(deleteUser(id));
    }

    useEffect(() => {
        if(error){
            console.log(error);
            dispatch(clearError());
        }

        if(deleteError) {
            console.log(error);
            dispatch(clearError());
        }

        if(isDeleted){
            console.log(message); 
            history.push("/admin/users");
            dispatch({type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers());
    }, [dispatch, error, deleteError, history, isDeleted, message]);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, width:250},
    
        {
          field: "email",
          headerName: "Email",
          minWidth: 200,
          width: 270
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          width: 200,
        },
    
        {
          field: "role",
          headerName: "Role",
          type: "boolean",
          minWidth: 150,
          width: 200,
          cellClassName: (params) => {
            return params.getValue(params.id, "role") === "true"
              ? "greenColor"
              : "redColor";
          },
        },
    
        {
          field: "actions",
          width: 170,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.getValue(params.id, "id"))
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
    
      users &&
        users.forEach((item) => {
          rows.push({
            id: item._id,
            role: item.isAdmin,
            email: item.email,
            name: item.name,
          });
        });
    
  return (
    <Fragment>
       <MetaData title={`ALL USERS - ADMIN`}/>
       <div className='dashboard'>
           <SideBar />
           <div className='productListContainer'>
               <DataGrid 
               rows={rows} 
               columns={columns} 
               pageSize={10} 
               disableSelectionOnClick 
               className='productListTable' 
               autoHeight/>
           </div>
       </div>
    </Fragment>
  )
}

export default UserList