export const constantRoute = [
    {
        path: "/",
        redirect: "/home",
        children: [
            {
                path: "/home",
                name:"prompt_view",
                component: () => import("@/views/home/index.vue"),
            },
        ],
    },
    {
        path: "/404",
        name:"404",
        component: () => import("@/views/404/index.vue"),
    },
];