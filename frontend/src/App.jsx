import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          {/* We'll add more routes later */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App