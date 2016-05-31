import React from 'react';
import ReactDOM from 'react-dom';

var SidebarList_style = {
    li: {
        width: '175px',
        display: "block",
        margin: "0 0 0 -40px",
        padding: 0,
        border: 0
    },
    a: {
        display: "block",
        margin: "0 0 0 0",
        padding: "17px 15px 15px 15px",
        textDecoration: "none",
        fontSize: "14px",
        color: "#fff",
        fontWeight: "400",
        textAlign: "center",
        borderBottom: "1px solid  #494949",
        width: '175px'
    },
    ul: {
        display: "block",
        listStyle: "none",
        margin: "0",
        padding: "0",
        marginBottom: "10px"
    }
};

function Company_manage(){
        var portlet = document.getElementById("portlet-body");
        var ftable = document.createElement("table");
        ftable.id = "ftable";
        ftable.className = "table table-striped table-hover table-bordered";
        portlet.appendChild(ftable);
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

                            {"title": "公司名称", "defaultContent": ""},
                            {"title": "总经理名", "defaultContent": ""},
                            {"title": "id", "defaultContent": ""},
                            {"title": "delete", "defaultContent": "<button type='button' class='delete btn btn-circle btn-fit-height btn-danger btn-xs' href=''>删除</button>"}
                        ],
                        retrieve: true,
                        destroy: true,
                        scrollCollapse: true,
                        "pageLength": 20,
                        "bInfo": true,
                        lengthMenu: [
                            [5, 10, 15, 20, -1],
                            [5, 10, 15, 20, "All"]
                        ],
                        "data": online,
                        "bJQueryUI": false,
                        "searching": false,
                        "ordering": true,
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
                        }
                    });
                    $('#ftable').show();
                }
                else {
                    $("#msg").html(decodeURI(data));
                }
            }
        })
    }

var Test = React.createClass({
    render:function(){
        return(
            <div>
            <h1>ddddddddddddddddddddd</h1>
            </div>
            )
    }
});

var SidebarList = React.createClass({
/*    componentWillMount: function () {
        console.log("mount");
    },*/
    componentDidMount:function(){Company_manage();},
    handleClick: function () {

        var i = this.props.button_id;
        var portlet = document.getElementById("portlet-body");
        $(portlet).html("");
        switch (i) {
            case "1":{
                Company_manage();
            }
            /*总公司管理*/

                break;
            case "2":
            /*总公司管理*/
            {
                var master_button = document.createElement('button');
                master_button.className = "btn green";
                master_button.id = "sample_editable_1_new";
                var master_i = document.createElement('i');
                master_i.className = "fa fa-plus";
                var div_btn_group = document.createElement('div');
                div_btn_group.className = "btn-group";
  /*              var div_col = document.createElement('div');
                div_col.className = "col-md-6";*/
                var div_row = document.createElement('div');
                div_row.className = "row";
                var div_table_toolbar = document.createElement('div');
                div_table_toolbar.className = "table-toolbar";
                var master_table = document.createElement("table");
                var master_table_thead = document.createElement("thead");

                master_table.className = "table table-striped table-hover table-bordered";
                master_table.id = "sample_editable_1";
                master_table.appendChild(master_table_thead);


             /*   master_button.appendChild(master_i);
                div_btn_group.appendChild(master_button);
             */  /* div_col.appendChild(div_btn_group);
                div_row.appendChild(div_col);*/
                div_table_toolbar.appendChild(div_row);

                portlet.appendChild(div_table_toolbar);
                portlet.appendChild(master_table);

                $.ajax({
                    type: "POST",
                    url: "/sfisapi/",
                    data: JSON.stringify({module: "users", method: "get_header_company", payload: ""}),
                    datatype: "json",
                    success: function (data) {
                        if (data.success) {
                            var online2 = [];
                            $.each(data.data, function (k, v) {
                                online2.push([v.company_name, v.company_master, v.id, "user", null, null
                                ]);
                            });
                            $('#sample_editable_1').dataTable({
                                "columns": [
                                    {"title": "公司名称", "defaultContent": "", sWidth: "20%", bSortable: false},
                                    {"title": "总经理名", "defaultContent": "", sWidth: "20%", bSortable: false},
                                    {"title": "id", "defaultContent": "", sWidth: "20%", bSortable: false},
                                    {"title": "状态", "defaultContent": "", sWidth: "20%", bSortable: false},
                                    {"title": "操作", "defaultContent": "<button type='button' class='delete btn btn-circle btn-fit-height btn-danger btn-xs' href=''>删除</button>", sWidth: "10%", bSortable: false},
                                    {"title": "删除", "defaultContent": "<button type='button' class='edit btn btn-circle btn-fit-height btn-success btn-xs' href=''>编辑</button>", sWidth: "10%", bSortable: false }
                                ],
                                scrollCollapse: true,
                                bSortable: true,
                                "pageLength": 20,
                                lengthMenu: [
                                    [5, 10, 15, 20, -1],
                                    [5, 10, 15, 20, "All"]
                                ],
                                "data": online2,
                                "searching": false,
                                "language": {
                                    'lengthMenu': '每 页 _MENU_     &nbsp条',
                                    "oPaginate": {
                                        "sFirst": "首页",
                                        "sPrevious": "前一页",
                                        "sNext": "后一页",
                                        "sLast": "尾页"
                                    },
                                    'info': '第 _PAGE_ 页 / 共 _PAGES_ 页'
                                }

                            });
                            $('#sample_editable_1').show();
                        }
                        else {
                            $("#msg").html(decodeURI(data));
                        }
                    }
                })
            }
                break;
            case "3":{
           /*  <Change_password />*/
                console.log("changepassword");
                ReactDOM.render(
                <Test />,
                document.getElementById("portlet-body")
            )
            }
                break;
            default :
                break;
        }
    },
    render: function () {
        return (
            <div className="sidebarList">
                <li style={SidebarList_style.li} className="nav-item">
                    <a  style={SidebarList_style.a} onClick={this.handleClick} className="nav-link nav-toggle">
                        <i className={this.props.icon_name}
                        style={{marginBottom: 10, color: "#B22222"}}></i>
                        <br/>
                        <span>{this.props.title}</span>
                    </a>
                </li>
            </div>
            );
    }
});

var SidebarMenu = React.createClass({

    render: function () {
        var buttons_model = this.props.sidebar_db[this.props.current_level];
        var btn_lists = buttons_model.map(function (btn) {
        /*    console.log(btn);*/
            return <SidebarList key={btn.text} title={btn.text} icon_name={btn.icon} button_id={btn.button_id} />;
        });
        return (
            <div>
                <ul >
                    {btn_lists}
                </ul>
            </div>
            )
    }
});

function myshow()
{
    /*console.log("test1");*/
    var sidebar_of_user_level = {
        "STOCKHOLDER": [
            {"icon": "icon-diamond", "text": "总公司管理", "button_id": "1"},
            {"icon": "icon-puzzle", "text": "总经理管理", "button_id": "2"},
            {"icon": "icon-settings", "text": "修改密码", "button_id": "3"},
            {"icon": "icon-bulb", "text": "查看报表", "button_id": "4"}
        ],
        "master": [],
        "manager": []
    };
    var level = Cookies.get('level');
    ReactDOM.render(
        <SidebarMenu current_level={level} sidebar_db={sidebar_of_user_level}/>,
        document.getElementById('reactSidebar')
    );
}

module.exports=myshow;
/*module.exports = Company_manage;*/

