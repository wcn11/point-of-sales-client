<template>
  <div class="">
    <header class="card-header header-category" v-if="products">
      <h2 class="headline"></h2>
    </header>

    <!-- <aside class="card-header header-category">
                <div class="form-group row m-auto">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Cari Produk...</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="search" id="inputPassword" placeholder="Cari Produk...">
                    </div>
                </div>
        </aside> -->

    <!-- <div class="row mt-5">
      <div
        class="col-md-3 col-sm-4 resource-container"
        v-for="(product, index) in products"
        :key="index"
      >
        <div class="card card-container">
          <div class="text-center">
            <img
              :src="getImage(product['image'])"
              class="card-img-top"
              alt="Gambar Ayam"
            />
          </div>
          <div class="card-body">
            <h5 class="card-title card-title-product">{{ product["name"] }}</h5>
            <p>Stok: {{ product["stock"] }}</p>

            <h6 class="price">{{ product["grand_price"] | formatMoney }}</h6>

            <div
              class="d-flex justify-content-center"
              v-if="isProductOnCart(product) == false && product['stock'] > 0"
            >
              <div class="btn-group w-100" role="group">
                <button
                  type="button"
                  :disabled="product['stock'] <= 0"
                  class="btn btn-secondary"
                  @click="addProduct($event, product)"
                >
                  <i class="fad fa-cart-plus"></i> Tambahkan
                </button>
              </div>
            </div>

            <div
              class="d-flex justify-content-center"
              v-else-if="product['stock'] <= 0 && product['quantity'] === 0"
            >
              <div class="btn-group w-100" role="group">
                <button type="button" disabled class="btn btn-danger">
                  <i class="fad fa-cart-plus"></i> Stok Habis
                </button>
              </div>
            </div>

            <div class="w-100 counter-cart text-center" v-else>
              <span @click="updateCart(product['id'])" class="counter"
                ><i class="fad fa-minus-circle"></i
              ></span>
              <span>{{ getQuantity(product["id"]) }}</span>
              <span @click="updateCart(product['id'], 'plus')" class="counter"
                ><i class="fad fa-plus-circle"></i
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <section style="margin-top: 7rem">
      <div class="row">
        <div class="col-lg-12 d-flex">
          <div
            class="col-md-4 product-container"
            v-for="(product, index) in products"
            :key="index"
          >
            <div class="card-product">
              <span class="title-diskon">#DirumahAja</span>
              <img
                class="img-product img-responsive img-rounded"
                :src="getImage(product['image'])"
                alt="Gambar Ayam"
              />
              <div class="card-container">
                <h4 class="text-title">
                  <b>{{ product["name"] }}</b>
                </h4>
                <p class="text-weight">
                  <i class="fas fa-weight"></i> Stok {{ product["stock"] }} PCS
                </p>
                <div class="text-desc">
                  {{ product["grand_price"] | formatMoney }}
                </div>
                <p class="text-free">
                  <i class="fas fa-dolly-flatbed"></i> Gratis Ongkir Tanpa Min.
                  Order
                </p>
                <button
                  href="#"
                  class="btn-pesan"
                  v-if="
                    isProductOnCart(product) == false && product['stock'] > 0
                  "
                  @click="addProduct($event, product)"
                >
                  <i class="fas fa-cart-plus"></i>
                  tambahkan ke keranjang
                </button>
                <button
                  href="#"
                  class="btn-pesan bg-danger" 
                  disabled="disabled"
                  v-else-if="product['stock'] <= 0 && product['quantity'] === 0"
                  @click="addProduct($event, product)"
                >
                  <i class="fas fa-cart-plus"></i>
                  stok habis
                </button>

                <div class="w-100 counter-cart text-center" v-else>
                  <span @click="updateCart(product['id'])" class="counter"
                    ><i class="fad fa-minus-circle"></i
                  ></span>
                  <span>{{ getQuantity(product["id"]) }}</span>
                  <span
                    @click="updateCart(product['id'], 'plus')"
                    class="counter"
                    ><i class="fad fa-plus-circle"></i
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="modal fade" id="openModalRemoveProduct" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-static">
        <div class="modal-content modal-bottom">
          <div class="modal-body">
            <div class="text-center">
              <h3>Hapus Produk ?</h3>
            </div>
            <button
              class="btn btn-danger w-100"
              @click="removeProduct(selectedProduct)"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
// import { VueContentLoading } from 'vue-content-loading';
export default {
  name: "product",
  metaInfo: {
    titleTemplate: "Produk",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  components: {
    // VueContentLoading
  },
  data() {
    return {
      products: [],
      search: "",
      selectedProduct: 0,
      cart: this.getCart(),
      loading: false,
    };
  },
  methods: {
    getImage(value) {
      try {
        let image =
          process.env.VUE_APP_BASE_HOST_API +
          "/" +
          JSON.parse(value)["thumbURL"];

        this.loadingImageCategory = false;

        return image;
      } catch (e) {
        let image = require(`./../../assets/products/default.jpeg`);

        return image;
      }
    },
    getProducts() {
      this.$root.loading = true;
      return axios
        .get(
          `${process.env.VUE_APP_BASE_HOST_API}/products/${this.$route.params["categoryId"]}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            this.products = results["data"]["data"].map((value) => {
              console.log(value["product_partner"]);
              value["quantity"] = 0;
              value["stock"] = value["product_partner"][0]["stock"];
              value["selected"] = false;
              this.$root.loading = false;
              return value;
            });

            if (this.products.length <= 0) {
              this.$root.loading = false;
            }
          }
        })
        .catch((error) => {
          console.error(error);
          if (error["response"]["data"]["success"]) {
            this.$alertify.error(error["response"]["data"]["message"]);
            if (error["response"]["data"]["redirect"]) {
              this.$root.loading = !this.$root.loading;
              window.location = "/not-found";
            }
          }
        });
    },
    openModalRemoveProduct(type = "show") {
      $("#openModalRemoveProduct").modal(type);
    },
    addProduct(event, product) {
      this.$root.loading = !this.$root.loading;

      product["additionalPrice"] = 0;
      product["quantity"] = 1;
      product["stock"]--;
      this.$store.dispatch("addProductToCart", product);
      product["selected"] = true;
      this.$root.loading = !this.$root.loading;

      return;
    },
    removeProduct(id) {
      this.cart.filter((value) => {
        if (value["id"] === id) {
          value["quantity"] = 0;
          value["stock"]++;
          return (value["selected"] = false);
        }
      });
      this.openModalRemoveProduct("hide");
      this.$store.dispatch("setRemoveProductOnCart", id);
    },
    updateCart(id, type = "minus") {
      if (type === "minus") {
        return this.cart.filter((value) => {
          if (value["id"] === id) {
            if (value["quantity"] > 1) {
              value["stock"]++;
              return value["quantity"]--;
            }
            if (value["quantity"] === 1) {
              this.selectedProduct = id;
              this.openModalRemoveProduct();
              return;
            }
          }
        });
      }
      return this.cart.filter((value) => {
        if (value["id"] === id) {
          if (value["stock"] > 0) {
            value["stock"]--;
            return value["quantity"]++;
          }
        }
      });
    },
    getCart() {
      return (this.cart = this.$store.getters["getCart"]);
    },
    isProductOnCart(product) {
      return this.cart.filter((value) => {
        return value["id"] === product.id;
      });
    },
    getQuantity(id) {
      let quantity = this.cart.filter((value) => {
        if (value["id"] === id) {
          return value["quantity"];
        }
      });
      return quantity[0]["quantity"];
    },
    clearCarts() {
      this.cart = [];
    },
  },
  computed: {
    searchInput() {
      if (this.search) {
        return this.products.filter((item) => {
          console.log(
            item.name.toLowerCase().includes(this.search.toLowerCase())
          );
        });
      } else {
        return this.search;
      }
    },
  },
  filters: {
    formatMoney(val) {
      let formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(val);
    },
  },
  mounted() {
    this.$root.$on("clearCarts", this.clearCarts);
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.shrimmer-container {
  border-radius: 10px;
}
.header-category {
  text-align: center;
  background-color: white;
  border-radius: 10px;
  margin: auto;
  margin-top: 2%;
}
.resource-container {
  margin-bottom: 3%;
}
.counter:hover {
  cursor: pointer;
}
.counter-cart {
  font-size: 25px;
}
.card-container {
  min-height: 100%;
  max-height: 100%;
  border-radius: 10px;
}
.card-img-top {
  width: 100%;
  object-fit: cover;
  height: 155px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.card-title-product {
  white-space: pre-wrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  min-height: 48px;
  max-height: 48px;
  -webkit-box-orient: vertical;
}
.price {
  font-size: 25px;
  font-weight: bold;
}

.text-produk-kategori {
  padding-top: 4rem;
  font-size: 4rem;
  text-align: center;
}

.img-cover {
  display: block;
  position: relative;
  margin: 0;
  border-radius: 16px;
  box-shadow: 10xp 10px 1px grey;
  box-shadow: 0px 2px 4px gray;
}

.card-product {
  box-shadow: 0 0px 5px 0px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 100%;
  border-radius: 5px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.card-product:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.img-product {
  border-radius: 5px 5px 5px 5px;
  min-height: 223px;
  max-height: 223px;
  width: 100%;
}

.card-container {
  padding: 2px 16px;
  margin-top: 15px;
}

.btn-pesan {
  background-color: #ce1700;
  color: white;
  padding: 7px;
  width: 100%;
  display: block;
  border-radius: 5px;
  text-align: center;
  font-size: 13px;
  font-weight: bolder;
  text-decoration: none;
  margin: auto;
  margin-bottom: auto;
  margin-bottom: 10px;
}

.btn-pesan:hover {
  color: white;
  text-decoration: none;
  background-color: #bb1a05;
}

.product-container {
  padding: 1rem;
}

.title-diskon {
  position: absolute;
  text-align: right;
  color: white;
  background-color: #ce1700;
  padding: 1rem;
  font-weight: bolder;
  font-size: 10px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 5px;
}

.text-title {
  font-size: 2rem;
}

.text-desc {
  margin: 10px;
  font-weight: bold;
  color: #f04630;
  text-align: right;
  font-size: 22px;
}

.text-weight {
  font-size: 14px;
  color: #ce1700;
}

.text-free {
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .modal-bottom {
    position: fixed;
    bottom: 0;
  }
  .modal-dialog {
    margin: 0;
  }
}
</style>