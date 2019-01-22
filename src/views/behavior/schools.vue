<template>
    <div id="schools">
        <Header title="编辑教育">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="entry">
                <div class="mx-1px-bottom inp">
                    <input type="text" placeholder="学校 *" v-model="name" >
                </div>
                <div class="mx-1px-bottom inp">
                    <input type="text" placeholder="专业 *" v-model="department" >
                </div>
                <div class="mx-1px-bottom inp">
                    <input type="text" placeholder="学历 *" v-model="degree" >
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
                <textarea placeholder="在校经历" v-model="description"></textarea>
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
        name:'schools',
        data() {
            return {
                flag: false,
                name:'',//名称
                department:'',//专业
                start_at:'',//开始
                end_at:'',//结束
                degree:'',//学历
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

            ModifySchool() {
                this.submitLoading = false;
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

                this.$store.dispatch('deleteSchool',this.id);
            },
            delSchool() {
                this.deleteLoading = false;

                this.$Modal.confirm({body: "删除成功", onOk: function () {
                    window.history.back();
                }})
            },

//            添加经验,保存
            submit() {
                /*let time;
                var pattern = /\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}~\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}/.test(this.time);

                time = this.time.split('~');*/

                let data = {
                    name: this.name,
                    department: this.department,
                    start_at: this.start_at,
                    end_at: this.end_at,
                    degree: this.degree,
                    tags: this.tags,
                    description: this.description
                }
                if (this.flag) {
                    data.id = this.id
                }
                let mes;
                if (!is.has(this.name)) {
                    mes = '请输入学校名称';
                } else if (!is.has(this.department)) {
                    mes = '请输入专业';
                } else if (!is.has(this.degree)) {
                    mes = '请输入学历'
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
                        this.$store.dispatch('editSchool',data);
                    } else {
                        this.$store.dispatch('modifySchool',data);
                    }
                }
            },
            EditSchool() {
                this.showLoading = false;

                this.$Modal.confirm({body: "添加成功", onOk: function () {
                    window.history.back();
                }})
            },
            school(res) {
                this.name = res.data.name;
                this.department = res.data.department;
                this.start_at = res.data.start_at;
                this.end_at = res.data.end_at;
                this.degree = res.data.degree;
                this.tags = res.data.tags;
                this.description = res.data.description;
            }
        },
        created() {
//            获取学习经历的id
            this.id = this.$route.query.id;
            if(this.id) {
                this.flag = true;
                this.$store.dispatch('querySchool',this.id);
                EventBus.$on('idSchool', this.school);
                EventBus.$on('delSchool', this.delSchool);
                EventBus.$on('ModifySchool', this.ModifySchool);
            }
            EventBus.$on('EditSchool', this.EditSchool);
        },
        beforeDestroy() {
            EventBus.$off('idSchool');
            EventBus.$off('delSchool');
            EventBus.$off('ModifySchool');
            EventBus.$off('EditSchool');
        }
    }

</script>


<style rel="stylesheet/less" lang="less">

    #schools{
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
