import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainComponent from './MainComponent'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainComponent />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
