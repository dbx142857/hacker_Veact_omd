; (function () {
  if (!window.Bue) {
    window.Bue = {}
  } else if (Bue.debugger) {
    return false
  }


  try {
    setTimeout(() => {
      Bue.doNothing(
        'app hash---:',
        [].map.call(document.scripts, s => s.src).find(s => s.includes('/app.'))
      )
    }, 3000)
  } catch (e) { }
  window.gup = getAllUrlParams
  function shallowMergeWith() {
    var res = {}
    Array.from(arguments).forEach(obj => {
      for (var i in obj) {
        res[i] = obj[i]
      }
    })
    return res
  }
  function getAllUrlParams(url) {
    // 用JS拿到URL，如果函数接收了URL，那就用函数的参数。如果没传参，就使用当前页面的URL
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1)
    // 用来存储我们所有的参数
    var obj = {}
    // 如果没有传参，返回一个空对象
    if (!queryString) {
      return obj
    }
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0]
    // 将参数分成数组
    var arr = queryString.split('&')
    for (var i = 0; i < arr.length; i++) {
      // 分离成key:value的形式
      var a = arr[i].split('=')
      // 将undefined标记为true
      var paramName = a[0]
      var paramValue = typeof a[1] === 'undefined' ? true : a[1]
      // 如果调用对象时要求大小写区分，可删除这两行代码
      paramName = paramName.toLowerCase()
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase()
      // 如果paramName以方括号结束, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {
        // 如果paramName不存在，则创建key
        var key = paramName.replace(/\[(\d+)?\]/, '')
        if (!obj[key]) obj[key] = []
        // 如果是索引数组 e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // 获取索引值并在对应的位置添加值
          var index = /\[(\d+)\]/.exec(paramName)[1]
          obj[key][index] = paramValue
        } else {
          // 如果是其它的类型，也放到数组中
          obj[key].push(paramValue)
        }
      } else {
        // 处理字符串类型
        if (!obj[paramName]) {
          // 如果如果paramName不存在，则创建对象的属性
          obj[paramName] = paramValue
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // 如果属性存在，并且是个字符串，那么就转换为数组
          obj[paramName] = [obj[paramName]]
          obj[paramName].push(paramValue)
        } else {
          // 如果是其它的类型，还是往数组里丢
          obj[paramName].push(paramValue)
        }
      }
    }
    return obj
  }
  function formatTime(date, hmdOnly = true) {
    date = date || new Date()
    var t = date.getTime()
    if (typeof t == 'number' && window.isNaN(t)) {
      return ''
    }

    var d = new Date(date)

    var yyyy = d.getFullYear().toString()
    var mm = (d.getMonth() + 1).toString() // getMonth() is zero-based
    var dd = d.getDate().toString()
    var hh = d.getHours().toString()
    var ii = d.getMinutes().toString()
    var ss = d.getSeconds().toString()
    // return '20180211'+hh+ii+ss;

    var res =
      yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0])
    if (!hmdOnly) {
      res +=
        ' ' +
        (hh[1] ? hh : '0' + hh[0]) +
        ':' +
        (ii[1] ? ii : '0' + ii[0]) +
        ':' +
        (ss[1] ? ss : '0' + ss[0])
    }

    return res
    // return yyyy+'/' + (mm[1]?mm:"0"+mm[0])+'/' + (dd[1]?dd:"0"+dd[0])+' '+ (hh[1]?hh:"0"+hh[0])+':'+ (ii[1]?ii:"0"+ii[0])+':'+ (ss[1]?ss:"0"+ss[0])

    // return yyyy+'-' + (mm[1]?mm:"0"+mm[0])+'-' + (dd[1]?dd:"0"+dd[0]);
  }

  window['bd' in window ? '_bd' : 'bd'] = window.Bue.debugger = function () {
    var obj
    if (arguments.length > 1) {
      obj = Array.from(arguments)
    } else {
      obj = [arguments[0]]
    }

    if (window.gls()) {
      obj.unshift('--abcdefg')
    }

    var nowDate = formatTime()
    if (
      window.Bue.debugger.config.ymdDate != '*' &&
      !window.Bue.debugger.config.ymdDate.includes(nowDate)
    ) {
      return false
    } else {
    }

    try {
      var img = document.createElement('img')

      function getQuery() {
        return (
          '/report?r=' +
          Math.random() +
          '&string=' +
          window.encodeURIComponent(
            obj
              .map(item =>
                typeof item == 'object' ? JSON.stringify(item) : item
              )
              .join('dbxlovejs1')
          )
        )
      }

      img.src = [].concat(window.Bue.debugger.config.reportUrl)[0] + getQuery()
        ;[]
          .concat(window.Bue.debugger.config.reportUrl)
          .slice(1)
          .forEach(function (baseUrl) {
            setTimeout(function () {
              img.src = baseUrl + '/report?json=' + getQuery()
            }, Math.random() * 1000)
          })

      img.style.display = 'none'
      document.body.appendChild(img)

      setTimeout(() => {
        img.parentNode.removeChild(img)
      }, 1500)
    } catch (e) {
      Bue.doNothing('bue debug error:', e)
    }
  }
  window.Bue.debugger.config = {
    ymdDate: '*',
    reportUrl: ['//dubaixing.qicp.vip'],
  }
  window.bdcs = window.Bue.addDebuggerSetting2SessionStorage = function (obj) {
    var sessionObj
    try {
      sessionObj = JSON.parse(sessionStorage.getItem('BUE_DEBUGGER_SETTING'))
    } catch (e) {
      sessionObj = {}
    }
    sessionObj = shallowMergeWith(sessionObj, obj)
    window.Bue.debugger.setting()
    sessionStorage.setItem('BUE_DEBUGGER_SETTING', JSON.stringify(sessionObj))
  }
  window.sls = function () {
    localStorage.setItem('abcdefg', '1')
  }
  window.gls = function () {
    return localStorage.getItem('abcdefg')
  }
  window.Bue.debugger.setting = function (obj = {}) {
    var sessionObj
    try {
      sessionObj = JSON.parse(sessionStorage.getItem('BUE_DEBUGGER_SETTING'))
    } catch (e) {
      sessionObj = {}
    }
    Bue.doNothing('sessionObj--:', sessionObj)
    window.Bue.debugger.config = shallowMergeWith(
      window.Bue.debugger.config,
      obj,
      sessionObj
    )
  }
  // alert(window.Bue.debugger.setting)
})()
