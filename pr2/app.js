const express = require('express');
const app = express();
const port = 3000;

let Products = [
    {id: 1, name: "стул", price:5000},
    {id: 2, name: "стол", price:10000},
    {id: 3, name: "шкаф", price:20000}
]

app.use(express.json());

app.get('/'
, (req, res) => {
res.send('Мебельный магазин!');
});

app.post('/Products', (req, res) => {
    const { name, price } = req.body;

    const newProduct = {
        id: Date.now(),
        name,
        price
    };

    Products.push(newProduct);
    res.status(201).json(newProduct);
});

app.get('/Products', (req, res) => {
    res.json(Products);
})

app.get('/Products/:id', (req, res) => {
    let product = Products.find(item => item.id == req.params.id);
    res.send(JSON.stringify(product));
})

app.patch('/Products/:id', (req, res) => {
    const product = Products.find(item => item.id == req.params.id);
    const { name, price } = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;

    res.json(product);
});

app.delete('/Products/:id', (req, res) => {
    Products = Products.filter(item => item.id != req.params.id);
    res.sendStatus(200);
});

app.listen(port, () => {
console.log(`Сервер запущен на http://localhost:${port}`);
});