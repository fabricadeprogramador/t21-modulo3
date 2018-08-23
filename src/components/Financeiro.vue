<template>
  <v-container fluid grid-list-lg>
    <v-layout >

      <v-flex xs2>
            <v-btn
              v-if="exibir"
              @click="exibirBotaoAdd()"
              dark
              title="Adicionar despesa"
              color="blue">
              <v-icon>add</v-icon>
              Adicionar despesa
            </v-btn>

            <form v-if="!exibir">
              <v-text-field
                v-model="despesaInformada"
                label="Valor">
              </v-text-field>
              <v-btn @click="salvar()">Salvar</v-btn>
              <v-btn @click="exibirBotaoAdd()">Cancelar</v-btn>
            </form>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="compras"
          class="elevation-1">

          <template slot="items" slot-scope="props">
            <td>{{ props.item.cliente.nome }}</td>
            <td class="text-xs-left">{{ props.item.estabelecimento.nome }}</td>
            <td class="text-xs-left">{{ props.item.valor |
              currency("R$", "2", {
                thousandsSeparator: ".",
                decimalSeparator: ",",
                spaceBetweenAmountAndSymbol: true
              }) }}</td>
            <td class="text-xs-left">{{ props.item.data }}</td>
            <td>
              <v-btn flat title="Detalhes da compra">
                <v-icon>list</v-icon>
              </v-btn>
            </td>
          </template>

          <template slot="pageText" slot-scope="props">
            Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
          </template>
        </v-data-table>

        <v-toolbar
            slot="footer"
            color="white">
            <span style="font-size: 18px;">Receitas: {{ receitas |
              currency("R$", "2", {
                thousandsSeparator: ".",
                decimalSeparator: ",",
                spaceBetweenAmountAndSymbol: true
              }) }}</span>
          </v-toolbar>

        <v-toolbar
          slot="footer"
          color="white">
          <span style="font-size: 18px;">Despesas: {{ despesa |
            currency("R$", "2", {
                thousandsSeparator: ".",
                decimalSeparator: ",",
                spaceBetweenAmountAndSymbol: true
              }) }}</span>
        </v-toolbar>

        <v-toolbar
          slot="footer"
          color="white">
          <span style="font-size: 20px; font-weight: 600;">Saldo: {{ saldo |
            currency("R$", "2", {
                thousandsSeparator: ".",
                decimalSeparator: ",",
                spaceBetweenAmountAndSymbol: true
              }) }}</span>
          <v-alert
            class="text-xs  -left"
            :value="saldo < 0"
            color="error"
            icon="info"
            outline>
            Saldo está negativo!
          </v-alert>
        </v-toolbar>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import API from "../lib/API.js";
import DateFormatte from "../utils/DateFormatte.js";

export default {
  data() {
    return {
      exibir: true,

      valor: "",

      compras: [],

      despesaInformada: "",

      receitas: "",

      despesa: 0.0,

      saldo: 0.0,

      headers: [
        {
          text: "Cliente",
          align: "left",
          sortable: true,
          value: "cliente.nome"
        },
        {
          text: "Estabelecimento",
          align: "left",
          sortable: true,
          value: "estabelecimentp.nome"
        },
        {
          text: "Valor",
          align: "left",
          sortable: true,
          value: "valor"
        },
        {
          text: "Data da compra",
          align: "left",
          sortable: true,
          value: "data"
        },
        {
          text: "Opção",
          value: ""
        }
      ]
    };
  },

  methods: {
    exibirBotaoAdd() {
      this.exibir = !this.exibir;
    },

    salvar() {
      this.despesa = this.despesaInformada;
      this.calcularSaldo();
      this.exibirBotaoAdd();
    },

    calcularSaldo() {
      this.despesaInformada = "";

      this.calcularReceitas();
      this.saldo = this.receitas - this.despesa;
    },

    calcularReceitas() {
      this.receitas = 0.0;

      for (let c of this.compras) {
        this.receitas += c.valor;
      }
    },

    formatarData() {
      for (let i = 0; i < this.compras.length; i++) {
        this.compras[i].data = DateFormatte.getDateFormatter(
          this.compras[i].data
        );
      }
    }
  },

  beforeMount() {
    API.getCompras().then(response => {
      this.compras = response;
      this.formatarData();
      this.calcularSaldo();
    });
  }
};
</script>

<style>
</style>
