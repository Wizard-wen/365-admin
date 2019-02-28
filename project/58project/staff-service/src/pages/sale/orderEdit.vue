<template>
    <div class="authority">



        <div class="order-message-box">
            <div class="order-base line-bottom-1px">
                <div class="base-box line-bottom-1px">
                    <div class="order-base-title ">
                        订单基本信息
                        <el-button type="primary" icon="el-icon-edit" circle size="small" class="edit-btn"></el-button>
                        <el-button type="primary" icon="el-icon-arrow-down" circle size="small" class="edit-btn"></el-button>
                    </div>
                </div>
                
                <div class="baseForm-box">
                    <el-form class="baseForm" ref="form" :model="form" label-width="120px">

                        <el-form-item label="创建人">
                            <el-input v-model="form.createMan"></el-input>
                        </el-form-item>
                        <el-form-item label="服务类型" placeholder="月嫂">
                            <el-input v-model="form.serviceType"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称" >
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户联系方式">
                            <el-input v-model="form.number"></el-input>
                        </el-form-item>
                        <el-form-item label="服务地址">
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>

                        <el-form-item label="服务周期">
                            <el-date-picker
                                v-model="form.cycle"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"></el-date-picker>
                        </el-form-item>


                        <el-form-item label="订单来源">
                            <el-select v-model="form.origin" placeholder="请选择订单来源">
                                <el-option label="线上" value="shanghai"></el-option>
                                <el-option label="线下" value="beijing"></el-option>
                                <el-option label="渠道" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="订单备注信息">
                            <el-input type="textarea" v-model="form.desc"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="service-list line-bottom-1px">
                <div class="service-box line-bottom-1px">
                    <div class="order-service-title">
                        待选服务人员
                        <el-button type="primary" icon="el-icon-edit" circle size="small" class="edit-btn"></el-button>
                    </div>
                </div>
                <div class="service-table">
                    <el-table
                        :height="300"
                        :data="serviceTable"
                        border
                        style="width: 80%;margin: 0 auto;">
                        <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="地址">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="service-record line-bottom-1px">
                <div class="service-record-box line-bottom-1px">
                    <div class="order-record-title">
                        服务人员匹配日志
                        <el-button type="primary" icon="el-icon-edit" circle size="small" class="edit-btn"></el-button>
                        <el-button type="primary" icon="el-icon-arrow-down" circle size="small" class="edit-btn"></el-button>
                    </div>
                </div>
                <div class="record-list">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>卡片名称</span>
                            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                        </div>
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
            </div>
            
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <el-table
                    :height="300"
                    :data="serviceTable"
                    style="width: 100%;margin: 0 auto;">
                    <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    <el-button type="text" icon="el-icon-edit" circle size="small" style="float: right;">编辑</el-button>
                    <el-button type="text" icon="el-icon-arrow-down" circle size="small" style="float: right;">收起</el-button>
                </div>
                <el-form class="baseForm" ref="form" :model="form" label-width="120px">

                    <el-form-item label="创建人">
                        <el-input v-model="form.createMan"></el-input>
                    </el-form-item>
                    <el-form-item label="服务类型" placeholder="月嫂">
                        <el-input v-model="form.serviceType"></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称" >
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="客户联系方式">
                        <el-input v-model="form.number"></el-input>
                    </el-form-item>
                    <el-form-item label="服务地址">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>

                    <el-form-item label="服务周期">
                        <el-date-picker
                            v-model="form.cycle"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>


                    <el-form-item label="订单来源">
                        <el-select v-model="form.origin" placeholder="请选择订单来源">
                            <el-option label="线上" value="shanghai"></el-option>
                            <el-option label="线下" value="beijing"></el-option>
                            <el-option label="渠道" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="订单备注信息">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>


            <div style="height:1000px;width:100%;">

            </div>
            <div class="order-pull" @click="pullSearch">
                <i class="el-icon-arrow-left pull-icon"></i>
            </div>
        </div>


        <div class="order" v-show="isSearch">
            <div class="order-message">
                <div class="search-head">
                    <div class="header">
                        <el-input 
                            v-model="searchForm.name" 
                            prefix-icon="el-icon-search"
                            placeholder="请输入服务人员姓名"></el-input>
                        <div class="cancel">搜索</div>
                    </div>
                    <div class="search">
                        <div 
                            class="search-type"
                            v-for="(item, index) in typeList"
                            :key="index">
                            {{item.name}}
                            <i class="el-icon-arrow-down"></i>
                        </div>
                        <div class="icon" @click="spread">
                            <i class="el-icon-menu"></i>
                        </div>
                    </div>
                </div>
                <transition name="el-zoom-in-top">
                    <div v-if="showSearchBox" class="order-search" >
                    </div>
                </transition>
                
                
                <div class="order-content box-style">

                </div>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                input:'',
                options2: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶',
                }],
                /**
                 * 订单查找字段
                 */
                searchForm:{
                    region:''
                },
                typeList: [
                    {
                        name:'区域'
                    },
                    {
                        name:'标签'
                    },
                    {
                        name:'服务类型'
                    },
                    {
                        name:'区域'
                    },
                ],
                showSearchBox:false,
                isSearch: true,
                form: {
                    createMan: '',//创建人
                    serviceType: '',//服务类型
                    name: '',//客户称呼
                    number: '',//客户联系方式
                    address: '',//服务地址
                    cycle: '',//订单周期
                    origin: '',//订单来源
                    desc: '', //订单备注信息
                    value6: ''
                },
                serviceTable: [{
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
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }],
            }
        },
        methods:{   
            onSubmit(){

            },
            spread(){
                this.showSearchBox = !this.showSearchBox
            },
            pullSearch(){
                this.isSearch = !this.isSearch;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .box-style{
        padding: 16px 16px;
        background: #fff;
    }
    .line-bottom-1px{
        &:after{
            content: '';
            display: block;
            height: 1px;
            width: 100%;
            background: #ccc; 
        }
    }
    .authority{
        background: #eaedf1;
        height:100%;
        width:100%;
        display: flex;
        .order-message-box{
            flex:1;
            height:100%;
            overflow-y: auto;
            position: relative;
            background: #fff;
            //订单基本信息模块
            .order-base{
                position: relative;
                width: 100%;
                
                .base-box{
                    height:50px;
                    width: 100%;
                    margin-bottom: 20px;
                     //基本信息表头
                    .order-base-title{
                        position: relative;
                        margin: 0 auto;
                        height:50px;
                        line-height: 32px;
                        width:90%;
                        padding: 9px 0;
                        font-size: 16px;
                        .edit-btn{
                            float:right;
                            // vertical-align: middle;
                        }
                    }
                }
               
                //基本信息表单
                .baseForm-box{
                    .baseForm{
                        width: 95%;
                        max-width: 650px;
                    }
                }
            }
            //待选服务人员列表模块
            .service-list{
                width: 100%;
                overflow-y: auto;
                .service-box{
                    height:50px;
                    width: 100%;
                    margin-bottom: 20px;
                     //基本信息表头
                    .order-service-title{
                        position: relative;
                        margin: 0 auto;
                        height:50px;
                        line-height: 32px;
                        width:90%;
                        padding: 9px 0;
                        font-size: 16px;
                        .edit-btn{
                            float:right;
                        }
                    }
                }
            }
            //服务人员匹配日志模块
            .service-record{
                width: 100%;
                overflow-y: auto;
                .service-record-box{
                    height:50px;
                    width: 100%;
                    margin-bottom: 20px;
                     //基本信息表头
                    .order-record-title{
                        position: relative;
                        margin: 0 auto;
                        height:50px;
                        line-height: 32px;
                        width:90%;
                        padding: 9px 0;
                        font-size: 16px;
                        .edit-btn{
                            float:right;
                        }
                    }
                }
                .record-list{
                    .box-card {
                        width: 90%;
                    }
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

                    
                }
            }
            .order-pull{
                position: absolute;
                right: 0px;
                top:calc(50% - 60px);
                height: 100px;
                line-height: 100px;
                width: 16px;
                text-align: center;
                background: #333;
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
                cursor: pointer;
                .pull-icon{
                    color: #fff;
                    font-size: 14px;
                }
            }
        }
        
        .order{
            height: 100%;
            width: 50%;
            position: relative;
            &:after{
                position: absolute;
                content:'';
                height:100%;
                width:1px;
                background:#e8e8e8;
                left:0;
                top:0;
            }
            .order-message{
                position:relative;
                height: 100%;
                width: 100%;
                .search-head{
                    height: 85px;
                    width: 100%;
                    background: #fff;
                    border-bottom: 1px solid #e8e8e8;
                    .header{
                        width: 375px;
                        height: 50px;
                        display: flex;
                        padding:10px 0px 5px 25px;
                        & /deep/ .el-input{
                            width:285px;
                        }
                        & /deep/ .el-input__inner{
                            height: 35px;
                            line-height: 35px;
                            border-radius: 8px;
                        }
                        & /deep/ .el-input__icon{
                            line-height:35px;
                        }
                        .cancel{
                            margin-left:10px;
                            line-height: 35px;
                            cursor: pointer;
                        }
                    }
                    .search{
                        height: 35px;
                        width:100%;
                        display: flex;
                        .search-type{
                            width:25%;
                            line-height: 35px;
                            text-align: center;
                            font-size: 12px;
                            cursor: pointer;
                        }
                        .icon{
                            width:35px;
                            line-height: 35px;
                            text-align: center;
                            cursor: pointer;
                        }
                    }
                }
                
                .order-content{
                    height:calc(100% - 85px);
                    width: 100%;  
                    overflow: auto;
                    padding-bottom: 80px;
                }
                
                .order-search{
                    position: absolute;
                    height:300px;
                    width:100%;
                    top: 85px;
                    background:#fafafa;
                    border-bottom: 1px solid #e8e8e8;
                    // box-shadow: 1px 3px 3px rgba(0,0,0,.3);
                }
            }
        }
    }

</style>
