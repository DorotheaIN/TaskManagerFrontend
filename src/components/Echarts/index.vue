<template>
  <div class="container">
    <div
      :id="ids"
      :style="{ width: '500px', height: '600px', border: '1px solid #000' }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  props: ["x", "y", "ids", "type"],
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.ids));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",   // y轴的名字
        },
        tooltip: {
          show: true, //当光标移上柱形图时是否有文本提示
        },
        xAxis: {
          type: "category",
          data: this.x,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.y,
            type: this.type,
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
#a,
#b {
  float: left;
  margin: 20px 50px;
}
</style>
