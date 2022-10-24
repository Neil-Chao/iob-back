class Behavior{
    constructor(timestamp, location, light=true, speed = 0, additional_attr = null) {
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

        // 附加属性 行为特定
        this.additional_attr = additional_attr

        // 个人行为 or 群体行为
        this.individual = true

        

    }

    get_duration(timestamp) {
        if(this.end_time != null) {
            return this.duration
        }
        return timestamp - this.begin_time
    }

    end(timestamp) {
        this.end_time = timestamp
        this.duration = timestamp - this.begin_time
    }
}

export default {
    Behavior
}