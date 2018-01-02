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

  mounted () {
    this.isAlwaysOnTop = this.mainWindow.isAlwaysOnTop()
  },

  data () {
    return {
      electron: require('electron').remote,
      sidebar: '.sidebar',

      items: [
        {
          display: 'Stick on top',
          icon: 'fa-lock',
          special: '',
          action: () => {
            let top = this.mainWindow.isAlwaysOnTop()
            let winsize = {
              w: 1100,
              h: 800
            }
            this.mainWindow.setAlwaysOnTop(!top)

            this.mainWindow.setMovable(!top ? false : true)
            this.mainWindow.setSize(!top ? 300 : winsize.w, !top ? this.screen.height : winsize.h)
            this.mainWindow.setPosition(!top ? (this.screen.width - 300) : ((this.screen.width - winsize.w) / 2), !top ? 0 : ((this.screen.height - winsize.h) / 2))
          }
        },
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

  computed: {
    mainWindow () {
      return this.electron.getCurrentWindow()
    },
    screen () {
      return this.electron.screen.getPrimaryDisplay().workAreaSize
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
