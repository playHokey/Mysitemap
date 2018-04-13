function formatDate(date, showDetail) {
    var isShow = showDetail || false;
    var d = new Date(parseInt(date) * 1000)
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date1 = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    if (isShow)
        return year + "-" + month + "-" + date1 + " " + hour + ":" + minute + ":" + second;
    else
        return year + "-" + month + "-" + date1;
}
// 全局分页
(function (vue) {
    // html模板信息
    var template = '<div class="page-bar"> \
                     <ul> \
                       <li><a class="setButtonClass(0)" v-on:click="prvePage(cur)">上一页</a></li> \
                       <li v-for="index in indexs"  v-bind:class="{ active: cur == index }"> \
                          <a v-on:click="btnClick(index)">{{ index < 1 ? "..." : index }}</a> \
                       </li> \
                       <li><a class="setButtonClass(1)" v-on:click="nextPage(cur)">下一页</a></li> \
                     </ul> \
                   </div>'

    var pagination = vue.extend({
        template: template,
        props: [ 'all'],
        data: function () {
            return {
                cur: 5,
            };
        },
        computed: {
            indexs: function () {
                var left = 1
                var right = this.all
                var ar = []
                if (this.all >= 11) {
                    if (this.cur > 5 && this.cur < this.all - 4) {
                        left = this.cur - 5
                        right = this.cur + 4
                    } else {
                        if (this.cur <= 5) {
                            left = 1
                            right = 10
                        } else {
                            right = this.all
                            left = this.all - 9
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left)
                    left++
                }
                if (ar[0] > 1) {
                    ar[0] = 1;
                    ar[1] = -1;
                }
                if (ar[ar.length - 1] < this.all) {
                    ar[ar.length - 1] = this.all;
                    ar[ar.length - 2] = 0;
                }
                return ar
            },
            
           
                
              
              
        },
        watch:{
            result(val) {
                this.myResult = val;//新增result的watch，监听变更并同步到myResult上
            }
        },
        methods: {
            // 页码点击事件
            btnClick: function (data) {
                if (data < 1) return;
                if (data != this.cur) {
                    this.cur = data
                    this.$emit('btn-click', data)
                }
            },
            // 下一页
            nextPage: function (data) {
                if (this.cur >= this.all) return;
                this.btnClick(this.cur + 1);
            },
            // 上一页
            prvePage: function (data) {
                if (this.cur <= 1) return;
                this.btnClick(this.cur - 1);
            },
            // 设置按钮禁用样式
            setButtonClass: function (isNextButton) {
                if (isNextButton) {
                    return this.cur >= this.all ? "page-button-disabled" : ""
                }
                else {
                    return this.cur <= 1 ? "page-button-disabled" : ""
                }
            },
            
        }
    })

    vue.Pagination = pagination

})(Vue)



