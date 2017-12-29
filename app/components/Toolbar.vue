<template lang="html">
  <ul class="toolbar">
    <li class="toolbar-tool refresh" ev-type="fire-refresh-tasks" v-on:click="trigger"><i class="fa fa-refresh"></i></li>
    <li class="toolbar-tool" ev-type="fire-category-modal" v-on:click="trigger" tabindex="2"><i class="fa fa-plus"></i></li>
    <li class="toolbar-tool search">
      <input type="text" name="searchterm" class="search-input" placeholder="Buscar" tabindex="1">
    </li>
  </ul>
</template>

<script>
import { EventBus } from '../events'
import AddTask from './AddTask.vue'

export default {
  components: { AddTask },
  name: 'Toolbar',
  methods: {
    trigger (e) {
      EventBus.$emit(e.toElement.getAttribute('ev-type'))
    }
  }
}
</script>
