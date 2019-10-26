<template>
	<div class="home">
		<div class="home-left">
			<div class="home-one">
				<div class="home-icon">
					<img :src="users.icon? `./resource/${users.icon}` : noHeaderImage" alt="">
				</div>
				<div class="home-name">{{users.name}}</div>
				<div class="home-intro">祝你开心每一天！</div>
			</div>
			<div class="home-two">
				<div class="staff-message-item">
					<img class="icon" src="./homePage/images/work.svg" alt="">
					<p class="message" v-for="(item, index) in users.role_name" :key="index">{{item}}</p>
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
			<div class="home-three">
				<div class="mark-title">标签</div>
				<el-tag class="tag-item" size="small">家政</el-tag><el-tag class="tag-item" size="small">生活服务</el-tag>
			</div>
		</div>
		<div class="home-right">
			<div class="title">平台公告</div>
			<div class="notice-box">
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
			
		</div>
	</div>
</template>

<script>
import {noticeArticleList} from './noticeArticle/index.js'
import noHeaderImage from './homePage/images/header.png'
export default {
	data() {
		return {
			noticeArticleList,
			noHeaderImage,
		};
	},
	computed: {
		users() {
			return this.$store.state.loginModule.user;
		},
		department_name() {
			return this.$store.state.authModule.departmentList.filter(
				item => item.id == this.users.department_id
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
		}
	},
	components: {

	}
};
</script>

<style scoped lang="scss">
.home {
	height: 100%;
	width: 100%;
	background: #f0f2f5;
	display: flex;
	justify-content: space-between;
	padding: 20px;
	.home-left {
		min-width: 300px;
		width: 30%;
		height: 500px;
		background: #fff;
		border-bottom: 1px solid #e8e8e8;
		padding: 30px 20px;
		.home-one {
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
		.home-two {
			margin-top: 20px;
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
		.home-three {
			margin-top: 20px;
			padding: 20px 10px;
			border-top: 1px dotted #ccc;
			border-bottom: 1px dotted #ccc;
			overflow: hidden;
			.mark-title {
				margin-bottom: 10px;
			}
			.tag-item{
				margin-right: 10px;
			}
			.mark {
				padding: 2px 5px;
				border: 1px solid rgba(0, 0, 0, 0.65);
				color: rgba(0, 0, 0, 0.65);
				border-radius: 5px;
				font-size: 12px;
				display: inline-block;
				margin: 5px 3px;
			}
		}
	}
	.home-right {
		height: 100%;
		width: 68.5%;
		background: #fff;
		border-bottom: 1px solid #e8e8e8;
		overflow: auto;
		.title {
			line-height: 50px;
			font-size: 16px;
			padding: 0 30px;
			color: rgba(0, 0, 0, 0.85);
			border-bottom: 1px solid #ccc;
		}
		.notice-box{
			padding-top: 20px;
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
						color: #1890ff;
					}
				}
			}
		}
		
		
		
		
		
	}
}
</style>
