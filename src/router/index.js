import Vue from "vue";
import VueRouter from "vue-router";

import Category from '../views/category/category'
import Product from '../views/products/product'
import Customers from '../views/customers/customers'
import Stock from '../views/stock/stock'
import Sale from '../views/sale/sale'
import SalesReport from '../views/sales_report/sales_report'
import Login from '../views/login/login'
import notFound from '../components/notFound.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'category',
            component: Category,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/products/:categoryId',
            name: 'products',
            component: Product,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/customers',
            name: 'customers',
            component: Customers,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/stock',
            name: 'stock',
            component: Stock,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/sale',
            name: 'sale',
            component: Sale,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/sales-report',
            name: 'sales_report',
            component: SalesReport,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresAuth: false
            }
        }, {
            // will match everything
            path: '*',
            name: 'notFound',
            component: notFound,
            meta: {
                requiresAuth: false
            }
        }
    ]
})

router.beforeEach((to, from, next) => {

    if (to.name === "notFound") {

        return next();

    }

    if (to.meta.requiresAuth) {

        if (localStorage.getItem('jwt')) {

            next()

        } else {
            next({
                path: '/login',
                params: {
                    nextUrl: to.fullPath
                }
            })
        }
    } else {
        if (localStorage.getItem('jwt')) {

            next({
                path: '/',
                params: {
                    nextUrl: to.fullPath
                }
            })

        } else {

            next()

        }
    }

})

export default router
