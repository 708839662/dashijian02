//注意：每次调用$.get() $.post() $.ajax()的时候，都会先调用ajaxPrefilter这个函数，这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 再发起真正的Ajax请求之前，统一凭借请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})