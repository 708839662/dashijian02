$(function () {

    getUserInfo()
    var layer = layui.layer;
    //点击实现退出功能
    // 1.绑定点击事件
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //清空token
            localStorage.removeItem('token')
            //跳转到登陆页
            location.href = '/login.html'
            // 关闭confirm询问框
            layer.close(index);
        });
    })
})

//封装一个函数获取用户的基本信息
function getUserInfo() {
    //发送ajax请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //调用函数渲染用户的头像
            console.log(res);
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         //强制跳转到登陆页面
        //         location.href = '/login.html'
        //     }
        // }

    })
}
// 封装一个渲染用户头像的函数
function renderAvatar(user) {
    // 1.获取用户的昵称或者名字
    var name = user.nickname || user.username;
    // 2.设置欢迎的文本
    $('#welcom').html('欢迎&nbsp;&nbsp;' + name)

    //3. 判断用户是否有头像
    if (user.user_pic !== null) {
        //3.1 渲染图片头像
        // attr设置统一的属性
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2 渲染文本头像
        $('.layui-nav-img').hide()
        // 设置('.text-avatar')的内容为名字的第一个字
        // name[0]获取第一个字，toUpperCase()字母大写
        var fist = name[0].toUpperCase()
        $('.text-avatar').html(fist).show()
    }

}