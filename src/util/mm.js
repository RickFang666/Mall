var Hogan = require('hogan')
var conf = {
  serverHost: ''
}
var _mm = {
  // 请求
  request: function (param){
    var _this = this
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function (res){
        //请求成功
        if(res.status === 0) {
          typeof param.success === "function" && param.success(res.data, res.msg)
        }
        // 没有登录状态，需要强制登录
        else if (res.status === 10) {
          _this.doLogin()
        }
        //请求数据错误
        else if (res.status === 1) {
          typeof param.error === "function" && param.error(res.msg)
        }
      },
      error: function (err){
        typeof param.error === 'function' && param.error(err.statusText)
      }
    })
  },
  //获取服务器地址
  getServerUrl: function (path){
    return conf.serverHost + path
  },
  //获取url参数
  getUrlParam: function (name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  },
  //渲染html模板
  renderHtml: function(htmlTemplate, data){
    var template = Hogan.compile(htmlTemplate),
        result = template.render(data);
    return result
  },
  //成功提示
  successTips: function (msg){
    alert(msg || '操作成功')
  },
  //错误提示
  errorTips: function (msg){
    alert(msg || '出现错误')
  },
  //字段的验证，支持是否为空、手机、邮箱
  validate: function (value, type){
    var value = $.trim(value)
  }
  //统一登录处理
  doLogin : function (){
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
  }
}

module.exports = _mm
