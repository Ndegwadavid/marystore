import { Heart } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity"
        />
        <button 
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label="Add to favorites"
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          </div>
          <Badge variant="primary">${product.price}</Badge>
        </div>
        
        <div className="mt-4">
          <Button variant="primary" className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard