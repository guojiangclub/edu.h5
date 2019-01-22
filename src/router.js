/**
 * Created by lcfevr on 16/8/22.
 */


var routes = [
    {
        path: '/',
        redirect: '/edu'
    },
    {
        path: '*',
        redirect: '/edu'
    },
    {
        path: '/search',
        name: 'search',
        component: resolve => require(['../src/views/search.vue'], resolve),
        meta: {
            title: '搜索',
        }
    }
];
var req = require.context('./views', true, /.*route\.js$/);

req.keys().forEach(p => {
    var r = req(p);
    routes.push(...r.default);
})

export default routes;
