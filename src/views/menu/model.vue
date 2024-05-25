<template>
    <div class="app-container">
        <h2>Menu {{ id ? 'Edit': 'Create'}}</h2>
        <div class="model-input">
            <el-form :model="form" inline size="large" label-width="auto" :rules="rules" ref="formRef">
                <el-form-item label="Name" prop="menu_name">
                    <el-input v-model="form.menu_name" placeholder="Please input menu name" clearable />
                </el-form-item>
                <el-form-item label="Parent menu" prop="pid">
                    <el-select v-model="form.pid" placeholder="Select">
                        <el-option v-for="item in menuList" :key="item.id" :label="item.menu_name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Path" prop="menu_path">
                    <el-input v-model="form.menu_path" placeholder="Please input menu path" clearable />
                </el-form-item>
                <el-form-item label="Component" prop="menu_component">
                    <el-input v-model="form.menu_component" placeholder="Please input component path" clearable />
                </el-form-item>
                <el-form-item label="Icon" prop="menu_icon">
                    <el-input v-model="form.menu_icon" placeholder="Select icon" readonly @click="openIconDialog" />
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm()">Save</el-button>
                    <el-button @click="goback">Go back</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-dialog v-model="iconDialog" title="Select icon" width="80%" :before-close="handleClose">
            <div class="icon-list">
                <div class="icon-list-item" v-for="item in iconList" :key="item.key"
                    @click="selectIcon(item.component)">
                    <el-icon>
                        <component :is="item.component"></component>
                    </el-icon>
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="iconDialog = false">
                        Cancel
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
    import { ref, onMounted, markRaw } from 'vue'
    import { ElMessage } from 'element-plus'
    import * as ElementPlusIconsVue from '@element-plus/icons-vue'
    import { getMenuByTop, createMenu, getMenu, updateMenu } from "@/api/menu"
    import { useRoute } from 'vue-router'
    import router from '@/router'
    const form = ref({
        menu_name: '',
        pid: 0,
        menu_path: '',
        menu_component: '',
        sort: 0,
        menu_icon: '',
    })
    const route = useRoute()
    const id = route.query.id
    const formRef = ref(null)
    const iconList = ref([])
    const iconDialog = ref(false)
    const menuList = ref([])

    const rules = ref({
        menu_name: [
            { required: true, message: 'Please input menu name', trigger: 'blur' }
        ],
        menu_path: [
            { required: true, message: 'Please input menu path', trigger: 'blur' }
        ],
        menu_component: [
            { required: true, message: 'Please input component path', trigger: 'blur' }
        ]
    })

    const openIconDialog = () => {
        iconDialog.value = true
    }

    const handleClose = () => {
        iconDialog.value = false
    }

    // 获取所有的一级菜单
    const getMenuList = () => {
        getMenuByTop().then(res => {
            menuList.value = res.data
            menuList.value.unshift({
                id: 0,
                menu_name: 'Top menu'
            })
        })
    }

    const selectIcon = (item) => {
        form.value.menu_icon = item.name
        iconDialog.value = false
    }

    const submitForm = () => {
        formRef.value.validate(valid => {
            if (valid) {
                if (id) {
                    form.value.id = id
                    updateMenu(form.value).then(res => {
                        if (res.code === 200) {
                            ElMessage.success('Save success')
                            setTimeout(() => {
                                router.go(-1)
                            }, 1500)
                        }
                    })
                } else {
                    createMenu(form.value).then(res => {
                        if (res.code === 200) {
                            ElMessage.success('Save success')
                            setTimeout(() => {
                                router.go(-1)
                            }, 1500)
                        }
                    })
                }
            } else {
                console.log('Validation failed')
                return false
            }
        })
    }

    const goback = () => {
        router.go(-1)
    }

    onMounted(() => {
        getMenuList()
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            iconList.value.push({
                name: key,
                component: markRaw(component)
            })
        }
        if (id) {
            console.log('id', id)
            getMenu(id).then(res => {
                const data = res.data
                console.log(data)
                form.value = {
                    menu_name: data.menu_name,
                    pid: data.pid,
                    menu_path: data.menu_path,
                    menu_component: data.menu_component,
                    menu_icon: data.menu_icon,
                    sort: 0
                }
            })
        }
    })
</script>
<style scoped lang="scss">
    .icon-list {
        overflow: hidden;
        list-style: none;
        padding: 0 !important;
        border: 1px solid var(--el-border-color);
        border-radius: 4px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        height: 60vh;
        overflow-y: auto;
        padding: 20px;
    }

    .icon-list-item {
        text-align: center;
        color: var(--el-text-color-regular);
        height: 90px;
        font-size: 13px;
        border-right: 1px solid var(--el-border-color);
        border-bottom: 1px solid var(--el-border-color);
        transition: background-color var(--el-transition-duration);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :deep(.icon-list-item .el-icon) {
        font-size: 30px;
        margin-top: 10px;
    }
</style>