<template lang="html">
  <nav class="frame-navigation">
    <ul>
      <li class="title">Lista de tareas</li>
      <li class="sidebar-collapse" v-on:click="collapseSidebar"><i class="fa fa-bars"></i></li>
      <li class="frame-item" v-for="item in items" v-bind:class="item.special" v-on:click="item.action"><i class="fa" v-bind:class="item.icon"></i><i class="fa backlight" v-bind:class="item.icon"></i></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Frame',
  data () {
    return {
      mainWindow: require('electron').remote.getCurrentWindow(),
      sidebar: '.sidebar',

      items: [
        {
          display: 'Fullscreen',
          icon: 'fa-expand',
          special: '',
          action: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
          }
        },
        {
          display: 'Minimize',
          icon: 'fa-window-minimize',
          special: '',
          action: () => {
            this.mainWindow.minimize()
          }
        },
        {
          display: 'Maximize',
          icon: 'fa-window-maximize',
          special: '',
          action: () => {
            (this.mainWindow.isMaximized()) ? this.mainWindow.unmaximize() : this.mainWindow.maximize()
          }
        },
        {
          display: 'Close',
          icon: 'fa-window-close',
          special: '',
          action: () => {
            this.mainWindow.close()
          }
        }
      ]
    }
  },

  methods: {
    collapseSidebar () {
      let sidebar = document.querySelector(this.sidebar)
      sidebar.classList.toggle('collapsed')
    }
  }
}
</script>
