<template>
    <div class="serviceList">
        <div class="search">
            <div class="deal-content" :style="{width: isSearch? 'calc(100vw - 480px)' : 'calc(100vw - 180px)'}">  
                <div class="table-box">
                    <el-table
                        :data="tableData">
                        <el-table-column
                            label="id"
                            prop="id"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="姓名"
                            prop="name"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="服务类型"
                            prop="type"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="地区"
                            prop="area"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="联系方式"
                            prop="tel"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            fixed="right"
                            width="240">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini">查看</el-button>
                                <el-button
                                    size="mini">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="order-pull" @click="pullSearch">
                <i class="el-icon-arrow-left pull-icon"></i>
            </div>
        </div>
        <div class="order" v-if="isSearch">
            <div class="order-message">
                <div class="search-head">
                    <div class="header">
                        <el-input 
                            v-model="searchForm.name" 
                            prefix-icon="el-icon-search"
                            placeholder="请输入"></el-input>
                        <div class="cancel">搜索</div>
                    </div>
                </div>
                <div class="order-content">
                    <div class="search-box">
                        <el-form  
                            label-width="80px" 
                            size="medium" 
                            :model="searchForm" 
                            class="search-type">
                            <el-form-item label="活动区域">
                                <el-select v-model="searchForm.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动区域">
                                <el-select v-model="searchForm.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动区域">
                                <el-select v-model="searchForm.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动区域">
                                <el-select v-model="searchForm.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动区域">
                                <el-select v-model="searchForm.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动区域">
                                <el-select v-model="searchForm.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="活动区域">
                                <el-select v-model="searchForm.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    
                    <div class="search-btn">
                        <el-button type="primary" size="medium">搜索</el-button>
                        <el-button size="medium">重置</el-button>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
            id: '0001',
            name: 'jack',
            type: '月嫂',
            area: '铁西 滑翔',
            tel: '15001279361',
        }, {
            id: '0001',
            name: 'jack',
            type: '月嫂',
            area: '铁西 滑翔',
            tel: '15001279361',
        }, {
            id: '0001',
            name: 'jack',
            type: '月嫂',
            area: '铁西 滑翔',
            tel: '15001279361',
        }, {
            id: '0001',
            name: 'jack',
            type: '月嫂',
            area: '铁西 滑翔',
            tel: '15001279361',
        }, {
            id: '0001',
            name: 'jack',
            type: '月嫂',
            area: '铁西 滑翔',
            tel: '15001279361',
        }, {
            id: '0001',
            name: 'jack',
            type: '月嫂',
            area: '铁西 滑翔',
            tel: '15001279361',
        }, {
            id: '0001',
            name: 'jack',
            type: '月嫂',
            area: '铁西 滑翔',
            tel: '15001279361',
        }, ],
        searchForm:{
            name: '',
            region:''
        },
        isSearch: true,
      }
    },
    methods: {
        pullSearch(){
            this.isSearch = !this.isSearch;
        }
    },
  }
</script>
<style lang="scss" scoped>

    .serviceList{
        background: #fff;
        height:100%;
        width:100%;
        display: flex;
        .search{
            flex:1;
            height:100%;
            position: relative;
            .deal-content{
                height:100%;
                overflow-y: auto; 
                background: #fff;
                padding-top: 27px;
                .table-box{
                    height:calc(100vh - 100px);
                    width:100%;
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
                z-index: 10;
                cursor: pointer;
                .pull-icon{
                    color: #fff;
                    font-size: 14px;
                }
            }
        }
        
        .order{
            height: 100%;
            width: 300px;
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
                    height: 75px;
                    width: 300px;
                    background: #fff;
                    border-bottom: 1px solid #e8e8e8;
                    .header{
                        width: 300px;
                        height: 75px;
                        display: flex;
                        padding:20px 0px 20px 25px;
                        & /deep/ .el-input{
                            width:215px;
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
                }
                .order-content{
                    position: relative;
                    height:calc(100% - 75px);
                    width: 100%;
                    .search-box{
                        height:calc(100% - 100px);
                        width: 100%;  
                        overflow: auto;
                        padding: 30px 10px 0 10px;
                    }
                    .search-btn{
                        border-top:1px solid #e8e8e8;
                        position: absolute;
                        height: 100px;
                        width: 300px;
                        bottom: 0;
                        padding: 32px 60px;
                    }
                }
            }
        }
    }
</style>