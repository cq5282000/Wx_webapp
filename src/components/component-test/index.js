Component({ // eslint-disable-line
    behaviors: [],
    properties: {
        myProperty: { // 属性名
            type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
            observer: function(newVal, oldVal, changedPath) {
            // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
            // 通常 newVal 就是新设置的数据， oldVal 是旧数据
            }
        },
        myProperty2: String // 简化的定义方式
    },
    data: {}, // 私有数据，可用于模版渲染

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function(){},
    moved: function(){},
    detached: function(){},

    methods: {
        /**方法 */
    }
});