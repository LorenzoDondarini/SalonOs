"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../../components/productCard"

export default function MagazzinoPage() {

  const [products, setProducts] = useState([])

  useEffect(() => {

    axios
      .get("http://localhost:8000/products/salon/1")
      .then(res => {
        setProducts(res.data)
      })

  }, [])

  return (
    <div className="p-10">

      <h1 className="text-3xl font-semibold mb-8">
        Magazzino
      </h1>

      <div className="grid grid-cols-3 gap-4">

        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  )
}