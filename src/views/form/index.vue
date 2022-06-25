<template>
  <div class="app-container">
    <calendar-heatmap :values="activeData" :end-date="end" :range-color="['#ebedf0', '#dae2ef', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']"/>
    <echarts :pie-data="pie" title="任务完成情况"></echarts>
<!--    <echarts :pie-data="TypeData" title="任务类型比例"></echarts>-->
  </div>
</template>

<script>
import { CalendarHeatmap } from 'vue-calendar-heatmap'
import { getActiveMap } from "@/api/task";
import moment from "moment";
import { mapGetters } from 'vuex'
import Echarts from '@/components/Echarts'
export default {
  components:{
    CalendarHeatmap,
    Echarts
  },
  data() {
    return {
      TypeData:[
        {
          value: 463,
          name: "完成"
        },
        {
          value: 395,
          name: "逾期"
        },
        {
          value: 157,
          name: "未完成"
        }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      x:["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      y:[150, 230, 224, 218, 135, 147, 260],
      activeData: [],
      end: moment(new Date()).format('YYYY-MM-DD')
    }
  },
  computed: {
    ...mapGetters([
      'mail',
    ]),
    pie(){
      let setList = this.$store.getters.setList
      console.log('cal',setList)
      let done = 0, delay = 0, to = 0
      let cur = new Date()
      setList.forEach((set) => {
        set.todos.forEach((todo) => {
          if(todo.completed){
            done++
          }else {
            let deadline = new Date(Date.parse(todo.ddl.replace('-', '/')))
            if(deadline < cur){
              delay++
            }else {
              console.log(todo)
              to++
            }
          }
        })
      })
      console.log(done)
      return [
        {
          value: done,
          name: "完成"
        },
        {
          value: delay,
          name: "逾期"
        },
        {
          value: to,
          name: "未完成"
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchData() {
      getActiveMap({
        mail: this.mail
      }).then((response) => {
        console.log(response)
        response.forEach((item) => {
          this.activeData.push({
            date: item.date,
            count: item.count
          })
        })
      })
      this.$store.dispatch('task/getSetListByUser', this.mail)
      console.log('finish get')
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.cal()
    console.log("done")
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

