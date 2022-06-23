<template>
  <div class="app-container">
    <calendar-heatmap :values="activeData" :end-date="end" :range-color="['#ebedf0', '#dae2ef', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']"/>
  </div>
</template>

<script>
import { CalendarHeatmap } from 'vue-calendar-heatmap'
import { getActiveMap } from "@/api/task";
import moment from "moment";

export default {
  components:{
    CalendarHeatmap
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
      activeData: [],
      end: moment(new Date()).format('YYYY-MM-DD')
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
    fetchData(){
      getActiveMap().then((response) => {
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

