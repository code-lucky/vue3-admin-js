<template>
    <div class="logo-content">Logo</div>
    <el-menu default-active="2" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
        <el-sub-menu :index="item.path" v-for="(item,index) in menuList" :key="item.index">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>{{item.name}}</span>
            </template>
            <el-menu-item-group v-for="(child,idx) in item.children" :key="idx">
                <el-menu-item :index="child.path" @click="goPath(child.path)">{{child.name}}</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
    import { ref, onMounted, inject } from 'vue'
    import eventBus from "@/utils/event-bus"
    import {
        Document,
        Menu as IconMenu,
        Location,
        Setting,
    } from '@element-plus/icons-vue'
    import router from "@/router/index"
    import pinia from "@/store/index"
    import { useUserStore } from "@/store/user";
    const store = useUserStore(pinia)

    const menuList = store.menuList

    const isCollapse = ref(false);

    const handleOpen = (key, keyPath) => {
        // console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
        // console.log(key, keyPath)
    }
    
    const goPath = (path) => {
        router.push(path)
    }

    onMounted(() => {
        eventBus.$on('collapseStatus', (status) => {
            isCollapse.value = status
        })
    })
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    .logo-content {
        height: 60px;
        background-color: #fff;
        box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>