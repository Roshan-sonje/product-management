import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import { getProductById, updateProduct } from '../api/productApi'

function EditProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await getProductById(id)
        setProduct(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Product not found or server error.')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleSubmit = async (productData) => {
    await updateProduct(id, productData)
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>
  }

  return (
    <ProductForm
      initialData={product}
      onSubmit={handleSubmit}
      isEdit={true}
    />
  )
}

export default EditProduct