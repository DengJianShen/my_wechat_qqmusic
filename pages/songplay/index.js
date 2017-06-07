Page({
    data: {
        songmsg: null,
        playState: false,
        currTime: '00.00',
        duration: '00.00',
        playLen: '0%',
        songList: null
    },
    updateProgress: function (e) {
        var that = this
        var musicTime = e.detail.duration
        var currTime = e.detail.currentTime
        var musicTimeStr = ((musicTime / 60).toFixed(0) < 10 ? 0 : '') + (musicTime / 60).toFixed(0) + ':' + ((musicTime % 60).toFixed(0).length < 2 ? '0' + (musicTime % 60).toFixed(0) : (musicTime % 60).toFixed(0));
        var currTimeStr = ((currTime / 60).toFixed(0) < 10 ? 0 : '') + (currTime / 60).toFixed(0) + ':' + ((currTime % 60).toFixed(0).length < 2 ? '0' + (currTime % 60).toFixed(0) : (currTime % 60).toFixed(0));
        var pro = (currTime / musicTime).toFixed(1) + '%';
        that.setData({
            currTime: currTimeStr,
            duration: musicTimeStr,
            playLen: (currTime / musicTime) * 100 + '%',
        })
    },
    onLoad: function (options) {
        var that = this
        that.audioCtx = wx.createAudioContext('music')
        that.setData({
            songmsg: options
        })
        that.audioPlay()
    },
    audioPlay: function () {
        this.setData({
            playState: true
        })
        this.audioCtx.play()
    },
    audioPause: function () {
        this.setData({
            playState: false
        })
        this.audioCtx.pause()
    },
    audioControl: function () {
        if (this.data.playState) {
            this.audioPause()
        } else {
            this.audioPlay()
        }
    },
    signintip: function () {
        wx.showModal({
            title: 'QQ音乐',
            content: '你需要先登录',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})