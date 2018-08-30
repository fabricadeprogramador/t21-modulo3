<template>
  <div>
    <v-layout row>
      <v-flex xs12>

        <div style="padding:10px">
          <v-btn color="info" v-if="!mostrarForm" @click="novo">Novo Usuário</v-btn>
        </div>

        <!-- Lista de Usuários -->
        <v-card>

          <v-list subheader>

            <v-subheader>Usuários</v-subheader>

            <v-list-tile v-for="usu in usuarios" :key="usu._id">

              <v-list-tile-content>
                <v-list-tile-title v-html="usu.email"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-flex xs12>
                  <v-btn flat icon color="red">
                    <v-icon @click="confirmarExclusao(usu)">delete</v-icon>
                  </v-btn>
                  <v-btn flat icon color="blue">
                    <v-icon @click="editarUsuario(usu)">edit</v-icon>
                  </v-btn>
                </v-flex>
              </v-list-tile-action>

            </v-list-tile>
          </v-list>

        </v-card>

        <v-dialog v-model="mostrarForm" width="500">

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Novo Usuário
            </v-card-title>

            <!-- Formulario -->

            <v-form ref="form" v-if="mostrarForm" style="padding:10px">
              <v-text-field v-model="usuario.email" label="E-mail" required></v-text-field>
              <v-text-field v-model="usuario.senha" label="Senha" type="password" required></v-text-field>
              <v-text-field v-model="confirmarSenha" label="Confirmar Senha" type="password" required></v-text-field>

              <v-btn @click="submit">
                salvar
              </v-btn>
              <v-btn @click="clear">cancelar</v-btn>
            </v-form>

          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

    <!-- Confirm Dialog -->
    <div>
      <v-dialog v-model="mostrarConfirm" width="500">

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Confirmar Exclusão
          </v-card-title>

          <v-card-text>
            Tem certeza que deseja excluir esse usuário?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="deletarUsuario()">
              Sim
            </v-btn>
            <v-btn color="primary" flat @click="cancelarExclusao()">
              Não
            </v-btn>
          </v-card-actions>
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
    },
    methods: {
      load() {
        API.getUsuarios().then(usuarios => {
          this.usuarios = usuarios;
        });
      },

      editarUsuario(usuario) {
        this.usuario._id = usuario._id;
        this.usuario.email = usuario.email;
        this.usuario.senha = usuario.senha;
        this.exibirForm();
      },

      deletarUsuario() {

        API.deletarUsuario(this.usuarioDeletar)
          .then(response => {
            if (response) {
              this.alerta("Usuário removido com Sucesso!", "success");
              this.load()
            } else {
              this.alerta("Erro ao remover usuário!", "error");
            }

            this.usuarioDeletar = {}
            this.mostrarConfirm = false;
          });
      },

      cancelarExclusao() {
        this.usuarioDeletar = {}
        this.mostrarConfirm = false;
      },

      confirmarExclusao(usuario) {
        this.mostrarConfirm = true;
        this.usuarioDeletar = usuario;
      },

      novo() {
        this.exibirForm();
      },

      submit() {

        if (this.usuario._id) {
          if (this.usuario.senha == this.confirmarSenha) {
            API.editarUsuario(this.usuario)
              .then(response => {
                if (response) {
                  this.alerta("Usuário editado com sucesso!", "success");
                  this.exibirForm();
                  this.load();
                } else {
                  this.alerta("Erro ao editar usuário!", "error");
                  this.exibirForm();
                }
              })
          } else {
            this.alerta("As senhas não coincidem!", "warning");
          }
        } else {
          if (this.usuario.senha == this.confirmarSenha) {
            API.adicionarUsuario(this.usuario)
              .then(response => {
                if (response) {
                  this.alerta("Usuário salvo com sucesso!", "success");
                  this.exibirForm();
                  this.load();
                } else {
                  this.alerta("Erro ao salvar usuário!", "error");
                  this.exibirForm();
                }
              })
          } else {

          }
        }
      },

      clear() {
        // this.$refs.form.reset()
        this.usuarioSelecionado = {}
        this.exibirForm();
      },

      exibirForm() {
        this.mostrarForm = !this.mostrarForm;
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
        usuarios: [],
        usuario: {
          email: "",
          senha: ""
        },
        confirmarSenha: "",
        mostrarForm: false,
        mostrarConfirm: false,
        usuarioDeletar: {}
      }
    }
  }

</script>

<style>

</style>
