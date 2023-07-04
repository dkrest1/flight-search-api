import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer = () => {
  return (
    <div className='border-t'>
        <div className='flex flex-row mt-12 text-xl gap-3 justify-center'>
            <i className="fab fa-facebook text-blue-900 "></i>
            <i className="fab fa-twitter text-blue-500 "></i>
            <i className="fab fa-linkedin text-blue-900"></i>
            <i className="fab fa-instagram text-red-600"></i>
        </div>
        <p className='text-center mt-6'>Copyright &copy; Travel 2023</p>
    </div>
  )
}

export default Footer