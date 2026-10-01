import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProductForm({ initialData, onSubmit, isEdit }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (initialData) {
      setProduct({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price !== undefined ? initialData.price : ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!product.name.trim() || product.price === '') {
      alert('Name and price are required.')
      return
    }

    try {
      setLoading(true)
      const payload = {
        name: product.name.trim(),
        description: product.description.trim(),
        price: parseFloat(product.price)
      }
      await onSubmit(payload)
      navigate('/')
    } catch (err) {
      console.error('Error saving product:', err)
      alert('Error saving product: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3">
        <h5 className="mb-0 text-primary">
          {isEdit ? 'Edit Product' : ' Add New Product'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Product Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={product.description}
              onChange={handleChange}
              placeholder="add description"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Price <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
              )}
              {isEdit ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm