import React from 'react';

const defaultCurrencies = ['USD', 'EUR', 'UAH'];

export const Header = ({ rates, toCurrency, USD, EUR }) => (
  
  <div className="header">
    <ul>
      <li>$ = {USD} UAH </li>
      <li>€ = {EUR} UAH</li>
    </ul>
  </div>
);
