import React from "react";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ProductsList from "./components/ProductsList";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";

function App()
{
  return (
      <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/tutorials" className="navbar-brand">
                EY
              </a>
              <div className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link to={"/tutorials"} className="nav-link">
                        Tutorials
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/add"} className="nav-link">
                        Add
                      </Link>
                  </li>

              </div>
          </nav>

          <div className="container mt-3">
              <Routes>
                  <Route path="/" element={<ProductsList />} />
                  <Route path="/tutorials" element={<ProductsList />} />
                  <Route path="/add" element={<AddProduct />} />
                  <Route path="/tutorials/:id" element={<Product />} />
              </Routes>
          </div>
      </div>
  );
}

export default App;
