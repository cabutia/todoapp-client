<template lang="html">
  <div class="modal-wrapper" v-if="visible" v-on:click="close">
    <div class="modal">
      <div class="input-wrapper">
        <input type="text" class="input" disabled :value="task.category.title">
        <input type="hidden" v-model="task.category.id">
        <label>Categoria</label>
      </div>
      <div class="input-wrapper">
        <input type="text" class="input" v-model="task.title">
        <label>Titulo de la tarea</label>
      </div>
      <div class="input-wrapper">
        <textarea class="input" v-model="task.description"></textarea>
        <label>Descripcion</label>
      </div>
      <div class="form-footer-wrapper">
        <button type="button" class="button" v-on:click="save"><i class="fa fa-plus"></i> Agregar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { EventBus } from '../events'

export default {
  name: 'AddTask',
  data () {
    return {
      url: 'http://dev.lumen/',
      visible: false,
      task: {
        title: '',
        category: {},
        description: '',
        get object () {
          let date = new Date()
          return {
            "title": this.title,
            "category_id": this.category.id,
            "status": '0',
            "objId": "ITEM-" + date.getTime(),
            "description": this.description
          }
        }
      }
    }
  },

  mounted () {
    EventBus.$on('fire-task-modal', this.open)
  },

  methods: {
    open (category) {
      this.visible = true
      this.task.category = category
      console.log('Add task to category ' + this.task.category.title)
    },

    close (e) {
      if (e.toElement.className == 'modal-wrapper') {
        this.visible = false
        this.reset()
      }
    },

    reset () {
      this.task.category = {}
    },

    save () {
      axios.post(this.url + 'todos/create', this.task.object).then(response => {
        EventBus.$emit('new-task-added', response.data)
        this.visible = false
        this.reset()
      }).catch(ex => console.log(ex))
    }
  }

}
</script>
