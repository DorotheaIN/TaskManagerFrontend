<template>
  <div class="app-container">
    <calendar-heatmap :values="activeData" :end-date="end" :range-color="['#ebedf0', '#dae2ef', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']"/>
    <echarts :x='x' :y="y" ids='b' type="bar"></echarts>
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
      'mail'
    ])
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
    }
  },
  created() {
    this.fetchData();
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

