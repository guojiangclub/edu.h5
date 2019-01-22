<template>
    <div id="favorites-add">
        <Header title="收藏">
            <div slot="left" class="left-item">
                <i class="back iconfont icon-fanhui-"></i>
            </div>
        </Header>

        <div class="content">
            <div class="entry">
                <div class="mx-1px-bottom inp">
                    <input type="text" placeholder="收藏夹名称" >
                </div>
                <textarea placeholder="收藏夹描述（选填）"></textarea>
            </div>
        </div>
        <div class="bottom">
            <div class="left">
                <div class="txt">完成</div>
            </div>
        </div>

    </div>



</template>

<script type="text/ecmascript-6">
    import { is } from '../../utils/util';

    export default {
        name:'favorites-add',
        data() {
            return {

            }
        },
        methods: {

        },
        created() {

        },
//        记得销毁
        beforeDestroy() {

        }

    }

</script>


<style rel="stylesheet/less" lang="less">

    #favorites-add{
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
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 50px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            line-height: 50px;

            /*box-shadow:0 1px 0 #000 inset;*/

            .left{
                color: #008cee;
            }

        }
    }


</style>
