import React, { useState, useEffect } from "react";
import ProductsDataService from "../services/ProductService";
import { Link } from "react-router-dom";


const ProductsList = () => {

    const [products, setProduct] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveProducts();
    }, []);

    const retrieveProducts = () => {
        ProductsDataService.getAll().then(response => {
            setProduct(response.data);
            console.log(response.data);
        }).catch(e => {
            alert(e.message);
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveProducts();
        setCurrentProduct(null);
        setCurrentIndex(-1);
    }

    const setActiveProduct = (product, index) => {
        setCurrentProduct(product);
        setCurrentIndex(index);
    };

    const onChangeSearchTitle = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const findByName = () => {
        setCurrentProduct(null);
        ProductsDataService.searchByName(searchName).then((response) => {
            if (response.status === 200) {
                setProduct(response.data);
                console.log(response.data);
            } else {
                setProduct([]); // Clear product list if no products found
            }
        }).catch((e) => {
            console.log(e);
            setProduct([]); // Clear product list if error occurs
        });
    };
    
    

    const removeAllProducts = () => {
        ProductsDataService.removeAll().then((response) => {

            console.log(response.data);
            refreshList();
        }).catch((e) => {
            console.log(e)
        });
    };


    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text" className="form-control"
                        placeholders="Search by title"
                        value={searchName}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary" type="button" onClick={findByName}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <h4>Products List:</h4>
                <ul className="list-group">
                    {
                        products && products.map((product, index) => (
                            <li className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                                onClick={() => setActiveProduct(product, index)}
                                key={index}
                            >
                                {product.name}
                                
                            </li>
                        )
                        )}
                </ul>

                <button className="m-3 btn btn-sm btn-danger">
                    onClick={removeAllProducts}
                    Remove All
                </button>
            </div>

            <div className="col-md-6">
                {currentProduct ? (
                    <div>
                        <h4>Product</h4>
                        <div>
                            <img src = {currentProduct.imagepath} alt= "Not found"/>
                        </div>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentProduct.name}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentProduct.description}
                        </div>
                        <div>
                            <label>
                                <strong>Price:</strong>
                            </label>{" "}
                            {currentProduct.price}
                        </div>
                        <div>
                            <label>
                                <strong>Quantity:</strong>
                            </label>{" "}
                            {currentProduct.quantity}
                        </div>

                        <Link to={"/products" + currentProduct.id} className="badge badge-warning">
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on Product..</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsList;
