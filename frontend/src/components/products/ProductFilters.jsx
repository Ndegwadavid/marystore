import { useState } from 'react'
import Button from '../ui/Button'

function ProductFilters({ onFilter }) {
  const [priceRange, setPriceRange] = useState('all')
  const [category, setCategory] = useState('all')
  
  const categories = [
    'All Categories',
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden'
  ]
  
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $25', value: '0-25' },
    { label: '$25 to $50', value: '25-50' },
    { label: '$50 to $100', value: '50-100' },
    { label: 'Over $100', value: '100-up' }
  ]
  
  const handleFilter = () => {
    onFilter?.({ priceRange, category })
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Price Range
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        
        <Button variant="primary" className="w-full" onClick={handleFilter}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

export default ProductFilters