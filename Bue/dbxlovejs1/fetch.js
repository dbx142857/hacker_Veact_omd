let createHttpService = function (ajaxConfig) {
  ajaxConfig = {
    ...(typeof Bue != "undefined" ? Bue.userConfig.ajaxConfig : {}),
    ...(ajaxConfig || {}),
  };
  ajaxConfig.timeout = ajaxConfig.timeout || 10000;
  if (typeof ajaxConfig.baseUrl == "function") {
    ajaxConfig.baseUrl = ajaxConfig.baseUrl();
  }
  if (!ajaxConfig.reqInterceptor) {
    ajaxConfig.reqInterceptor = (req) => req;
  }
  if (!ajaxConfig.onTimeout) {
    ajaxConfig.onTimeout = (res) => {
      alert("请求" + res.url + "超时");
    };
  }
  if (!ajaxConfig.resInterceptor) {
    ajaxConfig.resInterceptor = (res) => res;
  }
  if (!ajaxConfig.handleRequestError) {
    ajaxConfig.handleRequestError = (e) => {
      console.error("fetch request error--:", e);
    };
  }

  return async function (url, body) {
    return new Promise((resolve, reject) => {
      if (typeof url == "object") {
        body = url;
        url = "";
      }
      if (!url.startsWith("http")) {
        url = (ajaxConfig.baseUrl || "") + url + "?";
      }
      body = {
        method: "get",
        headers: {},
        ...body,
      };
      if (body.method == "get") {
        for (let i in body.body) {
          url += i + "=" + body.body[i] + "&";
        }
        if (url.endsWith("&")) {
          url = url.substring(0, url.length - 1);
        }

        delete body.body;
      } else if (typeof body.body == "object") {
        if (
          body.headers["Content-Type"] == "application/x-www-form-urlencoded" ||
          body.headers["Content-Type"] == "multipart/form-data"
        ) {
          body.body = (function (obj) {
            let formdata = new FormData();
            for (let i in obj) {
              formdata.append(i, obj[i]);
            }
            formdata.append("i", "1");
            return formdata;
          })(body.body);
        } else {
          if (!body.headers["Content-Type"]) {
            body.headers["Content-Type"] = "application/json; charset=utf-8";
          }
          body.body = JSON.stringify(body.body);
        }
      }
      if (url.endsWith('?')) {
        url = url.split('?').reverse().slice(1).reverse().join('?')
      }
      let reqMap = {
        url: url,
        settings: body,
      };
      reqMap = ajaxConfig.reqInterceptor(reqMap);

      let controller = new AbortController();
      let signal = controller.signal;

      let generateTimeoutRes = () => {
        return new Response("timeout", {
          status: 504,
          statusText: "timeout",
        });
      };

      let timeoutPromise = (timeout) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(generateTimeoutRes());
            // reject(new Error(''请求超时))
            controller.abort();
          }, timeout);
        });
      };

      let requestPromise = (url, config) => {
        return fetch(url, {
          signal: signal,
          ...config,
        });
      };

      Promise.race([
        timeoutPromise(ajaxConfig.timeout),
        requestPromise(reqMap.url || ajaxConfig.baseUrl || "", reqMap.settings),
      ])
        // ;
        // window
        //   .fetch(reqMap.url || ajaxConfig.baseUrl || "", reqMap.settings)
        .then(async (res) => {
          if (res.statusText.toLowerCase().includes("timeout")) {
            ajaxConfig.onTimeout(res);
            reject(generateTimeoutRes());
            return false;
          }
          Bue.doNothing("ressss--------:", res);
          let text = await res.text(),
            json;
          try {
            json = {
              json: true,
              jsonData: JSON.parse(text),
              response: res,
            };
          } catch (e) {
            json = {
              json: false,
              text: text,
              response: res,
            };
          }
          let resolveRes = null;
          Bue.doNothing("resolveResssssssssssss--:", json);
          try {
            resolveRes = ajaxConfig.resInterceptor(json);
          } catch (e) {
            console.error("invoke ajax interceptor error--:", e);
            reject(json);
          }
          if (resolveRes) {
            resolve(resolveRes);
          }
        })
        .catch((e) => {
          // console.warn("fetch catch e--:", e);
          if (e.statusText && e.statusText.toLowerCase().includes("timeout")) {
            let respon = {
              ...generateTimeoutRes(),
              url: reqMap.url || ajaxConfig.baseUrl || "",
            };
            ajaxConfig.onTimeout(respon);
            reject(respon);
            return false;
          }
          ajaxConfig.handleRequestError(e);
          reject(e);
        });
    });
  };
};

if (typeof Bue != "undefined") {
  Bue.createHttpService = createHttpService;
  Bue.registerBueModule("fetch", () => Bue.createHttpService());
}
