<template>
    <div id="edu-category">
        <Header title="分类">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>
        <div class="contents">
            <div class="top">
                <!--<div class="title">-->
                    <!--全部-->
                <!--</div>-->
                <div class="index" @click="back">
                    返回首页
                </div>
            </div>
            <div class="classify-list">
                <div class="classify-item" v-for="item in list" @click="jump(item.id)">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
    	data() {
    		return {
    			list: ''
            }
        },
    	created() {
    		this.$store.dispatch('queryCategoryList');
    		EventBus.$on('categoryList', this.listData)
        },
        methods: {
    		listData(data) {
    			this.list = data;
            },
            jump(id) {
    			this.$router.push({name: 'edu-category-detail', params: {id: id}});
            },
            back() {
    			this.$router.push({name: 'edu'})
            }
        }
    }
</script>


<style rel="stylesheet/less" lang="less">
    #edu-category{
        .vlc-header {
            header {
                background: #393a3f;
            }
            .left {
                i {
                    display: block;
                    font-size: 15px;
                }
            }
            .title {
                text-align: center;
            }
            .right {
                font-size: 0;
            }
        }
        .contents{
            height: 100%;
            overflow: auto;
            padding-left: 12px;
            padding-right: 12px;
            .top{
                font-weight: bold;
                margin: 10px 0 5px 0;
                text-align: right;
            }
            .classify-list{
                font-size: 0;

                .classify-item{
                    display: inline-block;
                    width: 31%;
                    background: #33cccc;
                    border-radius: 3px;
                    padding: 10px;
                    margin: 5px 1%;
                    text-align: center;
                    font-size: 10px;
                    color: #fff;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>
