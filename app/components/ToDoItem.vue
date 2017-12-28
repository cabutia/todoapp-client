<template lang="html">
  <div class="todo" cm-type="todo-item" v-bind:id="item.objId">
    <h2 class="title"><span class="category" v-bind:style="item.category.style"></span>
      {{ item.title }}
      <i class="fa fa-check status" v-bind:style="item.status.style"></i>
    </h2>
    <p class="description">
      {{ item.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ToDoItem',
  props: ['item']
}
</script>

<style lang="css">
</style>
