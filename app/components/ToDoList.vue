<template lang="html">
  <div class="to-do-list">
    <div class="ps">
      <ToDoItem v-for="item in items" v-bind:item="item" v-bind:key="item.id" v-if="items.length > 0"/>
      <div class="no-items" v-if="items.length == 0">
        <div class="message">
          <h1>No se encontraron tareas</h1>
          <h3>Presione <i class="fa fa-refresh"></i> para recargar</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { EnvData } from '../env'
import { EventBus } from '../events'
import ToDoItem from './ToDoItem.vue'
import PerfectScrollbar from 'perfect-scrollbar'

export default {
  name: 'ToDoList',
  components: { ToDoItem },

  mounted() {
    EventBus.$on('new-task-added', this.addTodo)
    EventBus.$on('fire-refresh-tasks', this.getTodos)
    const ps = new PerfectScrollbar('.ps')
    this.getTodos()
  },

  methods: {
    getTodos () {
      let url = 'http://dev.lumen/todos/all'
      axios.get(url).then(response => {
        console.log(response.data)
        this.items = this.parseTodos(response.data)
      }).catch(ex => console.log(ex))
    },

    parseTodos (array) {
      let todos = []
      for (var i = 0; i < array.length; i++) {
        let todo = array[i]
        todo.status = this.statusStyles['status' + todo.status.toString()]
        todo.category.style = JSON.parse(todo.category.style)
        todos.push(todo)
      }
      return todos
    },

    addTodo (data) {
      this.visible = false
      this.items.push(this.parseTodoStyle(data))
    },

    parseTodoStyle (todo) {
      let newTodo = todo
      newTodo.status = this.statusStyles['status' + todo.status.toString()]
      newTodo.category.style = JSON.parse(todo.category.style)
      return newTodo
    }

  },

  data () {
    return {
      statusStyles: EnvData.statusStyles,
      items: []
    }
  }
}
</script>
