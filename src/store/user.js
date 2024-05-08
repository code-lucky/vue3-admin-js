import { defineStore } from "pinia"
import { menuList } from "@/api/menu";
import router from "@/router";
import Layout from '@/layout/index.vue';
import { nextTick } from "vue";
const modules = import.meta.glob('../views/*/*.vue')
export const userStore = defineStore('user', {
    state: () => ({
        hasRoutes: false,
        routes: []
    }),
    actions: {
        async setRoutes() {
            const data = await menuList()
            this.routes = data.data

            // 判断否是第一级菜单
            this.routes.forEach(route => {
                const path = route.menu_path
                const menu_component = route.menu_component
                if (route.pid === 0) {
                    // 获取当前路由下的二级菜单
                    const children = this.routes.filter(item => item.pid === route.id)
                    console.log('child',children)
                    // 判断是否有二级菜单
                    if (children.length > 0) {
                        children.forEach(child => {
                            const childPath = child.menu_path
                            const child_component = child.menu_component
                            const component = modules[`../views/${child_component}.vue`]
                            if (component) {
                                router.addRoute({
                                    path: path,
                                    name: path,
                                    component: Layout,
                                    children: [
                                        {
                                            path: childPath,
                                            name: childPath,
                                            component: component
                                        }
                                    ]
                                })
                            }
                        })
                    } else {
                        const component = modules[`../views/${menu_component}.vue`]
                        console.log(`../views/${menu_component}.vue`, component)
                        if (component) {
                            router.addRoute({
                                path: path,
                                name: path,
                                component: Layout,
                                children: [
                                    {
                                        path: '/index',
                                        name: 'index',
                                        component: component
                                    }
                                ]
                            })
                        }
                    }
                }
            })


            nextTick(()=>{
                console.log(router.getRoutes())
            })
        }
    }
})