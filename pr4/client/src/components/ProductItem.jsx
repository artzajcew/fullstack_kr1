import React from "react";

export default function ProductItem({ product, onEdit, onDelete }) {
  if (!product) return null;
  
  return (
    <div className="productRow">  {/* userRow → productRow */}
      <div className="productMain">  {/* userMain → productMain */}
        <div className="photo"><img src="вфцв" alt="Фото"></img></div>
        <div className="productName">{product.name}</div>  {/* ✅ product.name */}
        <div className="productCategory">Категория: {product.category}</div>  {/* userAge → productCategory */}
        <div className="productDescription">{product.description}</div>  {/* добавить класс */}
        <div className="productPrice">{product.price} ₽</div>  {/* добавить класс */}
        <div className="productStock">В наличии: {product.stock}</div>  {/* добавить класс */}
      </div>
      <div className="productActions">  {/* userActions → productActions */}
        <button className="btn" onClick={() => onEdit(product)}>
          Редактировать
        </button>
        <button className="btn btn--danger" onClick={() => onDelete(product.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}