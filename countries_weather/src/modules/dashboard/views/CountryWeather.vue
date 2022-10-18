<template>
  <div class="country-weather-container">
    <aside class="card">
      <div class="card-title">
        paises disponibles
      </div>

      <div class="card-content country-list">
        <div class="country-item card pointer" v-for="item in countries" :key="item.name" @click="onSelectCountry(item)">
          <img
            class="country-image"
            :src="'/' + item.img"
            alt="bandera"
          />
          <div class="country-name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </aside>

    <section class="card">
      <div class="card-title">
        clima
      </div>

      <div class="card-content" v-if="tempCountry">
        <img :src="tempCountry.urlIcon" alt="icono">

        <div>
          <p>{{ tempCountry.temp }} °C</p>
          <p class="capitalize">{{ tempCountry.description }}</p>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-title">
        pais seleccionado
      </div>

      <div class="card-content" v-if="countrySelected">
        <div class="country-item">
          <div class="country-name">
            {{ countrySelected.name }}
          </div>

          <img
            class="country-image"
            :src="'/' + countrySelected.img"
            alt="bandera"
          />
        </div>
      </div>
    </section>

    <section class="card max-25vh">
      <div class="card-title">
        tareas pendientes
      </div>

      <div class="list-todo">
        <div class="row">
          <input
            v-model="todo"
            class="input-simple"
            type="text"
            placeholder="Nueva tarea"
          />
          <button
            class="button-green"
            @click="addTodo"
          >
            +
          </button>
        </div>

        <div
          class="list-todo-item row"
          v-for="todo in todosActives"
          :key="todo._id"
        >
          <span>- {{ todo.description }}</span>
          <button
            class="button-light-blue"
            @click="updateFinishTodo(todo)"
          >
            ✔
          </button>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-title">
        hora
      </div>

      <div class="card-content" v-if="citySelected">
        <span class="card-textbold">
          {{ time }}
        </span>
      </div>
    </section>

    <section class="card max-25vh">
      <div class="card-title">
        tares completadas
      </div>

      <div class="list-todo">
        <div
          class="list-todo-item"
          v-for="todo in todosFinisheds"
          :key="todo.description"
        >
          <span>- {{ todo.description }}</span>
        </div>
      </div>
    </section>

    <section class="card max-25vh">
      <div class="card-title">
        zonas horarias disponibles
      </div>

      <div class="card-content content-cities" v-if="countrySelected">
        <div
          v-for="city in countrySelected.cities"
          :class="['chip pointer', 'active', { 'chip-selected': city.name === citySelected?.name }]"
          :key="city.name"
          @click="onSelectCity(city)"
        >
          {{ city.name }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import countries from '@/mocks/countries'
import { getTemp } from '../../../api/weather.controller';
import { getTimeByOffset } from '../../../helpers/time-transform';
import { createTodo, finishTodo, getAllTodos } from '../../../api/todos.controller';

let timer = null
export default {
  name: "CountryWeather",
  unmounted() {
    if (timer) clearInterval(timer)
  },
  data () {
    return {
      countries,
      countrySelected: null,
      citySelected: null,
      tempCountry: null,
      time: null,
      todos: [],
      todo: null
    }
  },
  created() {
    this.findAllTodos()
  },
  methods: {
    async onSelectCountry (item) {
      if (item) {
        this.countrySelected = item
        this.citySelected = null
      }
      const response = await getTemp(this.countrySelected['lat'], this.countrySelected['lon'])
      this.tempCountry = response
    },
    async onSelectCity (city) {
      if (city) this.citySelected = city
      if (timer) clearInterval(timer)
      this.setTime()
      timer = setInterval(() => this.setTime(), 1000)
    },
    setTime() {
      this.time = getTimeByOffset(this.citySelected.timezone)
    },
    async addTodo () {
      const { status, data } = await createTodo(this.todo)
      if (!status) return
      
      console.log(data)
      this.todos.push(data['todo'])
    },
    async updateFinishTodo (todo) {
      const indexTodo = this.todos.findIndex(t => t.description === todo.description)
      const { status, data } = await finishTodo(todo._id)
      if (!status) return

      this.todos[indexTodo]['finished'] = data['todo']
    },
    async findAllTodos () {
      const { status, data } = await getAllTodos()
      if (status) this.todos = data
    }
  },
  computed: {
    todosActives () {
      return this.todos.filter(t => !t.finished)
    },
    todosFinisheds () {
      return this.todos.filter(t => t.finished)
    }
  }
}
</script>

<style scoped>
.country-weather-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  padding: 1em;
}

.country-weather-container > aside {
  grid-column: 3;
  grid-row: 1 / 4;
}

@media (max-width: 700px) {
  .country-weather-container {
    grid-template-columns: repeat(1, 1fr);
  }

  .country-weather-container > aside {
    grid-column: 1;
    grid-row: 1;
  }
}

.content-cities {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
}
</style>