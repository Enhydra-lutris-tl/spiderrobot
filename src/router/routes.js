const routes = [
    {
        path: '/',
        redirect:'/UserContent',
    },
    {
        name: 'UserContent',
        path: '/UserContent',
        component: () => import('@/pages/UserContent')
    },
    {
        name: 'WorkBench',
        path: '/WorkBench',
        component: () => import('@/pages/WorkBench')
    },
    {
        name: 'BigMap',
        path: '/BigMap',
        component: () => import('@/pages/BigMap')
    },

    {
        name: 'TodoDetails',
        path: '/TodoDetails',
        component: () => import('@/pages/TodoDetails')
    },
    {
        name: 'OSD',
        path: '/OSD',
        component: () => import('@/pages/OSD')
    },
];

export default routes
