<template>
    <div class="header-container">
        <img src="../../assets/images/pack-up.svg" class="pick-left" alt="" v-if="collapseStatus" @click="changeCollapse"/>
        <img src="../../assets/images/pack-up.svg" class="pick-right" alt="" v-else  @click="changeCollapse"/>
        <div class="header-pic">
            <img src="../../assets/images/header-pic.svg" alt="" />
        </div>
    </div>
</template>
<script setup>
    import { ref, provide, onMounted } from 'vue'
    const collapseStatus = ref(true)
    
    const pageChange = () => {
        if (window.innerWidth < 768) {
            collapseStatus.value = true
        } else {
            collapseStatus.value = false
        }
    }

    const changeCollapse = () => {
        collapseStatus.value = !collapseStatus.value
    }

    provide('collapseStatus', collapseStatus)

    onMounted(() => {
        // 监听页面大小变化
        window.addEventListener('resize', pageChange)
    })
</script>
<style scoped lang="scss">
    .header-container {
        background-color: #fff;
        box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.1);
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 20px;
    }

    .header-pic {
        margin-left: auto;
        cursor: pointer;
    }

    .pick-left,
    .pick-right {
        width: 32px;
        cursor: pointer;
    }

    .pick-right {
        transform: rotate(180deg);
    }
</style>