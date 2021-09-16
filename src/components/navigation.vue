<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-4">
    <a class="navbar-brand" href="/">
      <!-- POS Mitra PT. BAC -->
      <img
        class="img-fluid"
        :src="require('./../assets/logo_beliayam_mitra.jpeg')"
      />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto w-100">
        <li class="nav-item active">
          <a class="nav-link" href="/"
            ><i class="fad fa-warehouse-alt"></i> Home
            <span class="sr-only">(current)</span></a
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'orders' }"
            ><i class="fad fa-list-ol"></i> Pemesanan
            <span class="bg-info order-total">{{ getOrderOnline }}</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'customers' }"
            ><i class="fad fa-users-class"></i> Pelanggan
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'stock' }"
            ><i class="fad fa-box"></i> Persediaan</router-link
          >
        </li>

        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'sales_report' }"
            ><i class="fad fa-file-chart-line"></i> Laporan
            Penjualan</router-link
          >
        </li>
      </ul>
      <div class="text-left d-flex">
        <button
          class="btn btn-default d-flex justify-content-center"
          @click="openCart"
        >
          <i class="fad fa-cart-plus"></i>
          {{ carts ? carts.length : 0 }}
        </button>

        <a href="javascript:void(0)" class="btn btn-default" @click="logout">
          logout
        </a>

        <!-- <button class="btn btn-cart w-100" @click="openCart"><i class="fad fa-cart-plus"></i>
                    <span>{{ carts ? carts.length : 0 }}</span>
                </button> -->
      </div>
      <!-- <div class="form-inline">
                    <button class="btn" @click="logout">Logout</button>
            </div> -->
    </div>

    <div
      class="modal fade animate__animated animate__fadeInUp"
      id="modal-cart"
      tabindex="-1"
    >
      <div
        class="
          modal-dialog
          modal-dialog-centered
          modal-static
          modal-dialog-scrollable
          modal-lg
        "
      >
        <div class="modal-content modal-bottom">
          <div class="modal-body">
            <div class="text-center">
              <header class="card-header d-flex">
                <h2><i class="fad fa-cart-arrow-down"></i> Keranjang</h2>
              </header>

              <div v-if="carts">
                <div
                  class="card card-cart m-2 row"
                  v-for="(cart, index) in carts"
                  :key="index"
                >
                  <div class="container-card-product d-flex">
                    <div class="">
                      <img
                        :src="getImage(cart['image'])"
                        class="iconDetails"
                        alt="Gambar Ayam"
                      />
                    </div>
                    <div class="right-cart text-left">
                      <p class="cart-title-product mb-3">
                        {{ cart["name"] }}
                      </p>
                      <p>Stok: {{ cart["stock"] }}</p>
                      <div class="w-100 mb-3 d-flex">
                        <sup>Rp</sup>
                        <input
                          @change="checkRequestInput(cart['id'])"
                          type="text"
                          class="form-control-borderless w-50 ml-3 text-center"
                          name="quantity"
                          v-model.number="cart['grand_price']"
                          pattern="[0-9]*"
                        />
                      </div>
                      <div class="w-100 counter-cart">
                        <span
                          @click="removeProduct(cart['id'])"
                          class="mr-3 counter-button"
                          ><i class="fad fa-trash-alt"></i
                        ></span>
                        <span
                          @click="updateCart(cart['id'])"
                          class="counter-button"
                          ><i class="fad fa-minus-circle"></i
                        ></span>
                        <span>
                          {{ cart["quantity"] }}
                        </span>
                        <span
                          @click="updateCart(cart['id'], 'plus')"
                          class="counter-button"
                          ><i class="fad fa-plus-circle"></i
                        ></span>
                      </div>
                      <div class="w-100 mt-3">
                        <sup>Rp</sup>
                        <input
                          @change="
                            updateCart(cart['id'], 'additionalPrice', $event)
                          "
                          type="text"
                          class="form-control-borderless w-50 ml-3 text-center"
                          name="additionalPrice"
                          :value="cart['additionalPrice']"
                          pattern="[0-9]*"
                        />
                        <br /><small class="text-center"
                          ><i class="fad fa-cart-plus"></i> Biaya
                          tambahan</small
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer-custom">
            <div>
              <p>
                Total Keranjang:
                {{ this.$store.getters["getTotalCart"] | formatMoney }}
              </p>
              <p>Total Keranjang: {{ totalAdditional | formatMoney }}</p>
            </div>
            <div class="text-center modal-footer-custom-button">
              <button class="btn btn-outline-dark mr-2" data-dismiss="modal">
                <i class="fad fa-times-circle"></i> Tutup
              </button>
              <button
                v-if="carts.length > 0"
                class="btn btn-outline-dark mr-2"
                @click="openPayment"
              >
                <i class="fad fa-shopping-basket"></i> Bayar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade animate__animated animate__fadeInUp"
      id="modal-payment"
      tabindex="-1"
    >
      <div
        class="
          modal-dialog
          modal-dialog-centered
          modal-static
          modal-dialog-scrollable
          modal-md
        "
      >
        <div class="modal-content modal-bottom">
          <div class="modal-body">
            <div class="text-center">
              <header class="card-header d-flex">
                <h2><i class="fad fa-cart-arrow-down"></i> Pembayaran</h2>
              </header>

              <div class="row mt-4">
                <div class="col-sm-12 m-auto">
                  <div class="card card-head bg-secondary mb-3 row">
                    <div class="card-body text-white col-md-9 col-sm-9">
                      <p>Total Tagihan</p>
                      <h1 class="card-text">{{ bill | formatMoney }}</h1>
                    </div>
                    <div class="card-body col-md-3 col-sm-1">
                      <a
                        href="javascript:void(0)"
                        @click="openCart"
                        class="pull-right text-white"
                        ><i class="fad fa-cart-plus"></i> Lihat Keranjang</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row text-left">
                <label for="customers" class="col-sm-4 form-control-label"
                  >Pelanggan</label
                >
                <div class="col-sm-8 d-flex">
                  <div class="input-group mb-3">
                    <select
                      class="form-control"
                      v-model="selectedCustomer"
                      id="customers"
                      data-header="Pilih Pelanggan"
                      data-show-subtext="true"
                      data-live-search="true"
                    >
                      <option
                        v-for="(customer, index) in customers"
                        :value="customer['id']"
                        :key="index"
                      >
                        <p>{{ customer["name"] }}</p>
                        <small> {{ customer["mobilePhone"] }}</small>
                      </option>
                    </select>
                    <!-- <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"> -->
                    <div
                      class="input-group-append"
                      @click="openModalAddCustomer"
                    >
                      <span class="input-group-text" id="basic-addon2"
                        ><i class="fad fa-user-plus"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group row">
                <label for="paymentMethod" class="col-sm-4 form-control-label"
                  >Metode Pembayaran</label
                >
                <div class="col-sm-8 d-flex">
                  <select
                    class="form-control"
                    v-model="selectedPayment"
                    id="paymentMethod"
                    data-header="Pilih Metode Pembayaran"
                    data-show-subtext="true"
                    data-live-search="true"
                  >
                    <option value="cash">Tunai</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-around">
              <button
                href="javascript:void(0)"
                data-dismiss="modal"
                class="btn btn-outline-dark"
              >
                <i class="fad fa-times-circle"></i> Batal
              </button>
              <button
                href="javascript:void(0)"
                :disabled="!isComplete"
                class="btn btn-outline-dark"
                @click="pay"
              >
                <i class="fad fa-shopping-basket"></i> Bayar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade animate__animated animate__fadeInUp"
      id="modal-add-customer"
      tabindex="-1"
    >
      <div
        class="
          modal-dialog
          modal-dialog-centered
          modal-static
          modal-dialog-scrollable
        "
      >
        <div class="modal-content modal-bottom">
          <div class="modal-body">
            <div class="text-center">
              <header class="card-header d-flex mb-3">
                <h2><i class="fad fa-cart-arrow-down"></i> Tambah Pelanggan</h2>
              </header>

              <div class="form-group row text-left">
                <label for="customers" class="col-sm-4 form-control-label"
                  >Nama Pelanggan <span class="text-danger">*</span></label
                >
                <div class="col-sm-8 d-flex">
                  <input
                    type="text"
                    class="form-control"
                    v-model="addCustomer['name']"
                  />
                </div>
              </div>

              <div class="form-group row text-left">
                <label for="customers" class="col-sm-4 form-control-label"
                  >Email</label
                >
                <div class="col-sm-8 d-flex">
                  <input
                    type="text"
                    class="form-control"
                    v-model="addCustomer['email']"
                  />
                </div>
              </div>

              <div class="form-group row text-left">
                <label for="customers" class="col-sm-4 form-control-label"
                  >No. Telp</label
                >
                <div class="col-sm-8 d-flex">
                  <input
                    type="text"
                    class="form-control"
                    v-model.number="addCustomer['mobilePhone']"
                  />
                </div>
              </div>

              <div class="form-group row text-left">
                <label for="customers" class="col-sm-4 form-control-label"
                  >Alamat
                </label>
                <div class="col-sm-8 d-flex">
                  <textarea
                    type="text"
                    class="form-control"
                    editable="false"
                    v-model="addCustomer['billStreet']"
                  ></textarea>
                </div>
              </div>

              <div class="form-group row text-left">
                <label for="customers" class="col-sm-4 form-control-label"
                  >Kota
                </label>
                <div class="col-sm-8 d-flex">
                  <input
                    type="text"
                    class="form-control"
                    v-model="addCustomer['billCity']"
                  />
                </div>
              </div>
              <div class="form-group row text-left">
                <label for="customers" class="col-sm-4 form-control-label"
                  >Provinsi
                </label>
                <div class="col-sm-8 d-flex">
                  <input
                    type="text"
                    class="form-control"
                    v-model="addCustomer['billProvince']"
                  />
                </div>
              </div>

              <div class="form-group row text-left">
                <label for="customers" class="col-sm-4 form-control-label"
                  >Kode Pos
                </label>
                <div class="col-sm-8 d-flex">
                  <input
                    type="text"
                    class="form-control"
                    v-model.number="addCustomer['billZipCode']"
                  />
                </div>
              </div>

              <div class="form-group row text-left">
                <label for="customers" class="col-sm-4 form-control-label"
                  >Catatan Pelanggan
                </label>
                <div class="col-sm-8 d-flex">
                  <textarea
                    type="text"
                    class="form-control"
                    resizable="false"
                    v-model="addCustomer['notes']"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-around">
              <a
                href="javascript:void(0)"
                data-dismiss="modal"
                class="btn btn-outline-dark"
                ><i class="fad fa-times-circle"></i> Batal</a
              >
              <a
                href="javascript:void(0)"
                class="btn btn-outline-dark"
                @click="saveCustomer"
                ><i class="fad fa-user-plus"></i> Tambah</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade animate__animated animate__fadeInUp"
      id="modal-print"
      tabindex="-1"
    >
      <div
        class="
          modal-dialog
          modal-dialog-centered
          modal-static
          modal-dialog-scrollable
          modal-lg
        "
      >
        <div class="modal-content modal-bottom">
          <div class="modal-body">
            <div class="text-center">
              <header class="card-header d-flex">
                <h2><i class="fad fa-print"></i> Transaksi</h2>
              </header>

              <div>
                <button class="btn btn-success" @click="printInvoice">
                  <i class="fad fa-print"></i> Cetak Invoice
                </button>
              </div>
            </div>
            <div class="modal-footer justify-content-around d-flex">
              <a
                href="javascript:void(0)"
                class="btn btn-outline-dark"
                @click="refreshPage"
                ><i class="fad fa-times-circle"></i> Tutup</a
              >
              <a
                href="javascript:void(0)"
                v-if="carts.length > 0"
                class="btn btn-outline-dark"
                @click="openPayment"
                ><i class="fad fa-shopping-basket"></i> Bayar</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="openModalRemoveProductNavigation" tabindex="-1">
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
  </nav>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "navigation",
  data() {
    return {
      carts: this.getCart,
      customers: [],
      selectedCustomer: {},
      selectedPayment: "cash",
      menuSelected: "",
      addCustomer: {
        name: "",
        email: "",
        mobilePhone: "",
        billStreet: "",
        billCity: "",
        billProvince: "",
        billZipCode: "",
        notes: "",
      },
      bill: 0,
      printId: 0,
      defaultBody: "",
      totalAdditional: 0,
      selectedProduct: 0,
      orders: []
    };
  },
  methods: {
    refreshPage() {
      location.reload();
    },
    getCartTotal() {
      if (this.carts.length > 0) {
        return this.carts.map(function (value) {
          let total = 0;
          total +=
            value["quantity"] * value["price"] + value["additionalPrice"];
          return total;
        });
      }
    },
    printInvoice() {
      $("#modal-print").modal("hide");
      this.$router.push({
        name: "invoice",
        query: {
          key: this.printId,
        },
      });
    },
    pay() {
      this.$root.loading = !this.$root.loading;
      return axios
        .post(
          `${process.env.VUE_APP_BASE_HOST_API}/pay`,
          {
            carts: this.carts,
            paymentAmount: this.bill,
            customer: this.selectedCustomer,
            total_additional: this.totalAdditional,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((results) => {
          console.log(results["data"]["data"]["d"]);
          if (results["data"]["success"]) {
            $("#modal-payment").modal("hide");
            this.getCustomers();
            this.addCustomer = {
              name: "",
              email: "",
              mobilePhone: "",
              billStreet: "",
              billCity: "",
              billProvince: "",
              billZipCode: "",
              notes: "",
            };
            this.$store.dispatch("setClearCarts");
            this.carts = [];
            this.$root.$emit("clearCarts");
            results["data"]["data"]["d"].map((value) => {
              this.$alertify.success(value);
            });
            this.printId = results["data"]["data"]["r"]["id"];
            $("#modal-print").modal({
              backdrop: "static",
              keyboard: false,
              show: true,
            });
            this.$alertify.success("Berhasil Dibayarkan");
            this.$root.loading = !this.$root.loading;
          } else {
            results["data"]["data"]["d"].map((result) => {
              this.$alertify.warning(result);
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$alertify.error(error.response["data"]["data"]["d"]);
          this.$root.loading = !this.$root.loading;
        });
    },
    setNav() {
      $("#navigation_2_dropdown_1").on("click", function () {
        $(".dropdown-menu").toggleClass("active");
      });
      $(".dropdown-menu div div").on("click", function () {
        $("#navigation_2_dropdown_1").text($(this).text());
        $(".dropdown-menu").toggleClass("active");
      });
    },
    getCart() {
      return (this.carts = this.$store.getters["getCart"]);
    },
    saveCustomer() {
      return axios
        .post(
          `${process.env.VUE_APP_BASE_HOST_API}/customers`,
          {
            customer: this.addCustomer,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((results) => {
          if (results["data"]["s"]) {
            this.getCustomers();
            $("#modal-add-customer").modal("hide");
            this.addCustomer = {
              name: "",
              email: "",
              mobilePhone: "",
              billStreet: "",
              billCity: "",
              billProvince: "",
              billZipCode: "",
              notes: "",
            };
            if (results["data"]["s"]) {
              results["data"]["d"].map((value) => {
                this.$alertify.success(value);
              });
            }
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },

    getCustomers() {
      return axios
        .get(`${process.env.VUE_APP_BASE_HOST_API}/customers/52/category`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then((results) => {
          this.customers = results.data["d"];
        })
        .catch((error) => {
          console.log(error.response);
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    openCart() {
      $("#modal-cart").modal("show");
      $("#modal-payment").modal("hide");
    },
    openModalAddCustomer() {
      $("#modal-add-customer").modal("show");
      $("#modal-payment").modal("hide");
    },
    openPayment() {
      this.bill = this.getTotalCart() + this.totalAdditional;
      $("#modal-cart").modal("hide");
      this.getCustomers();
      $("#modal-payment").modal("show");
    },
    openModalRemoveProduct(type = "show") {
      $("#openModalRemoveProductNavigation").modal(type);
    },
    updateCart(id, type = "minus", event) {
      if (type === "minus") {
        return this.carts.filter((value) => {
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
      } else if (type === "plus") {
        return this.carts.filter((value) => {
          if (value["id"] === id) {
            if (value["stock"] > 0) {
              value["stock"]--;
              return value["quantity"]++;
            }
          }
        });
      } else {
        return this.carts.filter((value) => {
          if (value["id"] === id) {
            if (value["stock"] == 0) {
              return;
            }
            this.$set(value, "additionalPrice", parseInt(event.target.value));
            this.getTotal();
            return;
          }
        });
      }
    },

    getTotal() {
      let total = 0;
      this.carts.map((value) => {
        total += value["additionalPrice"];
      });

      this.totalAdditional = total;
    },
    removeProduct(id) {
      this.carts.filter((value) => {
        if (value["productId"] === id) {
          return (value["selected"] = false);
        }
      });
      this.$store.dispatch("setRemoveProductOnCart", id);
      this.openModalRemoveProduct("hide");
    },
    closeMenu() {
      $(".dropdown-menu").removeClass("active");
    },
    logout() {
      axios
        .post(
          `${process.env.VUE_APP_BASE_HOST_API}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then(function (result) {
          localStorage.setItem("user", "");
          localStorage.setItem("jwt", "");
          if (result.data.message) {
            window.location.href = "/login";
          }
        });
    },
    checkRequestInput(id) {
      return this.carts.filter((value) => {
        if (value["id"] === id) {
          if (value["price"] === "") {
            value["price"] = value["unitPrice"];
            this.$alertify.warning(
              "Minimal Data Dimasukkan Adalah 0 Rupiah, Tidak Boleh Kosong!"
            );
            return value["unitPrice"];
          }

          let middlePrice = value["basic_price"] + value["centralCommission"];

          if (middlePrice > value["grand_price"]) {
            this.$alertify.warning(
              "Harga item tidak boleh dibawah angka" +
                this.$options.filters.formatMoney(middlePrice)
            );
            value["grand_price"] = middlePrice + value["partnerCommission"];
            return;
          }

          let data = {
            id: id,
            price: value["price"],
          };
          return this.$store.dispatch("updatePriceOnCart", data);
        }
      });
    },
    getTotalCart() {
      return (this.bill = this.$store.getters["getTotalCart"]);
    },
    isComplete() {
      if (this.selectedCustomer && this.selectedPayment !== 0) {
        return true;
      }
    },
    getImage(value) {
      try {
        let image =
          process.env.VUE_APP_BASE_HOST_API +
          "/" +
          JSON.parse(value)["thumbURL"];

        this.loadingImageCategory = false;

        return image;
      } catch (e) {
        let image = require(`./../assets/products/default.jpeg`);

        return image;
      }
    },
    getOrders() {
      this.$root.loading = true;
      this.$store.dispatch("getOrdersOnline");
    },
  },
  computed: {
    getData() {
      return this.$store.getters.getTotalCart;
    },
    ...mapGetters(['getOrderOnline'])
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
  created() {
    this.setNav();
    this.getCart();
    this.getOrders();
  },
};
</script>

<style scoped>
.navbar {
  padding: 1%;
  border-bottom-left-radius: 15%;
  border-bottom-right-radius: 15%;
}
.navbar-brand img {
  width: 50%;
}

.order-total {
  padding: 10px;
  border-radius: 50%;
  color: #fff;
}
.nav {
  display: block;
}
.nav .login button {
  display: inline-block;
  height: 40px;
  padding: 0 15px;
  user-select: none;
  background: none;
  border: 2px solid #ebeaed;
  line-height: 36px;
  color: #1e0e62;
  font-size: 16px;
  vertical-align: top;
  border-radius: 50px;
  font-weight: 600;
  text-align: center;
  background: transparent;
  transition: 0.25s all;
  cursor: pointer;
}
.nav .login button:focus {
  outline: none;
}
.nav-item {
  margin-left: 3%;
}
.nav .login button:hover {
  border-color: #1e0e62;
}
.img-cart-container img {
  min-width: 6%;
  min-height: 6%;
}
.card-cart {
  padding: 2%;
  border-radius: 10px;
}
.cart-title-product {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.iconDetails {
  margin-left: 2%;
  float: left;
  height: 100px;
  width: 140px;
  border-radius: 5px;
}
.container-card-product {
  width: 100%;
  height: auto;
  padding: 1%;
  float: left;
}
h4 {
  margin: 0;
}
.left-cart {
  float: left;
}
.right-cart {
  float: left;
  margin: 0 0 0 20px;
  width: 68%;
}
.modal-body-cart {
  background-color: #e4e3e3;
}
.counter-cart {
  font-size: 24px;
}
.form-control-borderless {
  border-right: none;
  border-top: none;
  border-left: none;
}
.counter-button:hover {
  cursor: pointer;
}
.form-inline {
  width: 5%;
}
.navbar-brand {
  width: 35%;
}
.input-group-append:hover {
  cursor: pointer;
}
.modal-footer {
  flex-wrap: unset;
}
.modal-footer-custom {
  padding: 10px;
  border-top-left-radius: 10px;
  border-style: inset;
  box-shadow: 0px 0px 5px 0px grey;
  z-index: 1;
  border-top-right-radius: 10px;
}
.modal-footer-custom-button {
  display: flex;
}
.modal-footer-custom-button {
  padding: 1%;
}
@media only screen and (max-width: 600px) {
  .iconDetails {
    width: 75px;
    height: auto;
  }
  .modal-bottom {
    position: absolute;
    bottom: 0;
    max-height: 80% !important;
  }
  .navbar-brand img {
    width: 200px;
  }
  .form-inline {
    width: 20%;
  }
  .navbar-brand {
    width: 50%;
  }
}
</style>