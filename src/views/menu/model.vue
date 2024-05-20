<template>
    <div class="app-container">
        <div class="model-input">
            <el-form :model="form" inline size="large" label-width="80">
                <el-form-item label="Name">
                    <el-input v-model="form.menu_name" placeholder="menu name" clearable />
                </el-form-item>
                <el-form-item label="Path">
                    <el-input v-model="form.menu_path" placeholder="menu path" clearable />
                </el-form-item>
                <el-form-item label="Component">
                    <el-input v-model="form.menu_path" placeholder="menu path" clearable />
                </el-form-item>
                <el-form-item label="sort">
                    <el-input v-model="form.menu_path" placeholder="menu path" clearable />
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'

    const form = ref({
        menu_name: ''
    })
</script>
<style scoped lang="scss">

</style>