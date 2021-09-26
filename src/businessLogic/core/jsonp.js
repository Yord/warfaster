const jsonp = (url) => {
  return new Promise(function (resolve, reject) {
    const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());
    window[callbackName] = function (data) {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };

    const script = document.createElement("script");
    script.src =
      url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + callbackName;
    document.body.appendChild(script);
  });
};

export { jsonp };
