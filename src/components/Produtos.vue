<template>
  <div>
    <v-btn color="info" v-if="!mostrarForm" @click="exibirForm">Novo Produto</v-btn>

    <v-form ref="form" v-if="mostrarForm" v-model="valid" lazy-validation>
      <v-text-field v-model="produto.nome" :rules="nomeRules" :counter="30" label="Nome" required></v-text-field>
      <v-text-field v-model="produto.descricao" label="Descrição" required></v-text-field>
      <v-text-field v-model="produto.valor" label="Valor" required></v-text-field>
      <v-text-field v-model="produto.foto" label="Foto" required></v-text-field>

      <v-btn :disabled="!valid" @click="submit">
        salvar
      </v-btn>
      <v-btn @click="clear">cancelar</v-btn>
    </v-form>

    <v-data-table :headers="headers" :items="produtos" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nome }}</td>
        <td class="text-xs-right">{{ props.item.descricao }}</td>
        <td class="text-xs-right">{{ props.item.valor }}</td>
        <td class="text-xs-right">
          <img style="width:80px;height:80px;overflow:hidden" :src="props.item.foto">
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import API from '@/lib/API';
  export default {

    mounted() {
      this.load();
    },

    methods: {
      load() {
        API.getProdutos().then(produtos => {
          console.log(produtos);
          this.produtos = produtos;
        });
      },

      submit() {

        if (this.$refs.form.validate()) {
            API.adicionarProduto(this.produto);
        }
      },
      
      clear() {
        this.$refs.form.reset()
        this.exibirForm();
      },

      exibirForm(){
        this.mostrarForm = !this.mostrarForm;
      }
    },

    data() {
      return {
        produto:{},
        mostrarForm: false,
        headers: [{
            text: 'Nome',
            value: 'nome'
          },
          {
            text: 'Descrição',
            value: 'descricao'
          },
          {
            text: 'Valor',
            value: 'valor'
          },
          {
            text: 'Imagem',
            value: 'foto'
          }
        ],
        produtos: [],
        valid: true,
        nomeRules: [
          v => !!v || 'Nome é Obrigatório!',
          v => (v && v.length <= 30) || 'Nome deve ter no máximo 30 characters!'
        ]
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
