const axios = require('axios')

module.exports.checkPChome = async(prodID) => {
    const url = `https://24h.m.pchome.com.tw/ecapi/ecshop/prodapi/v2/prod/${prodID}&fields=Seq,Id,Name,Nick,Store,PreOrdDate,SpeOrdDate,Price,Discount,Pic,Weight,ISBN,Qty,Bonus,isBig,isSpec,isCombine,isDiy,isRecyclable,isCarrier,isMedical,isBigCart,isSnapUp,isDescAndIntroSync,isFoodContents,isHuge,isEnergySubsidy,isPrimeOnly,isPreOrder24h,isWarranty,isLegalStore,isOnSale,isPriceTask,isFresh,isBidding,isSet,Volume,isArrival24h,isETicket&_callback=jsonp_prodmain&1586573460?_callback=jsonp_prodmain`  
    const user_agent = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36';
    const respons = await axios({
        url,
        method: 'get',
        headers: {
            'User-Agent': user_agent,
            'server': 'PChome/1.0.4',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'Referer': 'https://mall.pchome.com.tw/newarrival/',
        },
    })
    const data = respons.data;
    const start = data.indexOf('":') + 2;
    const end = data.indexOf("});}catch(e)");
    const json = JSON.parse(data.substring(start, end));
    if (json) {
        return json;
    }
    return {}
}

module.exports.iftttSellMessage = async(msg) => {
    const respons = await axios.post(`https://maker.ifttt.com/trigger/nswitch/with/key/${process.env.IFTTT_WEBHOOK_KEY}`, {
        value1: msg,
    })
    return 'ok';
}