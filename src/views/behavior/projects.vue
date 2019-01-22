<template>
    <div id="projects">
        <Header title="编辑项目">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="entry">
                <div class="mx-1px-bottom inp">
                    <input type="text" placeholder="项目/著作名称（2-32个字） *" maxlength="32" v-model="name">
                </div>
                <div class="mx-1px-bottom inp time">
                    <div class="times">
                        <input type="text" placeholder="在职时间 *" v-model="start_at" @click="selects('dateStart_at')" readonly>
                    </div>
                    <span class="word">至</span>
                    <div class="times">
                        <input type="text" placeholder="结束时间 *" v-model="end_at" @click="selects('dateEnd_at')" readonly>
                    </div>
                </div>
                <div class="mx-1px-bottom inp">
                    <input type="text" placeholder="项目职位 *" v-model="role" >
                </div>
                <div class="mx-1px-bottom inp">
                    <input type="text" placeholder="项目地址" v-model="url" >
                </div>
                <div class="mx-1px-bottom inp">
                    <input type="text" placeholder="相关技术" v-model="tags" >
                </div>
                <textarea placeholder="项目简介" v-model="description" ></textarea>
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
        name:'projects',
        data() {
            return {
                flag: false,
                name:'',//名称
                role:'',//职位
                start_at:'',//开始
                end_at:'',//结束
                url:'',//地址
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
//           时间组件
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


            ModifyProject() {
                this.submitLoading = true;

                this.$Modal.confirm({body: "修改成功", onOk: function () {
                    window.history.back();
                }})
            },

            //删除
            dele() {
                this.deleteLoading = true;

                setTimeout(() => {
                    this.$store.dispatch('queryUserInfo');
                }, 300)

                this.$store.dispatch('deleteProject',this.id);
            },
            delProject() {
                this.deleteLoading = false;

                this.$Modal.confirm({body: "删除成功", onOk: function () {
                    window.history.back();
                }})
            },

//            添加经验
            submit() {
               /* let t;
                var pattern = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}~\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/.test(this.time);

                t = this.time.split('~');*/

                let data = {
                    name: this.name,
                    role: this.role,
                    start_at: this.start_at,
                    end_at: this.end_at,
                    url: this.url,
                    tags: this.tags,
                    description: this.description
                }
                if (this.flag) {
                    data.id = this.id
                }
                let mes;
                if (!is.has(this.name)) {
                    mes = '请输入项目名称';
                } else if (!is.projectsname(this.name)) {
                    mes = '请输入2-32位不含特殊符号的中英文项目名称'
                } else if (!is.has(this.role)) {
                    mes = '请输入职位';
                } else if (!is.has(this.start_at)) {
                    mes = '请输入开始时间'
                } else if (!is.has(this.end_at)) {
                    mes = '请输入结束时间'
                }

                if (mes) {
                    this.$Modal.confirm({body:mes})
                } else {
                    this.showLoading = true;
                    this.submitLoading = true;

                    setTimeout(() => {
                        this.$store.dispatch('queryUserInfo');
                    }, 300)

                    if (!this.flag) {
                        this.$store.dispatch('editProject',data);
                    } else {
                        this.$store.dispatch('modifyProject',data);
                    }
                }
            },
            editP() {
                this.showLoading = false;

                this.$Modal.confirm({body: "添加成功", onOk: function () {
                    window.history.back();
                }})
            },
            project(res) {
                this.name = res.data.name;
                this.role = res.data.role;
                this.start_at = res.data.start_at;
                this.end_at = res.data.end_at;
                this.url = res.data.url;
                this.tags = res.data.tags;
                this.description = res.data.description;
            }
        },
        created() {
//            获取项目档案的id
            this.id = this.$route.query.id;
            if(this.id) {
                this.flag = true;
                this.$store.dispatch('queryProject',this.id)
                EventBus.$on('idProject', this.project);
                EventBus.$on('delProject', this.delProject);
                EventBus.$on('ModifyProject', this.ModifyProject);
            }
            EventBus.$on('EditProject', this.editP);
        },
        beforeDestroy() {
            EventBus.$off('idProject');
            EventBus.$off('delProject');
            EventBus.$off('ModifyProject');
            EventBus.$off('EditProject');
        }


    }

</script>


<style rel="stylesheet/less" lang="less">

    #projects{
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
            .entry{
                background: #FFF;
                padding: 12px 15px;
                font-size: 15px;
                padding-top: 0px;
                .inp{
                    padding: 12px 0px;
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
                }
                input{
                    width: 100%;
                }
                textarea{
                    width: 100%;
                    padding-top: 12px;
                    height: 182px;
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
                        /*color: #ea4448;*/
                        font-weight: normal;
                        text-align: center;
                    }
                    &.cor{
                        background: #008cee;
                    }
                    /*.tinct{
                       background: #008cee;
                       color: #fff;
                   }*/

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
