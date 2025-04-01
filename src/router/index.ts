import {createRouter, createWebHistory} from 'vue-router'
import RaceView from "@/views/RaceView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/', redirect: '/race', meta: {
                title: '比赛 | Fonelify'
            }
        },
        {
            path: '/race', name: 'race', component: RaceView, meta: {
                title: '比赛 | Fonelify'
            }
        },
        {
            path: '/rank', name: 'rank', component: () => import('../views/RankView.vue'), meta: {
                title: '排行 | Fonelify'
            }
        },
        {
            path: '/schedule', name: 'schedule', component: () => import('../views/ScheduleView.vue'), meta: {
                title: '赛程 | Fonelify'
            }
        },
        {
            path: '/result', name: 'result', component: () => import('../views/RaceResultView.vue'),
            children: [
                {path: ':round', component: () => import('../views/RaceResultView.vue')}
            ],
            meta: {
                title: '结果 | Fonelify'
            }
        },
        {
            name: '404',
            path: '/:pathMatch(.*)*',
            component: () => import('../views/NotFoundView.vue'),
            meta: {
                title: '404 | Fonelify'
            }
        }
    ],
})

export default router
