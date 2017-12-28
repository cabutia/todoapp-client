/*
| Here is where we can declare some static data, like menu types, menu items,
| some global constants
|
*/

export const EnvData = {

  cm: {
    items: {
      'todo-item': [
        {
          title: true,
          display: 'Acciones sobre la tarea',
          action: 'dothat',
          icon: ''
        },{
          title: false,
          display: 'Dar por terminada',
          action: 'dothat',
          icon: 'fa-check'
        },{
          title: false,
          display: 'Suspender',
          action: 'dothat',
          icon: 'fa-pause'
        },{
          title: false,
          display: 'Archivar',
          action: 'dothat',
          icon: 'fa-file'
        },{
          title: false,
          display: 'Cambiar de categoria',
          action: 'dothat',
          icon: 'fa-list-ol'
        }
      ]
    },
    actions: {

      dothat: (title) => {
        console.log(title)
      }

    }
  },

  statusStyles: {
    'status-1': {
      flag: 'Archivado',
      style: { 'color':'hsl(0, 0%, 80%)' }
    },
    'status0': {
      flag: 'Pendiente',
      style: { 'color':'hsl(340, 80%, 60%)' }
    },
    'status1': {
      flag: 'Compleado',
      style: { 'color':'hsl(170, 100%, 40%)' }
    }
  }
}
