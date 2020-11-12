/*
JavaScript Algorithms and Data Structures Projects: Cash RegisterPassed
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
See below for an example of a cash-in-drawer array:

[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
*/
function checkCashRegister(price, cash, cid) {
  // figure out change amount due:
  let change = cash-price
  let totalCid = 0
  let status = {status:'', change: []}

  let cidObj = {
    "PENNY": .01,
    "NICKEL": .05,
    "DIME": .1,
    "QUARTER": .25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100}

  // figure out total of cid
  for (let i = 0 ; i < cid.length; i++){
    totalCid += cid[i][1]
  }

  totalCid = Math.round(totalCid * 100) / 100;

  if (change === totalCid){
    status.status = "CLOSED"
    status.change = cid
    return status
  }
  else if (totalCid < change){
    status.status = "INSUFFICIENT_FUNDS"
    status.change = []
  }

   else {
      for (let i = cid.length-1 ; i >= 0; i--){
        if (change >= cidObj[cid[i][0]] && change >= cid[i][1]){
          status.change.push(cid[i])
          change -= cid[i][1]
          change = Math.round(change*100)/100


        } else if (change >= cidObj[cid[i][0]] && change < cid[i][1]){
            let amount = Math.floor(change/cidObj[cid[i][0]])*cidObj[cid[i][0]]

            status.change.push([cid[i][0], amount])
            change -=  amount
            change = Math.round(change*100)/100
        }
      }
  }

  if (change >= .01){
    status.status = "INSUFFICIENT_FUNDS"
    status.change = []
  } else {
    status.status = "OPEN"
  }
  return status;
}