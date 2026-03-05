import React, { useEffect, useState } from "react";
import "./UsersPage.scss";
import ProductsList from "../../components/ProductsList";  // ✅ переименовать
import ProductModal from "../../components/ProductModal";  // ✅ переименовать
import { api } from "../../api";

export default function ProductsPage() {  // ✅ переименовать страницу

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();  // ✅ getProducts
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Ошибка загрузки товаров");
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setModalMode("create");
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setModalMode("edit");
    setEditingProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Удалить товар?");
    if (!ok) return;
    try {
      await api.deleteProduct(id);  // ✅ deleteProduct
      setProducts((prev) => prev.filter((p) => p.id !== id));  // p вместо u
    } catch (err) {
      console.error(err);
      alert("Ошибка удаления товара");
    }
  };

  const handleSubmitModal = async (payload) => {
    try {
      if (modalMode === "create") {
        const newProduct = await api.createProduct(payload);  // ✅ createProduct
        setProducts((prev) => [...prev, newProduct]);
      } else {
        const updatedProduct = await api.updateProduct(payload.id, payload);  // ✅ updateProduct
        setProducts((prev) =>
          prev.map((p) => (p.id === payload.id ? updatedProduct : p)),  // p вместо u
        );
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Ошибка сохранения товара");
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header__inner">
          <div className="brand">Магазин мебели</div>
          <div className="header__right">React</div>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <div className="toolbar">
            <h1 className="title">Товары</h1>
            <button className="btn btn--primary" onClick={openCreate}>
              + Создать
            </button>
          </div>
          {loading ? (
            <div className="empty">Загрузка...</div>
          ) : (
            <ProductsList  // ✅ ProductsList
              products={products}  // ✅ products={products}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
      <footer className="footer">
        <div className="footer__inner">
          © {new Date().getFullYear()} Магазин мебели
        </div>
      </footer>
      <ProductModal  // ✅ ProductModal
        open={modalOpen}
        mode={modalMode}
        initialProduct={editingProduct}  // ✅ initialProduct
        onClose={closeModal}
        onSubmit={handleSubmitModal}
      />
    </div>
  );
}