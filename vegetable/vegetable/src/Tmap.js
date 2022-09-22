export function TMap(key) {
    return new Promise(function (resolve, reject) {
        window.init = function () {
            resolve(window.qq);//注意 直接qq报错 qq is undefind
        }
        // 创建一个srcipt节点 避免在html中引入<srcipt></srcipt>  也可以在index.html vue的模板页面引入
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src="http://map.qq.com/api/js?v=2.exp&callback=init&key="+key;
        script.onerror = reject;
        document.head.appendChild(script);
    })
}