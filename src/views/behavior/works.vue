<template>
    <div id="works">
        <Header title="编辑工作经历">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="tag">
                <div class="tag-text mx-1px-bottom" @click="">
                    <input type="text" placeholder="公司名称 *" v-model="name">
                </div>
                <div class="tag-text mx-1px-bottom" @click="">
                    <input type="text" placeholder="职位头衔 *" v-model="role">
                </div>
                <div class="tag-text mx-1px-bottom time">
                    <div class="times">
                        <input type="text" placeholder="在职时间 *" v-model="start_at" @click="selects('dateStart_at')" readonly>
                    </div>
                    <span class="word">至</span>
                    <div class="times">
                        <input type="text" placeholder="结束时间 *" v-model="end_at" @click="selects('dateEnd_at')" readonly>
                    </div>
                </div>
                <div class="tag-text mx-1px-bottom" @click="">
                    <input type="text" placeholder="工作城市 *" v-model="city">
                </div>
                <div class="tag-text mx-1px-bottom" @click="">
                    <input type="text" placeholder="职位描述" v-model="description">
                </div>
                <div class="tag-text" @click="">
                    <input type="text" placeholder="相关技术（例js,css,html）" v-model="tags">
                </div>
            </div>
        </div>


        <div class="bottom">
            <div class="edit" v-show="!flag" >
                <v-button :loading='showLoading' height='50px' @click="submit">确定</v-button>
            </div>
            <div class="del" v-show="flag">
                <v-button :loading='submitLoading' height='50px' @click="submit">保存</v-button>
                <v-button :loading='deleteLoading' height='50px' @click="dele">删除</v-button>
            </div>
        </div>



        <Picker type="DatePicker" v-model="showStart_at" @sure="dateStart_at" valueSeparator="-"></Picker>
        <Picker type="DatePicker" v-model="showEnd_at" @sure="dateEnd_at" valueSeparator="-"></Picker>


    </div>



</template>

<script type="text/ecmascript-6">
    import { is } from '../../utils/util';

    export default {
        name:'works',
        data() {
            return {
                flag: false,
                name:'',//名称
                role:'',//职位
                start_at:'',//开始
                end_at:'',//结束
                city:'',//城市
                tags:'',//技术
                description:'',//描述
                id:'',
                showLoading: false,
                showStart_at: false,
                showEnd_at: false,
                deleteLoading: false,
                submitLoading: false
            }
        },
        methods: {

            dateStart_at(data) {
                console.log(data);
                this.start_at = data.formatDate;
            },
            dateEnd_at(data) {
                this.end_at = data.formatDate;
            },
            selects(name) {
                switch (name) {
                    case 'dateStart_at':
                        this.showStart_at = true
                        break;
                    case 'dateEnd_at':
                        this.showEnd_at = true
                        break;
                }
            },

            ModifyWork() {
                this.submitLoading = false;
                this.$Modal.confirm({body: "修改成功", onOk: function () {
                    window.history.back();
                }})
            },

            //删除
            dele() {
                this.deleteLoading = true;

                this.$store.dispatch('deleteWork',this.id);

                setTimeout(() => {
                    this.$store.dispatch('queryUserInfo');
                }, 300)
            },
            delWork() {
                this.deleteLoading = false;

                this.$Modal.confirm({body: "删除成功", onOk: function () {
                    window.history.back();
                }})

            },

            //添加经验,保存
            submit() {

                let data = {
                    name: this.name,
                    role: this.role,
                    start_at: this.start_at,
                    end_at: this.end_at,
                    city: this.city,
                    tags: this.tags,
                    description: this.description
                }
                if (this.flag) {
                    data.id = this.id
                }
                let mes;
                if (!is.has(this.name)) {
                    mes = '请输入公司名称';
                } else if (!is.has(this.role)) {
                    mes = '请输入职位';
                } else if (!is.has(this.start_at)) {
                    mes = '请输入开始时间'
                } else if (!is.has(this.end_at)) {
                    mes = '请输入结束时间'
                } else if (!is.has(this.city)) {
                    mes = '请输入城市'
                }

                if (mes) {
                    this.$Modal.confirm({body:mes})
                } else {
                    this.showLoading = true;
                    this.submitLoading = true;
//                    解决me接口问题
                    setTimeout(() => {
                        this.$store.dispatch('queryUserInfo');
                    }, 300)


                    if (!this.flag) {
                        this.$store.dispatch('editWork',data);
                    } else {
                        this.$store.dispatch('modifyWork',data);
                    }
                }

            },
            editWorks() {
                this.showLoading = false;

                this.$Modal.confirm({body: "添加成功", onOk: function () {
                    window.history.back();
                }})

            },
            work(res) {
                this.name = res.data.name;
                this.role = res.data.role;
                this.start_at = res.data.start_at;
                this.end_at = res.data.end_at;
                this.city = res.data.city;
                this.tags = res.data.tags;
                this.description = res.data.description;
            }
        },
        created() {
//            获取工作经历的id
            this.id = this.$route.query.id;
            if(this.id) {
                this.flag = true;
                this.$store.dispatch('queryWork',this.id)
                EventBus.$on('idWork', this.work);
                EventBus.$on('delWork', this.delWork);
                EventBus.$on('ModifyWork', this.ModifyWork);
            }
            EventBus.$on('EditWork', this.editWorks);
        },
        beforeDestroy() {
            EventBus.$off('idWork');
            EventBus.$off('delWork');
            EventBus.$off('ModifyWork');
            EventBus.$off('EditWork');
        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #works{
        background: #efeff4;
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                i {
                    display: block;
                }
            }
            .title {
                text-align: center;
            }
            .right {
                font-size: 0;
            }
        }
        .content {
            margin-top: 12px;

            .tag{
                background: #fff;
                font-size: 14px;
                flex-wrap: wrap;
                align-items: center;
                color: #008cee;
                .tag-text{
                    padding: 13px 15px;
                    width: 100%;

                    &.time{
                        display: flex;
                        .times{
                            width: 85px;
                        }
                        .word{
                            color: #9a9a9a;
                            margin-right: 10px;
                            margin-left: 2px;
                        }
                    }
                    input{
                        width: 100%;
                    }
                }

            }

        }
        .bottom{
            background: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            .edit{
                text-align: center;
                color: #fff;
                .vlc-button-normal{
                    background-color: #008cee;
                    border-color: #008cee;
                    border-radius: 0px;
                }
                .rigth{
                    padding: 15px 0px;
                    flex: 1;
                    .txt{
                        font-weight: normal;
                        text-align: center;
                    }
                    &.cor{
                        background: #008cee;
                    }

                }
            }
            .del{
                display: flex;
                justify-content: space-around;
                z-index: 55;
                align-items: center;
                text-align: center;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                .vlc-button{
                    &:first-child{
                        .vlc-button-normal{
                            background-color: #008cee;
                            border-color: #008cee;
                            border-radius: 0px;

                        }
                    }
                    &:last-child{
                        .vlc-button-normal{
                            background-color: #ffffff;
                            border-color: #ffffff;
                            border-radius: 0px;
                            color: #ea4448;
                        }
                    }
                }

                /*.btn{*/
                /*flex: 1;*/
                /*width: 0%;*/
                /*height: 50px;*/
                /*line-height: 50px;*/
                /*text-align: center;*/
                /*color: #ffffff;*/

                /*&.cancel{*/
                /*color: #9b9b9b;*/
                /*background: #FFFFFF;*/
                /*}*/
                /*&.ok{*/
                /*background: #008cee;*/
                /*}*/
                /*}*/
            }



        }
    }


</style>
