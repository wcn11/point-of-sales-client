<template>
  <div>
    <header class="card-header header-category">
      <h2>Pelanggan</h2>
    </header>

    <!-- <aside class="card-header header-category">
            <div class="form-group row m-auto">
                <label for="inputPassword" class="col-sm-2 col-form-label">Cari Pelanggan...</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="search" id="inputPassword" placeholder="Cari Pelanggan...">
                </div>
            </div>
        </aside> -->

    <div class="row mt-5">
      <div
        class="col-md-3 col-sm-4 resource-container"
        v-for="(customer, index) in customers"
        :key="index"
      >
        <div class="resource" @click="openModalCustomerById(customer['id'])">
          <div class="row no-gutters">
            <div class="text-center col-md-12">
              <a href="javascript:void(0)"
                ><img
                  :src="require('./../../assets/images/default_people.png')"
                  alt="Foto Customer"
                  class="img-fluid rounded"
              /></a>
            </div>
            <div class="right col-md-12">
              <h5 class="text-center mt-3">{{ customer["name"] }}</h5>
              <p class="text-center">{{ customer["category"]["name"] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade animate__animated animate__fadeInUp"
      id="modal-customer"
      tabindex="-1"
    >
      <div class="modal-dialog modal-static modal-dialog-scrollable">
        <div class="modal-content modal-bottom">
          <div class="modal-body">
            <div v-if="customer">
              {{ customer.name }}
              <p>
                {{ customer["billCity"] }}, {{ customer["billCountry"] }}
                {{ customer["billProvince"] }}
              </p>
              <p>{{ customer["billZipCode"] }}</p>
              <p>{{ customer["customerBranchName"] }}</p>
              <p>{{ customer["mobilePhone"] }}</p>
            </div>
            <div class="d-flex justify-content-around">
              <button class="btn btn-dark" data-dismiss="modal">
                <i class="fad fa-times"></i> tutup
              </button>
              <button class="btn btn-info" @click="openModalEditCustomer">
                <i class="fad fa-edit"></i> edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade animate__animated animate__fadeInUp"
      id="modal-edit-customer"
      tabindex="-1"
    >
      <div class="modal-dialog modal-static modal-dialog-scrollable">
        <div class="modal-content modal-bottom">
          <div class="modal-body">
            <div v-if="customer">
              <div class="text-center">
                <header class="card-header d-flex mb-3">
                  <h2><i class="fad fa-cart-arrow-down"></i> Ubah Pelanggan</h2>
                </header>

                <div class="form-group row text-left">
                  <label for="customers" class="col-sm-4 form-control-label"
                    >Nama Pelanggan <span class="text-danger">*</span></label
                  >
                  <div class="col-sm-8 d-flex">
                    <input
                      type="text"
                      class="form-control"
                      v-model="updateCustomer['name']"
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
                      v-model="updateCustomer['email']"
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
                      v-model.number="updateCustomer['mobilePhone']"
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
                      v-model="updateCustomer['billStreet']"
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
                      v-model="updateCustomer['billCity']"
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
                      v-model="updateCustomer['billProvince']"
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
                      v-model.number="updateCustomer['billZipCode']"
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
                      v-model="updateCustomer['notes']"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-around">
              <button class="btn btn-dark" data-dismiss="modal">
                <i class="fad fa-times"></i> batal
              </button>
              <button class="btn btn-success" @click="updateCustomerId">
                <i class="fad fa-edit"></i> simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade animate__animated animate__fadeInUp"
      id="modal-add-customer-customers"
      tabindex="-1"
    >
      <div class="modal-dialog modal-static modal-dialog-scrollable">
        <div class="modal-content modal-bottom">
          <div class="modal-body">
            <div>
              <div class="text-center">
                <header class="card-header d-flex mb-3">
                  <h2>
                    <i class="fad fa-cart-arrow-down"></i> Tambah Pelanggan Baru
                  </h2>
                </header>

                <div class="form-group row text-left">
                  <label for="customers" class="col-sm-4 form-control-label"
                    >Nama Pelanggan <span class="text-danger">*</span></label
                  >
                  <div class="col-sm-8 d-flex">
                    <input
                      type="text"
                      class="form-control"
                      v-model="updateCustomer['name']"
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
                      v-model="updateCustomer['email']"
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
                      v-model.number="updateCustomer['mobilePhone']"
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
                      v-model="updateCustomer['billStreet']"
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
                      v-model="updateCustomer['billCity']"
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
                      v-model="updateCustomer['billProvince']"
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
                      v-model.number="updateCustomer['billZipCode']"
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
                      v-model="updateCustomer['notes']"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-around">
              <button class="btn btn-dark" data-dismiss="modal">
                <i class="fad fa-times"></i> batal
              </button>
              <button class="btn btn-success" @click="saveCustomer">
                <i class="fad fa-edit"></i> simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="button-add-user" @click="openModalAddCustomer">
      <button class="btn btn-info rounded-circle">
        <i class="fad fa-user-plus"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "customers",
  data() {
    return {
      products: [],
      customers: [],
      customer: {},
      search: "",
      updateCustomer: {
        name: "",
        email: "",
        mobilePhone: "",
        billStreet: "",
        billCity: "",
        billProvince: "",
        billZipCode: "",
        notes: "",
      },
    };
  },
  methods: {
    saveCustomer() {
      return axios
        .post(
          `${process.env.VUE_APP_BASE_HOST_API}/customers`,
          {
            customer: this.updateCustomer,
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

            this.updateCustomer = {
              name: "",
              email: "",
              mobilePhone: "",
              billStreet: "",
              billCity: "",
              billProvince: "",
              billZipCode: "",
              notes: "",
            };

            $("#modal-add-customer-customers").modal("hide");

            if (results["data"]["s"]) {
              results["data"]["d"].map((value) => {
                this.$alertify.success(value);
              });
            }
          } else {
            results["data"]["d"].map((value) => {
              this.$alertify.warning(value);
            });

            $("#modal-add-customer-customers").modal("hide");
          }
        })
        .catch((error) => {
          console.error(error);
          // error.response['data']['data']['d'].map(value => {
          //     this.$alertify.warning(value)
          // })
        });
    },

    updateCustomerId() {
      return axios
        .put(
          `${process.env.VUE_APP_BASE_HOST_API}/customers/${this.customer["id"]}`,
          {
            customer: this.updateCustomer,
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

            $("#modal-edit-customer").modal("hide");

            results["data"]["d"].map((result) => {
              this.$alertify.success(result);
            });
          }
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    openModalAddCustomer() {
      $("#modal-add-customer-customers").modal("show");
    },
    openModalEditCustomer() {
      this.updateCustomer = {
        name: this.customer["name"],
        email: this.customer["email"],
        mobilePhone: this.customer["mobilePhone"],
        billStreet: this.customer["billStreet"],
        billCity: this.customer["billCity"],
        billProvince: this.customer["billProvince"],
        billZipCode: this.customer["billZipCode"],
        notes: this.customer["notes"],
      };

      $("#modal-customer").modal("hide");
      $("#modal-edit-customer").modal("show");
    },
    openModalCustomerById(id) {
      return axios
        .get(`${process.env.VUE_APP_BASE_HOST_API}/customers/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then((results) => {
          this.customer = results.data["d"];
          $("#modal-customer").modal("show");
        })
        .catch((error) => {
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
    getCustomers() {
      this.$root.loading = true;
      return axios
        .get(`${process.env.VUE_APP_BASE_HOST_API}/customers`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then((results) => {
          this.customers = results.data["d"];
          this.$root.loading = false;
        })
        .catch((error) => {
          console.log(error.response);
          this.$root.loading = false;
          this.$alertify.error(error.response["data"]["message"]);
        });
    },
  },
  created() {
    this.getCustomers();
  },
};
</script>

<style scoped lang="css">
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

.resource {
  text-align: center;
  box-shadow: 0 2 px 10 px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
  /*max-width: 345px;*/
  background-color: white;
  border-radius: 12px;
  justify-content: center;
  margin: auto;
  margin-bottom: 5%;
  min-height: 100%;
  max-height: 100%;
}
.left {
  width: 90px;
  position: relative;
  float: left;
}
.right {
  max-width: 345px;
  text-align: left;
}
.button-add-user {
  position: fixed;
  bottom: 5%;
  right: 5%;
  z-index: 1;
}

.button-add-user button {
  width: 45px;
}
</style>
