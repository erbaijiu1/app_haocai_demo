function genShareInfo(web_view_url, page_url){
    var login_id = wx.getStorageSync('login_id');
    if(login_id && login_id.length>0){
        var add_symbol = "?";
        if(web_view_url.indexOf("?") !== -1){
            add_symbol = "&";
        }
        web_view_url += add_symbol + 'sharer=' + login_id;
    }
    var encodedUrl = encodeURIComponent(web_view_url);

    var path_url = page_url + '?redirect_url=' + encodedUrl;
    return path_url;
}

function setWebviewUrl(options, web_view_url){
    if(options && options.redirect_url && options.redirect_url.length > 3){
      web_view_url = decodeURIComponent(options.redirect_url);
    }

    var my_token = wx.getStorageSync('token');
    var login_id = wx.getStorageSync('login_id');
    if(options && options.token && options.login_id){
      wx.setStorageSync('token', options.token);
      wx.setStorageSync('login_id', options.login_id);
      my_token = options.token;
      login_id = options.login_id;
    }

    // 如果有token, 加上token 判断链接中是否已经存在参数
    if(my_token && login_id){
      var url_str = "token=" + my_token + "&login_id=" + login_id;
      if (web_view_url.includes('?')) {
          web_view_url += '&' + url_str;
      } else {
          web_view_url += '?' + url_str;
      }
    }

    return web_view_url;

}

module.exports = {
    genShareInfo: genShareInfo,
    setWebviewUrl:setWebviewUrl
};