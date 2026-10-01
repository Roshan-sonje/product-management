import ProductForm from '../components/ProductForm'
import { createProduct } from '../api/productApi'

function AddProduct() {
  const handleSubmit = async (productData) => {
    await createProduct(productData)
  }

  return <ProductForm onSubmit={handleSubmit} isEdit={false} />
}

export default AddProduct