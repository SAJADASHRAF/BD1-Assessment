const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

//Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1


app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = newItemPrice + cartTotal;
  res.send(totalCartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let result;
  if(isMember === 'true') {
    result = cartTotal - (discountPercentage * cartTotal) / 100;
  } else {
    result = cartTotal;
  }
  res.send(result.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let calculatedTax = (cartTotal * taxRate) / 100;
  res.send(calculatedTax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let result;
  if(shippingMethod === 'standard') {
    result = distance / 50;
  } else {
    result = distance / 100;
  }
  res.send(result.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let totalShippingCost = weight * distance * 0.1;
  res.send(totalShippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let calculatedLoyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(calculatedLoyaltyPoints.toString());
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});