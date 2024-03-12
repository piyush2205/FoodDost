
import './App.css';
import "./index.css"
import Navbar from './components/Navbar';
import React from 'react';


import AllRouter from './Router/AllRouter';
import Footer from './components/Footer';
import myanimation from "./Assets/Animation.gif"

function App() {

  const [loading, setLoading] = React.useState("true")



  setTimeout(() => {
    setLoading(false)
  }, 1000)



  return loading ? <>
    <img style={{ "margin": "300px 650px", height: "100px" }} src={`${myanimation}`} />
  </> : (
    <>

      <Navbar />

      <AllRouter />
      <Footer />
    </>

  )
}

export default App;
