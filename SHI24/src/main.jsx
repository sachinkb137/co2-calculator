import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Signup } from './components/Signup.jsx'
import Login from './components/Login.jsx'
import CarbonFootprint from './components/Calculater/CarbonFootprint.jsx'
import Electricity from './components/Calculater/Electricity.jsx'
import Transpotation from './components/Calculater/Transpotation.jsx'
import CarbonCreditsCalculator from './components/Calculater/CarbonCreditsCalculator.jsx'
import AfforestationCalculator from './components/Calculater/AfforestationCalculator.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element: <CarbonFootprint />
      },
      {
        path: '/electricity',
        element: <Electricity />
      },
      {
        path: '/transportation',
        element: <Transpotation />
      },
      {
        path: "/carbon-credits",
        element: <CarbonCreditsCalculator />
      },
      {
        path: "carbon-sequestration",
        element: <AfforestationCalculator />
      }
    ]
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
