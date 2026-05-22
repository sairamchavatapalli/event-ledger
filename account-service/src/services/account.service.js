const Account = require("../models/account.model");
const Transaction = require("../models/transaction.model");

const applyTransaction = async (data) => {
  const {
    transactionId,
    accountId,
    type,
    amount,
    currency,
    eventTimestamp,
    traceId
  } = data;

  // Check duplicate transaction
  const existingTransaction = await Transaction.findOne({
    where: { transactionId }
  });

  if (existingTransaction) {
    return {
      duplicate: true,
      transaction: existingTransaction
    };
  }

  // Find account
  let account = await Account.findOne({
    where: { accountId }
  });

  // Create account automatically if not exists
  if (!account) {
    account = await Account.create({
      accountId,
      balance: 0,
      currency
    });
  }

  // Create transaction
  const transaction = await Transaction.create({
    transactionId,
    accountId,
    type,
    amount,
    currency,
    eventTimestamp,
    traceId
  });

  // Update balance
  if (type === "CREDIT") {
    account.balance += amount;
  } else {
    account.balance -= amount;
  }

  await account.save();

  return {
    duplicate: false,
    transaction,
    balance: account.balance
  };
};

const getBalance = async (accountId) => {
  const account = await Account.findOne({
    where: { accountId }
  });

  if (!account) {
    return null;
  }

  return account;
};

const getAccountDetails = async (accountId) => {
  const account = await Account.findOne({
    where: { accountId }
  });

  if (!account) {
    return null;
  }

  const transactions = await Transaction.findAll({
    where: { accountId },
    order: [["eventTimestamp", "ASC"]]
  });

  return {
    account,
    transactions
  };
};

module.exports = {
  applyTransaction,
  getBalance,
  getAccountDetails
};