
/**
 * 将列表以逗号隔开并组成字符串
 * @param {Array<String>} array 
 */
function composeListWithDotSplitting(array) {
    if(array.length === 0) {
        return ""
    }
    return array.reduce((previousValue, currentValue) => {
        return previousValue + "," + currentValue
    })
}

function sliceDateTime(date_time) {
    if(date_time.length > 10) {
        return date_time.slice(0, -3)
    }
    return date_time
}

export {
    composeListWithDotSplitting,
    sliceDateTime
}