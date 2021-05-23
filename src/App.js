import React from "react";
import { ToastProvider } from "react-toast-notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import UserStoreProvider from "./context/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import HospitalPage from "./pages/Hospital/HospitalPage";
import NavBar from "./components/NavBar";
import AboutePage from "./pages/AboutePage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import IndexPage from "./pages/Category/indexPage";
import ProductPage from "./pages/ProductPage";
import CreatePage from "./pages/Category/CreatePage";
import EditPage from "./pages/Category/EditPage";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MemberPage from "./pages/MemberPage";
import PrivateRoute from "./guard/auth";

//resux setup
import { Provider } from "react-redux";
// import { createStore } from "redux";

import CartPage from "./pages/CartPage";
// import rootReducer from "./redux/reducers/index";
// const store = createStore(rootReducer);

import configureStore from './redux/configureStore'
const {store} = configureStore();
const queryClient = new QueryClient();
function App() {
  return (
    <Provider store={store}>
      <UserStoreProvider>
        <ToastProvider
          placement="bottom-center"
          autoDismiss
          autoDismissTimeout={3 * 1000}
        >
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
                <Route path="/upload">
                  <UploadPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route path="/cart">
                  <CartPage />
                </Route>
                <PrivateRoute path="/member">
                  <MemberPage />
                </PrivateRoute>
                <Route
                  path="/category"
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} exact>
                        <IndexPage />
                      </Route>

                      <Route path={`${url}/create`}>
                        <CreatePage />
                      </Route>
                      <Route path={`${url}/edit/:id`}>
                        <EditPage />
                      </Route>
                    </>
                  )}
                ></Route>
              </Switch>
              <Footer />
            </Router>
          </QueryClientProvider>
        </ToastProvider>
      </UserStoreProvider>
    </Provider>
  );
}

export default App;
