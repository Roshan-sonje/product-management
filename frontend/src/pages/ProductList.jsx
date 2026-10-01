import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, deleteProduct } from '../api/productApi'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await getAllProducts()
      setProducts(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching products:', err)
      setError(
        'Failed to load products. Make sure the backend is running on port 8080.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        fetchProducts()
      } catch (err) {
        console.error('Error deleting product:', err)
        alert(
          'Could not delete product. ' +
            (err.response?.data?.message || err.message)
        )
      }
    }
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
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
        <h5 className="mb-0 text-primary">All Products</h5>
        <Link to="/add" className="btn btn-success btn-sm">
          Add Product
        </Link>
      </div>

      <div className="card-body p-0">
        {products.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p>No products found. Click "Add Product" to create one.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <strong>{product.name}</strong>
                    </td>
                    <td>
                      {product.description || (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>{Number(product.price).toFixed(2)}</td>
                    <td className="text-end">
                      <Link
                        to={`/edit/${product.id}`}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList