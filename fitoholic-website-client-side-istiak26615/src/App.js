import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Banner from './Components/Banner/Banner';
import Footer from './Components/Footer/Footer';
import Products from './Components/Products/Products';
import HomeProduct from './Components/HomeProduct/HomeProduct';
import HomeProducts from './Components/HomeProducts/HomeProducts';
import Review from './Components/Review/Review';
import Blogs from './Components/Blogs/Blogs';
import Signup from './Components/Signup/Signup';
import PrivateRoute from './Private/PrivateRoute';
import Signin from './Components/Signin/Signin';
import AuthProvider from './Context/AuthProvider';
import UserPurchase from './Components/UserPurchase/UserPurchase';
import MyOrder from './Components/MyOrder/MyOrder';
import Pay from './Components/Pay/Pay';
import PostReview from './Components/PostReview/PostReview';
import MakeAdmin from './Components/MakeAdmin/MakeAdmin';
import ManageAllOrder from './Components/ManageAllOrder/ManageAllOrder';
import AddProduct from './Components/AddProduct/AddProduct';
import ManageProduct from './Components/ManageProduct/ManageProduct';


function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Header></Header>
        <Switch>
        <Route exact path="/">
          <Banner></Banner>
          <Products></Products>
          <Review></Review>
          <Blogs></Blogs>
          
        </Route>
        <Route exact path="/allProducts">
          <HomeProducts></HomeProducts>
        </Route>
        <Route exact path="/signup">
          <Signup></Signup>
        </Route>
        <Route exact path="/signin">
          <Signin></Signin>
        </Route>
        <PrivateRoute exact path="/makeAdmin">
          <MakeAdmin></MakeAdmin>
        </PrivateRoute>
        <PrivateRoute exact path="/manageAllOrder">
          <ManageAllOrder></ManageAllOrder>
        </PrivateRoute>
        <PrivateRoute exact path="/addProduct">
          <AddProduct></AddProduct>
        </PrivateRoute>
        <PrivateRoute exact path="/manageProduct">
          <ManageProduct></ManageProduct>
        </PrivateRoute>
        <PrivateRoute exact  path="/userPurchase/:id">
            <UserPurchase></UserPurchase>
          </PrivateRoute>
          <PrivateRoute exact path="/myorder">
            <MyOrder></MyOrder>
          </PrivateRoute>
          <PrivateRoute exact path="/pay">
            <Pay></Pay>
          </PrivateRoute>
          <PrivateRoute exact path="/review">
            <PostReview></PostReview>
          </PrivateRoute>
        </Switch>
        <Footer></Footer>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
