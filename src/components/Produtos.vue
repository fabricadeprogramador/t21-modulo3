<template>
  <div>
    <div style="padding:10px">
      <v-btn color="info" v-if="!mostrarForm" @click="exibirForm">Novo Produto</v-btn>
    </div>

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
        <td class="text-xs-left">{{ props.item.descricao }}</td>
        <td class="text-xs-left">{{ props.item.valor }}</td>
        <td class="text-xs-left">
          <img style="width:80px;height:80px;overflow:hidden" :src="props.item.foto">
        </td>
        <td>
          <v-flex>

            <!-- <v-layout row justify-center>
              <v-dialog v-model="dialog" persistent max-width="290">
                <v-btn slot="activator" flat icon color="red">
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-card>
                  <v-card-title class="headline">Shopping HT:</v-card-title>
                  <v-card-text>Tem certeza que deseja excluir este produto {{ props.index }}?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="confirmarExclusao(false, props.item)">Não</v-btn>
                    <v-btn color="green darken-1" flat @click="confirmarExclusao(true, props.item)">Sim</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout> -->

            <v-btn flat icon color="red">
              <v-icon @click="deletarProduto(props.item)">delete</v-icon>
            </v-btn>
            <v-btn flat icon color="blue">
              <v-icon>edit</v-icon>
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
          console.log(produtos);
          this.produtos = produtos;
        });
      },

      submit() {

        if (this.$refs.form.validate()) {
          API.adicionarProduto(this.produto)
            .then(response => {
              this.clear()
              this.load()
            });
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
            if (response)
              this.load()
          });
      },

      confirmarExclusao(flag, produto) {
        console.log(flag);
        console.log(produto);
        
        if (flag) {
          this.deletarProduto(produto);
        }
        this.dialog = false;
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
