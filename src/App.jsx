import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Quizz from "./Quizz"
import Result from './Result'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Quizz/>} ></Route>
        <Route path="/result" element={<Result/>} ></Route>
      </Routes>
    </div>
  )
}

export default App