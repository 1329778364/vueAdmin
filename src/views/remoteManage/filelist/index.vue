<template>
  <div class="app-container">
    <el-button class="filter-item" style="position:absolute;right: 20px; top:-20px" type="primary" icon="el-icon-plus" @click="handleCreate">
      增加
    </el-button>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      :model="formData.fileList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="FilePath" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.filepath }}</span>
        </template>

      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!=='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="FilePath" prop="filepath">
          <el-input v-model="temp.filepath" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import waves from '../../../directive/waves' // waves directive
import Pagination from '../../../components/Pagination' // secondary package based on el-pagination

export default {
  name: 'FileList',
  components: { Pagination },
  directives: { waves },
  props: {
      formData: {
        type: Object
      }
    },
  data() {
    return {
      tableKey: 0,
      list: [],
      listLoading: false,
      lastTime: '',
      lastFilePath: '',
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        filepath: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  },
  computed:{
    total: function () {
      return this.list.length;
    }
  },
  methods: {
    getList(){
      return this.list;
    },
    handleSubmit() {
      this.$emit('comfirmFilelist', this.list)
    },
    resetTemp() {
      this.temp = {
        timestamp: this.lastTime,
        filepath: this.lastFilePath
      }
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      /*将表单数据提交到 父组件*/
      this.handleSubmit()
    },
    createData() {
      /* 保存本次修改的时间*/
      // this.lastTime = this.parseTime(this.temp.timestamp, '{y}-{m}-{d}')
      this.lastFilePath = this.temp.filepath;
       if (this.formData.fileList === undefined){
         this.formData.fileList = []
       }
      this.list.unshift({filepath: this.lastFilePath});
      this.formData.fileList.unshift(this.lastFilePath);

      this.dialogFormVisible = false;

      this.$notify({
        title: 'Success',
        message: 'Created Successfully',
        type: 'success',
        duration: 2000
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
    },
    updateData() {
      const index = this.list.findIndex(v => v.id === this.temp.id);
      this.list.splice(index, 1, this.temp);
      this.dialogFormVisible = false;
      this.$notify({
        title: 'Success',
        message: 'Update Successfully',
        type: 'success',
        duration: 2000
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    }
  }
}
</script>
