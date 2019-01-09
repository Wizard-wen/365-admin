<template>
    <div class="authority">
        <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="max-width: 1600px;margin: 0 auto;">
            <el-table-column
                style="padding: 0 20px;"
                label="Date"
                prop="date"
                align="center">
            </el-table-column>
            <el-table-column
                label="Name"
                prop="name"
                align="center">
            </el-table-column>
            <el-table-column
                align="right">
                <template slot="header" slot-scope="scope" >
                    <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"
                        style="max-width: 300px;margin-right: 30px;"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        style="margin-right: 40px;"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
        search: ''
      }
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
  }
</script>
<style lang="scss" scoped>

</style>