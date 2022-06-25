<template>
  <div style="padding:30px;">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-input v-model="taskSetTitle" placeholder="Search keyword" style="margin-bottom:30px;" >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row v-for="(row,index) in sliceList(taskSetList,2)" :key="index">
      <br>
      <br>
      <el-col v-for="(item,i) in row" :key="i" span="12">
        <public-set :set="item"></public-set>
      </el-col>
      <br>
      <br>
    </el-row>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import PublicSet from '@/components/PublicSet'
import { getCollectSet } from '@/api/task'

export default {
  name: 'Collect',
  components:{
    PublicSet
  },
  data() {
    return {
      taskSetTitle: '',
      dialogVisible: false,
      taskSet: {
        name: '',
        released: '',
        deadline: '',
        genres: []
      },
      formLabelWidth: '120px',
      inputVisible: false,
      inputValue: '',
      taskSetList: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'mail'
    ]),
    sliceList() {
      return function (data,count) {
        if (data != undefined) {
          let index = 0;
          let arrTemp = [];
          for (let i = 0; i < data.length; i++) {
            index = parseInt(i / count);
            if (arrTemp.length <= index) {
              arrTemp.push([]);
            }
            arrTemp[index].push(data[i])
          }
          return arrTemp
        }
      }
    }
  },
  methods: {
    fetchData() {
      getCollectSet({
        'mail': this.mail
      }).then((response) => {
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
            todos: todoArr,
            creatermail: item.creatermail
          })
        })
        console.log(list)
        this.taskSetList = list
        console.log(this.taskSetList)
      })
    },

    handleClose(tag) {
      this.taskSet.genres.splice(this.taskSet.genres.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.taskSet.genres.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
