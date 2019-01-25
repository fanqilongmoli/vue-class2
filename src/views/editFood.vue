<template>
    <div class="edit-food">
        <div class="head-part">
            <h1 class="head-title">编辑实物</h1>
        </div>
        <div class="edit-part">
            <input type="text" placeholder="记得吃好穿好长胖胖~~" v-model="editFood">
        </div>
        <div class="fixBottom">
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="savechange">确定</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "editFood",
        props: ['userinfo'],
        data() {
            return {
                editFood: '',
                foodList: [],
                index: ''
            }
        },
        watch: {
            editFood(val) {
                console.log(val, 'asdas');
            }
        },
        methods: {
            saveChange() {
                console.log(this.foodList);
                this.foodList[this.index].title = this.editFood;
                localStorage.setItem('food', JSON.stringify(this.foodList));
                this.$router.push({path: 'EatWhat'})
            }
        },
        mounted() {
            this.foodList = JSON.parse(localStorage.getItem('food') || '[]');
            this.editFood = this.foodList[window.index].title;
            this.index = window.index;
            this.$nextTick(() => {
                // 设置颜色
                this.$el.querySelector('.myTitle').style.color = this.userinfo.color;
                this.$el.querySelector('.weui-btn_primary').style.background = this.userinfo.color;
                this.$el.querySelector('.editPart input').style.borderColor = this.userinfo.color;
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .edit-food {
        padding: 4rem 0;
    }
</style>