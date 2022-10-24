/**
 * BaseBehavior是所有行为的基类
 */

import { Location } from "../Attribute/Location";

class BaseBehavior{
    begin_time: number;
    end_time: number | null;
    location: Location;
    speed: number;
    light: boolean;
    duration: number;
    individual: boolean;
    constructor(timestamp: number, location: any, light: boolean = true, speed: number = 0.0) {
        // 行为开始时间
        this.begin_time = timestamp
        // 行为结束时间
        this.end_time = null
        // 行为发生时的位置
        this.location = location
        // 用户移动速度
        this.speed = speed
        // 环境光线情况（明暗）
        this.light = light
        // 行为持续时间
        this.duration = 0

        // 个人行为 or 群体行为
        this.individual = true
    }

    get_duration(timestamp: number) {
        if(this.end_time != null) {
            return this.duration
        }
        return timestamp - this.begin_time
    }

    end(timestamp: number) {
        this.end_time = timestamp
        this.duration = timestamp - this.begin_time
    }
}

export {
    BaseBehavior
}