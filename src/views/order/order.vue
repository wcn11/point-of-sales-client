<template>
  <div class="">
    <header class="card-header header-category mb-3">
      <h2 class="headline">Pesanan Online</h2>
    </header>

    <ul
      class="nav nav-pills mb-3 justify-content-center"
      id="pills-tab"
      role="tablist"
    >
      <li class="nav-item" role="presentation">
        <a
          class="nav-link active"
          id="pills-home-tab"
          data-toggle="pill"
          href="#pills-home"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
          >Proses</a
        >
      </li>
      <li class="nav-item" role="presentation">
        <a
          class="nav-link"
          id="pills-profile-tab"
          data-toggle="pill"
          href="#pills-profile"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
          >Selesai</a
        >
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <div class="row">
          <div
            class="col-lg-12 text-center animate__animated animate__fadeIn"
            v-if="ordersPending.length < 0"
          >
            <h3 class="mt-5">Tidak Ada Pesanan...</h3>
          </div>
          <div
            class="col-lg-4 col-md-6"
            v-for="(order, index) in ordersPending"
            :key="index"
            v-else
          >
            <div
              class="
                bg-white
                shadow-card
                rounded
                p-3
                mb-4
                animate__animated animate__fadeIn
              "
            >
              <div class="d-flex align-items-center mb-1">
                <div class="mb-0">
                  <h6>
                    {{ order["customer_first_name"] }}
                    {{ order["customer_last_name"] }}
                  </h6>
                </div>
                <p
                  class="text-outline-warning mb-0 ml-auto"
                  v-html="formatStatus(order['status'])"
                ></p>
              </div>
              <div class="d-flex align-items-center border-bottom-grey mb-3">
                <p class="small">
                  <i class="fad fa-calendar-alt"></i>
                  {{ order["updated_at"] | formatDate }}
                  <span class="ml-2"
                    ><i class="fad fa-clock mr-1"></i
                    >{{ order["updated_at"] | formatTime }}</span
                  >
                </p>
                
              </div>
              <p class="text-dark mb-2">
                <span class="mr-2"
                  ><i class="fad fa-circle"></i>
                  #{{ order["web_order_id"] }}</span
                >
              </p>
              <p class="text-dark mb-2">
                <span class="mr-2 text-white bg-success p-1"
                  ><i class="fad fa-percentage"></i>
                  {{ order["payment"] | translatePayment }}</span
                >
              </p>
              <p class="text-dark mb-2">
                <span class="mr-2 text-black"
                  ><i class="fal fa-person-dolly"></i>
                  {{ order["shipping_method"] | translateShipping }}</span
                >
              </p>
              <div class="d-flex">
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-map-signs"></i> {{ order["address1"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="order['address2'] === '' || order['address2'] !== null"
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-map-signs"></i> {{ order["address2"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="
                  order['sub_district'] === '' || order['sub_district'] !== null
                "
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-map-signs"></i>
                    {{ order["sub_district"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="order['district'] === '' || order['district'] !== null"
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-map-signs"></i> {{ order["district"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="order['city'] === '' || order['city'] !== null"
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-city"></i> {{ order["city"] }},
                    {{ order["state"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="order['postcode'] === '' || order['postcode'] !== null"
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-mailbox"></i> {{ order["postcode"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="order['note'] === '' || order['note'] !== null"
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-sticky-note"></i> Note:
                    {{ order["note"] }}
                  </span>
                </small>
              </div>
              <div class="d-flex align-items-center row">
                <div class="col-12 pr-2">
                  <a
                    href="javascript:void(0)"
                    class="btn btn-primary btn-block w-100"
                    @click="openModalDetails(order['id'])"
                    >Proses</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <div class="row">

          <div
            class="col-lg-12 text-center animate__animated animate__fadeIn"
            v-if="ordersSucceed.length < 0"
          >
            <h3 class="mt-5">Tidak Ada Pesanan...</h3>
          </div>
          <div
            class="col-lg-4 col-md-6"
            v-for="(order, index) in ordersSucceed"
            :key="index"
          >
            <div
              class="
                bg-white
                shadow-card
                rounded
                p-3
                mb-4
                animate__animated animate__fadeIn
              "
            >
              <div class="d-flex align-items-center mb-1">
                <div class="mb-0">
                  <h6>
                    {{ order["customer_first_name"] }}
                    {{ order["customer_last_name"] }}
                  </h6>
                  <!-- <small
                ><i class="fad fa-mobile-android"></i>
                {{ order["phone"] }}</small
              > -->
                </div>
                <p
                  class="text-outline-warning mb-0 ml-auto pending-border"
                  v-html="formatStatus(order['status'])"
                >
                  <!-- {{ order["status"] }} -->
                </p>
              </div>
              <div class="d-flex align-items-center border-bottom-grey mb-3">
                <p class="small">
                  <i class="fad fa-calendar-alt"></i>
                  {{ order["updated_at"] | formatDate }}
                  <span class="ml-2"
                    ><i class="fad fa-clock mr-1"></i
                    >{{ order["updated_at"] | formatTime }}</span
                  >
                </p>
              </div>
              <p class="text-dark mb-2">
                <span class="mr-2"
                  ><i class="fad fa-circle"></i>
                  #{{ order["web_order_id"] }}</span
                >
              </p>
              <p class="text-dark mb-2">
                <span class="mr-2 text-white bg-success p-1"
                  ><i class="fad fa-percentage"></i>
                  {{ order["payment"] | translatePayment }}</span
                >
              </p>
              <p class="text-dark mb-2">
                <span class="mr-2 text-black"
                  ><i class="fal fa-person-dolly"></i>
                  {{ order["shipping_method"] | translateShipping }}</span
                >
              </p>
              <div class="d-flex">
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-map-signs"></i> {{ order["address1"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="order['address2'] === '' || order['address2'] !== null"
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-map-signs"></i> {{ order["address2"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="
                  order['sub_district'] === '' || order['sub_district'] !== null
                "
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-map-signs"></i>
                    {{ order["sub_district"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="order['district'] === '' || order['district'] !== null"
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-map-signs"></i> {{ order["district"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="order['city'] === '' || order['city'] !== null"
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-city"></i> {{ order["city"] }},
                    {{ order["state"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="order['postcode'] === '' || order['postcode'] !== null"
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-mailbox"></i> {{ order["postcode"] }}
                  </span>
                </small>
              </div>
              <div
                class="d-flex"
                v-if="order['note'] === '' || order['note'] !== null"
              >
                <small class="text-dark mb-2">
                  <span class="mr-2 text-black"
                    ><i class="fal fa-sticky-note"></i> Note:
                    {{ order["note"] }}
                  </span>
                </small>
              </div>
              <div class="d-flex align-items-center row">
                <div class="col-12 pr-2">
                  <a
                    href="javascript:void(0)"
                    class="btn btn-success btn-block w-100"
                    @click="openModalDetails(order['id'], 'succeed')"
                    >Detail</a
                  >
                </div>
                <!-- <div class="col-6 pl-2">
              <a href="settings.html" class="btn btn-outline-primary btn-block"
                >Proses</a
              >
            </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade modal-right"
      id="detailsModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
    >
      <div class="modal-dialog animate__animated animate__fadeInRight">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Order Detail</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center">
              <div class="">
                <p class="mb-1 text-danger">kepada</p>
                <div>
                  <small>
                    {{ selectedOrder["customer_first_name"] }}
                    {{ selectedOrder["customer_last_name"] }}
                  </small>
                  <small
                    v-if="
                      selectedOrder['phone'] === '' ||
                      selectedOrder['phone'] !== null
                    "
                  >
                    {{ selectedOrder["phone"] }},
                  </small>
                  <p>{{ selectedOrder["postcode"] }}</p>
                  <small>Pembayaran: {{ selectedOrder["payment"] }}</small>
                </div>
              </div>
            </div>
            <div class="details-page border-top pt-3">
              <div class="mb-2">
                <div class="d-flex">
                  <h6 class="text-black-50 w-100">Pesanan</h6>
                  <p class="text-dark font-weight-bolder">
                    #{{ selectedOrder["id"] }}
                  </p>
                </div>
                <small class="text-black-50">{{
                  selectedOrder["created_at"] | formatDate
                }}</small>
              </div>

              <div
                class="
                  d-flex
                  align-items-center
                  border-bottom-dotted border-top-dotted
                  pb-2
                "
              >
                <p class="bg-light rounded mr-2 w-10">Qty</p>
                <p class="text-dark">Item</p>
                <p class="ml-auto">Harga</p>
              </div>
              <div
                class="d-flex align-items-center"
                v-for="(item, index2) in selectedOrder['order_online_item']"
                :key="index2"
              >
                <p class="bg-light rounded mr-2 w-10">{{ item["quantity"] }}</p>
                <p class="text-dark">{{ item["name"] }}</p>
                <p class="ml-auto">{{ item["price"] }}</p>
              </div>
              <div class="d-flex align-items-center mb-3 bg-light rounded">
                <p class="text-dark m-0 font-weight-bold m-auto">Total</p>
                <p class="ml-auto d-flex align-items-center mb-0">
                  <span>{{ selectedOrder["total_price"] }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-start">
            <div class="">
              <p class="mb-1 text-danger">Dikirimkan ke</p>
              <div>
                <small> {{ selectedOrder["address1"] }}, </small>
                <small
                  v-if="
                    selectedOrder['address2'] === '' ||
                    selectedOrder['address2'] !== null
                  "
                >
                  {{ selectedOrder["address2"] }},
                </small>
                <small
                  v-if="
                    selectedOrder['sub_district'] === '' ||
                    selectedOrder['sub_district'] !== null
                  "
                >
                  {{ selectedOrder["sub_district"] }},
                </small>
                <small
                  v-if="
                    selectedOrder['district'] === '' ||
                    selectedOrder['district'] !== null
                  "
                >
                  {{ selectedOrder["district"] }},
                </small>
                <small
                  v-if="
                    selectedOrder['city'] === '' ||
                    selectedOrder['city'] !== null
                  "
                >
                  {{ selectedOrder["city"] }},
                </small>
                <small
                  v-if="
                    selectedOrder['state'] === '' ||
                    selectedOrder['state'] !== null
                  "
                >
                  {{ selectedOrder["state"] }}
                </small>
                <p>{{ selectedOrder["postcode"] }}</p>
              </div>
              <p class="mb-0 font-weight-bold text-dark">
                {{ selectedOrder["company_name"] }}
              </p>

              <small class="text-dark mb-2">
                <span class="mr-2 text-black"
                  ><i class="fal fa-sticky-note"></i> Note:
                  {{ selectedOrder["note"] }}
                </span>
              </small>

              <br />

              <small class="mb-0 text-dark border-bottom-success">
                Pengiriman: {{ selectedOrder["payment"] }}
              </small>
            </div>
            <div class="row w-100">
              <button
                class="btn btn-success ml-auto"
                @click="printOrder()"
                v-if="selectedOrder['status'] === 'completed'"
              >
                <i class="fal fa-print"></i>
                Cetak
              </button>
              <button
                class="btn btn-warning ml-auto"
                @click="processOrder()"
                v-else
              >
                <i class="fal fa-print"></i>
                Proses / Cetak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echo from "laravel-echo";
import Pusher from "pusher-js";

import axios from "axios";
import $ from "jquery";
import moment from "moment";

moment.locale("id");
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
      ordersPending: [],
      ordersSucceed: [],
      selectedOrder: {},
    };
  },
  methods: {
    processOrder() {
      this.$root.loading = true;
      return axios
        .post(
          `${process.env.VUE_APP_BASE_HOST_API}/order-online/${this.selectedOrder["id"]}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        )
        .then((results) => {
          if (results["data"]["success"]) {
            localStorage.setItem(
              "pending_orders",
              localStorage.getItem("pending_orders") - 1
            );

            let routeData = this.$router.resolve({
              name: "invoiceOrderOnline",
              query: { key: this.selectedOrder["id"] },
            });
            $("#detailsModal").modal("hide");
            window.open(routeData.href, "_blank");
            this.$root.loading = false;
          }
        })
        .catch((error) => {
          console.error(error);
          this.$root.loading = false;
        });
    },
    printOrder() {
      let routeData = this.$router.resolve({
        name: "invoiceOrderOnline",
        query: { key: this.selectedOrder["id"] },
      });
      $("#detailsModal").modal("hide");
      window.open(routeData.href, "_blank");
    },
    openModalDetails(id, type = "pending") {
      this.$root.loading = !this.$root.loading;

      let order = {};
      if (type == "pending") {
        order = this.ordersPending;
      } else {
        order = this.ordersSucceed;
      }
      this.selectedOrder = order.filter((order) => order.id === id)[0];
      $("#detailsModal").modal("show");
      this.$root.loading = !this.$root.loading;
    },
    getOrders() {
      this.$root.loading = true;
      return axios
        .get(`${process.env.VUE_APP_BASE_HOST_API}/order-online`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then((results) => {
          console.log(results["data"]);
          if (results["data"]["success"]) {
            this.ordersPending = results["data"]["data"].filter(
              (order) => order.status == "pending"
            );

            localStorage.setItem("pending_orders", this.ordersPending.length);

            this.ordersSucceed = results["data"]["data"].filter(
              (order) => order.status == "completed"
            );
            this.$root.loading = false;
          }
        })
        .catch((error) => {
          console.error(error);
          this.$root.loading = false;
        });
    },
    subscribe() {
      // window.Echo.channel('new-order')
      //   .listen('newOrder', (e) => {
      //     console.log("adaaa")
      //     alert(234)
      //     alert(e['message'])
      //   });
    },
    formatStatus(val) {
      if (val === "pending") {
        return `<span class="status-border-pending">
          <i class="fad fa-hourglass-half"></i>
          ${val}
        </span>`;
      } else {
        return `<span class='status-border-success text-success'>
          <i class="fad fa-check"></i>
          ${val}
        </span>`;
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
    formatDate(date) {
      return moment(date).format("Do MMMM YYYY");
    },
    formatTime(time) {
      return moment(time).format("H:mm");
    },
    translatePayment(val) {
      if (val === "cashondelivery") {
        return "COD";
      } else if (val === "moneytransfer") {
        return "TRANSFER";
      }
      return val;
    },
    translateShipping(val) {
      if (val === "free_free") {
        return "Gratis Ongkir";
      }
      return "Pengantaran Langsung";
    },
  },
  mounted() {
    this.$root.$on("clearCarts", this.clearCarts);
  },
  created() {
    this.getOrders();
  },
};
</script>

<style scoped>
.shadow-card:hover {
  box-shadow: 1px 2px 7px 2px gray;
  cursor: pointer;
}
.modal-right {
  right: 0;
  left: unset;
  width: 400px;
  padding-right: 0 !important;
}

.border-bottom-dotted {
  border-bottom: 2px dotted gray;
}

.border-top-dotted {
  border-top: 2px dotted gray;
}

.border-bottom-success {
  border-bottom: 2px solid #0c8601;
}

.status-border,
.status-border-pending,
.status-border-completed {
  border-bottom: 7px solid;
}

.status-border-pending {
  border-bottom: 7px solid #e3e309;
}

.status-border-completed {
  color: 7px solid #28a745;
}

.w-10 {
  width: 10%;
}

@media only screen and (max-width: 600px) {
  .modal-right {
    width: 300px;
  }
}
</style>