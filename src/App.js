import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Footer from './components/Footer'
import HospitalPage from './pages/Hospital/HospitalPage'
import NavBar from './components/NavBar'
import AboutePage from './pages/AboutePage'
import DetailPage from './pages/DetailPage'
import HomePage from './pages/HomePage'
import IndexPage from './pages/Category/indexPage'
import ProductPage from './pages/ProductPage'
import CreatePage from './pages/Category/CreatePage'
import EditPage from './pages/Category/EditPage'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
        <Route path="/detail/:id/title/:title">
          <DetailPage />
        </Route>
        <Route path="/hospital">
          <HospitalPage />
        </Route>
        <Route path="/category"
          render={({match : {url}}) => (
            <>
            <Route path={`${url}/`} exact>
              <IndexPage />
            </Route>

            <Route path={`${url}/create`} >
              <CreatePage />
            </Route>
            <Route path={`${url}/edit/:id`} >
              <EditPage />
            </Route>
            </>
          )}
        >
        
        </Route>
      </Switch>
    <Footer />
    </Router>
    </QueryClientProvider>
  );
}

export default App;
