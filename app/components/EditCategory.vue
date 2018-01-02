<template lang="html">
  <div class="modal-wrapper" v-on:click="close" v-if="visible">
    <div class="modal">
      <div class="error-wrapper" v-if="errors.length > 0" v-for="error in errors">
        <p class="error">{{ error.message }}</p>
      </div>
      <div class="input-wrapper">
        <input type="text" name="title" class="input" v-model="category.title" autofocus>
        <label for="title">Nombre de la categoria</label>
      </div>
      <div class="color-selector-wrapper">
        <div class="color-selector">
          <div class="input-range-wrapper">
            <input type="range" min="0" max="255" name="colorH" class="selector" v-model="category.style.h">
            <label for="colorH">{{ category.style.h }}</label>
          </div>
          <div class="input-range-wrapper">
            <input type="range" min="0" max="100" name="colorS" class="selector" v-model="category.style.s">
            <label for="colorS">{{ category.style.s }}%</label>
          </div>
          <div class="input-range-wrapper">
            <input type="range" min="0" max="100" name="colorL" class="selector" v-model="category.style.l">
            <label for="colorL">{{ category.style.l }}%</label>
          </div>
        </div>
        <div class="color-result" v-bind:style="category.style.result">
          {{ category.style.resultStr }}
        </div>
      </div>
      <div class="form-footer-wrapper">
        <button type="button" class="button primary" v-on:click="save"><i class="fa fa-plus"></i> Guardar cambios</button>
      </div>
    </div>
  </div>
</template>

<script>
import {EventBus} from '../events'
import axios from 'axios'

export default {
  name: 'EditCategory',
  data () {
    return {
      errors: [],
      visible: false,
      category: {
        title: null,
        style: {
          h: 0,
          s: 0,
          l: 0,
          get result () {
            return {
              "background-color": "hsla(" + this.h + ", " + this.s + "%, " + this.l + "%, 0.8)"
            }
          },
          get str () {
            return JSON.stringify(this.result)
          },
          get resultStr () {
            return `hsl(${this.h}, ${this.s}%, ${this.l}%)`
          }
        },
        get data () {
          return {
            id: this.id,
            title: this.title,
            style: this.style.str
          }
        }
      }
    }
  },

  mounted () {
    EventBus.$on('fire-category-edit-modal', this.open)
  },

  methods: {
    open (category) {
      this.category.id = category.id
      this.category.title = category.title
      this.category.style.h = this.parseStyle(category, 'h')
      this.category.style.s = this.parseStyle(category, 's')
      this.category.style.l = this.parseStyle(category, 'l')
      this.visible = true
    },

    save () {
      if (!this.category.title) {

        this.clearErrors()
        this.exception('Ingresa un nombre para la categoria')

      } else if (!this.category.style) {

        this.exception('Selecciona un color que identifique la categoria')

      } else {
        axios.post("http://dev.lumen/categories/update", this.category.data)
        .then(response => {
          EventBus.$emit('category-updated', response.data)
          this.visible = false
        }).catch(ex => {
          this.exception('Hubo un problema...')
        })
        this.reset()
      }
    },

    clearErrors () {
      this.errors = []
    },

    exception (str) {
      this.errors.push({message: str})
    },

    close (e) {
      if (e.toElement.className == 'modal-wrapper') {
        this.visible = false
        this.reset()
      }
    },

    reset () {
      this.clearErrors()
      this.category.style.h = 0
      this.category.style.s = 0
      this.category.style.l = 0
    },

    parseStyle (obj, code) {
      let index = (code == 'h') ? 0 : (code == 's') ? 1 : 2
      let style = obj.style['background-color'].replace(/(hsla\(|\ |%)/g, '').split(',')[index]
      return style
    }
  }
}
</script>
