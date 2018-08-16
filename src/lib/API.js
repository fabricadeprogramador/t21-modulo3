const API_URL = "http://localhost:5000/produtos";
import axios from 'axios';

export default{

    getProdutos(){
        return fetch(API_URL)
        .then(response => response.json())
    },

    deletarProduto(produto){
        console.log("Produto a excluir: " + produto);
        
        return axios.delete(API_URL, { data: produto })
        .then(response => response.data)
    },
    
    adicionarProduto(produto){
        return axios.post(API_URL, produto)
        .then(response => response.data)
    }

    
};
