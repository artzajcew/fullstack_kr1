import React from "react";
import ProductItem from "./ProductItem";

export default function ProductsList({ products, onEdit, onDelete }) {  // users → products
  if (!products || products.length === 0) {  // users → products
    return <div className="empty">Нет данных</div>;
  }
  
  return (
    <div className="list">
      {products.map(product => (  // users → products
        <ProductItem 
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}