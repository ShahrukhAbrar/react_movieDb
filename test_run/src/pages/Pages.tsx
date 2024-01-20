import Category from "./Category.tsx"
import Home from "./Home.tsx"
import {Routes, Route } from 'react-router-dom'

function Pages() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:type" element={<Category />} />
    </Routes>
  )
}

export default Pages