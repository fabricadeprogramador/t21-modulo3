const API_URL = "http://localhost:5000/produtos";
import axios from 'axios';

export default{

    getProdutos(){
        return fetch(API_URL)
        .then(response => response.json())
    },

    adicionarProduto(produto){
        axios.post(API_URL, produto)
        .then( produto => response.json(produto))
    }
};
