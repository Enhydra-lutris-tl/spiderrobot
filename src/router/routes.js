const routes = [
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

];

export default routes
