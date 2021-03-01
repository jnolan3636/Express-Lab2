const express = require("express");
const routes = express.Router();
const pool = require("./connection.js");



routes.get("/cart", (req, res) => {
  const maxPrice = parseInt(req.query.maxPrice);
  if (maxPrice) {
    pool
      .query("SELECT * FROM shopping_cart WHERE price <=$1;", [maxPrice])
      .then((results) => {
        res.json(results.rows);
      });
  }
  const prefix = req.query.prefix;
  if (prefix) {
    pool
      .query("SELECT * FROM shopping_cart WHERE product LIKE $1", [
        prefix + "%",
      ])
      .then((results) => {
        res.json(results.rows);
      });
  }
  const pageSize = parseInt(req.query.pageSize);
  if (pageSize) {
    pool
      .query("SELECT * FROM shopping_cart LIMIT $1", [pageSize])
      .then((results) => {
        res.json(results.rows);
      });
  } else {
    pool.query("SELECT * FROM shopping_cart").then((results) => {
      res.json(results.rows);
    });
  }
});

routes.get("/cart/:id", (req, res) => {
 
  const id = parseInt(req.params.id);
  console.log(id);
  pool
    .query("SELECT * FROM shopping_cart WHERE id= $1", [id])
    .then((results) => {
      // const id = results.rows;
      res.json(results.rows);
    });
});


  routes.post('/cart',(req, res) =>{
    const product = req.body.product;
    const price = req.body.price;
    const quantity = req.quantity.quantity;

pool.query('INSERT INTO shopping_cart (product, price, quantity) VALUES ($1, $2, $3) RETURNING *',[
 product,
     price,
     quantity
   ]).then((results)=>{
      
      res.json(results.rows);
   })});

   routes.put('/cart:id',(req, res)=>{
    const id = parseInt(req.params.id);
    pool.query('UPDATE shopping_cart SET product = $1, price = $2, quantity= $3) WHERE id = $1', [id]).then((results)=>{ 
    res.json(results.rows);
   
     })})
     routes.delete('/cart/:id',(req, res)=>{
      const id=req.params.id;
      pool.query("DELETE FROM shopping_cart WHERE id=$1", [id]).then( ()=>{
        res.status(204);
        res.json("Deleted");
      })
    })

module.exports = routes;
