import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, User } from 'lucide-react'

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            MaryStore
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/favorites" className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="h-6 w-6 text-gray-600" />
            </Link>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 bg-primary-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/account" className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-6 w-6 text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
