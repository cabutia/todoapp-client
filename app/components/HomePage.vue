<template lang="html">
  <div class="relative" id="appbody">
    <Sidebar/>
    <Toolbar/>
    <ToDoList/>
  </div>
</template>

<script>
import Toolbar from './Toolbar.vue'
import Sidebar from './Sidebar.vue'
import ToDoList from './ToDoList.vue'

export default {
  components: { Sidebar, ToDoList, Toolbar },
  name: 'HomePage'
}
</script>
