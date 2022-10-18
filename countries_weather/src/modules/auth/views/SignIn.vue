<template>
  <div class="form-signin">
    <form class="form-wrapper" @submit.prevent="onSubmit">
      <div class="form-title">
        Bienvenido
      </div>

      <div class="form-title form-invalid" v-if="signInError">
        <p>{{ signInError }}</p>
      </div>

      <label class="form-label">Usuario:</label>
      <input
        class="form-input"
        v-model="username"
        type="text"
      />
      <div class="form-invalid" v-if="usernameError">
        <p>{{ usernameError }}</p>
      </div>

      <label class="form-label">Contraseña:</label>
      <input
        class="form-input"
        v-model="password"
        type="password"
      />
      <div class="form-invalid" v-if="passwordError">
        <p>{{ passwordError }}</p>
      </div>

      <div class="remindme">
        <input class="form-input" id="remindme" type="checkbox" v-model="remindme" />
        <label class="form-label" for="remindme">Recuerdame</label>
      </div>

      <div class="no-account">
        <p class="form-text">
          ¿No tienes cuenta?
          <router-link :to="{ name: 'signup' }">
            Registrarse
          </router-link>
        </p>
      </div>

      <div class="form-submit">
        <button class="form-button">Iniciar sesion</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from '@/helpers/form-input-validators'
import router from '@/router'
import { signIn, signInByToken } from '@/api/auth.controller'
export default {
  created () {
    this.checkTokenAndSignIn()
  },
  data () {
    return {
      username: null,
      password: null,
      remindme: false,
      usernameError: null,
      passwordError: null,
      loading: false,
      signInError: null
    }
  },
  methods: {
    validFields () {
      this.usernameError = required(this.username)
      this.passwordError = required(this.password)
    },
    async onSubmit () {
      if (this.loading) return
      this.validFields()
      if (this.isAnyError) return
      this.loading = true
      this.signInError = null
      
      const { status, data } = await signIn(this.username, this.password, this.remindme)
      if (status) {
        this.goToDashboard()
        return
      }

      this.loading = false
      this.signInError = data.message
    },
    async checkTokenAndSignIn () {
      const { status } = await signInByToken(true)
      if (status) this.goToDashboard()
    },
    goToDashboard () {
      console.log('go to dash')
      router.replace({ name: 'countryweather' })
    }
  },
  computed: {
    isAnyError () {
      return this.usernameError|| this.passwordError
    }
  }
}
</script>
