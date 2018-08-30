<template>
  <div>
    <div style="padding:10px">
      <v-btn color="info" v-if="!mostrarForm" @click="exibirForm">Novo Produto</v-btn>
    </div>

    <v-dialog v-model="mostrarForm" width="500">

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Novo Produto
        </v-card-title>

        <!-- Formulario -->

        <v-form ref="form" v-if="mostrarForm" v-model="valid" lazy-validation style="padding:10px">
          <v-text-field v-model="produto.nome" :rules="nomeRules" :counter="30" label="Nome" required></v-text-field>
          <v-text-field v-model="produto.descricao" label="Descrição" required></v-text-field>
          <v-text-field v-model="produto.valor" label="Valor" required></v-text-field>
          <v-text-field v-model="produto.foto" label="Foto" required></v-text-field>

          <v-btn :disabled="!valid" @click="submit">
            salvar
          </v-btn>
          <v-btn @click="clear">cancelar</v-btn>
        </v-form>

      </v-card>
    </v-dialog>


    <v-data-table :headers="headers" :items="produtos" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nome }}</td>
        <td class="text-xs-left">{{ props.item.descricao }}</td>
        <td class="text-xs-left">R$ {{ (props.item.valor).toFixed(2) }}</td>
        <td class="text-xs-left">
          <img style="width:80px;height:80px;overflow:hidden" :src="props.item.foto">
        </td>
        <td>
          <v-flex>
            <v-btn flat icon color="red">
              <v-icon @click="deletarProduto(props.item)">delete</v-icon>
            </v-btn>
            <v-btn flat icon color="blue">
              <v-icon @click="editarProduto(props.item)">edit</v-icon>
            </v-btn>
          </v-flex>
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
          this.produtos = produtos;
        });
      },

      submit() {

        if (this.produto._id == null) {
          if (this.$refs.form.validate()) {
            API.adicionarProduto(this.produto)
              .then(response => {
                if (response) {
                  this.alerta("Produto salvo com Sucesso!", "success");
                } else {
                  this.alerta("Erro ao salvar produto!", "error");
                }
                this.clear()
                this.load()
              });
          }
        } else {
          if (this.$refs.form.validate()) {
            API.editarProduto(this.produto)
              .then(response => {
                if (response) {
                  this.alerta("Produto editado com Sucesso!", "success");
                } else {
                  this.alerta("Erro ao editar produto!", "error");
                }
                this.clear()
                this.load()
              });
          }
        }

      },

      clear() {
        this.$refs.form.reset()
        this.exibirForm();
      },

      exibirForm() {
        this.mostrarForm = !this.mostrarForm;
      },

      deletarProduto(produto) {
        console.log(produto);
        API.deletarProduto(produto)
          .then(response => {
            if (response) {
              this.alerta("Produto removido com Sucesso!", "success");
              this.load()
            } else {
              this.alerta("Erro ao remover produto!", "error");
            }
          });
      },

      editarProduto(produto) {
        this.produto = produto;
        this.mostrarForm = true;
      },

      confirmarExclusao(flag, produto) {
        console.log(flag);
        console.log(produto);

        if (flag) {
          this.deletarProduto(produto);
        }
        this.dialog = false;
      },

      alerta(msg, type) {
        let msgObj = {
          msg: msg,
          type: type,
          value: true
        };

        this.$store.commit('CHANGE_MSG', msgObj);
      }
    },

    data() {
      return {
        produto: {},
        dialog: false,
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
          },
          {
            text: 'Ações',
            value: ''
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
