const api = require('./api.js');
const config = require('./config.js');

let lastQty = {};

setInterval(()=>{
    const task = config.pchome.map((id) => {
        return api.checkPChome(id);
    });
    Promise.all(task).then((result) => {
        result.forEach((one) => {
            if(!lastQty[one.Id]) {
                lastQty[one.Id] = one.Qty;
            }
            if(lastQty[one.Id] !== one.Qty) {
                api.iftttSellMessage(
    `NSwitch 存量改變
    ${one.Name}
    庫存從 ${lastQty[one.Id]} -> ${one.Qty}
    https://24h.m.pchome.com.tw/prod/${one.Id}`
                    )
                console.log(one.Name, '存量改變');
            }
            lastQty[one.Id] = one.Qty;
        })
        // console.log(lastQty)
    }).catch((err) => {
        console.log(err)
    });
}, 30 * 1000);

console.log('nswitch sell check start')
api.iftttSellMessage('nswitch sell check start!')