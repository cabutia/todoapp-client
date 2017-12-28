<template lang="html">
  <ul class="cm">
    <li v-for="item in cm.items" v-bind:class="{ 'cm-text': item.title, 'cm-action': !item.title }" v-on:click="actions[item.action](item.display)">
      {{ item.display }}<i class="fa" v-bind:class="item.icon"></i>
    </li>
  </ul>
</template>

<script>
import { EnvData } from '../env'
import { EventBus } from '../events'

export default {
  name: 'ToDoCM',

  data () {
    return {
      cm: {
        el: null,
        visible: false,
        items: [],
        minWidth: 300
      },
      menu: EnvData.cm.items,
      actions: EnvData.cm.actions
    }
  },

  mounted () {
    this.init()
    EventBus.$on('cm-fired', this.open)
    EventBus.$on('cm-close', this.close)
  },

  methods: {

    init () {
      this.cm.el = document.querySelector('.cm')
      this.cm.visible = false
    },

    close () {
      this.cm.visible = false
      this.cm.el.style.display = 'none'
    },

    open (cm) {
      if (!cm) return false
      this.fillMenu(cm.type)
      this.toggleVisibility()
      this.moveCm(cm)
    },

    toggleVisibility () {
      this.cm.visible = !this.cm.visible
      this.cm.el.style.display = this.cm.visible ? 'block' : 'none'
    },

    moveCm (cm) {
      let resultant = document.body.offsetWidth - cm.x
      if (resultant < this.cm.minWidth) {
        this.cm.el.style.left  = 'auto'
        this.cm.el.style.right = resultant + 'px'
      } else {
        this.cm.el.style.right = 'auto'
        this.cm.el.style.left  = cm.x + 'px'
      }
      this.cm.el.style.top = cm.y + 'px'
    },

    fillMenu (type) {
      this.cm.items = this.menu[type]
    }

  }
}
</script>
