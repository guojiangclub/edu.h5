/**
 * Created by penglei on 2018/9/25.
 */
export default [
    {
        path: '/major',
        name: 'major',
        component: resolve => require(['./index.vue'], resolve),
        meta: {
            title: '天善智能年度SVIP计划',
        }
    },
    {
        path: '/major/ai/finance',
        name: 'finance',
        component: resolve => require(['./finance.vue'], resolve),
        meta: {
            title: '人工智能工程师（高级）金融风控方向',
        }
    },
    {
        path: '/major/ai',
        name: 'ai',
        component: resolve => require(['./ai.vue'], resolve),
        meta: {
            title: '人工智能开发（初级）',
        }
    },
    {
        path: '/major/bi',
        name: 'bi',
        component: resolve => require(['./bi.vue'], resolve),
        meta: {
            title: '商业分析师（BI）',
        }
    },
    {
        path: '/major/bigdata',
        name: 'bigdata',
        component: resolve => require(['./bigdata.vue'], resolve),
        meta: {
            title: '大数据工程师',
        }
    },
    {
        path: '/major/python',
        name: 'python',
        component: resolve => require(['./python.vue'], resolve),
        meta: {
            title: '爬虫工程师',
        }
    },
    {
        path: '/major/datamining',
        name: 'datamining',
        component: resolve => require(['./datamining.vue'], resolve),
        meta: {
            title: '数据挖掘工程师）',
        }
    },
    {
        path: '/major/ai/nlp',
        name: 'nlp',
        component: resolve => require(['./nlp.vue'], resolve),
        meta: {
            title: '人工智能工程师（高级）NLP 方向',
        }
    },
    {
        path: '/major/datascientist',
        name: 'datascientist',
        component: resolve => require(['./datascientist.vue'], resolve),
        meta: {
            title: '数据科学家',
        }
    },
    {
        path: '/major/analyst/senior',
        name: 'senior',
        component: resolve => require(['./senior.vue'], resolve),
        meta: {
            title: '数据分析师（高级）',
        }
    },
    {
        path: '/major/analyst/junior',
        name: 'junior',
        component: resolve => require(['./junior.vue'], resolve),
        meta: {
            title: '数据分析师（初级）',
        }
    }
]
