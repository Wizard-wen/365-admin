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
                    <div class="right-numbet">{{item.number}}</div>
                    <div class="">{{item.label}}</div>
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
            
        }
    }
}
</script>
<style scoped lang="scss">
    .user-general{
        height: 1.4rem;
        width:100%;
        background: #336699;
        .user-header{
            position: relative;
            letter-spacing: .03rem;
            height:.5rem;
            line-height: .5rem;
            color: #fff;
            width:100%;
            text-align: center;
            font-size: .16rem;
            .user-set{
                letter-spacing: 0rem;
                font-size: .14rem;
                position:absolute;
                right: .2rem;
                cursor: pointer;
            }
        }
    }
</style>


