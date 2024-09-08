import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')

  const login = async (data) => {
    console.log(data);
    setError('')
    try {
      const session = await authService.login(data)
      console.log(session);
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          console.log('Login :: userData ->');
          console.log(userData);
          dispatch(authLogin(userData))
        }
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] bg-gradient-to-r from-sky-500 to-indigo-600 flex justify-center items-center'>
      <div className="h-3/4 w-96 relative flex flex-col p-7 rounded-2xl text-black bg-gradient-to-t from-cyan-50 from-20% via-cyan-100/95 via-97% to-white to-57% shadow-2xl shadow-black m-4">
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          Welcome back to{" "}
          <span className="text-[#7747ff]">
            XYZ
          </span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Log in to your account
        </div>
        {error && <p className="text-red-600 p-2 text-center">
          {error}
        </p>}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(login)}>
          <div className="block relative">
            <label
              htmlFor="email"
              className="block cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="rounded border border-gray-500 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Enter a valid email Addres",
                }
              })}
            />
          </div>
          <div className="block relative">
            <label
              htmlFor="password"
              className="block cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded border border-gray-500 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              {...register("password", {
                required: true,
              })}
            />

          </div>
          <div>
            <a className="text-sm text-[#7747ff]" href="#">
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-[#713dff] w-max m-auto px-6 py-2 text-white text-sm  border border-gray-900 border-b-4 font-medium overflow-hidden relative  rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
          >
            <span
              className="bg-cyan-900 shadow-green-700 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"
            ></span>
            Submit
          </button>

        </form>
        <div className="text-sm text-center mt-[1.6rem]">
          Don't have an account yet?
          <NavLink className="text-sm text-[#7747ff]" to="/signup">
            Sign up for free!
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login
