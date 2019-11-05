<template>
	<div class="home" v-loading="is_loading">
		<div class="home-contains">
			<div class="home-left">
				
				<div class="home-icon-box">
					<div class="home-icon">
						<img :src="presentUser.icon? `./resource/${presentUser.icon}` : noHeaderImage" alt="">
					</div>
					<div class="home-name">{{presentUser.real_name}}</div>
					<div class="home-intro">海纳百川，有容乃大！</div>
				</div>

				<div class="home-base-box">
					<div class="staff-message-item">
						<img class="icon" src="./homePage/images/work.svg" alt="">
						<p class="message" v-for="(item, index) in presentUser.role_name" :key="index">{{item}}</p>
					</div>
					<div class="staff-message-item">
						<img class="icon" src="./homePage/images/company.svg" alt="">
						<p class="message">中彤实业 - 365生活服务平台 - {{department_name}}</p>
					</div>
					<div class="staff-message-item">
						<img class="icon" src="./homePage/images/area.svg" alt="">
						<p class="message">辽宁省沈阳市</p>
					</div>
				</div>
				<div class="home-tag-box">
					<div class="mark-title">我的标签</div>
					<div class="tag-list">
						<el-tag class="tag-item" size="small">家政</el-tag>
						<el-tag class="tag-item" size="small">生活服务</el-tag>
					</div>
					
				</div>
				<div class="department-box">
					<div class="mark-title">团队成员</div>
					<div class="department-list">
						<div 
							class="department-item" 
							v-for="(item, index) in departmentManagerList"
							:key="index">
							<el-popover
								placement="top-start"
								width="400"
								trigger="click">
								<staff-detail-component
									:staffForm="item"></staff-detail-component>
								<div class="contains" slot="reference">
									<icon-component
									:iconUrl="item.icon"
									:displayType="'circle'"
									:height="24"
									:width="24"></icon-component>
									<div class="name">{{item.real_name}}</div>
								</div>
							</el-popover>
						</div>
					</div>
				</div>
			</div>
			<div class="home-right">
				<card-box-component
					:title="'平台公告'">
					<div class="notice-box" slot="contains">
						<div class="article-item" v-for="(item, index) in noticeArticleList" :key="index">
							<div class="article-item-title" @click="goArticlePage(item)">{{item.articleName}}</div>
							<div class="article-tag-list">
								<el-tag v-for="(it, ind) in item.tagList" :key="ind" class="tag-item" size="small">{{it}}</el-tag>
							</div>
							<div class="item-content">{{item.des}}</div>
							<div class="item-sale">
								<span class="item-name">{{item.created_manager}}</span>
								<span>发布于 {{item.created_at}}</span>
							</div>
						</div>
					</div>
				</card-box-component>
			</div>
		</div>
	</div>
</template>

<script>
import {noticeArticleList} from './noticeArticle/index.js'
import {staffDetailComponent} from './homePage/index.js'
import {operateService} from '@common/index.js'
import noHeaderImage from './homePage/images/header.png'
// import { departmentList } from './interface.ts';
export default {
	components: {
		staffDetailComponent,
	},
	data() {
		return {
			is_loading: false,
			noticeArticleList,//文章列表数组
			noHeaderImage,//没有头像展位图
			departmentManagerList: [],
		};
	},
	computed: {
		presentUser() {
			return this.$store.state.loginModule.user;
		},
		department_name() {
			return this.$store.state.authModule.departmentList.filter(
				item => item.id == this.presentUser.department_id
			)[0].name;
		}
	},
	methods:{
		/**
		 * 前往文章页
		 */
		goArticlePage(item){
			this.$router.push({
				path: `/myCenter/noticeArticle`,
				query: {
					id: item.id
				}
			})
		},
		async getTeamList(){
			if(this.presentUser.department_id == 4){
				await this.getCurrentStoreSelection()
			} else {
				await this.getDepartmentManagerSelection()
			}
		},
		/**
		 * 获取当前门店全部成员
		 */
		async getCurrentStoreSelection(){
			try{
				this.is_loading = true
				await operateService.getStoreManagerSelection(this.presentUser.store_id).then((data) =>{
					this.departmentManagerList = data.data
					this.is_loading = false
				}).catch(error =>{
					this.$message({
						type:'error',
						message: error.message
					})
					this.is_loading = false
				}).finally(() =>{
					this.is_loading = false
				})
			} catch(error){
				this.$message({
					type:'error',
					message: error.message
				})
				this.is_loading = false
			}
		},
		/**
		 * 获取非门店部门所有人员
		 */
		async getDepartmentManagerSelection(){
			try{
                this.is_loading = true
                await operateService.getDepartmentManagerSelection(this.presentUser.department_id).then((data) =>{
                    this.departmentManagerList = data.data
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
		}
	},
	async mounted(){
		await this.getTeamList()
	}
};
</script>

<style scoped lang="scss">
.home {
	// height: calc(100vh - 50px);
	width: 100%;
	background: #f0f2f5;
	overflow: auto;
	.home-contains{
		// height: 100%;
		padding: 20px;
		&:after{
			content: '';
			display: block;
			clear: both;
		}
		.home-left {
			float: left;
			width: 30%;
			background: #fff;
			border-bottom: 1px solid #e8e8e8;
			padding: 24px 0;
			.home-icon-box {
				padding: 0 24px;
				display: flex;
				flex-direction: column;
				text-align: center;
				align-items: center;
				justify-content: center;
				.home-icon {
					height: 100px;
					width: 100px;
					border-radius: 50%;
					& img {
						height: 100px;
						width: 100px;
						border-radius: 50%;
					}
				}
				.home-name {
					color: rgba(0, 0, 0, 0.85);
					font-weight: 500;
					font-size: 20px;
					margin-top: 20px;
				}
				.home-intro {
					color: rgba(0, 0, 0, 0.65);
					font-size: 14px;
					margin-top: 5px;
				}
			}
			.home-base-box {
				margin: 20px 24px;
				border-bottom: 1px dotted #ccc;
				color: rgba(0, 0, 0, 0.65);
				font-size: 14px;
				.staff-message-item{
					line-height: 16px;
					display: flex;
					padding: 4px 0;
					margin-bottom: 8px;
					.icon{
						height: 16px;
						width: 16px;
						margin-right: 10px;
					}
					.message{
						line-height: 16px;
					}
				}
			}
			.home-tag-box {
				margin: 20px 24px 0 24px;
				padding-bottom: 10px;
				border-bottom: 1px dotted #ccc;
				overflow: hidden;
				.mark-title {
					margin-bottom: 12px;
					color: rgba(0,0,0,.85);
    				font-weight: 500;
				}
				.tag-list{
					.tag-item{
						margin-right: 10px;
						margin-bottom: 10px;
					}
				}
			}
			.department-box{
				margin-top: 20px;
				.mark-title {
					margin-bottom: 12px;
					padding: 0 24px;
					color: rgba(0,0,0,.85);
    				font-weight: 500;
				}
				.department-list{
					display: flex;
					flex-wrap: wrap;
					padding: 0 6px;
					.department-item{
						width: 50%;
						padding: 0 18px;
						justify-content: flex-start;
						color: rgba(0,0,0,.65);
						.contains{
							display: flex;
							height: 50px;
							line-height: 24px;
							.name{
								margin-left: 12px;
							}
						}
					}
				}
			}
		}
		.home-right {
			float: right;
			width: 68.5%;
			background: #fff;
			border-bottom: 1px solid #e8e8e8;
			.notice-box{
				min-height: 600px;
				overflow: scroll;
				.article-item {
					margin: 0 20px;
					padding: 10px;
					border-bottom: 1px dotted #ccc;
					.article-item-title {
						color: rgba(0, 0, 0, 0.85);
						font-size: 16px;
						margin-bottom: 14px;
						cursor: pointer; 
					}
					.article-tag-list{
						.tag-item{
							margin-right: 15px;
						}
						margin-bottom: 14px;
					}
					.item-content {
						width: 100%;
						color: rgba(0, 0, 0, 0.65);
						font-size: 14px;
						line-height: 22px;
					}
					.item-sale {
						color: rgba(0, 0, 0, 0.65);
						font-size: 14px;
						margin-top: 15px;
						.item-name {
							color: #333;
						}
					}
				}
			}
			
		}
	}
	
}
</style>
