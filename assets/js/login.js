$(function () {
    //1.点击注册，显示注册页面，隐藏登陆页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //2.点击登陆，显示登陆页面，隐藏注册页面
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //3.自定义验证规则
    // 从layui里获取from这个对象
    // form和layer不能直接使用，通过layui.获取
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('#form_reg [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }

        }
    });
    //4.监听表单注册提交事件
    // $('#form_reg').on('submit', function (e) {
    //     //阻止表单默认提交事件
    //     e.preventDefault()
    //     //发起ajax请求
    //     $.ajax({
    //         method: 'POST',
    //         url: "http://ajax.frontend.itheima.net/api/reguser",
    //         data: {
    //             username: $('#form_reg [name=username]').val(),
    //             password: $('#form_reg [name=password]').val()
    //         },
    //         success: function (res) {
    //             // 返回判断状态
    //             if (res.status !== 0) {
    //                 return console.log(res.message);
    //             }
    //             console.log(res.message);
    //         }
    //     })

    // })
    $('#form_reg').on('submit', function (e) {
        // 4.1阻止表单默认提交事件
        e.preventDefault()
        //4.2发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
            }
        })
        // 模拟人的点击事件，注册成功后自动跳转到登录页面
        $('#link_login').click()
    })
    // 表单登录监听事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 将登录成功后的token值保持到localStorage中
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
            },
        })
    })

})

