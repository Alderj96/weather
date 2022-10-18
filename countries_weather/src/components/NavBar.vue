<template>
  <nav class="navbar">
    <template
      v-for="({ name, text }) in menulist"
      :key="name"
    >
      <router-link
        :to="{ name: name }"
        :class="{ 'active': $route.name === name }"
      >
        {{ text }}
      </router-link>
    </template>
    <div class="dropdown" style="float: right">
      <div class="dropbtn">
        <div class="circle">
          <span class="initial">
            {{ initials(user.fullname) }}
          </span>
        </div>
        <span>{{ user.fullname }}</span>
      </div>
      <div class="dropdown-content">
        <a href="#" @click="onLogout">Cerrar Sesión</a>
      </div>
    </div> 
  </nav>
</template>

<script>
import { logout } from '@/api/auth.controller'
import router from '@/router'
export default {
  created () {
    this.menulist = this.$router.options.routes.find(r =>
      r.name === 'dashboard'
    ).children
    this.user = JSON.parse(sessionStorage.getItem('sssn'))
  },
  data() {
    return {
      menulist: [],
      user: null
    }
  },
  methods: {
    onLogout() {
      logout()
      router.replace({ name: 'signin' })
    },
    initials(nombre) {
      const names = nombre.split(' ');
      const initials = names.shift().charAt(0) + names.pop().charAt(0);
      return initials.toUpperCase()
    }
  }
}
</script>

<style scoped>

</style>