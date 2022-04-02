Bue.registerBueModule("util", () => {
  let u = {
    isCustomComp(name) {
      let browserBuiltInTags = (
        "html,body,base,head,link,meta,style,title," +
        "address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section," +
        "div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul," +
        "a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby," +
        "s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video," +
        "embed,object,param,source,canvas,script,noscript,del,ins," +
        "caption,col,colgroup,table,thead,tbody,td,th,tr," +
        "button,datalist,fieldset,form,input,label,legend,meter,optgroup,option," +
        "output,progress,select,textarea," +
        "details,dialog,menu,menuitem,summary," +
        "content,element,shadow,template,blockquote,iframe,tfoot"
      )
        .split(",")
        .concat(
          `svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face," +
        "foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern," +
        "polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view`.split(
            ","
          )
        );
      let vueBuiltInTags = "router-link router-view slot component transition keep-alive transition-group".split(
        " "
      );
      // Bue.doNothing(
      //   11111111,
      //   Object.keys(
      //     Object.getPrototypeOf(
      //       new Vue().$options.components
      //     )
      //   )
      // );
      return (
        !browserBuiltInTags.includes(name) &&
        !vueBuiltInTags.includes(name) &&
        !Boolean(
          (name =>
            new RegExp(
              "^[a-zA-Z][\\-\\.0-9_" +
              /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
                .source +
              "]*$"
            ).test(name) &&
            !name.includes("--") &&
            Object.keys(
              Object.getPrototypeOf(new Vue().$options.components)
            ).find(key =>
              [key, name]
                .map(key => key.replace(/-/gi, "").toLowerCase())
                .every((k, i, a) => a[0] == k)
            ))(name)
        )
        // Object.keys(Object.getPrototypeOf(new Vue().$options.components))
        //   .map(key =>
        //     key
        //       .split("-")
        //       .join("")
        //       .toLowerCase()
        //   )
        //   .includes(
        //     name
        //       .split("-")
        //       .join("")
        //       .toLowerCase()
        //   )
      );
    },

    dealyExec: (fn = () => { }, dealy = 0, returnPromise = true) => {
      if (returnPromise) {
        return new Promise((resolve) => {
          setTimeout(async () => {
            let res = await fn();
            resolve(res)
          }, dealy)
        })
      }
      return () => {
        setTimeout(fn, dealy)
      }

    },

    poll(fn, callback, errback, timeout, interval) {
      var endTime = Number(new Date()) + (timeout || 20000);
      interval = interval || 100;
      (function p() {
        // 如果条件满足，则执行！
        if (fn()) {
          callback();
        }

        // 如果条件不满足，但并未超时，再来一次
        else if (Number(new Date()) < endTime) {
          setTimeout(p, interval);
        }

        // 不匹配且时间消耗过长，则拒绝！
        else {
          errback(new Error("timed out for " + fn + ": " + arguments));
        }
      })();
    },
    copyObj(obj) {
      var cloneObj;
      //当输入数据为简单数据类型时直接复制
      if (obj && typeof obj !== "object") {
        cloneObj = obj;
      }
      //当输入数据为对象或数组时
      else if (obj && typeof obj === "object") {
        //检测输入数据是数组还是对象
        cloneObj = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === "object") {
              //若当前元素类型为对象时，递归调用
              cloneObj[key] = u.copyObj(obj[key]);
            }
            //若当前元素类型为基本数据类型
            else {
              cloneObj[key] = obj[key];
            }
          }
        }
      }
      return cloneObj;
    },

    appendCssStr(str, baseUrl = null) {
      // console.log('baseUrl---:', baseUrl)
      if (baseUrl) {
        str = str.replaceAll('url(./', 'url(' + baseUrl)
      }
      var style = Bue.rootWindow.document.createElement("style");
      style.type = "text/css";
      style.innerHTML = str;
      document
        .getElementsByTagName("HEAD")
        .item(0)
        .appendChild(style);
    },

    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },

    setDataByModel: function ($scope, modelStr, val) {
      var arr = modelStr.split("."),
        len = arr.length;
      if (len === 1) {
        $scope[arr[0]] = val;
      } else if (len > 1) {
        var ns = arr,
          obj = $scope;
        for (var i = 0; i < len - 1; i++) {
          var key = ns[i];
          obj = obj[key];
        }
        Bue.rootWindow.Bue.doNothing(
          "this is obj and key:",
          obj,
          ns[len - 1],
          val
        );

        obj[ns[len - 1]] = val;
      }
    },
    getDataByModel($scope, modelStr, otherWiseVal) {
      otherWiseVal = otherWiseVal || null;

      if (!$scope) {
        return otherWiseVal;
      }

      var arr = modelStr.split("."),
        len = arr.length,
        result = $scope;
      // Bue.rootWindow.Bue.doNothing('len:',len)
      if (len === 1) {
        // if($scope.hasOwnProperty(arr[0])) {
        //     return $scope[arr[0]]
        // }
        // else if($scope.result && $scope.result[arr[0]]) {
        //     return $scope.result[arr[0]]
        // }
        return $scope.hasOwnProperty(arr[0]) ? $scope[arr[0]] : otherWiseVal;
      } else if (len > 1) {
        var isError = false;
        for (var i in arr) {
          if (typeof result[arr[i]] === "undefined") {
            isError = true;
            break;
          } else {
            result = result[arr[i]];
          }
        }
        if (isError) {
          return otherWiseVal;
        } else {
          return result;
        }
      } else if (len === 0) {
        return otherWiseVal;
      }
    }
  };
  return u;
});
