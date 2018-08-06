Component({ // eslint-disable-line
    options: {
        multipleSlots: true,
    },
    methods: {
        onTap: function() {
            console.log('123123');
            const myEventDetail = {
                name: 'yuqingyang',
            };
            const myEventOption = {};
            this.triggerEvent('myevent', myEventDetail, myEventOption);
        }
    }
});
