<template lang="html">
  <div class="relative" id="appbody">
    <AddTask/>
    <AddCategory/>
    <Sidebar/>
    <Toolbar/>
    <ToDoList/>
  </div>
</template>

<script>
import AddTask from './AddTask.vue'
import Toolbar from './Toolbar.vue'
import Sidebar from './Sidebar.vue'
import ToDoList from './ToDoList.vue'
import AddCategory from './AddCategory.vue'

export default {
  components: { Sidebar, ToDoList, Toolbar, AddTask, AddCategory },
  name: 'HomePage'
}
</script>
