<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>

        <v-list subheader>

          <v-subheader>Clientes</v-subheader>

          <v-list-tile v-for="cliente in clientes" :key="cliente.nome" avatar>

            <v-list-tile-avatar>
              <img :src="cliente.foto">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="cliente.nome"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon @click="exibirDetalhes(cliente)">search</v-icon>
            </v-list-tile-action>

          </v-list-tile>
        </v-list>

      </v-card>

      <!-- Dialog -->
      <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Detalhes do Cliente
            </v-card-title>

            <v-card-text>
                <div>
                    <img :src="clienteSelecionado.foto" height="150px">
                </div>
                <div>
                    <div>
                        <label for="nome">Nome: </label>
                        <span id="nome">{{ clienteSelecionado.nome }}</span>
                    </div>
                      <div>
                        <label for="cpfCnpj">CPF/CNPJ: </label>
                        <span id="cpfCnpj">{{ clienteSelecionado.cpfCnpj }}</span>
                    </div>
                      <div>
                        <label for="pf">Pessoa Física? : </label>
                        <span id="pf">{{ clienteSelecionado.pf ? 'Sim' : 'Não' }}</span>
                    </div>
                      <div>
                        <label for="endereco">Endereço: </label>
                        <span id="endereco">{{ clienteSelecionado.endereco }}</span>
                    </div>
                      <div>
                        <label for="telefone">Telefone: </label>
                        <span id="telefone">{{ clienteSelecionado.telefone }}</span>
                    </div>
                      <div>
                        <label for="email">E-mail: </label>
                        <span id="email">{{ clienteSelecionado.email }}</span>
                    </div>
                      <div>
                        <label for="dataNasc">Data de Nascimento: </label>
                        <span id="dataNasc">{{ clienteSelecionado.dataNasc }}</span>
                    </div>
                </div>
            </v-card-text>

          </v-card>
        </v-dialog>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import API from '@/lib/API';
  export default {
    mounted() {
      this.load();
    },

    methods: {
      load() {
        API.getClientes().then(clientes => {
          console.log(clientes);
          this.clientes = clientes;
        });
      },

      exibirDetalhes(cliente) {
        this.clienteSelecionado = cliente;
        this.dialog = !this.dialog;
      }
    },

    data() {
      return {
        clienteSelecionado: {},
        dialog: false,
        clientes: []
      }
    }
  }

</script>

<style>


</style>
