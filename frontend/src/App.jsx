import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProductList from './pages/ProductList.jsx'
import AddProduct from './pages/AddProduct.jsx'
import EditProduct from './pages/EditProduct.jsx'

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4 pb-5">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </>
  )
}

export default App