const API_URL = "http://localhost:5000/produtos";

export default{

    getProdutos(){
        return fetch(API_URL)
        .then(response => response.json())
    }
};
