import createDeposit from "./createDeposit.js";
import createPayment from "./createPayment.js";
import executePayment from "./executePayment.js";

export default {
  "/transactions/deposit": {
    ...createDeposit,
  },
  "/transactions/payment": {
    ...createPayment,
  },
  "/transactions/payment/{transaction_id}/execute": {
    ...executePayment,
  },
};
