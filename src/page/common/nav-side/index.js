require('./index.css')
var _mm = require('util/mm.js')

var navSide = {
  option: {
    name: '',
    navList: [
    {
      name: 'user-center',
      desc: '个人中心',
      href: './user-center.html'
    },
    {
      name: 'order-list',
      desc: '我的订单',
      href: './user-center.html'
    },
    {
      name: 'pass-update',
      desc: '修改密码',
      href: './user-center.html'
    },
    {
      name: 'about',
      desc: '关于Mall',
      href: './user-center.html'
    },
    ]
  }

  init: function (option){
    $.extend(this.option, option)
    this.renderNav()
  },

  renderNav: function (){
    vat iLength = this.option.navList.length
    for (var i = 0; i < iLength; i++){
      if(this.option.navList[i] === this.option.name) {
        this.option.navList.isActive = true
      }
      var navHtml = _mm.renderHtml()
    }
  }
}
