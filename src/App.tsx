import React from "react";
import logo from "./logo.svg";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <WelcomePage />
      <Footer />
    </div>
  );
}

export default App;
