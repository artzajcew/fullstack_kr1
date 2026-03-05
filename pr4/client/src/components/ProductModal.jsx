import React, { useEffect, useState } from "react";

export default function ProductModal({ open, mode, initialProduct, onClose, onSubmit }) {
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (!open) return;
    setName(initialProduct?.name ?? "");
    setCategory(initialProduct?.category ?? "");
    setDescription(initialProduct?.description ?? "");
    setPrice(initialProduct?.price ?? "");
    setStock(initialProduct?.stock ?? "");
  }, [open, initialProduct]);

  if (!open) return null;

  const title = mode === "edit" ? "Редактирование товара" : "Создание товара";

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed_name = name.trim();
    const trimmed_category = category.trim();
    const trimmed_description = description.trim();
    const trimmed_price = String(price).trim();  // ✅ число → строка → trim
  const trimmed_stock = String(stock).trim();

    if (!trimmed_name) {
      alert("Введите имя");
      return;
    }

    if (!trimmed_category) {
      alert("Введите категорию");
      return;
    }

    if (!trimmed_description) {
      alert("Введите описание");
      return;
    }

    if (!trimmed_price) {
      alert("Введите цену");
      return;
    }

    if (!trimmed_stock) {
      alert("Введите количество на складе");
      return;
    }

    onSubmit({
      id: initialProduct?.id,
      name: trimmed_name,
      category: trimmed_category,
      description: trimmed_description,
      price: trimmed_price,
      stock: trimmed_stock
    });
  };

  return (
    <div className="backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <button className="iconBtn" onClick={onClose} aria-label="Закрыть">
            ✕
          </button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Название
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, Стул из массива"
              autoFocus
            />
          </label>
          <label className="label">
            Категория
            <input
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Например, стулья"
            />
          </label>
          <label className="label">
            Описание
            <input
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Например, Красивый стул из дуба"
            />
          </label>
          <label className="label">
            Цена
            <input
              className="input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Например, 5000"
            />
          </label>
          <label className="label">
            Количество на складе
            <input
              className="input"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Например, 20 штук"
            />
          </label>
          <div className="modal__footer">
            <button type="button" className="btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              {mode === "edit" ? "Сохранить" : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}