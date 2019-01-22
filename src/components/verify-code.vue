<template>
    <div class="verify-code vmc-1px" :class="sending ? 'disabled' : ''" @click="getCode">
        {{text}}
    </div>
</template>

<script type="text/ecmascript-6">
    import { is } from '../utils/util';

    export default {
        props: {
            total: {
                type: Number,
                default: 60
            },
            interval: {
                type: Number,
                default: 1000
            },
            label: String,
            title: String,
            message: String,
            account: String,
            options: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                text: this.label,
                sending: false,
                access_token: null
            }
        },
        methods: {
            random() {
                return Math.random().toString(36).substr(2, 24);
            },
            querySuccess() {
                var total = this.total;
                this.text = this.message.replace(/\{counter}/g, total);

                var timer = setInterval(() => {
                    total--;
                    this.text = this.message.replace(/\{counter}/g, total);

                    if (total < 1) {
                        this.text = this.label;
                        this.sending = false;
                        clearInterval(timer);
                    }
                }, this.interval);

            },
            queryFail() {
                this.text = this.label;
                this.sending = false;
            },
            getCode() {
                if (this.sending) return;

                var message = null;
                if (!is.has(this.account)) {
                    message = '请输入您的手机号';
                } else if (!is.mobile(this.account)) {
                    message = '手机号格式不正确，请重新输入';
                }

                if (message) {
                    this.$Modal.confirm({body: message});
//                    this.$Alert(message);
                } else {
                    this.sending = true;
                    this.text = this.title;
                    this.access_token = this.random();
                    this.$parent.sms_token = this.access_token;

                    EventBus.$http.post(this.$Config.baseUrl + 'api/sms/verify-code', {
                        mobile: this.account,
                        access_token: this.access_token
                    }).then(res => {
                        res = res.data;

                        if (res.success) {
                            this.querySuccess();
                        } else {
                            this.$Modal.confirm({body: res.message, onOk: () => {
                                this.queryFail();
                            }})
                        }
                    }, () => {
                        this.$Modal.confirm({body: res.message, onOk: () => {
                            this.queryFail();
                        }})
                    })
                }
            }
        }
    }
</script>
