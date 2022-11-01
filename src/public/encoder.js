import {
    ADDTIONAL_ATTRIBUTES,
    DEFAULT_VALUES,
    ATTRIBUTE_LENGTH
} from "./Constant"

import {
    sliceDateTime
} from "../util/CommonUtil"

function extractFiledsAndValue(uid, begin_time, light, type1, params) {
    let fields = ["uid", "begin_time", "light", "type1"]
    let values = [uid, begin_time, light, type1]

    function filterAndCompose(params) {
        for (const attr of ADDTIONAL_ATTRIBUTES) {
            if (attr in params) {
                fields.push(attr)
                values.push(params[attr])
            }
        }
    }

    filterAndCompose(params)

    return [fields, values]
}

function fillPrefix(value, length) {
    return value.padStart(length, '0')
}

/**
 * 利用行为属性对行为编码
 * @param {Array} fileds 
 * @param {Array} values 
 * @param {String} self 
 * @param {String} begin_time 
 * @returns 
 */
function encode(fields, values, self, begin_time) {
    let attributes = {}
    fields.forEach((value, index) => {
        attributes[value] = values[index]
    })

    for (const attr in DEFAULT_VALUES) {
        if (!(attr in attributes)) {
            attributes[attr] = DEFAULT_VALUES[attr]
        }
    }
    console.log("[attributes]:", attributes)
    let res = ""
    try {
        const uid = attributes["uid"]
        res += fillPrefix(Number(uid).toString(16), 8)
        // console.log("[uid]", fillPrefix(Number(uid).toString(16), 8))

        const type1 = attributes["type1"]
        const type2 = attributes["type2"] ?? "0"
        const type3 = attributes["type3"] ?? "0"
        const individual = attributes["individual"]
        const type = fillPrefix(
            parseInt(
                Number(
                    Number(type1).toString(2).padStart(ATTRIBUTE_LENGTH["type1"], "0") +
                    Number(type2).toString(2).padStart(ATTRIBUTE_LENGTH["type2"], "0") +
                    Number(type3).toString(2).padStart(ATTRIBUTE_LENGTH["type3"], "0") +
                    Number(individual).toString(2).padStart(ATTRIBUTE_LENGTH["individual"], "0")
                ),
                2
            ).toString(16),
            4
        )
        // console.log("[type]", type)
        res += type

        const base = attributes["base"] ?? "0"
        const ret_self = fillPrefix(Number(self).toString(2), ATTRIBUTE_LENGTH["self"])
        const self_base = fillPrefix(
            parseInt(
                Number(
                    ret_self +
                    fillPrefix(Number(base).toString(2), ATTRIBUTE_LENGTH["base"])
                ),
                2
            ).toString(16),
            8
        )
        // console.log("[self_base]:", self_base)
        res += self_base

        const begin = fillPrefix(
            parseInt(
                fillPrefix(Number(begin_time.slice(0, -3)).toString(2), ATTRIBUTE_LENGTH["begin_time"]),
                2
            ).toString(16), 
            8
        )
        // console.log("[begin]:", begin)
        res += begin

        const action = attributes["action"]
        const duration = attributes["duration"] ?? "0"
        const light = attributes["light"]

        const tail = fillPrefix(
            parseInt(
            Number(
                fillPrefix(Number(action).toString(2), ATTRIBUTE_LENGTH["action"]) +
                fillPrefix(Number(duration).toString(2), ATTRIBUTE_LENGTH["duration"]) +
                fillPrefix(Number(light).toString(2), ATTRIBUTE_LENGTH["light"])
            ), 2).toString(16),
            4
        )
        // console.log("[tail]:", tail)
        res += tail
        return [res, fillPrefix(parseInt(ret_self, 2).toString(16), 4)]
    } catch (error) {
        console.log(error)
        return null
    }

    
}

function computeSelf(self) {
    try {
        if (typeof (self) !== "number") {
            self = Number(self)
        }
        return self % Math.pow(2, ATTRIBUTE_LENGTH["self"])
    } catch (error) {
        return -1
    }
}

export {
    extractFiledsAndValue,
    encode,
    computeSelf
}