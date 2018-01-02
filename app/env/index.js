/*
| Here is where we can declare some static data, like menu types, menu items,
| some global constants
|
*/
import {EventBus} from '../events'
import axios from 'axios'

export const EnvData = {

  cm: {
    items: {
      'todo-item': [
        {
          title: true,
          display: 'Acciones sobre la tarea',
          action: 'nothing',
          icon: '',
          id: null
        },{
          title: false,
          display: 'Completa',
          action: 'setStatusCompleted',
          icon: 'fa-check',
          id: null
        },{
          title: false,
          display: 'Archivar',
          action: 'setStatusArchived',
          icon: 'fa-file',
          id: null
        },{
          title: false,
          display: 'Pendiente',
          action: 'setStatusPending',
          icon: 'fa-circle-o',
          id: null
        },{
          title: false,
          display: 'Eliminar',
          action: 'delete',
          icon: 'fa-close',
          id: null
        }
      ]
    },
    actions: {

      setStatusArchived: (id) => {
        axios.post('http://dev.lumen/todos/update', {
          id: id,
          status: '-1'
        }).then(response => {
          console.log(response.data)
          EventBus.$emit('task-status-update', {id: id, status: '-1'})
        })
      },

      setStatusCompleted: (id) => {
        axios.post('http://dev.lumen/todos/update', {
          id: id,
          status: '1'
        }).then(response => {
          console.log(response.data)
          EventBus.$emit('task-status-update', {id: id, status: '1'})
        })
      },

      setStatusPending: (id) => {
        axios.post('http://dev.lumen/todos/update', {
          id: id,
          status: '0'
        }).then(response => {
          console.log(response.data)
          EventBus.$emit('task-status-update', {id: id, status: '0'})
        })
      },

      delete: (id) => {
        axios.post('http://dev.lumen/todos/delete/' + id, {
          id: id
        }).then(response => {
          console.log(response.data)
          EventBus.$emit('task-deleted', {id: response.data})
        })
      },

      nothing: () => {
        return false
      }

    }
  },

  statusStyles: {
    'status-1': {
      flag: 'archived',
      style: { 'color':'hsl(0, 0%, 80%)' }
    },
    'status0': {
      flag: 'waiting',
      style: { 'color':'hsl(340, 80%, 60%)' }
    },
    'status1': {
      flag: 'completed',
      style: { 'color':'hsl(170, 100%, 40%)' }
    }
  }
}
