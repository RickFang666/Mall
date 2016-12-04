// require('./index.css')
// require('../../module.js')

var _mm = require('util/mm.js')
// _mm.request({
//   url: '/product/list.do?keyword=1',
//   success: function (res){
//       console.log(res)
//   },
//   error: function (errmsg){
//       console.log(errmsg)
//   }
// })
var data = {
  data: 123
  var html = '<div>{{data}}</div>'
}
console.log(_mm.renderHtml(html, data))

