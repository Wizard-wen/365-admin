/**
 * 有关分类的方法
 */
import classifySlider1 from '../mock/classify/img/classify-slider1.jpg'
import classifySlider2 from '../mock/classify/img/classify-slider2.jpg'
import classifySlider3 from '../mock/classify/img/classify-slider3.jpg'
export default{
    /**
     * 获取分类列表
     */
    getClassifyList(){
        const arr = [
            {
                name: "热门",
                sliderPic: classifySlider1,
                typeList: [
                    {
                        name: "热门1",
                        icon: "",
                        router: ""
                    },
                    {
                        name: "热门1",
                        icon: "",
                        router: ""
                    },
                    {
                        name: "热门1",
                        icon: "",
                        router: ""
                    },
                    {
                        name: "热门1",
                        icon: "",
                        router: ""
                    },
                    {
                        name: "热门1",
                        icon: "",
                        router: ""
                    },
                ]
            },
            {
                name: "分类一句",
                sliderPic: classifySlider2,
                typeList: [
                    {
                        name: "分类11",
                        icon: "",
                        router: ""
                    }
                ]
            },
            {
                name: "分类2",
                sliderPic: classifySlider3,
                typeList: [
                    {
                        name: "分类21",
                        icon: "",
                        router: ""
                    }
                ]
            },
        ]
        return Promise.resolve(arr)
    }
}