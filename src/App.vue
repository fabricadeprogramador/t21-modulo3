<template>
  <div id="app">
    <v-app id="inspire">

      <v-navigation-drawer v-model="drawer" fixed app>
        <v-list dense>

          <v-list-tile :to="{ name : 'Landing' }">
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

        </v-list>

      </v-navigation-drawer>


      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Shopping HT</v-toolbar-title>
      </v-toolbar>

      <v-content>
        <v-container fluid fill-height>
          <v-layout row wrap>
            <v-flex xs12>
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
  export default {
    name: 'App',
    data: () => ({
      drawer: true
    })
  }

</script>

<style>


</style>
