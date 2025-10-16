import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainComponent from './MainComponent'
import Error from "./Error/Error"
import "./App.css"

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainComponent />
    },
    {
      path: '*',
      element: <Error />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
