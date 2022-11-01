# API 接口文档

## Behavior 相关

1. /behavior/createBehaviorInstance
   - 描述
     - 创建一个用户行为实例
   - 请求方式：Put
   - 参数
     - 必选
       1. uid
          - 表示用户 id
       2. begin_time
          - 行为开始时间
          - 格式为时间戳，单位为毫秒
       3. light
          - 光线情况，行为发生过程中，光线情况
          - 0 为 dark 1 为 light
       4. type1
          - 行为类型 1，对行为类型的描述比较抽象
          - 例如，休闲/学习/生活
       6. name
          - 行为名称，例如 having lunch/playing basketball
     - 可选
       1. speed
          - 行为发生时，行为主体的速度
       2. type2
          - 行为类型 2，对行为类型较为具体的描述
       3. type3
          - 同上
       4. individual
          - 个人行为 or 群体行为
          - 1 为个人 0 为群体 缺省为 1
       5. action
          - 发生行为时的动作
          - 0 站立   1 行走   2 跑步   3 未知

2. /behavior/createBehaviorSchema

3. /behavior/endBehaviorInstance
   - 描述
     - 终止一个用户行为实例
   - 请求方式：Post
   - 参数
     - 必选
        1. address
            - 用户行为地址 
        2. end_time 
            - 行为结束时间 

## Relation 相关
