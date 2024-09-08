import React, { useState } from 'react'
import './Signup.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'

export function Signup() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')

    const create = async (data) => {
        console.log(data);
        
        setError('')
        try {
            console.log('inside try');
            
            const userData = await authService.createAccount(data)

            console.log(userData);
            

            if (userData) {

                console.log('inside if');
                

                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login(currentUser))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex justify-center items-center h-[100vh] w-[100vw] bg-gradient-to-r from-sky-500 to-indigo-600/90'>
            <div className="flex justify-center h-4/6 w-96 text-wrap m-4">
                <div className="card bg-gradient-to-r from-gray-200 from-20% via-white via-70% to-gray-100 to-80% ">
                    <a className="singup">Sign Up</a>

                    <p>
                        Already have an account?&nbsp;
                        <NavLink
                            to='/login'
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </NavLink>
                    </p>

                    {error && <p className="text-red-600 p-2 text-center">{error}</p>}

                    <form onSubmit={handleSubmit(create)} className='flex flex-col gap-5'>

                        <div className="inputBox1">
                            <input
                                type="email"
                                required="required"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Enter a valid email Addres",
                                    }
                                })}
                            />
                            <span className="user">
                                Email
                            </span>
                        </div>

                        <div className="inputBox">
                            <input
                                type="text"
                                required="required"
                                {...register("name", {
                                    required: true
                                })}
                            />
                            <span>
                                Username
                            </span>
                        </div>

                        <div className="inputBox">
                            <input
                                type="password"
                                required="required"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            <span>
                                Password
                            </span>
                        </div>

                        <button className="enter" type='submit'>
                            Enter
                        </button>

                    </form>

                </div>
            </div>
        </div>
    )
}
