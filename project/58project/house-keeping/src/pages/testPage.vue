<template>
    <div class="window">
            <div class="header"></div>
        <div class="content">

        </div>
            <div class="footer"></div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing:border-box;
    }
    html, body {
        height: 100%;
    }
    .window{
        // box-sizing: border-box;
        // height: 100vh;
        // width: 100%;
        // position: relative;
        border: 1px solid black;
        // overflow: hidden;
        
        .header{
            position: fixed;
            top: 0;
            left: 0;
            height: .5rem;
            width: 100%;
            z-index:1000;
            background: #185;
        }
        
        .content{
            height: 7rem;
            width: 100%;
            background: red;
            position: relative;
            // top: .5rem;
            -webkit-overflow-scrolling: touch;
        }
        .footer{
            z-index: 1000;
            position: fixed;
            bottom: 0;
            left: 0;
            height: .5rem;
            width: 100%;
            background: #185;
        }
    }
</style>

