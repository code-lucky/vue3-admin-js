import { defineStore } from "pinia"
const modules = import.meta.glob('@/views/*/*.vue')

export const userStore = defineStore('user',{
    state: () => ({
        hasRoutes: false,
        routes: []
    }),
    actions: {
        async setRoutes() {
            const routes = []
            for (const path in modules) {
                const name = path.split('/')[2]
                const route = {
                    path: `/${name}`,
                    name: name,
                    component: modules[path],
                    meta: {
                        title: name
                    }
                }
                routes.push(route)
            }
            this.routes = routes
        }
    }
})