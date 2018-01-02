<template lang="html">
  <div class="sidebar">
    <ul class="side-navigation" v-if="categories.length > 0">
      <li class="menu-title">Categories
        <div class="actions">
          <span class="action" v-on:click="addNewCategory"><i class="fa fa-plus"></i></span>
        </div>
      </li>

      <li class="item-title" v-for="category in categories"><span class="category-color" :style="category.style"></span>
        {{ category.title }}
        <div class="actions">
          <span class="action" v-on:click="addTask(category)"><i class="fa fa-plus"></i></span>
          <span class="action" v-on:click="editCategory(category)"><i class="fa fa-pencil"></i></span>
          <span class="action" v-on:click="deleteCategory(category.id)"><i class="fa fa-close"></i></span>
        </div>
      </li>
    </ul>
    <div class="no-items" v-if="categories.length == 0">
      <div class="message">
        <h3>No se encontraron categorias</h3>
        <h4>Presione <a href="#" v-on:click="fireCategoryModal"><i class="fa fa-plus"></i></a> para agregar una nueva</h4>
      </div>
    </div>
  </div>
</template>

<script>
import {EventBus} from '../events'
import axios from 'axios'

export default {
  name: 'Sidebar',
  template: '<Sidebar/>',

  data () {
    return {
      categories: []
    }
  },

  mounted() {
    EventBus.$on('category-added', this.addCategory)
    EventBus.$on('category-deleted', this.deleteCategory)
    EventBus.$on('category-updated', this.updateCategories)
    this.getCategories()
  },

  methods: {
    addNewCategory () {
      EventBus.$emit('fire-category-modal')
    },

    getCategories () {
      let url = 'http://dev.lumen/categories/all'
      axios.get(url)
        .then(response => this.addCategory(response.data))
        .catch(ex => console.log(ex))
    },

    addTask (id) {
      EventBus.$emit('fire-task-modal', id)
    },

    addCategory (data) {
      for (var i = 0; i < data.length; i++) {
        let category = data[i]
        category.style = JSON.parse(category.style.replace(/\'/g, '\"'))
        this.categories.push(category)
      }
    },

    editCategory (category) {
      console.log(category.id)
      EventBus.$emit('fire-category-edit-modal', category)
    },

    deleteCategory (id) {
      console.log('Deleting ' + id)
      let url = `http://dev.lumen/categories/delete/${id}`
      axios.post(url, {id:id}).then(response => {
        this.categories = []
        this.addCategory(response.data)
        EventBus.$emit('fire-refresh-tasks')
      }).catch(ex => console.log(ex))
    },

    updateCategories (data) {
      let categories = this.categories.map(category => {
        if (category.id == data.id) {
          let cat = category
          cat.title = data.title
          cat.style = JSON.parse(data.style.replace(/\'/g, '\"'))
          return cat
        }
        return category
      })
      this.categories = categories
    },

    parseData (r) {
      let categories = []
      this.categories = []
      for (var i = 0; i < r.length; i++) {
        let category = r[i]
        category.style = JSON.parse(category.style.replace(/\'/g, '\"'))
        categories.push(category)
      }
      return categories
    },

    fireCategoryModal() {
      EventBus.$emit('fire-category-modal')
    }
  }
}
</script>

<style lang="css">
</style>
