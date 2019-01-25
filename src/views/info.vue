<template>
    <div class="info">
        <!--头像区域-->
        <transition>
            <div class="head-field" v-show="appear">
                <span class="head-field-pic">
                    <span class="img-hover" @click.stop="uploadHeadImg">
                        <img :src="userinfo.headUrl" v-autofix/>
                    </span>
                </span>
            </div>
        </transition>
        <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
        <div class="info-field">
            <transition name="slide-1">
                <p v-show="appear">asdasdasdasd</p>
            </transition>
            <transition name="slide-2">
                <p v-show="appear">asdasdasdasd</p>
            </transition>
            <transition name="slide-3">
                <p v-show="appear">asdasdasdasd</p>
            </transition>
        </div>
    </div>
</template>

<script>
    export default {
        name: "info",
        props: ['userinfo'],
        data() {
            return {
                appear: false
            }
        },
        beforeRouteLeave(to, from, next) {
            this.appear = false;
            setTimeout(() => {
                next();
            }, 800)
        },
        mounted() {
            // 将回调延迟到下次 DOM 更新循环之后执行
            this.$nextTick(() => {
                this.appear = true
            })
        },
        methods: {
            handleFile(e) {
                console.log('================');
                this.$bus.$emit('loading');
                let $target = e.target || e.srcElement;
                let file = $target.files[0];
                let reader = new FileReader();
                reader.onload = (data) => {
                    let res = data.target || data.srcElement;
                    let img = new Image();
                    img.onload = () => {
                        // 回调更新父组件数据
                        this.saveImg(res.result).then(() => {
                            setTimeout(() => {
                                this.$bus.$emit('unload');
                                this.$emit('update-userinfo', {headUrl: res.result})
                            }, 1500)
                        })
                    };
                    img.src = res.result;
                };
                reader.readAsDataURL(file);
            },
            // 打开图片上传
            uploadHeadImg() {
                this.$el.querySelector('.hiddenInput').click();
            },
            saveImg(dataUrl) {
                return this.$axios.get('/api.json').then(data => {
                    localStorage.setItem('headImg', dataUrl)
                }).catch(data => {
                    console.log(data);
                    this.$bus.$emit('unload');
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .info {
        .slide-enter-active,
        .slide-leave-active {
            transform: translateY(0);
            transition: transform 1s;
        }

        .slide-enter,
        .slide-leave-to /* .fade-leave-active in below version 2.1.8 */
        {
            transform: translateY(-50px);
        }

        @for $i from 1 to 4 {
            .slide-#{$i}-enter-active {
                transform: translateY(0);
                opacity: 1;
                transition: transform 1s, opacity 1s;
                transition-delay: ($i - 1s) / 5;
            }
            .slide-#{$i}-leave-active {
                transform: translateY(0);
                opacity: 1;
                transition: transform .5s, opacity .5s;
            }
            .slide-#{$i}-enter,
            .slide-#{$i}-leave-to {
                opacity: 0;
                transform: translateY(50px);
            }
        }

        .head-field {
            text-align: center;
            padding: 20px 0;
            margin-top: 50px;

            .head-field-pic {
                display: inline-block;
                width: 100%;

                .img-hover {
                    // css 宽高等比例
                    display: inline-block;
                    width: 30%;
                    height: 0;
                    padding-bottom: 30%;
                    border-radius: 50%;
                    overflow: hidden;
                }
            }
        }

        .info-field {
            text-align: center;
            font-size: 16px;
            color: #999;
        }

        /* 隐藏的输入框 */
        .hiddenInput {
            opacity: 0;
            position: absolute;
        }
    }

</style>