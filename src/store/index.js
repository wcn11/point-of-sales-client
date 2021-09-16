import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
        isLogged: 0,
        orders: 0
    },

    getters: {
        getCart: state => state.cart,
        isLogged: state => {
            return state.isLogged
        },
        getTotalCart: state => {
            let total = 0;
            state.cart.filter(value => {
                total += value['quantity'] * value['grand_price']
            })

            return total;
        },
        getTotalAdditional: state => {
            let total = 0;
            state.cart.filter(value => {
                total += value['additionalPrice']
            })

            return total;
        },
        getOrderOnline: state => state.orders
    },

    mutations: {
        ADD_PRODUCT_TO_CART(state, product) {
            state.cart.push(product);
        },
        SET_DECREMENT_PRODUCT_ON_CART(state, id) {
            state.cart.filter(value => {
                if (value['product']['id'] === id) {
                    if (value['quantity'] > 1) {
                        value['quantity']--
                        state.cartTotal += value['quantity'] * value['grand_price']
                    }
                }
            })
        },
        SET_INCREMENT_PRODUCT_ON_CART(state, id) {
            state.cart.filter(value => {
                if (value['product']['id'] === id) {
                    value['quantity']++
                    state.cartTotal += value['quantity'] * value['grand_price']
                }
            })
        },
        REMOVE_PRODUCT_ON_CART(state, id) {
            state.cart.filter((value, index) => {
                if (value['id'] === id) {
                    if (value['quantity'] === 1) {
                        value["quantity"] = 0
                        value["stock"]++
                    } else {
                        value["stock"] += value['quantity']
                        value["quantity"] = 0
                    }
                    state.cart.splice(index, 1);
                }
            })
        },
        CLEAR_CARTS(state) {
            state.cart = []
        },
        SET_ADDITIONAL_PRICE(state, product, additional) {},
        UPDATE_PRICE_ON_CART(state, {
            data
        }) {
            state.cart.filter((value, index) => {
                if (value['id'] === data['id']) {

                    Vue.set(state.cart[index], value['grand_price'], data['grand_price'])

                }
            })

        },
        GET_ORDER_ONLINE_DATA(state) {

                if (localStorage.getItem('pending_orders') === undefined || localStorage.getItem('pending_orders') === null) {

                    return axios
                        .get(`${process.env.VUE_APP_BASE_HOST_API}/order-online`, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("jwt"),
                            },
                        })
                        .then((results) => {
                            if (results["data"]["success"]) {
                                state.orders = results["data"]["data"].length;
                                localStorage.setItem('pending_orders', results["data"]["data"].length)
                            }
                        })
                }


                return state.orders = localStorage.getItem('pending_orders')

        },
    },

    actions: {
        addProductToCart({
            commit
        }, product) {
            commit("ADD_PRODUCT_TO_CART", product);
        },
        setIncrementProductOnCart({
            commit
        }, id) {
            commit("SET_INCREMENT_PRODUCT_ON_CART", id);
        },
        setDecrementProductOnCart({
            commit
        }, id) {
            commit("SET_DECREMENT_PRODUCT_ON_CART", id);
        },
        setRemoveProductOnCart({
            commit
        }, id) {
            commit("REMOVE_PRODUCT_ON_CART", id);
        },
        setClearCarts({
            commit
        }) {
            commit("CLEAR_CARTS");
        },
        setAdditionalPrice({
            commit
        }, product, additional) {
            commit("SET_ADDITIONAL_PRICE", product, additional);
        },
        async updatePriceOnCart({
            commit
        }, data) {
            commit("UPDATE_PRICE_ON_CART", {
                data,
                commit
            });
        },
        getOrdersOnline({
            commit
        }) {
            commit("GET_ORDER_ONLINE_DATA", {
                commit
            });
        },
    }
});