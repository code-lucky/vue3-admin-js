<template>
    <div class="profile-box">
        <h1>Profile</h1>
        <el-form :model="form" label-width="120px">
            {{userInfo}}
            <el-form-item label="User Name">
                <el-input v-model="form.user_name" size="large"></el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="form.email" size="large"></el-input>
            </el-form-item>
            <el-form-item label="Profile Photo">
                <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label>
                <el-button type="primary" @click="submitForm">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
    import { ref, onMounted, nextTick } from 'vue'
    import { storeToRefs } from 'pinia'
    import pinia from "@/store/index"
    import { useUserStore } from "@/store/user";
    const useUser = useUserStore()
    const { userInfo } = storeToRefs(useUser)
    useUser.getUserInfo()

    const form = ref({
        id: 0,
        user_name: '',
        email: '',
        head_pic: ''
    })

    const imageUrl = ref('')
    const submitForm = () => {
        console.log(form.value)
    }

    onMounted(() => {
        console.log(userInfo)
        nextTick(() => {
            form.value = {
                id: userInfo.id,
                user_name: userInfo.user_name,
                email: userInfo.email,
                head_pic: userInfo.head_pic
            }
        })
    })
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

    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>