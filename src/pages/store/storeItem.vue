<template>
	<page-edit-component
        v-loading="is_loading"
        :title="storeDetail.name">
        
        <template slot="detail" >
			<div class="detail-left">
				<div class="detail-left-box">
					<div class="detail-left-line">编号：{{ storeDetail.store_code }}</div>
					<div class="detail-left-line">创建人：{{ storeDetail.created_manager_name }}</div>
					<div class="detail-left-line">创建时间：{{ storeDetail.created_at | timeToSecondFomatter }}</div>
					<div class="detail-left-line">更新时间：{{ storeDetail.updated_at | timeToSecondFomatter }}</div>
					<div class="detail-left-line">门店类型：{{storeDetail.is_third == 1 ? '直营店': '加盟店'}}</div>
					<div class="detail-left-line">门店负责人：{{ storeDetail.store_manager_name }}</div>
					<div class="detail-left-line">门店地址：{{storeDetail.address}}</div>
				</div>
			</div>
        </template>

        <template slot="statistic">
            <div class="detail-right">
				<div class="right-box">
					<div class="title">经营状态</div>
					<div class="value" 
						:style="{color: storeDetail.status == 1? '#67C23A' : '#F56C6C'}">
						{{storeDetail.status == 1?'营业':'停业'}}
					</div>
				</div>
				<div class="right-box">
					<div class="title">员工数量</div>
					<div class="value">{{ storeDetail.staff_count }}</div>
				</div>
			</div>
        </template>

        <template slot="control">
			<div class="control-contains">
				<el-button size="mini" type="primary" @click="editStore">修改</el-button>
				<el-button size="mini" @click="goback">返回</el-button>
			</div>
        </template>

		<template slot="form" >
			<div style="width: 100%;">
				<div class="performance">
					<statistic-card-component
					:title="'订单转化率'" :statisticItem="order_transform_rate"></statistic-card-component>
					<statistic-card-component
						:title="'订单累计流水'" :statisticItem="sale_amount"></statistic-card-component>
					<statistic-card-component
						:title="'服务费（销售额）'" :statisticItem="sale_service_amount"></statistic-card-component>
					<statistic-card-component v-hide></statistic-card-component>
				</div>

				<!-- 门店员工列表 -->

				<store-staff-list 
					:storeStaffList="salesPersonTable" 
					:storeDetail="storeDetail"
					@updateStoreItem="getStore"></store-staff-list>

				<sale-rank-box :title="'门店业绩排行'" :dataList="saleWorkStation.rank"></sale-rank-box>

			</div>
			
			
		</template>
	</page-edit-component>
</template>

<script>
import { storeService } from "@/service/store";
import saleRankBox from '@/pages/saleWorkStation/saleRankBox.vue'
import {saleWorkstationService} from '@/service/saleWorkStation'
import chartBox from './storeStatistic/chartBox.vue'
import storeStaffList from './storeItem/storeStaffList.vue'
import {statisticCardComponent} from '../operateWorkStation/index'

export default {
	components: {
		statisticCardComponent,
		chartBox,
		storeStaffList,
		saleRankBox,
	},
	data() {
		return {
			// 门店详情
			storeDetail: {},
			is_loading: false,
			//员工列表
			salesPersonTable: [],
			saleWorkStation: {
                order_transform_rate: {},//订单转化率
                sale_amount: {},//流水
                sale_service_amount: {},//销售额
                rank: {
                    order_transform_rate: {},//订单转化率
                    sale_amount: {},//流水
                    sale_service_amount: {},//销售额
                },
                dynamic_information: [],//公海订单
                processing_order: [],//待处理订单
            },
		};
	},
	computed: {
		order_transform_rate(){
            return {
                total: this.saleWorkStation.order_transform_rate.total *100 + '%',
                last_month: this.saleWorkStation.order_transform_rate.last_month * 100 + '%',
                rate: this.saleWorkStation.order_transform_rate.rate * 100,
                this_month: this.saleWorkStation.order_transform_rate.this_month * 100 +'%',
            }
        },
        sale_service_amount(){
            return {
                total: this.saleWorkStation.sale_service_amount.total + '元',
                last_month: this.saleWorkStation.sale_service_amount.last_month + '元',
                rate: this.saleWorkStation.sale_service_amount.rate,
                this_month: this.saleWorkStation.sale_service_amount.this_month +'元',
            }
        },
        sale_amount(){
            return {
                total: this.saleWorkStation.sale_amount.total + '元',
                last_month: this.saleWorkStation.sale_amount.last_month + '元',
                rate: this.saleWorkStation.sale_amount.rate,
                this_month: this.saleWorkStation.sale_amount.this_month +'元',
            }
        },
	},
	methods: {
		/**
		 * 获取门店列表
		 */
		async getStore(){
			try{
				this.is_loading = true
				await storeService.getStore(this.$route.query.id).then(data => {
					if (data.code == "0") {
						this.storeDetail = {...data.data.store};
						this.salesPersonTable = data.data.store_staff_list.data
						this.is_loading = false
					}
				}).catch(error => {
					this.$message({
						type: "error",
						message: error.message
					});
					this.is_loading = false
				}).finally(() =>{
					this.is_loading = false
				})
			} catch(error){
				this.$message({
					type: "error",
					message: error.message
				});
				this.is_loading = false
			}
		},
		async getStoreStatistic(){
			try{
				this.is_loading = true

				let getSaleWorkerStationForm = {
					store_id: this.$route.query.id,
					id: this.$route.query.id,
					get_for:"store" 
				}

				await saleWorkstationService.getSaleWorkBench(getSaleWorkerStationForm).then(data =>{
					if(data.code == '0'){
						//设置工作台数据
						this.saleWorkStation = {
							...data.data,
						}
						this.is_loading = false
					}
				}).catch(error =>{
					this.$message({
						message: error.message,
						type: 'error'
					})
					this.is_loading = false
				}).finally(() =>{
					this.is_loading = false
				})
			} catch(error){
				this.$message({
					message: error.message,
					type: 'error'
				})
				this.is_loading = false
			}
		},
		/**
		 * 编辑门店信息
		 */
		editStore() {
			this.$router.push({
				path: "/store/storeEdit",
				query: {
					type: 1,
					id: this.$route.query.id
				}
			});
		},
		//返回
		goback(){
			this.$router.push('/store/storeList')
		},
	},
	async mounted() {
		await this.getStore();
		await this.getStoreStatistic()
	}
};
</script>

<style lang="scss" scoped>


.performance{
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
}
.detail-left{
	flex:1;
	.detail-left-box{
		display: flex;
		flex-wrap: wrap;
		.detail-left-line{
			width: 50%;
			color: rgba(0,0,0,.65);
			line-height: 20px;
			padding-bottom: 8px;
		}
	}
}
.detail-right{
	min-width: 400px;
	display: flex;
	.right-box{
		height: 80px;
		width: 50%;
		.title{
			color: rgba(0,0,0,.45);
			font-size: 14px;
			line-height: 1.5;
		}
		.value{
			font-size: 20px;
			color: rgba(0,0,0,.85);
			line-height: 1.5;
		}
	}
}

</style>
