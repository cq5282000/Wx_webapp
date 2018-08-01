Page({
    data: {
        test: '这是一个测试界面',
        condition: false,
        array: [1, 2, 3, 4, 5],
        openGid: ''
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        wx.showShareMenu({
            withShareTicket: true
        });
    },
    onReady: function () {
        // 生命周期函数--监听页面初次渲染完成
    },
    onShow: function () {
        // 生命周期函数--监听页面显示
        console.log('show');
    },
    onHide: function () {
        // 生命周期函数--监听页面隐藏
        console.log('hdie');
    },
    onUnload: function () {
        // 生命周期函数--监听页面卸载
    },
    onPullDownRefresh: function () {
        // 页面相关事件处理函数--监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function (options) {
        // console.log('Options11111:', options);
        // 用户点击右上角分享
        const shareData = {
            title: 'zhehsiyigeceshi',
            path: '/page/test?id=123',
            success: function (res) {
                console.log('1111111111111111');
                console.log('success', JSON.stringify(res.shareTickets[0]));
                wx.getShareInfo({
                    shareTicket: res.shareTickets[0],
                    complete: function (options) {
                        console.log('1111111111111', options)
                    }
                })
            },
        };
        this.changeShareData(shareData);
        return shareData;
    },
    changeShareData(shareData) {
        shareData.title = '修改了shareData';
    },
    buttonTouch: () => {
        // this.setData({
        //     test: '123',
        // });
        // wx.navigateTo({
        //     url: '../test2/test2',
        // })
        wx.switchTab({
            url: '../index/index',
            success: function (res) {
                // success
            }
        });
    },
    onTabItemTap(item) {
        console.log(item.index)
        console.log(item.pagePath)
        console.log(item.text)
    },
    onMyEvent: function (e) {
        console.log(e.detail);
    },
    onChooseImage: function (e) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        'user': 'test'
                    },
                    success: function (res) {
                        var data = res.data
                        console.log(data);
                        //do something
                    }
                })
            }
        })
    }
})
