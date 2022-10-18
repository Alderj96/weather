<template>
  <main class="main-users">
    <section class="card">
      <div class="card-title text-center">
        Lista de Usuarios
      </div>

      <div class="card-content">
        <table class="table">
          <tr class="table-header">
            <th class="header-section" v-for="header in headers" :key="header">
              {{ header }}
            </th>
          </tr>
        
          <tr class="table-row" v-for="user in users" :key="user._id" >
            <td class="column-table">
              {{ user.fullname }}
            </td>
            <td class="column-table">
              {{ user.mail }}
            </td>
            <td class="column-table">
              {{ stringDate(user.createdAt) }}
            </td>
            <td class="column-table">
              {{ stringDateTime(user.lastlogin) }}
            </td>
          </tr>
        </table>
      </div>
    </section>
  </main>
</template>

<script>
import { getAllUsers } from '../../../api/user.controller'
import { stringDate, stringDateTime } from '../../../helpers/time-transform';
export default {
  data () {
    return {
      users: [],
      headers: [
        'Nombre',
        'Correo Electronico',
        'Fecha de Registro',
        'Último Login'
      ]
    }
  },
  created () {
    this.findUsers()
  },
  methods: {
    stringDate,
    stringDateTime,
    async findUsers() {
      const { status, data } = await getAllUsers()
      if (status) this.users = data
    }
  }
}
</script>

<style scoped>
</style>