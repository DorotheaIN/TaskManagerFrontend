<template>
  <div style="padding:30px;">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-input v-model="taskSetTitle" placeholder="Search keyword" style="margin-bottom:30px;" >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3" :offset="3">
        <el-button round @click="dialogVisible = true">添加任务集</el-button>
      </el-col>
    </el-row>
<!--    <el-row v-for="(row,index) in sliceList(taskSetList,2)" :key="index">-->
    <el-row v-for="(row,index) in sliceList($store.getters.setList,2)" :key="index">
      <br>
      <br>
      <el-col v-for="(item,i) in row" :key="i" span="12">
        <todo-card :set="item"></todo-card>
      </el-col>
      <br>
      <br>
    </el-row>
    <el-dialog
      title="New TaskSet Info"
      :visible.sync="dialogVisible">
      <el-form :model="taskSet">
        <el-form-item label="Title" :label-width="formLabelWidth">
          <el-input v-model="taskSet.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="State" :label-width="formLabelWidth">
          <el-radio v-model="taskSet.released" :label="false">private</el-radio>
          <el-radio v-model="taskSet.released" :label="true">public</el-radio>
        </el-form-item>
        <el-form-item label="Deadline" :label-width="formLabelWidth">
          <el-date-picker
            v-model="taskSet.deadline"
            type="datetime"
            placeholder="选择日期时间"
            default-time="23:59:59">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Tag" :label-width="formLabelWidth">
          <el-tag
            :key="tag"
            v-for="tag in taskSet.genres"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import TodoCard from '@/components/TodoCard'
import { getSetsByCreater } from '@/api/task'

export default {
  name: 'Dashboard',
  components:{
    TodoCard
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
      taskSetList: [
        {
          id: 0,
          name: 'Leisure Study',
          released: false,
          deadline: '2022-05-12 00:00:00',
          genres: ['life']
        },
        {
          id: 1,
          name: 'Leisure Activity',
          released: true,
          deadline: '2022-05-12 00:00:00',
          genres: ['life']
        },
        {
          id: 2,
          name: 'Leisure Activity',
          released: true,
          deadline: '2022-05-12 00:00:00',
          genres: ['life']
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
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
  created() {
    this.fetchData()
  },
  methods: {
    handleClose(tag) {
      this.taskSet.genres.splice(this.taskSet.genres.indexOf(tag), 1);
    },
    fetchData() {
      this.$store.dispatch('task/getSetListByUser', '1@qq.com')
      // getSetsByCreater({'creatermail':'1@qq.com'}).then((response) => {
      //   console.log("get",response)
      //   // this.taskSetList = response
      //   this.taskSetList = []
      //   response.forEach((item) => {
      //     console.log(item)
      //     let todoArr = []
      //     item.todos.forEach((todo) => {
      //       todoArr.push(
      //         {
      //           id: todo.id,
      //           title: todo.name,
      //           completed: (todo.state == 0) ? false : true,
      //           ddl: this.standardTime(todo.deadline),
      //           owner: item.name
      //         }
      //       )
      //     })
      //     this.taskSetList.push({
      //       id:item.id,
      //       name:item.name,
      //       released: (item.state == 0) ? false : true,
      //       deadline: item.deadline,
      //       genres: item.tag.split(';').filter((t) => {
      //         return t != ""
      //       }),
      //       todos:todoArr
      //     })
      //   })
      //   console.log(this.taskSetList)
      // })
    },
    standardTime(time) {
      console.log("raw", time)
      console.log("then", time.replace('T', ' '))
      return time.replace('T', ' ')
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
