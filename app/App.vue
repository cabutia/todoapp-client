<template lang="html">
  <div id="app">
    <ToDoCM/>
    <Frame/>
    <HomePage/>
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'
import Frame from './components/Frame.vue'
import ToDoCM from './components/ToDoCM.vue'

export default {
  name: 'app',
  components: {
    HomePage,
    Frame,
    ToDoCM
  }
}
</script>
