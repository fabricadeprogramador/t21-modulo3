<template>
  <div id="app">
    <v-app id="inspire">

      <v-navigation-drawer v-model="drawer" fixed app>
        <v-list dense>

          <v-list-tile :to="{ name : 'Home' }">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Home
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile :to="{ name : 'Produtos' }">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Produtos
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile :to="{ name : 'Clientes' }">
            <v-list-tile-action>
              <v-icon>contacts</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Clientes
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile :to="{ name : 'Financeiro' }">
            <v-list-tile-action>
              <v-icon>attach_money</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Financeiro
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile :to="{ name : 'Estabelecimentos' }">
            <v-list-tile-action>
              <v-icon>shop</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Estabelecimentos
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

           <v-list-tile :to="{ name : 'Usuarios' }">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Usuários
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>

      </v-navigation-drawer>


      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      </v-toolbar>

      <v-content>
        <v-container fluid fill-height>
          <v-layout row wrap>
            <v-flex xs12>

              <!-- Alert -->
              <v-alert :value=mensagem.value :type=mensagem.type>
                {{ mensagem.msg }}
                  <v-icon @click="fecharMsg" style="float:right">close</v-icon>
              </v-alert>

                <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>

      <v-footer color="indigo" app>
        <span class="white--text">Fábrica de Programador - High Tech &copy; 2018</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "App",
    computed: {
      ...mapState([
        'mensagem'
      ])
    },
    data: () => ({
      drawer: false
    }),
    methods:{
      fecharMsg(){
        let msgObj = {
            msg : "",
            type : "success",
            value : false
        };

        this.$store.commit('CHANGE_MSG', msgObj);
      }
    }
  };

</script>

<style>
</style>
