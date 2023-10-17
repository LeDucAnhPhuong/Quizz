import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Quizz from "./Quizz";
import Result from "./Result";
import Login from "./login";
const App = () => {
  const [isLogin, setLogin] = useState(
    JSON.parse(localStorage.getItem("isLogin") || 'false')
  );
  useEffect(() => {
    setLogin(JSON.parse(localStorage.getItem("isLogin") || 'false'));
  }, [localStorage.getItem("isLogin")]);
  console.log('isLogin', isLogin)
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Login />} />
        {isLogin ? (
          <>
            <Route path="/home" element={<Quizz />}></Route>
            <Route path="/result" element={<Result />}></Route>
          </>
        ) : null}
      </Routes>
    </div>
  );
};

export default App;
