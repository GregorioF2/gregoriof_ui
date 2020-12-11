<template>
  <div class="main-container">
    <div class="middle-container">
      <div class="title">
        Welcome to GregorioF Challenge UI
      </div>

      <form class="ui form creation-form">
        <h2 class="ui dividing header">Create transaction form</h2>
        <div class="field">
          <label>Ammount</label>
          <input type="number" v-model="ammount" placeholder="Transaction ammonut" />
        </div>
        <div class="field">
          <label>Type</label>
          <sui-dropdown
            fluid
            :options="transactionsTypes"
            placeholder="Transaction type"
            selection
            v-model="type"
          />
        </div>
        <button class="ui button" @click.prevent="create" type="submit">Create</button>
      </form>

      <div class="ui divider"></div>

      <div class="list-transactions">
        <h2>List of transactions</h2>
        <sui-button basic primary @click="getTransactions">Refresh</sui-button>
        <sui-list bulleted>
          <sui-list-item v-for="(item, index) in transactions" :key="index">
            <div>
              - Type:
              <span :class="{ debit: item.type == 'debit', credit: item.type == 'credit' }">
                {{ item.type }}
              </span>
              <br />
              - Ammount: {{ item.ammount }}
              <br />
              - Id: {{ item.id }}
              <br />
              - Date: {{ item.effectiveDate }}
            </div>
          </sui-list-item>
        </sui-list>
      </div>
    </div>
  </div>
</template>

<script>
const transactionsController = require("../controllers/transactions");
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  data() {
    return {
      ammount: 0,
      type: "",
      transactionsTypes: [
        { key: "credit", text: "Credit", value: "credit" },
        { key: "debit", text: "Debit", value: "debit" }
      ],
      transactions: []
    };
  },
  methods: {
    async getTransactions() {
      this.transactions = await transactionsController.getTransactions();
    },
    async create() {
      transactionsController.createTransaction();
    }
  }
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
}
.middle-container {
  width: 700px;
  height: 100%;
  margin: auto;
  border: grey 5px solid;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.title {
  margin: auto;
  margin-top: 40px;
  margin-bottom: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  font-size: 40px;
}
.creation-form {
  margin: 20px;
}

.list-transactions {
  margin: 20px;
}

.debit {
  color: green;
}

.credit {
  color: red;
}
</style>
