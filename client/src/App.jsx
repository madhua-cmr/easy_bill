import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import CustomersPage from './Pages/CustomersPage'
import CustomerBillsPage from './Pages/CustomerBillsPage'
import BillPage from './Pages/BillPage'
import ReportPage from './Pages/ReportPage'
import AddBillPage from './Pages/AddBillPage'
import Header from './Components/Header'
import AddCustomer from './Pages/AddCustomer'

import AddProduct from './Pages/AddProduct'
import LoginPage from './Components/LoginPage'
import SignupPage from './Components/SignupPage'
import  { AppContext } from './Context/AppContextProvider'
import {Toaster} from "react-hot-toast"
import { useContext } from 'react'

function App() {
const{user,isadmin}=useContext(AppContext)
  return (
  <BrowserRouter>

  <Header/>
  <div><Toaster position='top-center' reverseOrder={false}/></div>
  <Routes>

   <Route path="/" element={<HomePage/>}/>
   <Route path="/add"element={user&&isadmin?<AddBillPage/>:<Navigate to ="/"/>} />
   <Route path="/customers" element={user?<CustomersPage/>:<Navigate to="/"/>}/>
   <Route path="/:custid/bills" element={user?<CustomerBillsPage/>:<Navigate to="/"/>}/>
   <Route path="/customer/bill/:id" element={user?<BillPage/>:<Navigate to="/"/>}/>
   <Route path="/report" element={user?<ReportPage/>:<Navigate to="/"/>}/>
    <Route path="/add-customer" element={user&&isadmin?<AddCustomer/>:<Navigate to="/"/>}/>
    <Route path="/add-product" element={user&&isadmin?<AddProduct/>:<Navigate to="/"/>}/>
    <Route path="/signup" element={<SignupPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>

  </Routes>
 
    </BrowserRouter>
  )
}

export default App
