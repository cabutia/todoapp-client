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
        minWidth: 300,
        activatesOn: ['.to-do-list']
      },
      selector: '.cm',
      menu: EnvData.cm.items,
      actions: EnvData.cm.actions,
      events: {
        open: 'cm-fired',
        close: 'cm-close'
      }
    }
  },

  mounted () {
    this.init()
    EventBus.$on(this.events.open, this.open)
    EventBus.$on(this.events.close, this.close)
  },

  methods: {

    init () {
      this.cm.el = document.querySelector(this.selector)
      document.addEventListener('click', e => {
        EventBus.$emit(this.events.close)
      })
      for (var i = 0; i < this.cm.activatesOn.length; i++) {
        let element = document.querySelector(this.cm.activatesOn[i]) || false
        if (!element) return
        element.addEventListener('contextmenu', this.open)
      }
      this.cm.visible = false
    },

    close () {
      this.cm.visible = false
      this.cm.el.style.display = 'none'
    },

    open (e) {
      let cm = this.getElement(e)
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
    },

    getElement (ev) {
      let el = ev.toElement
      let cm = {
        type: el.getAttribute('cm-type'),
        x: ev.clientX,
        y: ev.clientY
      }
      return cm
    }

  }
}
</script>
