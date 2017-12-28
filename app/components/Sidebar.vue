<template lang="html">
  <div class="sidebar">
    <ul class="side-navigation">
      <li class="menu-title">Categories</li>

      <li class="item-title" v-for="category in categories"><span class="category-color" :style="category.style"></span>
        {{ category.title }}
        <div class="actions">
          <span class="action"><i class="fa fa-pencil"></i></span>
          <span class="action"><i class="fa fa-close"></i></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Sidebar',
  template: '<Sidebar/>',

  mounted() {
    this.getCategories()
  },

  data () {
    return {
      categories: null
    }
  },

  methods: {
    getCategories () {
      let url = 'http://dev.lumen/categories/all'
      axios.get(url).then(response => {
        this.categories = this.parseData(response.data)
      })
    },

    parseData (r) {
      let categories = []
      for (var i = 0; i < r.length; i++) {
        let category = r[i]
        console.log(category)
        category.style = JSON.parse(category.style.replace(/\'/g, '\"'))
        categories.push(category)
      }
      return categories
    }
  }
}
</script>

<style lang="css">
</style>
