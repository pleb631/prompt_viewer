export const constantRoute = [
    {
        path: "/",
        name: "layout",
        redirect: "/home",
        children: [
            {
                path: "/home",
                component: () => import("@/views/home/index.vue"),
                meta: {
                    title: "首页",
                    hidden: false,
                    icon: "HomeFilled",
                },
            },
        ],
    },]