<template>
    <div class="home">
        <div class="home-header">
            <div class="home-contains">
                <div class="home-left">
                    <div class="home-icon">
                        <!-- <img src="./home/image/icon.png" alt=""> -->
                    </div>
                    <div class="home-worker">
                        <div class="worker-hello">你好！{{users.name}}，祝你开心每一天！</div>
                        <div class="worker-department">
                            <span v-for="(item, index) in users.role_name" :key="index">{{item}} |</span>
                            中彤实业 - 365生活服务平台 - {{department_name}}</div>            
                    </div>
                </div>
                <div class="home-right">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            data1: '运营专员',
            data2: '运营中心'
        }
    },
    computed: {
        users(){
            return this.$store.state.loginModule.user
        },
        department_name(){
            return this.$store.state.authModule.departmentList.filter(item => item.id == this.users.department_id)[0].name
        }
    },
    methods:{

    },
    components: {
    }
}
</script>

<style scoped lang="scss">
    .home{
        height:2000px;
        width:100%;
        background: #f0f2f5;
        .home-header{
            height: 180px;
            width: 100%;
            padding: 16px 24px 0;
            background: #fff;
            border-bottom: 1px solid #e8e8e8;
            .home-contains{
                margin-top: 56px;
                height: 108px;
                width: 100%;
                display: flex;
                .home-left{
                    height: 80px;
                    display: flex;
                    .home-icon{
                        height: 80px;
                        width: 80px;
                        border-radius: 50%;
                        & img{
                            height: 80px;
                            width: 80px;
                        }
                    }
                    .home-worker{
                        margin-left: 24px;
                        .worker-hello{
                            margin-bottom: 12px;
                            color: rgba(0,0,0,.85);
                            font-weight: 500;
                            font-size: 20px;
                            line-height: 28px;
                        }
                        .worker-department{
                            color: rgba(0,0,0,.45);
                            line-height: 22px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
</style>
