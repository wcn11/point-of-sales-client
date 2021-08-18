import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
        isLogged: 0,
    },

    getters: {
        getCart: state => state.cart,
        isLogged: state => {
            return state.isLogged
        },
        getTotalCart: state => {
            let total = 0;
            state.cart.filter(value => {
                total += value['product']['quantity'] * value['product']['price']
            })

            return total;
        }
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
                        state.cartTotal += value['quantity'] * value['price']
                    }
                }
            })
        },
        SET_INCREMENT_PRODUCT_ON_CART(state, id) {
            state.cart.filter(value => {
                if (value['product']['id'] === id) {
                    value['quantity']++
                    state.cartTotal += value['quantity'] * value['price']
                }
            })
        },
        REMOVE_PRODUCT_ON_CART(state, id) {
            state.cart.filter((value, index) => {
                if (value['product']['id'] === id) {
                    state.cart.splice(index, 1);
                }
            })
        },
        CLEAR_CARTS(state) {
            state.cart = []
        },
        UPDATE_PRICE_ON_CART(state, {
            data
        }) {
            state.cart.filter((value, index) => {
                if (value['product']['id'] === data['id']) {

                    Vue.set(state.cart[index], value['product']['price'], data['price'])

                }
            })

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
        async updatePriceOnCart({
            commit
        }, data) {
            commit("UPDATE_PRICE_ON_CART", {
                data,
                commit
            });
        },
    }
});
