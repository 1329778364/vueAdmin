<template>
    <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="dateVal"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>
  import {parseTime} from "../../../utils";

  export default {
    name: "DatePicker",
    props:{
      formData:{
        type: Object
      }
    },
    watch:{
      dateVal(n, o){
        let date = parseTime(n, "{y}-{m}-{d}");
        this.formData.date = date;
      }
    },
    data(){
      return {
        dateVal: ""
      }
    }
  }
</script>

<style scoped>

</style>
