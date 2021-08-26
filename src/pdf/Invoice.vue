<template>
  <div class="invoice-card" v-if="invoices['d']">

    <div class="row">
        <div class="col-md-6 print-container text-center">
        <a href="/" class="btn btn-primary">
             <i class="fad fa-caret-circle-left"></i>
        </a>
        </div>

        <div class="col-md-6 print-container text-center">
        <button class="btn btn-primary" @click="print">
            Cetak <i class="fad fa-print"></i>
        </button>
        </div>
    </div>

    <div class="invoice-title text-center">
        <img src="data:image/png;base64,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" alt="Logo Beliayam.com">
    </div>


    <div class="invoice-title">
      <div id="main-title justify-content-center">
        <p>PT. BELI AYAM COM</p>
        <small>Office 8, Level 18-A
        Jl. Jend. Sudirman Kav. 52-53 SCBD
        LOT 28, Jakarta Selatan</small>
      </div>
    </div>

    <div class="invoice-title">
      <div id="main-title">
        <h4>FAKTUR</h4>
        <span>#{{ invoices['d']['id'] }}</span>
      </div>

      <span id="date">{{ invoices['d']['transDateView'] | formatDate}}</span>
    </div>

    <div class="invoice-details">
      <table class="invoice-table">
        <thead>
          <tr>
            <td>PRODUK</td>
            <td>UNIT</td>
            <td>HARGA</td>
          </tr>
        </thead>

        <tbody>
          <tr class="row-data" v-for="(invoice, index) in invoices['d']['detailItem']" :key="index">
            <td>{{ invoice['detailName'] }}</td>
            <td id="unit"> {{ invoice['quantity'] }}</td>
            <td>{{ invoice['salesAmount'] | formatMoney }}</td>
          </tr>

          <!-- <tr class="row-data">
            <td>Cappucino <span>(small)</span></td>
            <td id="unit">2</td>
            <td>7.00</td>
          </tr> -->

          <tr class="calc-row">
            <td colspan="2">Total</td>
            <td>{{ invoices['d']['salesAmount'] |formatMoney }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="invoice-footer text-center">
      Terima Kasih Telah Berbelanja Nikmati Kemudahan Pembeliaan Di beliayam.com
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import moment from 'moment'
moment.locale('id');  

export default {
  name: "stockDownload",
  data() {
    return {
      invoices: [],
    };
  },
  methods: {
    async getInvoice() {
      return await axios
        .get(
          `${process.env.VUE_APP_BASE_HOST_API}/pay/${this.$route.query['key']}/invoice`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        )
        .then((results) => {
          console.log(this.invoices = results['data']['data']);
          // if(results['data']['success']){
          //     this.stocks = results['data']['data']
          // }
        });
    },
    print() {
      document.title = "Persediaan Mitra";
      window.print();
    },
  },
  filters: {
    formatMoney(val){
        let formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });
        return formatter.format(val);
    },
    formatDate(){
        return moment().format("Do MMMM YYYY H:mm");  
    }  
  },
  created() {
    this.getInvoice();
  },
};
</script>

<style scoped>
.invoice-box {
  background-color: #fff !important;
  padding: 50px;
}
nav,
.footer {
  margin-bottom: 3rem;
}

@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

:root {
  --primary-color: #f5826e;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.5px;
}

body {
  background-color: var(--primary-color);
}

.invoice-card {
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 10px 2em;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 25em;
  width: 22em;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 10px 30px 5px rgba(0, 0, 0, 0.15);
}

.invoice-card > div {
  margin: 5px 0;
}

.invoice-title {
  flex: 3;
}

.invoice-title #date {
  display: block;
  margin: 8px 0;
  font-size: 12px;
}

.invoice-title #main-title {
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
}

.invoice-title #main-title h4 {
  letter-spacing: 2.5px;
}

.invoice-title span {
  color: rgba(0, 0, 0, 0.4);
}

.invoice-details {
  flex: 1;
  border-top: 0.5px dashed grey;
  border-bottom: 0.5px dashed grey;
  display: flex;
  align-items: center;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
}

.invoice-table thead tr td {
  font-size: 12px;
  letter-spacing: 1px;
  color: grey;
  padding: 8px 0;
}

.invoice-table thead tr td:nth-last-child(1),
.row-data td:nth-last-child(1),
.calc-row td:nth-last-child(1) {
  text-align: right;
}

.invoice-table tbody tr td {
  padding: 8px 0;
  letter-spacing: 0;
}

.invoice-table .row-data #unit {
  text-align: center;
}

.invoice-table .row-data span {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.6);
}

.invoice-footer {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.invoice-footer #later {
  margin-right: 5px;
}

.btn {
  border: none;
  padding: 5px 0px;
  background: none;
  cursor: pointer;
  letter-spacing: 1px;
  outline: none;
}

.btn.btn-secondary {
  color: rgba(0, 0, 0, 0.3);
}

.btn.btn-primary {
  color: var(--primary-color);
}

.btn#later {
  margin-right: 2em;
}

@media only screen and (max-width: 600px) {
  .iconDetails {
    width: 75px;
    height: auto;
  }
  .logo-print {
    width: 100%;
  }
}
@media print {
  nav,
  .footer,
  .print-container {
    visibility: hidden;
  }
  .invoice-box {
    margin-top: 0rem !important;
  }
}

@media print {
  body {
    width: 48mm; /*width of index card*/
    height: auto; /*height of index card*/
  }
  /* etc */
}
</style>