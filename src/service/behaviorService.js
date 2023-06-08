import {
    insertBehaviorInstance,
    searchLatestBehavior
} from '../dao/mysql/behaviorMapper'

import {
    extractFiledsAndValue,
    encode,
    computeSelf
} from "../public/encoder"

async function createBehaviorInstance(uid, begin_time, light, type1, params) {
    let begin_datetime = begin_time * 1
    if (isNaN(begin_datetime)) {
        throw TypeError("The attribute 'begin_time' has wrong format. You can choose to use millisecond to represent time.")
    }
    begin_datetime = new Date(begin_datetime)
    const [fields, values] = extractFiledsAndValue(uid, begin_datetime, light, type1, params)
    const latest_behavior = await searchLatestBehavior()    //look for latest
    let self;
    if(latest_behavior === null) {
        self = 0;
    } else {
        self = computeSelf(Number(latest_behavior["self"]) + 1);
    }

    if (self === -1) {
        return false
    }

    const [address, ret_self] = encode(fields, values, self + "", begin_time)

    fields.push("address", "self")
    values.push(address, ret_self)
    // console.log(fields)
    const result = await insertBehaviorInstance(fields, values)
    console.log(result)
    if (result !== -1) {
        console.log("Insert a behavior instance to 'mysql' database.")
        return true
    } else {
        return false
    }
}

export {
    createBehaviorInstance
}