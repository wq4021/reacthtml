import React from 'react';
import ReactDOM from 'react-dom';
/*var company  = require("./Sidebar.react.js");*/
var Content = React.createClass({
    componentDidMount:function(){
        $.ajax({
            type: "POST",
            url: "/sfisapi/",
            data: JSON.stringify({module: "users", method: "get_header_company", payload: ""}),
            datatype: "json",
            success: function (data) {
                if (data.success) {
                    var online = [];
                    $.each(data.data, function (k, v) {
                        online.push([v.company_name, v.company_master, v.id
                        ]);
                    });
                    $('#ftable').dataTable({
                        "columns": [
                           /* {"title":"<input type = 'checkbox' name= 'checklist' id = 'checkall' />"},*/
                            {"title":"公司名称","defaultContent":""},
                            {"title":"总经理名","defaultContent":""},
                            {"title":"id","defaultContent":""},
                            {"title": "delete", "defaultContent": "<button type='button' class='delete btn btn-circle btn-fit-height btn-danger btn-xs' href=''>删除</button>"}
                        ],
                        retrieve:true,
                        destroy:true,
                        scrollCollapse:true,
                        "pageLength":20,
                        "bInfo": true,
                        //  "bAutoWidth": false,
                        lengthMenu: [
                            [5,10, 15, 20, -1],
                            [5,10, 15, 20, "All"]
                        ],
                        "data": online,
                        //  "bLengthChange":
                        "bJQueryUI": false,
                        // "bLengthChange":false, //关闭每页显示多少条数据
                        "searching": false,
                        "ordering":true,
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
                    });
                    $('#ftable').show();
                }
                else {
                    $("#msg").html(decodeURI(data));
                }
            }
        })
    },

            render:function(){
                return (
                   <table id ='ftable' className='table table-striped table-hover table-bordered'></table>

                )
            }
});
function initContent(){
ReactDOM.render(
    <Content />,
    document.getElementById('portlet-body')
);
}
//module.exports = initContent;