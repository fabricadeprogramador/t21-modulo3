const API_URL = "http://localhost:5000/";
import axios from 'axios';

export default {

  //PRODUTOS

  getProdutos() {
    return fetch(API_URL + "produtos")
      .then(response => response.json())
  },

  deletarProduto(produto) {
    console.log("Produto a excluir: " + produto);

    return axios.delete(API_URL + "produtos", {
        data: produto
      })
      .then(response => response.data)
  },

  adicionarProduto(produto) {
    return axios.post(API_URL + "produtos", produto)
      .then(response => response.data)
  },

  editarProduto(produto) {
    return axios.put(API_URL + "produtos", produto)
      .then(response => response.data)
  },

  //CLIENTES
  getClientes() {
    return fetch(API_URL + "cliente")
      .then(response => response.json())
  },

  // COMPRAS
  getCompras() {
    return fetch(API_URL + "compras")
      .then(response => response.json());
  }
};
