import React , {Fragment, useEffect} from 'react'
import './Profile.css';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import MetaData from '../MetaData';
import {Link} from 'react-router-dom';
import profile from '../../images/profile.png'; 

const Profile = ({ history }) => {

    const {user, isAuthenticated, loading} = useSelector((state)=> state.user);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={profile} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile