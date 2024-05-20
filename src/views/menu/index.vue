<template>
    <div class="app-container">
        <h2>Menu List</h2>
        <div class="header-content">
            <el-form>
                <div class="search-box">
                    <el-form-item label="Menu name">
                        <div class="flex-column">
                            <el-input v-model="searchForm.menu_name" placeholder="Please enter the menu name" />
                            <el-button type="primary" @click="handleSearch" :icon="Search">
                                Search
                            </el-button>
                        </div>
                    </el-form-item>
                </div>

            </el-form>
            <el-button type="primary" @click="handleAdd" :icon="Plus">
                New menu
            </el-button>
        </div>

        <el-table :data="menuList" row-key="id">
            <el-table-column label="Id" prop="id" />
            <el-table-column label="Name" prop="menu_name" />
            <el-table-column label="Path" prop="menu_path" />
            <el-table-column label="Component path" prop="menu_component" />
            <el-table-column label="Icon" prop="menu_icon" />
            <el-table-column label="Update time" prop="update_time" />
            <el-table-column label="Handle" prop="update_time" width="240">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)">
                        Edit
                    </el-button>
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { Plus, Search } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router'
    import { treeMenu } from "@/api/menu"

    const router = useRouter()

    const searchForm = ref({
        menu_name: ''
    })

    const menuList = ref([])

    const handleAdd = () => {
        router.push({
            path: '/menu/menu-model'
        })
    }

    onMounted(() => {
        treeMenu().then(res => {
            menuList.value = res.data
            console.log(menuList.value)
        })
    })
</script>
<style scoped>
    :deep(.el-table__inner-wrapper:before) {
        height: 0;
    }

    .header-content {
        padding: 15px 0px;
    }
</style>