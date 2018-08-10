<template>
  <div>
    <v-btn color="info">Novo Produto</v-btn>
    <v-data-table :headers="headers" :items="produtos" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nome }}</td>
        <td class="text-xs-right">{{ props.item.descricao }}</td>
        <td class="text-xs-right">{{ props.item.valor }}</td>
        <td class="text-xs-right"><img :src="props.item.foto"></td>
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

    methods :{
      load() {
         API.getProdutos().then(produtos => {
             console.log(produtos);
          this.produtos = produtos;
        });
      }
    },

    data() {
      return {
        headers: [

          {
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
        produtos: []
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
