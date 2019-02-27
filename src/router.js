/**
 * Created by lcfevr on 16/8/22.
 */


var routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '*',
        redirect: '/index'
    }
];
var req = require.context('./views', true, /.*route\.js$/);

req.keys().forEach(p => {
    var r = req(p);
    routes.push(...r.default);
})

export default routes;
