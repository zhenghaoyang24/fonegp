import {createRouter, createWebHistory} from 'vue-router'
import RaceView from "@/views/RaceView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/', redirect: '/home', meta: {
                title: '主页 | FoneGP'
            }
        },
        {
            path: '/home', name: 'home', component: RaceView, meta: {
                title: '主页 | FoneGP'
            }
        },
        {
            path: '/ranking', name: 'ranking', component: () => import('../views/RankView.vue'), meta: {
                title: '排行 | FoneGP'
            }
        },
        {
            path: '/schedule', name: 'schedule', component: () => import('../views/ScheduleView.vue'), meta: {
                title: '赛程 | FoneGP'
            }
        },
        {
            path: '/result', name: 'result', component: () => import('../views/RaceResultView.vue'),
            children: [
                {path: ':round', component: () => import('../views/RaceResultView.vue')}
            ],
            meta: {
                title: '结果 | FoneGP'
            }
        },
        {
            name: '404',
            path: '/:pathMatch(.*)*',
            component: () => import('../views/NotFoundView.vue'),
            meta: {
                title: '404 | FoneGP'
            }
        }
    ],
})


export default router
