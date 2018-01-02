<template lang="html">
  <div class="todo"
      cm-type="todo-item"
      v-on:click="toggleCollapse"
      v-bind:class="item.status.flag"
      v-bind:item-id="item.id"
      v-bind:id="item.objId">
    <h2 class="title"><span class="category" :style="item.category.style"></span>
      {{ item.title }}
      <i class="fa status"
        v-bind:style="item.status.style"
        v-bind:class="(item.status.flag == 'archived') ? 'fa-archive' : (item.status.flag == 'waiting') ? 'fa-dot-circle-o' : 'fa-check'"></i>
    </h2>
    <p class="description" v-if="!collapsed">
      {{ item.description }}
    </p>
  </div>
</template>

<script>
import {EventBus} from '../events'

export default {
  name: 'ToDoItem',
  props: ['item'],
  data () {
    return {
      collapsed: true
    }
  },

  mounted () {
    console.log(this)
  },

  methods: {
    toggleCollapse () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="css">
</style>
