
var handleImgBase64Data=require("../utils/ImgBase64Handler")

//确保dsBridge初始化
window._dsbridge && _dsbridge.init();
var adapter;
if (window.dsBridge) {
    adapter = function (request, responseCallBack) {
        dsBridge.call("onAjaxRequest", request, function (responseData) {
            responseData = JSON.parse(responseData);
            if(request.responseType==="stream") {
                handleImgBase64Data(responseData);
            }
            responseCallBack(responseData)
        })
    }
} else {
    console.error("dsBridge is not exist!")
}

//build环境定义全局变量
KEEP("cdn||cdn-min", () => {
    window.dsbAdapter = adapter
})
module.exports = adapter;

