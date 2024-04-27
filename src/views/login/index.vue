<template>
    <el-container class="container">
        <el-card class="card login-container">
            <div class="login-title">Login</div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="100px">
                <el-form-item label="UserName" prop="username">
                    <el-input size="large" v-model="loginForm.username" placeholder="Please enter username"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password" label-width="100px">
                    <el-input size="large" v-model="loginForm.password" placeholder="please enter password" type="password"></el-input>
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
    import router from '@/router'
    const loginForm = ref({
        username: '',
        password: ''
    });

    const loginFormRef = ref(null);

    // 使用 ref 创建验证规则
    const rules = ref({
        username: [
            { required: true, message: 'Please enter username', trigger: 'blur' }
        ],
        password: [
            { required: true, message: 'please enter password', trigger: 'blur' }
        ]
    });

    // 提交表单
    const submitForm = () => {
        loginFormRef.value.validate(valid => {
            if (valid) {
                // 在这里执行登录逻辑
                console.log('登录成功');
                router.push('/index')
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