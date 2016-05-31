document.write("<script src = 'language.js'></script>");
/*
document.write("<script src = '../assets/pages/scripts/table-datatables-editable.min.js'></script>");
document.write("<script src = '../assets/global/scripts/datatable.js'></script>");
document.write("<script src = '../assets/global/plugins/datatables/datatables.min.js'></script>");
document.write("<script src = '../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js'></script>");
*/
function send_request(module, method, data, b_func, s_func, f_func){
    $.ajax({
        type: "POST",
        url: "/sfisapi/",
        data: JSON.stringify({
            method: "set_password",
            module: "users",
            payload: data
        }),
        dataType: "json",
        beforeSend: function () {
            if(typeof b_func != "undefined" && b_func != null)
                b_func();
        },
        success: function (data) {
        //   console.log(data);
            if (data.success) {
                if (typeof s_func != "undefined" && s_func != null) {
                    s_func();
                }else{
                    alert("success");
                }
            }
            else {
                if (typeof f_func != "undefined" && f_func != null) {
                    f_func();
                }else{
                    alert("failed");
                }
            }
            }
        });
}

function change_passwd() {
    if ($("#NewPassword").val() == $("#NewPasswordAgain").val()){
        data = {
            "password": $("#NewPassword").val()
        }
        var s_func = function(){
            changespan.innerText= LANG.chang_pwd_succ;
            $("#divhide").show();
        }
        var f_func = function(){
            changespan.innerText=LANG.chang_pwd_fail;
            $("#divhide").show();
        }
        send_request("users", "set_password", data, null, s_func, f_func);
    }else{
        changespan.innerText=LANG.diffrent_pwd;
        $("#divhide").show();
    }
}

function back_to_login(){
    $.ajax({
        type:"POST",
        url:"/sfisapi/",
        data: JSON.stringify( {module: "users", method: "logout", payload: ""}),
        datatype:"json",
        success:function(){
            window.location.replace("login.html");
        }
    })
}

function Showindex() {
        $.ajax({
            type: "POST",
            url: "/sfisapi/",
            data: JSON.stringify({module: "users", method: "get_header_company", payload: ""}),
            datatype: "json",
            success: function (data) {
                if (data.success) {
                    var online = []
                    $.each(data.data, function (k, v) {
                        online.push([v.company_name, v.company_master, v.id
                        ]);
                    });
                    //  console.log(online);

                    $('#ftable').dataTable({
                        scrollY:"300px",
                        scrollCollapse:true,
                        "bProcessing" : true,
                        "pageLength":5,
                        "bInfo": true,
                        "bAutoWidth": false,
                        lengthMenu: [
                            [5,10, 15, 20, -1],
                            [5,10, 15, 20, "All"]
                        ],
                        "data": online,

                        //  "bLengthChange":
                        "bJQueryUI": false,
                        // "bLengthChange":false, //关闭每页显示多少条数据
                        "searching": false,
                        "ordering":false,
                        "bautowidth":false,
                        "language": {
                            "sSearch": "搜索",
                            'lengthMenu': '每 页 _MENU_     &nbsp条',
                            "oPaginate": {
                                "sFirst": "首页",
                                "sPrevious": "前一页",
                                "sNext": "后一页",
                                "sLast": "尾页"
                            },
                            'info': '第 _PAGE_ 页 / 共 _PAGES_ 页'


                            //   "aoColumnDefs": { "bVisible": false, "aTargets": [1]}//隐藏列
                        }
                    })
                    $('#ftable').show();
                }
                else {
                    $("#msg").html(decodeURI(data));
                }


            }
        })
}
//index1显示表格
function showindex2(){
    $.ajax({
    type: "POST",
    url: "/sfisapi/",
    data: JSON.stringify({module: "users", method: "get_header_company", payload: ""}),
    datatype: "json",
    success: function (data) {
        if (data.success) {
            var online2 = []
            $.each(data.data, function (k, v) {
                online2.push([v.company_name, v.company_master, v.id,"user",null,null
                ]);
            });
            //  console.log(online);
            $('#sample_editable_1').dataTable().fnDestroy();
            $('#sample_editable_1').dataTable({
                scrollY:"300px",
                scrollCollapse:true,
                "bProcessing" : true,
                "pageLength":5,
                lengthMenu: [
                    [5,10, 15, 20, -1],
                    [5,10, 15, 20, "All"]
                ],
                "data": online2,
                "aoColumnDefs" : [{
                    "targets": -1,
                    "data":null,
                    "orderable":false,
                    "defaultContent":'<button type="button" class="delete btn btn-circle btn-fit-height btn-danger btn-xs" href="">删除</button>'
                   // "defaultContent": '<button type="button" class="delete btn btn-circle btn-fit-height btn-danger btn-xs" href="">Delete</button>'
                },
                    {
                        "targets":-2,
                        "data":null,
                        "orderable":false,
                        "defaultContent":'<button type="button" class="edit btn btn-circle btn-fit-height btn-success btn-xs" href="">编辑</button>'
                    }
                ],
                //  "bLengthChange":
                "bJQueryUI": false,
                // "bLengthChange":false, //关闭每页显示多少条数据
                "searching": false,
                "language": {
                    'lengthMenu': '每 页 _MENU_     &nbsp条',
                    //"sSearch": "搜索",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "前一页",
                        "sNext": "后一页",
                        "sLast": "尾页"
                    },
                    'info': '第 _PAGE_ 页 / 共 _PAGES_ 页'

                    //   "aoColumnDefs": { "bVisible": false, "aTargets": [1]}//隐藏列
                }

            })
            $('#sample_editable_1').show();
        }
        else {
            $("#msg").html(decodeURI(data));
        }


    }
})

}

function loginindex() {
    //window.setTimeout("window.location='/Spider/login/1228/admin_2/index.html'",2000);
    if(navigator.onLine==false)
    {
        changespan.innerHTML=LANG.offline;
    //    $("divhide").show();
    }
    if (check()) {
        $.ajax({
            type: "POST",
            url: "/sfisapi/login/",
            data: JSON.stringify({method: "", module: "", payload: {username: $("#username").val(), password: $("#password").val()}}),
            dataType: "json",
            beforeSend: function () {
            },
            success: function (data) {
                if (data.success) {
                    changespan.innerHTML = LANG.welcome;
                    window.setTimeout("window.location='index.html'",2000);
                 //   window.location.replace("/Spider/login/1228/admin_2/index.html");

                } else {
                    changespan.innerHTML=data.message;
                 //   $("#divhide").show();
                }
            }
        });
    }
    return false;
}
function check() {
    if ($("#username").val() == "") {
        changespan.innerHTML=LANG.enter_username;
        $("#divhide").show();
       // $("username").fucus();
        return false;
    }
    if ($("#password").val() == "") {
        changespan.innerHTML=LANG.enter_password;
        $("#divhide").show();
      //  $("#password").focus();
        return false;
    }
    return true;

}
function check_login() {
    $.ajax({
        type: "POST",
        url: "/sfisapi/login/",
        data: JSON.stringify({module: "", method: "", payload: ""}),
        datatype: "json",
        success: function (data) {
            if(data.success==true){

            }
            if(data.success==false)
            {
               // <div class="alert alert-danger">还未登录，请先登录！</div>
                  alert("还未登录，请先登录！");
                window.location.replace("login.html");
            }

        }
    })
}