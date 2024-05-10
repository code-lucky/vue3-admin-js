<template>
    <el-container class="container">
        <el-card class="card login-container">
            <div class="login-title">后台登录</div>
            <el-form class="form" ref="loginFormRef" :model="loginForm" :rules="rules">
                <el-form-item label="" prop="user_name">
                    <el-input size="large" v-model="loginForm.user_name" :prefix-icon="User"
                        placeholder="Please enter username"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input size="large" v-model="loginForm.password" :prefix-icon="Lock"
                        placeholder="please enter password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="large" type="primary" @click="submitForm" class="login-btn">Login</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-container>
</template>
<script setup>
    import { ref } from 'vue';
    import router from '@/router'
    import { User, Lock } from '@element-plus/icons-vue'
    import { login } from '@/api/login'
    import { TOKEN } from '@/utils/constant'
    const loginForm = ref({
        user_name: '',
        password: ''
    });

    const loginFormRef = ref(null);

    // 使用 ref 创建验证规则
    const rules = ref({
        user_name: [
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
                login(loginForm.value).then(res => {
                    localStorage.setItem(TOKEN, res.data.access_token)
                    router.push('/dashboard/index')
                })
            } else {
                console.log('表单验证失败');
                return false;
            }
        });
    };
</script>
<style scoped lang="scss">
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding: 0 20px;
    }

    .login-container {
        max-width: 400px;
        width: 100%;
        height: 360px;
    }

    .login-title {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        padding: 20px 0;
    }

    .form {
        margin-top: 20px;
        padding: 0 40px;
    }

    .login-btn {
        width: 100%;
    }
</style>