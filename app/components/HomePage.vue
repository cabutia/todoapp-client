<template lang="html">
  <div class="relative" id="appbody">
    <AddTask/>
    <AddCategory/>
    <EditCategory/>
    <Sidebar/>
    <ToDoList/>
  </div>
</template>

<script>
import AddTask from './AddTask.vue'
import Toolbar from './Toolbar.vue'
import Sidebar from './Sidebar.vue'
import ToDoList from './ToDoList.vue'
import AddCategory from './AddCategory.vue'
import EditCategory from './EditCategory.vue'

export default {
  components: { Sidebar, ToDoList, Toolbar, AddTask, AddCategory, EditCategory },
  name: 'HomePage'
}
</script>
