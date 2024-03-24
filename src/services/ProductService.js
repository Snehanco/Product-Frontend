import http from "../http-common";

const getAll = () => {
    return http.get("/products");
};

const get = id => {
    return http.get(`/products/${id}`);
};

const create = data => {
    return http.post("/products",data);
};

const update = (id,data) => {
    return http.put(`/products/{id}`,data);
};

const remove = id => { //id is the parameter which we will pass to delete Http endpoint
    return http.delete(`/products/${id}`);
};

const removeAll = () => {
    return http.delete("/products"); //if there is no String templating then we can give 
    //the http endpoint in double quotes or single quotes
};

const findByName = name => {
    return http.get(`/products?name=${name}`);
};

const ProductService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};

export default ProductService;