<template>
    <div class="eat-what">
        <div class="head-part">
            <h1 class="head-title">今天吃什么</h1>
            <p class="info">asdasdasdas</p>
        </div>
        <div class="weui-grids">
            <div v-for="(grid, index) in grids" v-bind:key="grid.title">
                <a href="javascript:;" class="weui-grid" :class="{active: grid.index === activeIndex}"
                   :style="{background:grid.index === activeIndex ? hoverColor:''}"
                   @click="random(grid.clickable,index,grid.title)">
                    <div class="weui-grid__icon">
                        <img :src='"image/"+grid.image' alt="">
                    </div>
                    <p class="weui-grid__label" v-if="grid.title !== '开始'">{{grid.title}}</p>
                    <p class="weui-grid__label" v-if="grid.title === '开始'">{{doingText}}</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import utils from '../utils/utils'

    export default {
        name: "eatWhat",
        props: ['userinfo'],
        data() {
            return {
                grids: [
                    {title: '云吞面', image: 'food1.png', clickable: false, index: 1},
                    {title: 'M记', image: 'food2.png', clickable: false, index: 2},
                    {title: 'K记', image: 'food3.png', clickable: false, index: 3},
                    {title: '沙拉', image: 'food4.png', clickable: false, index: 8},
                    {title: '开始', image: 'begin.png', clickable: true, index: ''},
                    {title: '方便面', image: 'food6.png', clickable: false, index: 4},
                    {title: '减肥水果', image: 'food7.png', clickable: false, index: 7},
                    {title: '屎', image: 'food8.png', clickable: false, index: 6},
                    {title: '冰淇淋', image: 'food9.png', clickable: false, index: 5}
                ],
                activeIndex: 1,
                flag: false,
                timer: '',
                finish: 1,
                editIndex: '',
                hoverColor: '',  // 一个遮罩背景颜色， 比主题色加了透明度
                doingText: '开始',  // 一个抽取中的文案
                doingTimer: '',
                lockRandom: false,   // 抽取时候要加锁
                test: 'hahw 是测试的'
            }
        },
        mounted() {
            this.$nextTick(() => {
                // 设置颜色
                this.$el.querySelector('.head-title').style.color = this.userinfo.color;
                this.hoverColor = utils.hexToRgba(this.userinfo.color);
                this.$el.querySelector('.eat-what .active').style.background = this.hoverColor;
            })
        },
        methods: {
            random(con, index, food) {
                //随机抽取
                console.log('lockRandom', this.lockRandom);
                if (this.lockRandom) return false;
                if (con === true) {
                    this.lockRandom = false;
                    console.log('lockRandom', this.lockRandom);
                    this.doingText = '抽取中';
                    this.loadingText();
                    let timer = setInterval(this.add, 100);
                    setTimeout(() => {
                        clearInterval(timer);
                        this.finish = 1;
                        this.flag = true;
                        this.utimal = 9 + Math.round(Math.random() * 8);
                        this.timer = setInterval(this.add, 200 * (Math.random() + 1))
                    }, 4000 + (Math.random() + 1) * 100)

                } else {
                    this.$router.push({path: 'editFood'})
                    window.index = index // 用全局存放一个index的值
                }
            },
            loadingText() {
                this.doingTimer = setInterval(() => {
                    this.doingText = this.doingText.length >= 6 ? this.doingText.replace(/\./g, '') : this.doingText + '.'
                }, 500)
            },
            add() {
                if (this.activeIndex === 8) {
                    this.activeIndex = 1;
                } else {
                    this.activeIndex++
                }
                if (this.flag) {
                    if (this.finish === this.utimal) {
                        clearInterval(this.timer)
                        clearInterval(this.doingTimer)
                        this.flag = false
                        this.lockRandom = false
                        this.doingText = '开始'
                    } else {
                        this.finish++
                    }
                }
            }
        },
        created() {
            let foodList = JSON.parse(localStorage.getItem('food') || '[]')
            if (foodList.length === 0) {
                this.grids = [
                    {title: '云吞面', image: 'food1.png', clickable: false, index: 1},
                    {title: 'M记', image: 'food2.png', clickable: false, index: 2},
                    {title: 'K记', image: 'food3.png', clickable: false, index: 3},
                    {title: '沙拉', image: 'food4.png', clickable: false, index: 8},
                    {title: '开始', image: 'begin.png', clickable: true, index: ''},
                    {title: '方便面', image: 'food6.png', clickable: false, index: 4},
                    {title: '减肥水果', image: 'food7.png', clickable: false, index: 7},
                    {title: '屎', image: 'food8.png', clickable: false, index: 6},
                    {title: '冰淇淋', image: 'food9.png', clickable: false, index: 5}
                ];
                localStorage.setItem('food', JSON.stringify(this.grids))
            } else {
                this.grids = foodList
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .eat-what {
        .head-part {
            padding-top: 2rem;
            color: red;
            text-align: center;

            .head-title {
                color: #3cc51f;
                font-size: 3.2rem;
                font-weight: 400;
            }

            .info {
                color: gray;
                font-size: 1.6rem;
            }
        }

        .active {
            background: #E8C2A8;
        }
    }
</style>