const express = require("express");
const { nanoid } = require("nanoid");
const cors = require("cors");

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API управления товарами',
      version: '1.0.0',
      description: 'API для интернет-магазина мебели',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Локальный сервер',
      },
    ],
  },
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный уникальный ID товара
 *           example: "abc123"
 *         name:
 *           type: string
 *           description: Название товара
 *           example: "Стул из дуба"
 *         category:
 *           type: string
 *           description: Категория товара
 *           example: "Стулья"
 *         description:
 *           type: string
 *           description: Описание товара
 *           example: "Красивый стул из массива дуба с мягким сиденьем"
 *         price:
 *           type: number
 *           description: Цена товара
 *           example: 7500
 *         stock:
 *           type: number
 *           description: Количество на складе
 *           example: 12
 */

// Данные
let products = [
  { 
    id: nanoid(6), 
    name: "Стул из дуба", 
    category: "Стулья", 
    description: "Красивый стул из массива дуба с мягким сиденьем", 
    price: 7500, 
    stock: 12 
  },
  { 
    id: nanoid(6), 
    name: "Стул из сосны", 
    category: "Стулья", 
    description: "Легкий и прочный стул из сосны, идеально для кухни", 
    price: 3500, 
    stock: 25 
  },
  { 
    id: nanoid(6), 
    name: "Барный стул", 
    category: "Стулья", 
    description: "Высокий стул для барной стойки, регулируемый", 
    price: 5200, 
    stock: 8 
  },
  { 
    id: nanoid(6), 
    name: "Стол обеденный", 
    category: "Столы", 
    description: "Большой обеденный стол на 6 персон из дуба", 
    price: 18500, 
    stock: 5 
  },
  { 
    id: nanoid(6), 
    name: "Стол письменный", 
    category: "Столы", 
    description: "Удобный письменный стол с ящиками", 
    price: 12300, 
    stock: 7 
  },
  { 
    id: nanoid(6), 
    name: "Журнальный столик", 
    category: "Столы", 
    description: "Стеклянный журнальный столик на колесиках", 
    price: 8900, 
    stock: 10 
  },
  { 
    id: nanoid(6), 
    name: "Шкаф купе", 
    category: "Шкафы", 
    description: "Трехдверный шкаф-купе с зеркалом", 
    price: 45000, 
    stock: 3 
  },
  { 
    id: nanoid(6), 
    name: "Шкаф для одежды", 
    category: "Шкафы", 
    description: "Двухдверный шкаф с полками и штангой", 
    price: 28700, 
    stock: 6 
  },
  { 
    id: nanoid(6), 
    name: "Шкаф угловой", 
    category: "Шкафы", 
    description: "Угловой шкаф для экономии пространства", 
    price: 35600, 
    stock: 4 
  },
  { 
    id: nanoid(6), 
    name: "Тумба под ТВ", 
    category: "Тумбы", 
    description: "Современная тумба под телевизор с ящиками", 
    price: 12700, 
    stock: 9 
  },
  { 
    id: nanoid(6), 
    name: "Кровать двуспальная", 
    category: "Кровати", 
    description: "Двуспальная кровать с ортопедическим основанием", 
    price: 32000, 
    stock: 4 
  },
  { 
    id: nanoid(6), 
    name: "Комод", 
    category: "Комоды", 
    description: "Комод с 4 выдвижными ящиками", 
    price: 15600, 
    stock: 11 
  }
];

// Middleware
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Middleware для логирования
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`[${new Date().toISOString()}] [${req.method}] ${res.statusCode} ${req.path}`);
    if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
      console.log("Body:", req.body);
    }
  });
  next();
});

// Вспомогательная функция
function findProductOr404(id, res) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return null;
  }
  return product;
}

// ==================== МАРШРУТЫ ====================

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Возвращает список всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get("/api/products", (req, res) => {
  res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получает товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = findProductOr404(id, res);
  if (!product) return;
  res.json(product);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создает новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Стул из дуба"
 *               category:
 *                 type: string
 *                 example: "Стулья"
 *               description:
 *                 type: string
 *                 example: "Красивый стул из массива дуба"
 *               price:
 *                 type: number
 *                 example: 7500
 *               stock:
 *                 type: number
 *                 example: 12
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка в теле запроса
 */
app.post("/api/products", (req, res) => {
  const { name, category, description, price, stock } = req.body;
  
  if (!name || !category || !price) {
    return res.status(400).json({ error: "Name, category and price are required" });
  }
  
  const newProduct = {
    id: nanoid(6),
    name: name.trim(),
    category: category.trim(),
    description: description ? description.trim() : "",
    price: Number(price),
    stock: stock ? Number(stock) : 0
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновляет данные товара
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Стул дубовый"
 *               category:
 *                 type: string
 *                 example: "Стулья"
 *               description:
 *                 type: string
 *                 example: "Новое описание"
 *               price:
 *                 type: number
 *                 example: 8000
 *               stock:
 *                 type: number
 *                 example: 15
 *     responses:
 *       200:
 *         description: Обновленный товар
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Нет данных для обновления
 *       404:
 *         description: Товар не найден
 */
app.patch("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const product = findProductOr404(id, res);
  if (!product) return;
  
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Nothing to update" });
  }
  
  const { name, category, description, price, stock } = req.body;
  
  if (name !== undefined) product.name = name.trim();
  if (category !== undefined) product.category = category.trim();
  if (description !== undefined) product.description = description.trim();
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  
  res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удаляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       204:
 *         description: Товар успешно удален (нет тела ответа)
 *       404:
 *         description: Товар не найден
 */
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  
  const exists = products.some(p => p.id === id);
  
  if (!exists) {
    return res.status(404).json({ error: "Product not found" });
  }
  
  products = products.filter(p => p.id !== id);
  res.status(204).send();
});

// 404 для всех остальных маршрутов
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`✅ Сервер запущен на http://localhost:${port}`);
  console.log(`📚 Документация Swagger: http://localhost:${port}/api-docs`);
  console.log(`📦 Товаров в базе: ${products.length}`);
});