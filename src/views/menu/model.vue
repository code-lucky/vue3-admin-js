<template>
    <div>
        <el-form :model="form" inline size="large" label-width="auto">
            <el-row :gutter="24">
                <el-col :xs="24" :sm="8" :xl="8">
                    <el-form-item label="Name">
                        <el-input v-model="form.menu_name" placeholder="menu name" clearable/>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :xl="8">
                    <el-form-item label="Path">
                        <el-input v-model="form.menu_path" placeholder="menu path" clearable/>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :xl="8">
                    <el-form-item label="Component">
                        <el-input v-model="form.menu_path" placeholder="menu path" clearable/>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="8" :xl="8">
                    <el-form-item label="sort">
                        <el-input v-model="form.menu_path" placeholder="menu path" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'

    const form = ref({
        menu_name: ''
    })
</script>
<style scoped>
    
</style>