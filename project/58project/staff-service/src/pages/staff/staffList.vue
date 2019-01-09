<template>
    <div class="authority">

        <div class="search-container">
            <div class="search-title">
                服务人员查找系统
            </div>
            <div class="search-box">
                <el-select v-model="value" placeholder="请选择" class="input-with-select">
                    <el-option
                        v-for="item in option"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <input type="text" placeholder="请输入员工号或姓名">
            </div>
        </div>
        <div class="selection-box">

            <el-form label-position="left" class="selection-form">
                <el-form-item label="活动性质" label-width="120px">
                    <el-checkbox-group v-model="form.type" class="group">
                        <el-checkbox label="美食/餐厅线上活动1" name="type"></el-checkbox>
                        <el-checkbox label="地推活动2" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动3" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光4" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动5" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光6" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动7" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光8" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动9" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光10" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </div>
        <div class="has-chosen">
            111
        </div>

        <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">  
            <el-form-item label="服务类型">
                <el-cascader
                    :options="options"
                    v-model="formInline.serviceType"
                    @change="handleChange">
                </el-cascader>
            </el-form-item>

            <el-form-item label="服务区域">
                <el-cascader
                    :options="options"
                    v-model="formInline.serviceScope"
                    @change="handleChange">
                </el-cascader>
            </el-form-item>
            
            <el-form-item label="薪资范围">
                <el-select v-model="formInline.price" placeholder="薪资范围">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form> -->
        <el-table
            :data="tableData"
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
                label="操作"
                prop="name"
                align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button
                        size="mini"
                        type="danger"
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
                value: '',
                itemList: [
                    {
                        checked: false,
                        name: "大东",
                    },
                    {
                        checked: false,
                        name: "沈河",
                    }
                ],
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

                formInline: {
                    serviceType: [],
                    serviceScope: [],
                    price: ''
                },
                option:[
                    {
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶',
                    },
                ],
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        },]
                    },]
                }],
                input5: '',
                select: '',
                form:{
                    type: []
                }
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            onSubmit() {
                console.log('submit!');
            },
            handleChange(value) {
                console.log(value);
            }
        },
    }
</script>
<style lang="scss" scoped>
    
    .search-container{
        background-color: #f5f5f6;
        line-height: 1;
        padding: 30px 0 26px 0;
        margin-bottom: 25px;
        .search-title{
            height:30px;
            line-height: 30px;
            font-size: 16px;
            width:1100px;
            margin: 0 auto;
            margin-bottom: 25px;
        }
        .search-box{
            position: relative;
            width: 1100px;
            height: 45px;
            margin: 0 auto;
            &:after{
                position: absolute;
                content:'';
                height: 25px;
                width: 1px;
                background: #c0c4cc;
                left: 120px;
                top : 10px;
            }
            .input-with-select{
                position: absolute;
            }
            & /deep/ .el-select {
                background: #fff;
                height: 45px;
                width: 120px;
                border: none;
            }
            & /deep/ input {
                display: inline-block;
                height: 45px;
                border: none;
                line-height: 45px;
            }
            input{
                vertical-align: top;
                box-sizing: border-box;
                width: 710px;
                height: 45px;
                line-height: 45px;
                padding: 0 22px 0 133px;
                border: 0;
                box-shadow: 0 1px 2px -1px rgba(0,0,0,0.2);
                border-radius: 2px;
                outline: none;
            }
        }
    }
    .selection-box{
        padding: 14px 25px;
        height: 335px;
        width:1100px;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius:5px;
        & /deep/ .el-form-item__content{
            line-height: 30px;
        }
        .selection-form{
            padding: 0;
            .group /deep/.el-checkbox{
                margin: 0;
                width: 180px;
            }
        }
        .selection-form /deep/ .el-form-item{
            margin-bottom: 0;
        }
        
    }
    
    .has-chosen{
        height: 22px;
        margin: 20px auto;
    }
</style>
