const api = require('./api.js');
const config = require('./config.js');

let lastQty = {};

const prodList = config.pchome;

const checkAll = async()=>{
    for (let i = 0; i < prodList.length; i++) {
        try {
            const id = prodList[i];
            const one = await api.checkPChome(id);
            
            if(!(one.Id in lastQty)) {
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
        } catch (error) {
            console.log(error)
        }

        await delay(2000);
    }

    checkAll();
}

checkAll();
console.log('nswitch sell check start')
api.iftttSellMessage('nswitch sell check start!')

const delay = (interval) => {
    return new Promise((resolve) => {
        setTimeout(resolve, interval);
    });
};