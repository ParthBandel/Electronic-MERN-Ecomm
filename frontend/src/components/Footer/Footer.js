import React from 'react';
import './Footer.css';
import {FaFacebook, FaInstagram, FaTwitter, FaPinterest} from 'react-icons/fa'
const Footer = () => {
  return (
    <div className='footer'>
    <div className='social'>
        <FaFacebook className='icon' />
        <FaInstagram className='icon' />
        <FaTwitter className='icon' />
        <FaPinterest className='icon' />
    </div>
    <div className='container'>
        <div className='col'>
            <h3>About</h3>
        </div>
        <div className='col'>
            <h3>Company</h3>
        </div>
        <div className='col'>
            <h3>Legal</h3>
        </div>
        <div className='col'>
            <h3>Information</h3>
        </div>
    </div>
</div>
  )
}

export default Footer