<template lang="html">
  <div class="to-do-list">
    <ToDoItem v-for="item in items" v-bind:item="item" v-bind:key="item.id"/>
  </div>
</template>

<script>
import axios from 'axios'
import { EnvData } from '../env'
import { EventBus } from '../events'
import ToDoItem from './ToDoItem.vue'

export default {
  name: 'ToDoList',
  components: { ToDoItem },

  mounted() {
    this.getTodos()
    let todos = document.querySelectorAll('.todo')
    for (var i = 0; i < todos.length; i++) {
      todos[i].addEventListener('contextmenu', e => this.handleRightClick(e))
    }
    document.addEventListener('click', e => this.handleLeftClick(e))
  },

  methods: {
    getTodos () {
      let url = 'http://dev.lumen/todos/all'
      axios.get(url).then(response => {
        this.items = this.parseTodos(response.data)
      })
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

    cmCanBeOpened (e) {
      let isClickable = false
      let element = null
      let data = null
      for (var i = 0; i < e.path.length; i++) {
        if (e.path[i].className == 'todo') {
          element = e.path[i]
          isClickable = true
          break
        }
      }
      if (!isClickable) return false
      return data = { x: e.clientX, y: e.clientY, type: element.getAttribute('cm-type') }
    },

    handleRightClick (e) {
      let cm = this.cmCanBeOpened(e)
      cm ? EventBus.$emit('cm-fired', cm) : EventBus.$emit('cm-close', {})
    },

    handleLeftClick (e) {
      EventBus.$emit('cm-close', {})
    }

  },

  data () {
    return {
      statusStyles: EnvData.statusStyles,

      items: []
      // {
      //   objId: "ITEM-4221543",
      //   title: 'Hacer la aplicacion de la lista de tareas',
      //   description: 'Realizar la aplicacion de la lista de tareas, en lo\
      //   posible hoy (27/12/2017), para asi poder llevar un control.',
      //   category: {
      //     title: 'Desarrollo',
      //     style: {
      //       'background-color': 'hsla(190, 100%, 45%, 0.7)',
      //       'color': 'hsla(0, 0%, 0%, 0.7)'
      //     }
      //   },
      //   status: {
      //     flag: 'Pendiente',
      //     style: {
      //       'background-color':'hsl(20, 100%, 50%)',
      //       'color':'hsl(20, 100%, 50%)'
      //     }
      //   }
      // },
    }
  }
}
</script>

<style lang="css"></style>
