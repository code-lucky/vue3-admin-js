<template>
    <div class="header-container">
        <img src="../../assets/images/pack-up.svg" class="pick-left" alt="" v-if="collapseStatus"
            @click="changeCollapse" />
        <img src="../../assets/images/pack-up.svg" class="pick-right" alt="" v-else @click="changeCollapse" />
        <div class="header-pic">
            <el-dropdown>
                <img src="../../assets/images/header-pic.svg" alt="" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">LogOut</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script setup>
    import { ref, provide, onMounted, onUnmounted } from 'vue'
    import eventBus from "@/utils/event-bus"
    const collapseStatus = ref(false)

    const pageChange = () => {
        if (window.innerWidth < 768) {
            collapseStatus.value = true
            eventBus.$emit('collapseStatus', collapseStatus.value)
        } else {
            collapseStatus.value = false
            eventBus.$emit('collapseStatus', collapseStatus.value)
        }
    }

    const changeCollapse = () => {
        collapseStatus.value = !collapseStatus.value
        eventBus.$emit('collapseStatus', collapseStatus.value)
    }

    // 登出
    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    onMounted(() => {
        pageChange()
        // 监听页面大小变化
        window.addEventListener('resize', pageChange)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', pageChange)
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

    :deep(.el-tooltip__trigger:focus-visible) {
        outline: unset;
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