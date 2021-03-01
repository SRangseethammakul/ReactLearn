import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import AboutePage from './pages/AboutePage'
import DetailPage from './pages/DetailPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
function App() {
  return (
    <Router>
    <NavBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/about">
          <AboutePage />
        </Route>
        <Route path="/product">
          <ProductPage />
        </Route>
        <Route path="/detail">
          <DetailPage />
        </Route>
      </Switch>
    <Footer />
    </Router>
  );
}

export default App;
