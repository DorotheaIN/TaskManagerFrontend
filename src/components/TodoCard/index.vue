<template>
  <div class="app">
    <div class="task-header">
      <h1 class="task-header-title">{{set.name}}</h1>
      <div class="task-header-icon">
        <el-switch
          style="padding-right: 20px; padding-bottom: 3px"
          v-model="released"
          @click.native="updateReleased"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
<!--        <i style="padding-right: 20px" class="el-icon-delete" ></i>-->
        <i class="el-icon-delete" @click="deletSet"></i>
      </div>
    </div>
    <div class="task-tools">
      <div class="task-count">{{set.todos.length}} tasks</div>
      <div>
        <span class="tag approved" v-for="i in set.genres" style="margin-right: 10px">{{i}}</span>
      </div>
      <div class="task-filter">
        <button class="task-filter is-active">All</button>
        <button class="task-filter" data-param="completed" data-value="false">Active</button>
        <button class="task-filter" data-param="completed" data-value="true">Completed</button>
      </div>
    </div>
    <form class="task-form">
      <div class="inputDeep">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="deadline"
          :editable="false"
          placeholder="Pick a deadline..."
          type="datetime">
        </el-date-picker>
      </div>
      <input class="task-input" placeholder="Add a new task..." autofocus="true" v-model="input" @keyup.enter="addNewTask(input)"></input>

      <button class="task-button">Add Task</button>
    </form>
    <div v-for="task in set.todos" class="task-list">
      <div :class="task.completed ? 'task-item is-completed' : 'task-item' ">
        <input class="task-status" type="checkbox" v-model="task.completed" data-id="-3" @click="updateCompleted(task)">
        <label class="task-name" >
          {{task.title}}
<!--          <el-divider direction="vertical"></el-divider>-->
          <div class="task-time">{{task.ddl | modify('2001-01-01 00:00:00')}}</div>
        </label>
        <button class="task-delete" data-id="-3" @click="deleteTask(task)"></button>
      </div>
    </div>
  </div>
</template>

<script>
import TimePicker from '@/components/TimePicker';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { mapGetters } from 'vuex'

export default {
  name: 'TodoCard',
  components: {
    TimePicker
  },
  props: [
    'set'
  ],
  computed: {
    ...mapGetters([
      'mail'
    ])
  },
  data() {
    return {
      released: this.set.released,
      checkmenuVisible: true,
      title: 'Leisure Activity',
      input: '',
      deadline: '',
      todolist:[
        {
          id: 0,
          title: 'watch a movie',
          completed: false,
          ddl: '2022-05-11 19:30',
          finishtime: '2001-01-01 00:00:00',
          owner: 'Leisure Activity'
        },
        {
          id: 1,
          title: 'genshin impact',
          completed: true,
          ddl: '2022-05-11 19:30',
          owner: 'Leisure Activity',
          finishtime: '2001-01-01 00:00:00'
        }
      ]
    }
  },
  methods: {
    deletSet() {
      const data = {
        param: 'id=' + this.set.id,
        actual: this.set.id
      }
      this.$store.dispatch('task/deleteCurSet', data)
    },
    addNewTask(key) {
      this.input = ''
      const task = {
        id: uuidv4(),
        title: key,
        ddl: (this.deadline === '') ? '2001-01-01 00:00:00' : this.deadline.toString(),
        finishtime: '2001-01-01 00:00:00',
        completed: false,
        owner: this.set.id
      }
      this.deadline = ''
      const final = 'id=' + task.id + '&name=' + key + '&deadline=' + task.ddl + '&finishtime=' + '2001-01-01 00:00:00' + '&state=' + '0' + '&setid=' + this.set.id
      const data = {
        todo: task,
        param: final
      }
      this.$store.dispatch('task/addNewTodo', data)
    },
    deleteTask(todo) {
      const data = {
        param: 'id=' + todo.id,
        actual: {
          setid: todo.owner,
          todoid: todo.id
        }
      }
      this.$store.dispatch('task/deleteCurTodo', data)
    },
    updateCompleted(todo) {
      todo.completed = !todo.completed
      console.log(todo.completed)
      console.log(todo.completed ? 1 : 0)
      const url = 'id=' + todo.id + '&name=' + todo.title + '&deadline=' + todo.ddl + '&finishtime=' + moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + '&state=' + (todo.completed ? 1 : 0) + '&setid=' + todo.owner
      const data = {
        param: url,
        actual: todo
      }
      // console.log(data)
      this.$store.dispatch('task/updateCurTodo', data)
    },
    updateReleased() {
      let data = {
        param: '',
        actual: this.set
      }
      data.actual.released = this.released
      const url = 'id=' + data.actual.id + '&name=' + data.actual.name +
        '&createtime=' + moment(new Date()).format('YYYY-MM-DD HH:mm:ss') +
        '&tag=' + data.actual.genres.join(';') + '&ddl=' + data.actual.deadline + '&creatermail=' +
        this.mail + '&state=' + (data.actual.released ? 1 : 0)
      data.param = url
      // console.log(data)
      this.$store.dispatch('task/updateCurSet', data)
    }
  },
  filters:{
    modify(value, dflt){
      if(value === dflt){
        console.log('x')
        return ''
      }else {
        console.log('y',value)
        return value
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap');

* {
  box-sizing: border-box;
  outline: 0;
}


:root {
  --font: 'DM Sans', sans-serif;
  --bg-color: #f5f8ff;;
  --main-color: #353536;
  --secondary-color: #8e92a4;
  --main-text-color: #5d606b;
  --secondary-dark-color: #9496a5;
  --tag-color-one: #e0fbf6;
  --tag-color-text-one: #58c2a9;
  --tag-color-two: #ece7fe;
  --tag-color-text-two: #8972f3;
  --tag-color-three: #fde7ea;
  --tag-color-text-three: #e77f89;
  --tag-color-four: #f7f8fc;
  --tag-color-text-four: #a0a6b5;
  --checkbox-color: #009e90;
  --button-color: #49beb7;
  --box-color: #fff1d6;
  --box-color-2: #d3e6ff;
  --box-color-3: #ffd9d9;
  --box-color-4: #daffe5;
  --task-color: #777982;
}

body {
  background-image: linear-gradient( 102.7deg, rgba(253,218,255,1) 8.2%, rgba(223,173,252,1) 19.6%, rgba(173,205,252,1) 36.8%, rgba(173,252,244,1) 73.2%, rgba(202,248,208,1) 90.9% );
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  height: 100vh;
  overflow: hidden;
}

.app {
  max-width: 600px;
  width: 100%;
  margin: auto;
  background-color: #fff;
  font-family: var(--font);
  border-radius: 16px;
  font-size: 15px;
  overflow: hidden;
  color: #455963;
  box-shadow: 0 20px 80px rgba(0,0,0,.3);
}

.task-list {
  max-height: 60vh;
  overflow: auto;
}

.task-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0 0px;
}
.task-header-icon {
  border: 0;
  padding: 16px 19px;
  background: 0;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  font-family: var(--font);
  color: #8a9ca5;
  border-radius: 20px;
}

.task-status {
  appearance: none;
  width: 18px;
  height: 18px;
  cursor: pointer;
  border: 2px solid #bbbdc7;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 10px;
  position: relative;
}

.task-status:checked {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='405.272' height='405.272'%3e%3cpath d='M393.401 124.425L179.603 338.208c-15.832 15.835-41.514 15.835-57.361 0L11.878 227.836c-15.838-15.835-15.838-41.52 0-57.358 15.841-15.841 41.521-15.841 57.355-.006l81.698 81.699L336.037 67.064c15.841-15.841 41.523-15.829 57.358 0 15.835 15.838 15.835 41.514.006 57.361z' fill='%23fff'/%3e%3c/svg%3e");
  background-size: 10px;
  background-color: #4acea3;
  border-color: #38bb90;
  background-repeat: no-repeat;
  background-position: center;
}

.task-delete {
  margin-left: 10px;
}

.task-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 12px 20px;
}

.task-item + .task-item {
  border-top: 1px solid #eef0f5;
}

.task-item:hover {
  background-color: #f6fbff;
}

.task-name {
  margin-right: auto;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-item.is-completed > .task-name {
  text-decoration: line-through wavy rgba(0,0,0,.3);
}

.task-item.is-completed {
  background-color: rgba(74, 206, 163, 0.1);
}

.task-header-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  padding: 20px 20px 6px 20px;
}

.task-tools {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0 20px;
}

.task-filter {
  border: 0;
  padding: 3px 8px;
  background: 0;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  font-family: var(--font);
  color: #8a9ca5;
  border-radius: 20px;
}

.task-filter.is-active {
  background-color: #7996a5;
  color: #fff;
}

.task-count {
  color: #8a9ca5;
  font-size: 14px;
}

.task-form {
  display: flex;
  margin-top: 10px;
}

.task-input {
  flex: 1;
  font-size: 16px;
  font-family: var(--font);
  padding: 10px 20px;
  border: 0;
  box-shadow: 0 -1px 0 #e2e4ea inset;
  color: #455963;
}

.task-input::placeholder {
  color: #a8b5bb;
}

.task-input:focus {
  box-shadow: 0 -1px 0 #bdcdd6 inset;
}

.task-button { display: none; }

.task-delete {
  border: 0;
  width: 18px;
  height: 18px;
  padding: 0;
  overflow: hidden;
  background-color: transparent;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23dc4771' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 174.239 174.239'%3e%3cpath d='M87.12 0C39.082 0 0 39.082 0 87.12s39.082 87.12 87.12 87.12 87.12-39.082 87.12-87.12S135.157 0 87.12 0zm0 159.305c-39.802 0-72.185-32.383-72.185-72.185S47.318 14.935 87.12 14.935s72.185 32.383 72.185 72.185-32.384 72.185-72.185 72.185z'/%3e%3cpath d='M120.83 53.414c-2.917-2.917-7.647-2.917-10.559 0L87.12 76.568 63.969 53.414c-2.917-2.917-7.642-2.917-10.559 0s-2.917 7.642 0 10.559l23.151 23.153-23.152 23.154a7.464 7.464 0 000 10.559 7.445 7.445 0 005.28 2.188 7.437 7.437 0 005.28-2.188L87.12 97.686l23.151 23.153a7.445 7.445 0 005.28 2.188 7.442 7.442 0 005.28-2.188 7.464 7.464 0 000-10.559L97.679 87.127l23.151-23.153a7.465 7.465 0 000-10.56z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  display: none;
}

.task-item:hover > .task-delete {
  display: block;
}

.task-empty {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23f4f4f4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 486.463 486.463'%3e%3cpath d='M243.225 333.382c-13.6 0-25 11.4-25 25s11.4 25 25 25c13.1 0 25-11.4 24.4-24.4.6-14.3-10.7-25.6-24.4-25.6z'/%3e%3cpath d='M474.625 421.982c15.7-27.1 15.8-59.4.2-86.4l-156.6-271.2c-15.5-27.3-43.5-43.5-74.9-43.5s-59.4 16.3-74.9 43.4l-156.8 271.5c-15.6 27.3-15.5 59.8.3 86.9 15.6 26.8 43.5 42.9 74.7 42.9h312.8c31.3 0 59.4-16.3 75.2-43.6zm-34-19.6c-8.7 15-24.1 23.9-41.3 23.9h-312.8c-17 0-32.3-8.7-40.8-23.4-8.6-14.9-8.7-32.7-.1-47.7l156.8-271.4c8.5-14.9 23.7-23.7 40.9-23.7 17.1 0 32.4 8.9 40.9 23.8l156.7 271.4c8.4 14.6 8.3 32.2-.3 47.1z'/%3e%3cpath d='M237.025 157.882c-11.9 3.4-19.3 14.2-19.3 27.3.6 7.9 1.1 15.9 1.7 23.8 1.7 30.1 3.4 59.6 5.1 89.7.6 10.2 8.5 17.6 18.7 17.6s18.2-7.9 18.7-18.2c0-6.2 0-11.9.6-18.2 1.1-19.3 2.3-38.6 3.4-57.9.6-12.5 1.7-25 2.3-37.5 0-4.5-.6-8.5-2.3-12.5-5.1-11.2-17-16.9-28.9-14.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center;
  font-weight: 500;
  font-size: 18px;
  background-size: 80px;
}

@media (max-width: 600px) {
  .task-delete {
    display: block;
  }
}

.inputDeep>>>.el-input__inner {
  flex: 1;
  font-size: 16px;
  font-family: var(--font);
  padding: 10px 10px 10px 36px;
  border: 0;
  box-shadow: 0 -1px 0 #e2e4ea inset;
  color: #455963;
}
.task-time{
  width: 150px;
  float: right;
  flex: 2;
  white-space: nowrap;
}


.tag.approved{
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  background-color: #e0fbf6;
  color: #58c2a9;
  font-weight: bold;
  text-transform: uppercase;
}

.tag {
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 20px;

  &.approved {
     background-color: #e0fbf6;
     color: #58c2a9;
   }

  &.progress {
     background-color: #ece7fe;
     color: #8972f3;
   }

  &.review {
     background-color: #fde7ea;
     color: #e77f89;
   }

  &.waiting {
     background-color: #f7f8fc;
     color: #a0a6b5;
   }
}


</style>
