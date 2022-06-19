import { addTodo, getSetsByCreater, deleteSet, deleteTodo, addSet, updateTodo, updateSet } from '@/api/task'
import qs from 'qs'

const getDefaultState = () => {
  return {
    taskSetList: [
      {
        id: 0,
        title: 'watch a movie',
        completed: false,
        ddl: '2022-05-11 19:30',
        owner: 'Leisure Activity',
        finishtime: '2001-01-01 00:00:00',
        todos: []
      },
      {
        id: 1,
        title: 'genshin impact',
        completed: true,
        ddl: '2022-05-11 19:30',
        owner: 'Leisure Activity',
        finishtime: '2001-01-01 00:00:00',
        todos: []
      }
    ]
  }
}

const state = getDefaultState()

const mutations = {
  SET_SETLIST: (state, list) => {
    state.taskSetList = list
  },
  ADD_TODO: (state, todo) => {
    state.taskSetList.forEach((set) => {
      if (set.id === todo.owner) {
        set.todos.push(todo)
      }
    })
  },
  DELETE_TODO: (state, actual) => {
    state.taskSetList.forEach((set) => {
      if (set.id === actual.setid) {
        set.todos = set.todos.filter(todo => todo.id !== actual.todoid)
      }
    })
  },
  ADD_SET: (state, actual) => {
    state.taskSetList.push(actual)
  },
  DELETE_SET: (state, actual) => {
    state.taskSetList = state.taskSetList.filter(set => set.id !== actual)
  },
  UPDATE_TODO: (state, todo) => {
    state.taskSetList.forEach((set) => {
      if (set.id === todo.owner) {
        set.todos = set.todos.map(item => {
          if (item.id === todo.id) {
            return todo
          } else {
            return item
          }
        })
      }
    })
  },
  UPDATE_SET: (state, actual) => {
    state.taskSetList = state.taskSetList.map(item => {
      if (item.id === actual.id) {
        return actual
      } else {
        return item
      }
    })
  }
}

const actions = {
  getSetListByUser({ commit }, mail) {
    console.log('getSetListByUser', mail)
    return new Promise((resolve, reject) => {
      getSetsByCreater({ 'creatermail': mail }).then((response) => {
        const list = []
        console.log('get', response)
        response.forEach((item) => {
          const todoArr = []
          item.todos.forEach((todo) => {
            todoArr.push(
              {
                id: todo.id,
                title: todo.name,
                completed: todo.state !== 0,
                ddl: todo.deadline.replace('T', ' '),
                owner: item.id,
                finishtime: todo.finishtime
              }
            )
          })
          list.push({
            id: item.id,
            name: item.name,
            released: item.state !== 0,
            deadline: item.deadline.replace('T', ' '),
            genres: item.tag.split(';').filter((t) => {
              return t !== ''
            }),
            todos: todoArr
          })
        })
        console.log(list)
        commit('SET_SETLIST', list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  addNewTodo({ commit }, data) {
    console.log('addNewTodo', data)
    return new Promise((resolve, reject) => {
      addTodo(data.param, qs.stringify(data.todo)).then((response) => {
        console.log('post', response)
        commit('ADD_TODO', data.todo)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteCurTodo({ commit }, data) {
    console.log('deleteCurTodo', data)
    return new Promise((resolve, reject) => {
      deleteTodo(data.param, '').then((response) => {
        commit('DELETE_TODO', data.actual)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  addNewSet({ commit }, data) {
    return new Promise((resolve, reject) => {
      addSet(data.param, '').then((response) => {
        commit('ADD_SET', data.actual)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteCurSet({ commit }, data) {
    return new Promise((resolve, reject) => {
      deleteSet(data.param, '').then((response) => {
        commit('DELETE_SET', data.actual)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateCurTodo({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateTodo(data.param, '').then((response) => {
        console.log('updateTodo', response)
        commit('UPDATE_TODO', data.actual)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateCurSet({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateSet(data.param, '').then((response) => {
        console.log('updateSet', response)
        commit('UPDATE_SET', data.actual)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

