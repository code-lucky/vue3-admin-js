<template>
    <div class="profile-box">
        <h1>Change Email</h1>
        <el-form :model="form" label-width="150px" :rules="rules" ref="formRef">
            <el-form-item label="Current Email" prop="current_email">
                <el-input v-model="form.current_email" size="large" clearable></el-input>
            </el-form-item>
            <el-form-item label="New Email" prop="email">
                <el-input v-model="form.email" size="large" clearable></el-input>
            </el-form-item>
            <el-form-item label="Captcha" prop="captcha">
                <div class="flex-column">
                    <el-input v-model="form.captcha" size="large" clearable></el-input>
                    <el-button type="success" @click="getCaptcha" :disabled="isDisabled" size="large">{{ captchaText }}</el-button>
                </div>
            </el-form-item>
            <el-form-item label>
                <el-button type="primary" @click="submitForm">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
    import { ref, nextTick, reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    import { updatePassword } from "@/api/user";

    const captchaText = ref('Get Captcha')

    const isDisabled = ref(false)

    const formRef = ref(null)

    const form = ref({
        current_email: '',
        email: '',
        captcha: ''
    })

    const checkEmail = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('Please input the email'))
        } else if (form.value.password !== form.value.confirm_password) {
            callback(new Error('The new email address and current email address cannot be the same'))
        }
        return true
    }

    const rules = reactive({
        current_email: [
            { required: true, message: 'Please input the email', trigger: 'blur' }
        ],
        email: [
            { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        captcha: [
            { required: true, message: 'Please input the captcha', trigger: 'blur' }
        ],
    })



    const submitForm = () => {
        formRef.value.validate((valid) => {
            if (valid) {
                updatePassword(form.value).then(res => {
                    if (res.code === 200) {
                        ElMessage.success('Change password successfully')
                    }
                })
            } else {
                console.log('error submit!')
            }
        })
    }

    const getCaptcha = () => {
        let count = 60
        isDisabled.value = true
        const timer = setInterval(() => {
            count--
            if (count > 0) {
                captchaText.value = `${count}s`
            } else {
                clearInterval(timer)
                captchaText.value = 'Get Captcha'
                isDisabled.value = false
            }
        }, 1000)
    }
</script>
<style scoped lang="scss">
    h1 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
    }

    .profile-box {
        max-width: 600px;
        position: relative;
        margin: 0 auto;
    }

    .flex-column {
        display: flex;
        width: 100%;
        gap: 10px;
    }
</style>