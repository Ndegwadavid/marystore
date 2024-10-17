import { useState, useEffect } from 'react'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilters from '../components/products/ProductFilters'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Temporary dummy data - we'll replace this with API calls later
  useEffect(() => {
    const dummyProducts = [
      {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: "99.99",
        image: "/api/placeholder/300/300"
      },
      {
        id: 2,
        name: "Cotton T-Shirt",
        category: "Clothing",
        price: "24.99",
        image: "/api/placeholder/300/300"
      },
      {
        id: 3,
        name: "Smart Watch",
        category: "Electronics",
        price: "199.99",
        image: "/api/placeholder/300/300"
      },
      {
        id: 4,
        name: "Running Shoes",
        category: "Clothing",
        price: "79.99",
        image: "/api/placeholder/300/300"
      }
    ]
    
    // Simulate API call
    setTimeout(() => {
      setProducts(dummyProducts)
      setLoading(false)
    }, 1000)
  }, [])
  
  const handleFilter = (filters) => {
    console.log('Applying filters:', filters)
    // We'll implement actual filtering logic later with the API
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Loading products...</div>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to MaryStore</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters onFilter={handleFilter} />
        </div>
        
        <div className="lg:col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}

export default HomePage