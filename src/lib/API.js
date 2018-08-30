const API_URL = "http://localhost:5000/";
import axios from 'axios';

export default {

  //PRODUTOS

  getProdutos() {
    return fetch(API_URL + "produtos")
      .then(response => response.json())
  },

  deletarProduto(produto) {

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
  },

  // ESTABELECIMENTOS
  getEstabelecimentos() {
    return fetch(API_URL + "estabelecimento")
      .then(response => response.json());
  },

  adicionarEstabelecimento(estabelecimento) {
    return axios.post(API_URL + "estabelecimento", estabelecimento)
      .then(response => response.data)
  },

  deletarEstabelecimento(estabelecimento) {
    
    return axios.delete(API_URL + "estabelecimento", {
        data: estabelecimento
      })
      .then(response => response.data)
  },

  editarEstabelecimento(estabelecimento) {
    return axios.put(API_URL + "estabelecimento", estabelecimento)
      .then(response => response.data)
  },

  //USUÁRIOS

  getUsuarios() {
    return fetch(API_URL + "usuarios")
      .then(response => response.json())
  },

  adicionarUsuario(usuario) {
    return axios.post(API_URL + "usuarios", usuario)
      .then(response => response.data)
  },

  editarUsuario(usuario) {
    return axios.put(API_URL + "usuarios", usuario)
      .then(response => response.data)
  },

  deletarUsuario(usuario) {
    
    return axios.delete(API_URL + "usuarios", {
        data: usuario
      })
      .then(response => response.data)
  },

};
