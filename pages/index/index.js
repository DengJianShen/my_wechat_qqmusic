//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    selected: 'recommend',
    subPageData: null,
    searchState: false,
    resultState: false,
    searchRecord: [],
    searchRusult: []
  },
  setView: function (e) {
    var that = this
    if (that.data.selected == e.currentTarget.dataset.nav) {
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    switch (e.currentTarget.dataset.nav) {
      case 'recommend':
        that.getRecommend()
        break;
      case 'rank':
        that.getRank()
        break;
      case 'search':
        that.getHotSearch()
        break;
    }
    that.setData({
      selected: e.currentTarget.dataset.nav
    })
  },
  getRecommend: function () {
    var that = this
    wx.request({
      url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
      data: {
        g_tk: 1677718224,
        uin: 1141089024,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: 1496638891762
      },
      success: function (res) {
        var _data = res.data.data
        for(var i = 0;i<_data.songList.length;i++){
          _data.songList[i].accessnum = (_data.songList[i].accessnum / 10000).toFixed(1) + '万'
        }
        that.setData({
          subPageData: _data
        })
        wx.hideLoading()
      }
    })
  },
  getRank: function () {
    var that = this
    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
      data: {
        g_tk: 1677718224,
        uin: 1141089024,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: 1496648659518
      },
      success: function (res) {
        var _data = res.data.data
        for(var i=0;i<_data.topList.length;i++){
          _data.topList[i].listenCount = (_data.topList[i].listenCount / 10000).toFixed(1) + '万'
        }
        that.setData({
          subPageData: _data
        })
        wx.hideLoading()
      }
    })
  },
  getHotSearch: function () {
    var that = this
    wx.request({
      url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
      data: {
        g_tk: 1677718224,
        uin: 1141089024,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: 1496649545445
      },
      success: function (res) {
        that.setData({
          subPageData: res.data.data
        })
        wx.hideLoading()
      }
    })
  },
  getSearchRecord: function () {
    var that = this
    var searchRecord = wx.getStorageSync('getSearchRecord')
    if (searchRecord == '') {
      wx.setStorageSync('searchRecord', [])
    } else {
      that.setData({
        searchRecord: searchRecord
      })
    }
  },
  delSearchRecord: function (e) {
    var that = this
    var index = e.currentTarget.dataset.id
    var _data = that.data.searchRecord;
    _data.splice(index, 1)
    that.setData({
      searchRecord: _data
    })
    wx.setStorageSync('searchRecord', that.searchRecord)
  },
  delSearchRecordAll: function () {
    this.setData({
      searchRecord: []
    })
    wx.removeStorageSync('searchRecord')
  },
  cancelSearch() {
    this.setData({
      searchState: false,
      resultState: false
    })
  },
  focusSearch: function () {
    this.setData({
      searchState: true
    })
  },
  blurSearch: function () {
    this.setData({
      searchState: false
    })
  },
  sendSearch: function (e) {
    if (e.detail.value == '') {
      return false
    }
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
      data: {
        g_tk: 1367828817,
        uin: 1141089024,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        w: e.detail.value,
        zhidaqu: 1,
        catZhida: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: 20,
        n: 20,
        p: 1,
        remoteplace: 'txt.mqq.all',
        _: 1496672802801
      },
      success: function (res) {
        var _data = that.data.searchRecord
        _data.push(e.detail.value)
        that.setData({
          searchRecord: _data,
          searchRusult: res.data.data.song.list,
          resultState: true
        })
        wx.hideLoading()
        wx.setStorageSync('searchRecord', _data)
      }
    })
  },
  searchTag: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    that.focusSearch()
    wx.request({
      url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
      data: {
        g_tk: 1367828817,
        uin: 1141089024,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        w: e.currentTarget.dataset.tag,
        zhidaqu: 1,
        catZhida: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: 20,
        n: 20,
        p: 1,
        remoteplace: 'txt.mqq.all',
        _: 1496672802801
      },
      success: function (res) {
        var _data = that.data.searchRecord
        _data.push(e.currentTarget.dataset.tag)
        that.setData({
          searchRecord: _data,
          searchRusult: res.data.data.song.list,
          resultState: true
        })
        wx.hideLoading()
        wx.setStorageSync('searchRecord', _data)
      }
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.getRecommend()
    this.getSearchRecord()
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})