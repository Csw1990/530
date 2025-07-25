(function(){
    // 1. 设置 <head> 内容
    document.head.innerHTML = `
    <meta charset=\"utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">
    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css\" integrity=\"sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk\" crossorigin=\"anonymous\">\n    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css\">\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"/Public/Static/css/base2.css\" />\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"/Public/Static/css/nologed.css\" />\n    <link rel=\"stylesheet\" href=\"/Public/Static/Icoinfont/iconfont.css\">\n    <script src=\"/Public/Static/Icoinfont/iconfont.js\"></script>\n    <title>提币地址管理</title>\n    <style>\n        ::-webkit-input-placeholder {color: #b5b5b5;font-size: 12px;}\n        ::-moz-placeholder {color: #b5b5b5;font-size: 12px;}\n        input:focus{background:#f5f5f5;outline: 1px solid #f5f5f5;}\n        a:hover,a:link,a:visited,a:active{color:#000000;text-decoration:none;}\n        .no_header{\n            position: fixed;\n            z-index: 9999;\n            padding:0px 10px;\n            top:0px;\n            line-height: 50px;\n            background:#121420;\n            box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);\n        }\n        .contentbox{width:100%;height:600px;margin-top:45px;padding:5px 15px;}\n        .contentbox_top{width:100%;height:50px;line-height:50px;text-align:left;}\n        .btitle{width:100%;height:35px;line-height:35px;text-align:center;background:#fff;margin-top:10px;border-radius:15px;}\n        .addbox{width:100%;height:120px;background:#1b1d2a;margin-top:20px;border-radius:15px;}\n        .addressbox{width:100%;height:40px;line-height:40px;background:#1b1d2a;padding:0px 15px;border-top-left-radius:10px;border-top-right-radius:10px;}\n        .address{width:100%;height:80px;margin-top:10px;padding:10px;word-wrap:break-word;word-break:normal; }\n        .btnbox{width:100%;height:70px;background:#fff;position:fixed;bottom:0px;}\n        .btnaddress{width:92%;height:40px;line-height:40px;background: #0052fe;color: #fff;margin:0px auto;text-align:center;margin-top:15px;border-radius:10px;}\n    </style>\n    `;

    // 2. 设置 <body> 内容
    document.body.innerHTML = `
    <div class=\"container-fluid \" style=\"padding:0px;width:100vw;\">\n\n        <div class=\"no_header\">\n            <div class=\"fl allhg txtl\" style=\"width: 10%;\">\n                <i class=\"bi bi-arrow-left fcc fw\" id=\"gobackBtn\" style=\"font-size: 24px;cursor:pointer;\"></i>\n            </div>\n\n            <div class=\"fl allhg\" id=\"centerbox\" style=\"width:80%;text-align:center;line-height:50px;\">\n                <span class=\"fcc fe6im fzmmm\">提币地址管理</span>\n            </div>\n            <a href=\"/index.php?s=/User/txcoin\">\n            <div class=\"fr allhg txtr\" style=\"line-height:50px;width:10%;\">\n                <span class=\"fe6im\">添加</span>\n            </div>\n            </a>\n        </div>\n        <div class=\"contentbox\" id=\"addressListBox\">\n        </div>\n    </div>\n    <script src=\"https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js\"></script>\n    <script type=\"text/javascript\" src=\"/Public/Static/js/layer/layer.js\" ></script>\n    `;

    // 3. 动态渲染地址列表（模拟数据，实际应通过AJAX获取）
    var adrlist = window.adrlist || [];
    var addressListBox = document.getElementById('addressListBox');
    if (!adrlist.length) {
        addressListBox.innerHTML = '<div style="width:100%;height:300px;line-height:300px;text-align:center;"><span class="fzmm fe6im">没有保存地址</span></div>';
    } else {
        addressListBox.innerHTML = adrlist.map(function(vo){
            return `<div class=\"addbox\">\n                <div class=\"addressbox\">\n                    <div style=\"width:80%;height:40px;line-height:40px;float:left;\">\n                        <span class=\"fzmmm fe6im\">${(vo.name||'').toUpperCase()}  (${vo.remark||''})</span>\n                    </div>\n                    <div onclick=\"deladdress(${vo.id})\" style=\"width:20%;height:40px;line-height:40px;float:right;text-align:right;\">\n                        <i class=\"bi bi-x-circle fzmmm fcy\"></i>\n                    </div>\n                </div>\n                <div class=\"address\">\n                    <span class=\"fzmmm fe6im\">${vo.addr||''}</span>\n                </div>\n            </div>`;
        }).join('');
    }

    // 4. 事件绑定
    window.deladdress = function(id){
        if(id <= 0){
            layer.msg('缺少重要参数');return false;
        }
        $.post('/index.php?s=/User/deladdress',
        {'aid':id},
        function(data){
            if(data.code == 1){
                layer.msg(data.info);
                setTimeout(function(){
                    window.location.reload();
                },2000);
            }else{
                layer.msg(data.info);return false;
            }
        });
    };
    document.getElementById('gobackBtn').onclick = function(){
        window.history.go(-1);
    };
})(); 
