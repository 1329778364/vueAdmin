<template>
  <div>
    <DynamicForm style="height: 100%;text-align: center"
               :formConfig="formConfig"
               :formData="formData"
               :isUpdate=0
               :submit="submit"
               :getOptionFun="getOptionFun"
               :getRulesFun="getRulesFun"
    >
      <template slot="date" slot-scope="{condition}">
          <DatePicker :condition="condition"
                    :formData="formData"
          />
      </template>

      <template slot="fileList" slot-scope="{condition}">
          <FileList v-show="showFileList" :condition="condition"
                    :formData="formData"
          />
      </template>
    </DynamicForm>
<!--    <FileList :formData="formData" />-->
  </div>
</template>

<script>
  import {uploadFormConfig} from '../../../../config/uploadFormConfig'
  import VerificatioCode from './VerificatioCode'
  import {reqItemOptions} from '../../../api/common'
  import {upload} from "../../../api/uploadForm"
  import FileList from '../filelist'
  import DatePicker from './DatePicker'

  export default {
    name: 'index',
    components: {
      FileList,
      VerificatioCode,
      DatePicker
    },
    data() {
      return {
        formData: {},
        formConfig: uploadFormConfig,
        showFileList: true
      };
    },
    // watch:{
    //   formData(o, n){
    //     n.fileType.forEach(item=>{
    //       /* 选项包含自定义数据时 显示文件列表 */
    //       if(item[1]==="Z"){
    //         this.showFileList = true;
    //       }
    //     })
    //   }
    // },
    methods: {
      submit(json) {
        const devids = this.formData.onlineDevids;
        const fileType = [];
        // console.log(this.formData);
        this.formData.fileType.forEach(item => {
          fileType.push(item[1])
        });

        console.log("发送数据：", {
          "topic": "sys12323",
          "data": {
            "type": "A",
            "subtype": fileType.join(','),
            "list": this.formData.fileList,
            "date": this.formData.date
          }
        });

        devids.forEach(async devid => {
          await upload(devid, fileType.join(','), this.formData.date, this.formData.fileList)
        });

        this.$alert('提交成功，请稍后查看', '提示');
        console.log(this.formData);
      },
      getOptionFun: async function (tranCode) {
        const result = await reqItemOptions(tranCode);
        console.log(result);
        return result.data;
      },
      getRulesFun(ruleName) {
        return require('../../../utils/validate.js')[ruleName]
      }
    }

  }
</script>

<style scoped>

</style>
