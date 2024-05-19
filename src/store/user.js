import { defineStore } from "pinia"
import { menuList } from "@/api/menu";
import router from "@/router";
import Layout from '@/layout/index.vue';
import { nextTick } from "vue";
import { userInfo } from "../api/user";
const modules = import.meta.glob('../views/*/*.vue')
export const useUserStore = defineStore('user', {
    state: () => ({
        hasRoutes: false,
        routes: [],
        menuList: [],
        userInfo: {},
    }),
    actions: {
        async setRoutes() {
            const data = await menuList()
            this.routes = data.data

            nextTick(async () => {
                // 构建树形结构
                this.menuList = await this.generateMenuTree(this.routes, 0)
            })
        },
        async generateMenuTree(menuList, pid) {
            let list = []

            menuList.forEach(async (item) => {
                if (item.pid === pid) {
                    const route = {
                        path: item.menu_path,
                        name: item.menu_name,
                        icon: item.menu_icon,
                        children: [],
                        component: item.pid === 0 ? Layout : modules[`../views${item.menu_component}.vue`],
                        hide: item.hide == 1 ? true : false
                    }
                    const children = await this.generateMenuTree(menuList, item.id)

                    if (children.length > 0) {
                        route.children = children
                    }else{
                        route.children = [
                            {
                                path: item.menu_path,
                                name: item.menu_name,
                                icon: item.menu_icon,
                                component: modules[`../views${item.menu_component}.vue`],
                                hide: true
                            }
                        ]
                    }

                    router.addRoute(route)
                    list.push(route)
                }
            })

            return list
        },
        async getUserInfo() {
            userInfo().then(res => {
                this.userInfo = res.data
            })
        }
    }
})