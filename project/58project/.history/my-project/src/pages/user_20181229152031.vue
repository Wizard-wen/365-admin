<template>
    <div>
        <div class="user-general">
            <div class="user-message">
                <div class="user-photo"></div>
                <div class="user-name">
                    <p class="user-nickname">{{userData.nickname}}</p>
                    <p class="user-label">{{userData.label}}</p>
                </div>
                <div class="user-set"></div>
            </div>
            <div class="user-right">
                <div 
                    class="user-right-item"
                    v-for="(item,index) in userData.userRights"
                    :key="index">
                    <div class="right-number">{{item.number}}</div>
                    <div class="right-label">{{item.label}}</div>
                </div>
            </div>
        </div>
        <div class="user-order">

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            userData:{
                nickname:'wizard',
                label: 'level 1',
                userRights: [
                    {
                        number: 15,
                        label: '收藏夹',
                        type: 1
                    },
                    {
                        number: 15,
                        label: '收藏夹',
                        type: 1
                    },
                    {
                        number: 15,
                        label: '收藏夹',
                        type: 1
                    },
                    {
                        number: 15,
                        label: '收藏夹',
                        type: 1
                    },
                ]
            }
        }
    }
}
</script>
<style scoped lang="scss">
    .user-general{
        height: 1.4rem;
        padding: .2rem;
        width:100%;
        background: #336699;
        .user-message{
            height:.6rem;
            width:100%;
            .user-photo{
                float: left;
                height: .6rem;
                width: .6rem;
                border-radius: 50%;
                background: #185;
                margin-right:.2rem;
            }
            .user-name{
                float:left;
                height:.6rem;
                width: 1rem;
                .user-nickname{
                    color: #fff;
                    height: .3rem;
                    line-height: .3rem;
                    width: 100%;
                    font-size: .16rem;
                }
                .user-label{
                    color: #fff;
                    height: .2rem;
                    line-height: .2rem;
                    width: .7rem;
                    text-align: center;
                    margin-top: .05rem;
                    background: rgba(0,0,0,.3);
                }
            }
        }
        .user-right{
            display: flex;
            justify-content: space-between;
            .user-right-item{
                
            }
        }
    }
</style>


