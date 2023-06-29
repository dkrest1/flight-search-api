import React from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center bg-white w-[28%] px-8 pt-10 pb-5 rounded-md'>
            <h3 className='font-medium '>Welcome back</h3>
            <p className='text-[10px] text-slate-500'>Login your account to continue</p>
            <form className='w-full'>
                <div className='flex flex-col mt-2'>
                    <label htmlFor='email' className='text-sm text-slate-400'>Email</label>
                    <input
                        className='text-sm  border-t border-x border-b-2 border-b-slate-300 rounded-lg shadow-lg py-2 px-1'
                        type='email'
                        placeholder='Johndoe123@gmail.com'
                        required
                    />
                </div>
                <div className='flex flex-col mt-2'>
                    <label htmlFor='password' className='text-sm text-slate-400'>Password</label>
                    <input
                        className='text-sm  border-t border-x border-b-2 border-b-slate-300 rounded-lg shadow-lg py-2 px-1'
                        type='password'
                        placeholder='Johndoe123@gmail.com'
                        required
                    />
                </div>
                <p className='text-sm mt-3 text-right'>
                    <Link to='#' className='text-blue-600'>Forgot Password</Link>
                </p>
                <button className='bg-blue-950 w-full mt-3 text-center text-white font-medium text-sm py-2 border-t border-x border-b-2 border-b-slate-300 rounded-md shadow-lg px-1'>Sign Up</button>
            </form>
            <div className='flex flex-row w-full gap-2 items-center mt-3'>
                <div className='border border-gray-200 h-[2px] w-full'></div>
                <p className='text-sm'>OR</p>
                <div className='border border-gray-200 w-full'></div>
            </div>
            <button className='w-full text-sm mt-5 border-t border-x border-b-2 border-b-slate-300 rounded-lg shadow-lg py-2 px-1'><i className='fab fa-google text-red-600 '></i> Sign in with Google
            </button>
            <p className='text-sm mt-3 text-slate-600 font-medium'> Don't have an account? <Link to='/login' className='text-blue-600 '>Sign Up</Link></p>
        </div>
    </div>
  )
}

export default Login