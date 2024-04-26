<template>
    <el-container class="container">
        <el-card class="card login-container">
            <div class="login-title">Login</div>
            <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="100px">
                <el-form-item label="User Name" prop="username">
                    <el-input size="large" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password" label-width="100px">
                    <el-input size="large" v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="large" type="primary" @click="submitForm" plain>Login</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-container>
</template>
<script setup>
    import { ref } from 'vue';
    const loginForm = ref({
        username: '',
        password: ''
    });

    // 使用 ref 创建验证规则
    const rules = ref({
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ]
    });

    // 提交表单
    const submitForm = () => {
        loginForm.validate(valid => {
            if (valid) {
                // 在这里执行登录逻辑
                console.log('登录成功');
            } else {
                console.log('表单验证失败');
                return false;
            }
        });
    };
</script>
<style scoped lang="scss">
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding: 0 20px;
    }
    .login-container {
        max-width: 600px;
        width: 100%;
        height: 320px;
    }

    .login-title{
        text-align: center;
        font-size: 38px;
        font-weight: bold;
        padding: 20px 0;
    }
</style>