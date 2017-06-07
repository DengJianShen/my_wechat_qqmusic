Page({
    data: {
        topid: 1,
        topinfo: null,
        songlist: null,
        updatetime: null
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        this.setData({
            topid: options.topid
        })
        this.getTopMsg()
    },
    getTopMsg() {
        var that = this
        wx.request({
            url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
            data: {
                g_tk: 5381,
                uin: 0,
                format: 'json',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
                tpl: 3,
                page: 'detail',
                type: 'top',
                topid: that.data.topid,
                _: 1496766468644
            },
            success: function (res) {
                that.setData({
                    topinfo: res.data.topinfo,
                    songlist: res.data.songlist,
                    updatetime: res.data.update_time
                })
                wx.hideLoading()
            }
        })
    }
})