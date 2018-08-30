<template>
  <div>
    <v-layout row>
      <v-flex xs12>

        <div style="padding:10px">
          <v-btn color="info" v-if="!mostrarForm" @click="novo">Novo Estabelecimento</v-btn>
        </div>

        <v-card>

          <v-list subheader>
            <v-list-tile v-for="estabelecimento in estabelecimentos" :key="estabelecimento._id">

              <v-list-tile-content>
                <v-list-tile-title v-html="estabelecimento.nome"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <!-- <v-icon :color="estabelecimento.active ? 'teal' : 'grey'">chat_bubble</v-icon> -->
                <v-flex xs12>
                  <v-btn flat icon color="red">
                    <v-icon @click="deletarEstabelecimento(estabelecimento)">delete</v-icon>
                  </v-btn>
                  <v-btn flat icon color="blue">
                    <v-icon @click="editarEstabelecimento(estabelecimento)">edit</v-icon>
                  </v-btn>
                </v-flex>


              </v-list-tile-action>
            </v-list-tile>
          </v-list>

        </v-card>

      </v-flex>
    </v-layout>

    <!-- Dialog -->
    <div class="text-xs-center">
      <v-dialog v-model="mostrarForm" width="500">

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Novo Estabelecimento
          </v-card-title>

          <!-- Formulário -->
          <v-form ref="form" style="padding:10px">
            <v-text-field v-model="estabelecimento.nome" label="Nome"></v-text-field>
            <v-text-field v-model="estabelecimento.endereco" label="Endereço"></v-text-field>
            <v-text-field v-model="estabelecimento.telefone" label="Telefone"></v-text-field>

            <v-layout wrap align-center>
              <v-flex xs10 sm6 d-flex>
                <v-select :items="produtos" item-text="nome" item-value="_id" v-model="produtoSelecionado"
                  return-object label="Produtos"></v-select>
              </v-flex>
              <v-btn fab dark small color="info" @click="adicionarProduto">
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-layout>

            <!-- Lista de Produtos -->
            <v-layout row>
              <v-flex xs12 sm6>
                <v-card v-if="estabelecimento.produtos">

                  <v-list subheader>
                    <v-list-tile v-for="produto in estabelecimento.produtos" :key="produto._id">
                      <v-list-tile-content>
                        <v-list-tile-title v-html="produto.nome"></v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-flex>
                          <v-btn flat icon color="red" style="float:right">

                            <v-icon @click="removerProduto(produto)">remove_circle_outline</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-list-tile-action>

                    </v-list-tile>
                  </v-list>

                </v-card>
              </v-flex>
            </v-layout>

            <v-spacer></v-spacer>

            <v-btn @click="salvarEstabelecimento">
              salvar
            </v-btn>
            <v-btn @click="cancelar">cancelar</v-btn>
          </v-form>

        </v-card>
      </v-dialog>
    </div>

  </div>

</template>

<script>
  import API from '@/lib/API';

  export default {
    mounted() {
      this.load();
      this.carregarProdutos();
    },

    methods: {

      salvarEstabelecimento() {
        if (this.estabelecimento._id) {
          API.editarEstabelecimento(this.estabelecimento)
            .then(resposta => {
              if (resposta == null) {
                this.alerta("Erro ao salvar edição do estabelecimento!", "error");
              } else {
                this.alerta("Estabelecimento salvo com Sucesso!", "success");
                this.estabelecimento = {};
                this.load();
              }
            })
        } else {
          API.adicionarEstabelecimento(this.estabelecimento)
            .then(resposta => {
              if (resposta == null) {
                this.alerta("Erro ao salvar estabelecimento!", "error");
              } else {
                this.alerta("Estabelecimento salvo com Sucesso!", "success");
                this.estabelecimento = {};
                this.load();
              }
            })
        }

        this.fecharForm();
      },

      deletarEstabelecimento(estabelecimento) {
        API.deletarEstabelecimento(estabelecimento)
          .then(response => {
            if (response == null) {
              this.alerta("Erro ao remover estabelecimento!", "error");
            } else {
              this.alerta("Estabelecimento removido com Sucesso!", "success");
              this.load();
            }
          })
      },

      editarEstabelecimento(estabelecimento) {
        this.estabelecimento = estabelecimento;
        this.exibirForm();
      },

      alerta(msg, type) {
        let msgObj = {
          msg: msg,
          type: type,
          value: true
        };

        this.$store.commit('CHANGE_MSG', msgObj);
      },

      cancelar() {
        this.estabelecimento = {};
        this.mostrarForm = false;
        this.estabelecimento = {}
      },

      adicionarProduto() {
        let tempEstabelecimento = this.estabelecimento;

        if (this.estabelecimento.produtos) {

          // Para recarregar o componente  
          this.estabelecimento = {}
          this.estabelecimento = tempEstabelecimento;

          // Para evitar duplicidade
          let duplicado = false;
          for (let i = 0; i < this.estabelecimento.produtos.length; i++) {
            if (this.estabelecimento.produtos[i].nome == this.produtoSelecionado.nome) {
              duplicado = true;
            }
          }
          if (!duplicado) {
            this.estabelecimento.produtos.push(this.produtoSelecionado);
          }
        } else {

          this.estabelecimento = {}
          this.estabelecimento = tempEstabelecimento;
          this.estabelecimento.produtos = [];
          this.estabelecimento.produtos.push(this.produtoSelecionado);
        }

        this.produtoSelecionado = {};

      },

      removerProduto(produto){
          for(let i = 0; i < this.estabelecimento.produtos.length; i++){
            if(this.estabelecimento.produtos[i].nome == produto.nome){
              this.estabelecimento.produtos.splice(i,1);
            }
          }
      },

      novo() {
        this.estabelecimento = {};
        this.exibirForm();
      },

      exibirForm() {
        this.mostrarForm = true;
      },

      fecharForm() {
        this.mostrarForm = false;
      },

      load() {
        API.getEstabelecimentos().then(estabelecimentos => {
          this.estabelecimentos = estabelecimentos;
        });
      },

      carregarProdutos() {

        if (Object.keys(this.estabelecimento).length === 0 && this.estabelecimento.constructor === Object) {

          API.getProdutos().then(produtos => {
            this.produtos = produtos;
          });


        } else {

          this.produtos = this.estabelecimento.produtos;
        }
      }

    },
    data() {
      return {
        estabelecimentos: [],
        estabelecimento: {},
        produtos: [],
        produtoSelecionado: {},
        mostrarForm: false
      }
    }
  }

</script>

<style>

</style>
