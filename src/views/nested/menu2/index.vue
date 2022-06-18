<template>
  <div style="padding:30px;">
    <el-row>
      <el-col span="8">
        <todo-card></todo-card>
      </el-col>
      <el-col span="8">
        <todo-card></todo-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import TodoCard from '@/components/TodoCard'

export default {
  name: 'Dashboard',
  components:{
    TodoCard
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
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
</style>
