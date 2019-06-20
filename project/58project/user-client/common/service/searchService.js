/**
 * 搜索服务
 */
export default{
    /**
     * 获取搜索框placeholder 热门搜索词条
     */
    getHotWords(){
        let hotWords = {
            placeholder: "月嫂",
            hotWords: [
                {
                    name: "开换锁",
                    hotValue: 1
                },
                {
                    name: "数码维修",
                    hotValue: 25
                },
                {
                    name: "搬家货运",
                    hotValue: 35
                },
                {
                    name: "上门安装",
                    hotValue: 29
                },
                {
                    name: "按摩",
                    hotValue: 11
                },
                {
                    name: "按摩",
                    hotValue: 15
                },
                {
                    name: "地热",
                    hotValue: 13
                },
                {
                    name: "spa",
                    hotValue: 2
                },
                {
                    name: "地热清洗",
                    hotValue: 17
                },
                {
                    name: "打针",
                    hotValue: 9
                },
                {
                    name: "搬家",
                    hotValue: 50
                },
                {
                    name: "育儿",
                    hotValue: 151
                },
                {
                    name: "1v1家教上门",
                    hotValue: 34
                },
            ]
        }
        return Promise.resolve(hotWords)
    },
    /**
     * 搜索关键字
     * @param searchValue 
     */
    searchWord(searchValue){
        console.log(searchValue,"搜索service");
    }
}