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
`NSwitch 可購買數量改變
${one.Name}
從 ${lastQty[one.Id]} -> ${one.Qty}
https://24h.m.pchome.com.tw/prod/${one.Id}`
                    )
                console.log(one.Name, '可購買數量改變');
            }
            lastQty[one.Id] = one.Qty;
        } catch (error) {
            console.log(new Date(), 'try again')
            i--
            await delay(5000);
        }

        await delay(1000);
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