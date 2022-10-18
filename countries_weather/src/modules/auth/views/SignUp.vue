<template>
  <div class="form-signup">
    <form class="form-wrapper" @submit.prevent="onSubmit">
      <div class="form-title">
        Crear Cuenta
      </div>

      <div class="form-title form-invalid" v-if="signUpError">
        <p>{{ signUpError }}</p>
      </div>

      <label class="form-label">Nombre Completo:</label>
      <input
        class="form-input"
        v-model="fullname"
        type="text"
      />
      <div class="form-invalid" v-if="fullnameError">
        <p>{{ fullnameError }}</p>
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

      <label class="form-label">Email:</label>
      <input
        class="form-input"
        v-model="mail"
        type="email"
      />
      <div class="form-invalid" v-if="mailError">
        <p>{{ mailError }}</p>
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

      <label class="form-label">Repetir Contraseña:</label>
      <input
        class="form-input"
        v-model="confirmpassword"
        type="password"
      />
      <div class="form-invalid" v-if="confirmpasswordError">
        <p>{{ confirmpasswordError }}</p>
      </div>

      <div class="form-submit">
        <button class="form-button">Crear Cuenta</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, validFullName, validEmail, sameValue, validPassword } from '../../../helpers/form-input-validators';
import { signUp } from '../../../api/auth.controller';
import router from '@/router';
export default {
  data () {
    return {
      username: null,
      mail: null,
      fullname: null,
      password: null,
      confirmpassword: null,
      usernameError: null,
      mailError: null,
      fullnameError: null,
      passwordError: null,
      confirmpasswordError: null,
      loading: false,
      signUpError: null
    }
  },
  methods: {
    validFields () {
      this.usernameError = required(this.username)
      this.mailError = required(this.mail) || validEmail(this.mail)
      this.fullnameError = required(this.fullname) || validFullName(this.fullname)
      this.passwordError = required(this.password) || validPassword(this.password)
      this.confirmpasswordError = required(this.confirmpassword) || sameValue(this.password, this.confirmpassword)
    },
    async onSubmit () {
      if (this.loading) return
      this.validFields()
      if (this.isAnyError) return
      this.loading = true
      this.signUpError = null

      const { status, data } = await signUp(this.username, this.mail, this.password, this.fullname)
      if (status) {
        router.replace({ name: 'countryweather' })
        return
      }

      this.loading = false
      this.signUpError = data.message
    }
  },
  computed: {
    isAnyError () {
      return this.usernameError || this.mailError || this.fullnameError || this.passwordError || this.confirmpasswordError
    }
  }
}
</script>