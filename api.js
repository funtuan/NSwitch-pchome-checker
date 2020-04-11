const axios = require('axios')

module.exports.checkPChome = async(prodID) => {
    const respons = await axios(`https://24h.m.pchome.com.tw/ecapi/ecshop/prodapi/v2/prod/${prodID}&fields=Seq,Id,Name,Nick,Store,PreOrdDate,SpeOrdDate,Price,Discount,Pic,Weight,ISBN,Qty,Bonus,isBig,isSpec,isCombine,isDiy,isRecyclable,isCarrier,isMedical,isBigCart,isSnapUp,isDescAndIntroSync,isFoodContents,isHuge,isEnergySubsidy,isPrimeOnly,isPreOrder24h,isWarranty,isLegalStore,isOnSale,isPriceTask,isFresh,isBidding,isSet,Volume,isArrival24h,isETicket&_callback=jsonp_prodmain&1586573460?_callback=jsonp_prodmain`)
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