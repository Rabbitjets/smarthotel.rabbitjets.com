	function logout() {
	    Cookies.remove('authToken');
	    window.location.replace("/admin/login");
	}

	function checkToken() {
	    // Check Token
	    var token = Cookies.get('authToken');
	    $.ajax({
	        url: "/api/v1/tokens/" + token,
	        type: 'GET',
	        async: false,
	        success: function(response) {
	            var taskPath = window.location.pathname;
	            var menuId = "";
	            $('#loginUserInfo').text(response.data.name).trigger('change');
	            //console.log(response);

	            $.each(response.data.tasks, function(id, task) {
	                if (taskPath == task.uri) {
	                    menuId = task.menu_id;
	                }
	            });



	            $('#navMenu').empty();


	            var navMenu = '<li class="nav-user">' +
	                '<div class="image">' +
	                '<img src="/assets/img/user_profile.jpg" alt="" />' +
	                '</div>' +
	                '<div class="info">' +
	                '<div class="name dropdown">' +
	                '<a href="javascript:;" data-toggle="dropdown">' + response.data.name + '<b class="caret"></b></a>' +
	                '<ul class="dropdown-menu">' +
	                '<li><a href="javascript:logout();">登出系統</a></li>' +
	                '</ul>' +
	                '</div>' +
	                '<div class="position">' + response.data.roleName + '</div>' +
	                '</div>' +
	                '</li>' +
	                '<li class="nav-header">功能選單</li>';

	            // Put Menu
	            $.each(response.data.menus, function(id, menu) {
	                if (menu._id == menuId) {
	                    navMenu += '<li class="active has-sub">';
	                } else {
	                    navMenu += '<li class="has-sub">';
	                }

	                navMenu += '<a href="javascript:;">' +
	                    '<b class="caret pull-right"></b>' +
	                    '<i id="' + menu._id + '" class="fa ' + menu.icon + '"></i>' +
	                    '<span>' + menu.name + '</span>' +
	                    '</a>' +
	                    '<ul class="sub-menu">';

	                $.each(response.data.tasks, function(id, task) {
	                    if (menu._id == task.menu_id) {
	                        if (taskPath == task.uri) {
	                            navMenu += '<li class="active"><a href="' + task.uri + '">' + task.name + '</a></li>';
	                        } else {
	                            navMenu += '<li><a href="' + task.uri + '">' + task.name + '</a></li>';
	                        }
	                    }
	                });

	                navMenu += '</ul>' +
	                    '</li>';
	            });


	            navMenu += '<li class="divider has-minify-btn">' +
	                '<a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-left"></i></a>' +
	                '</li>';

	            $('#navMenu').html(navMenu);



	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	            window.location.replace("/admin/login");
	            // 			alert(xhr.status);
	            // 			alert(xhr.statusText);
	            // 			alert(xhr.responseText);
	        },
	        cache: false,
	        contentType: false,
	        processData: false
	    });
	}





	// Util


	function download(fileURL, fileName) {
	    //alert("yes i m working");
	    // for non-IE
	    if (!window.ActiveXObject) {
	        var save = document.createElement('a');
	        save.href = fileURL;
	        save.target = '_blank';
	        save.download = fileName || 'unknown';

	        var evt = new MouseEvent('click', {
	            'view': window,
	            'bubbles': true,
	            'cancelable': false
	        });
	        save.dispatchEvent(evt);

	        (window.URL || window.webkitURL).revokeObjectURL(save.href);
	    }

	    // for IE < 11
	    else if (!!window.ActiveXObject && document.execCommand) {
	        var _window = window.open(fileURL, '_blank');
	        _window.document.close();
	        _window.document.execCommand('SaveAs', true, fileName || fileURL)
	        _window.close();
	    }
	}



	// User
	function addRole() {
	    $.ajax({
	        url: "/api/v1/roles?start=1&length=-1",
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            $('#userRole').empty();
	            $.each(response.data, function(i, item) {
	                $('#userRole').append($('<option>', {
	                    value: item.id,
	                    text: item.name
	                }));
	            });

	        },
	        cache: false
	    });
	}


	function listUsers() {
	    var table = $('#grid-basic').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "language": {
	            "lengthMenu": "顯示 _MENU_ 筆",
	            "zeroRecords": "無資料",
	            "info": "第 _START_ ~ _END_ 筆共 _TOTAL_ 筆",
	            "search": "搜尋:",
	            "processing": "處理中...",
	            "paginate": {
	                "first": "First",
	                "last": "Last",
	                "next": "下一頁",
	                "previous": "上一頁"
	            }
	        },
	        "ajax": {
	            "url": "/api/v1/users",
	            "type": "GET",
	            "beforeSend": function(request) {
	                request.setRequestHeader("Authorization", Cookies.get('authToken'));
	            }
	        },
	        "columns": [{
	            "data": "roleName"
	        }, {
	            "data": "account"
	        }, {
	            "data": "name"
	        }],
	        "columnDefs": [{
	            "targets": 3,
	            "render": function(data, type, row) {
	                return "<div class=\"btn btn-default btn-xs\" onclick=\"editUser('" + row.id + "')\">編輯</div>"
	            },
	        }],
	        "bSort": false

	    });

	    return table;
	}



	function editUser(id) {
	    $('#editForm')[0].reset();
	    $.ajax({
	        url: "/api/v1/users/" + id,
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            $('#editId').val(id);

	            $('#editUserAccount').text(response.data.account).trigger('change');
	            $('#editUserName').val(response.data.name);
	            $('#editUserEmail').val(response.data.email);

	            if (response.data.status == '1') {
	                $("#editUserStatusActive").prop("checked", true);
	            } else {
	                $("#editUserStatusInactive").prop("checked", true);
	            }
	            $.ajax({
	                url: "/api/v1/roles?start=1&length=-1",
	                type: 'GET',
	                async: false,
	                headers: {
	                    'Authorization': Cookies.get('authToken')
	                },
	                success: function(categoryresponse) {
	                    $('#editUserRole').empty();
	                    $.each(categoryresponse.data, function(i, item) {
	                        $('#editUserRole').append($('<option>', {
	                            value: item.id,
	                            text: item.name
	                        }));
	                    });
	                    $('#editUserRole').val(response.data.role_id);

	                },
	                cache: false
	            });


	            $("#edit").show();
	            $("#list").hide();
	        },
	        cache: false
	    });
	}



	//Menu
	function listMenus() {
	    var table = $('#grid-basic').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "language": {
	            "lengthMenu": "顯示 _MENU_ 筆",
	            "zeroRecords": "無資料",
	            "info": "第 _START_ ~ _END_ 筆共 _TOTAL_ 筆",
	            "search": "搜尋:",
	            "processing": "處理中...",
	            "paginate": {
	                "first": "First",
	                "last": "Last",
	                "next": "上一頁",
	                "previous": "下一頁"
	            }
	        },
	        "ajax": {
	            "url": "/api/v1/menus",
	            "type": "GET",
	            "beforeSend": function(request) {
	                request.setRequestHeader("Authorization", Cookies.get('authToken'));
	            }
	        },
	        "columns": [{
	            "data": "id"
	        }, {
	            "data": "name"
	        }, {
	            "data": "seq"
	        }, {
	            "data": "info"
	        }, ],
	        "columnDefs": [{
	            "targets": 4,
	            "render": function(data, type, row) {
	                return "<div class=\"btn btn-default btn-xs\" onclick=\"editMenu('" + row.id + "')\">編輯</div>&nbsp;" +
	                    "<div class=\"btn btn-default btn-xs\" onclick=\"deleteMenu('" + row.id + "')\">刪除</div>"
	            },
	        }],
	        "bSort": false

	    });

	    return table;
	}

	function editMenu(id) {
	    $('#editForm')[0].reset();
	    $.ajax({
	        url: "/api/v1/menus/" + id,
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            $('#editId').val(id);
	            $('#editMenuName').val(response.data.name);
	            $('#editMenuSeq').val(response.data.seq);
	            $('#editMenuInfo').val(response.data.info);
	            $('#editMenuIcon').val(response.data.icon);
	            //$('#editMenuUri').val(response.data.uri);

	            $("#edit").show();
	            $("#list").hide();
	        },
	        cache: false
	    });
	}

	function deleteMenu(id) {
	    $.ajax({
	        url: "/api/v1/menus/" + id,
	        type: 'GET',
	        async: false,
	        success: function(response) {
	            if (response.data.task == "") {
	                if (confirm("是否確定要刪除：" + id + "該筆資料?")) {
	                    $.ajax({
	                        url: "/api/v1/menus/" + id,
	                        type: 'DELETE',
	                        async: false,
	                        success: function(response) {
	                            //$("#grid-basic").bootgrid("reload");
	                            alert("資料 " + id + " 已刪除！");
	                            menuTable.ajax.reload();
	                        },
	                        error: function(xhr, ajaxOptions, thrownError) {
	                            alert('無法刪除資料');
	                        },
	                        cache: false
	                    });
	                } else {
	                    alert("取消刪除資料 " + id + "！");
	                }
	            } else {
	                alert("該選單有尚未移出之功能群組!!");
	            }
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	            alert('無法刪除資料');
	        },
	        cache: false
	    });
	}


	// Tasks
	function listTasks() {
	    var table = $('#grid-basic').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "language": {
	            "lengthMenu": "顯示 _MENU_ 筆",
	            "zeroRecords": "無資料",
	            "info": "第 _START_ ~ _END_ 筆共 _TOTAL_ 筆",
	            "search": "搜尋:",
	            "processing": "處理中...",
	            "paginate": {
	                "first": "First",
	                "last": "Last",
	                "next": "上一頁",
	                "previous": "下一頁"
	            }
	        },
	        "ajax": {
	            "url": "/api/v1/tasks",
	            "type": "GET",
	            "beforeSend": function(request) {
	                request.setRequestHeader("Authorization", Cookies.get('authToken'));
	            }
	        },
	        "columns": [{
	            "data": "id"
	        }, {
	            "data": "menuName"
	        }, {
	            "data": "name"
	        }, {
	            "data": "uri"
	        }, ],
	        "columnDefs": [{
	            "targets": 4,
	            "render": function(data, type, row) {
	                return "<div class=\"btn btn-default btn-xs\" onclick=\"editTask('" + row.id + "')\">編輯</div>&nbsp;" +
	                    "<div class=\"btn btn-default btn-xs\" onclick=\"deleteTask('" + row.id + "')\">刪除</div>"
	            },
	        }],
	        "bSort": false

	    });

	    return table;
	}

	function addTask() {
	    $.ajax({
	        url: "/api/v1/menus?start=1&length=-1",
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            $('#menuId').empty();
	            $.each(response.data, function(i, item) {
	                $('#menuId').append($('<option>', {
	                    value: item.id,
	                    text: item.name
	                }));
	            });

	        },
	        cache: false
	    });
	}

	function editTask(id) {
	    $('#editForm')[0].reset();
	    $.ajax({
	        url: "/api/v1/tasks/" + id,
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            $('#editId').val(id);
	            $('#editMenuId').val(response.data.menuId);
	            $('#editTaskName').val(response.data.name);
	            $('#editTaskUri').val(response.data.uri);
	            $.ajax({
	                url: "/api/v1/menus?start=1&length=-1",
	                type: 'GET',
	                async: false,
	                headers: {
	                    'Authorization': Cookies.get('authToken')
	                },
	                success: function(categoryresponse) {
	                    $('#editMenuId').empty();
	                    $.each(categoryresponse.data, function(i, item) {
	                        $('#editMenuId').append($('<option>', {
	                            value: item.id,
	                            text: item.name
	                        }));
	                    });
	                    $('#editMenuId').val(response.data.menuId);
	                },
	                cache: false
	            });
	            $("#edit").show();
	            $("#list").hide();
	        },
	        cache: false
	    });
	}

	function deleteTask(id) {
	    if (confirm("是否確定要刪除：" + id + "該筆資料?")) {
	        $.ajax({
	            url: "/api/v1/tasks/" + id,
	            type: 'DELETE',
	            async: false,
	            success: function(response) {
	                //$("#grid-basic").bootgrid("reload");
	                alert("資料 " + id + " 已刪除！");
	                taskTable.ajax.reload();
	            },
	            error: function(xhr, ajaxOptions, thrownError) {
	                alert('無法刪除資料');
	            },
	            cache: false
	        });
	    } else {
	        alert("取消刪除資料 " + id + "！");
	    }
	}

	//Role
	function addRoleList() {
	    $.ajax({
	        url: "/api/v1/menus?current=1&rowCount=-1",
	        type: 'GET',
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        async: false,
	        success: function(response) {
	            //console.log(response);
	            $('#roleTasks').empty();
	            $.each(response.data, function(i, item) {
	                //console.log(response.rows);
	                //console.log(item.task);
	                $('#roleTasks').append('<label class="checkbox inline"><input type="checkbox" name="roleMenusCheckbox[' + i + ']" value="' + item.id + '">' +
	                    '&nbsp;' + item.name);
	                $.each(item.task, function(j, task) {
	                    $('#roleTasks').append(
	                        '&nbsp;&nbsp;&nbsp;<input type="checkbox" name="roleTasksCheckbox[' + 10 * i + j + ']" value="' + task.id + '">' +
	                        '&nbsp;&nbsp;&nbsp;' + task.name + '</label>');
	                });
	                //console.log(item.task[i].task_name);
	            });
	        },
	        cache: false
	    });
	}


	function listRoles() {
	    var table = $('#grid-basic').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "language": {
	            "lengthMenu": "顯示 _MENU_ 筆",
	            "zeroRecords": "無資料",
	            "info": "第 _START_ ~ _END_ 筆共 _TOTAL_ 筆",
	            "search": "搜尋:",
	            "processing": "處理中...",
	            "paginate": {
	                "first": "First",
	                "last": "Last",
	                "next": "下一頁",
	                "previous": "上一頁"
	            }
	        },
	        "ajax": {
	            "url": "/api/v1/roles",
	            "type": "GET",
	            "beforeSend": function(request) {
	                request.setRequestHeader("Authorization", Cookies.get('authToken'));
	            }
	        },
	        "columns": [{
	            "data": "name"
	        }, {
	            "data": "description"
	        }, ],
	        "columnDefs": [{
	            "targets": 2,
	            "render": function(data, type, row) {
	                return "<div class=\"btn btn-default btn-xs\" onclick=\"editRole('" + row.id + "')\">編輯</div>"
	            },
	        }],
	        "bSort": false

	    });

	    return table;
	}

	function editRole(id) {
	    $('#editForm')[0].reset();
	    $.ajax({
	        url: "/api/v1/roles/" + id,
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            $('#editId').val(id);

	            $('#editRoleName').val(response.data.name);
	            $('#editRoleDescription').val(response.data.description);

	            var menus = response.data.menus;
	            var tasks = response.data.tasks;

	            $.ajax({
	                url: "/api/v1/menus?length=-1",
	                type: 'GET',
	                async: false,
	                headers: {
	                    'Authorization': Cookies.get('authToken')
	                },
	                success: function(response) {
	                    $('#editRoleTasks').empty();
	                    $.each(response.data, function(i, item) {
	                        var menuChecked = "";
	                        if (menus.indexOf(item.id) >= 0)
	                            menuChecked = "checked";
	                        //                            .append('<label class="checkbox inline"><input type="checkbox" name="roleMenusCheckbox[' + i + ']" value="'+ item.id + '">' +
	                        //							'&nbsp;' + item.name);
	                        $('#editRoleTasks').append('<label class="checkbox inline"><input type="checkbox" name="editRoleMenusCheckbox[' + i + ']" value="' + item.id + '" ' +
	                            menuChecked + '>' + '&nbsp;' + item.name);
	                        $.each(item.task, function(j, task) {
	                            var taskChecked = "";
	                            if (tasks.indexOf(task.id) >= 0)
	                                taskChecked = "checked";
	                            $('#editRoleTasks').append(
	                                '&nbsp;&nbsp;&nbsp;<input type="checkbox" name="editRoleTasksCheckbox[' + 10 * i + j + ']" value="' + task.id + '" ' +
	                                taskChecked + ' >&nbsp;&nbsp;&nbsp;' + task.name + '</label>');
	                        });

	                    });
	                },
	                cache: false
	            });



	            $("#edit").show();
	            $("#list").hide();
	        },
	        cache: false
	    });
	}


	// Order


	function editOrder(id) {
	    $('#editForm')[0].reset();
	    $.ajax({
	        url: "/api/v1/wsorders/" + id,
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            $('#editId').val(id);


	            $('#editOrderId').text(response.data.order_id).trigger('change');
	            $('#editStatus').text(getCaptionStatus(response.data.status)).trigger('change');
	            $('#editHoteName').text(response.data.hotel_name + "(" + response.data.hotel.name_en + ")").trigger('change');

	            $('#editHoteTel').text(response.data.hotel.tel).trigger('change');
	            $('#editHoteAddress').text(response.data.hotel.address).trigger('change');

	            $('#editRooms').text(response.data.daysdiff).trigger('change');

	            var checkTime = "";
	            var roomName = "";
	            var planName = "";

	            if (response.data.stay_info.length != 0) {
	                check_in_time = moment(response.data.check_in_time).format('YYYY-MM-DD');
	                check_out_time = moment(response.data.check_out_time).format('YYYY-MM-DD');
	                checkTime = check_in_time + " -- " + check_out_time;
	                roomName = response.data.stay_info[0].room_type_name;
	                planName = response.data.stay_info[0].plan_name;
	            }

	            $('#editCheckTime').html(checkTime).trigger('change');
	            $('#editPlanName').text(planName).trigger('change');
	            $('#editRomeName').text(roomName).trigger('change');

	            $('#editPrice').val(response.data.price);


	            $('#editContactName').val(response.data.contact_name);
	            $('#editContactEmail').val(response.data.contact_email);
	            $('#editContactPhone').val(response.data.contact_mobile);

	            $('#editOrderRemark').val(response.data.order_remark);

	            if ((response.data.status) == 'pending') {
	                $('#cancelBtnInEdit').show();
	                $('#confirmBtnInEdit').show();
	            } else {
	                $('#cancelBtnInEdit').hide();
	                $('#confirmBtnInEdit').hide();
	            }


	            if (remarkTable != null) {
	                remarkTable.clear();
	                remarkTable.rows.add(response.data.remark);
	                remarkTable.draw();

	            } else {

	                remarkTable = $('#grid-remark').DataTable({
	                    data: response.data.remark,
	                    columns: [{
	                        data: "content"
	                    }, {
	                        data: "create_at"
	                    }, {
	                        data: "staff_id"
	                    }, ],
	                    bSort: false,
	                    bFilter: false,
	                    bPaginate: false,
	                    bInfo: false,
	                });
	            }

	            if (journalTable != null) {
	                journalTable.clear();
	                journalTable.rows.add(response.data.journal);
	                journalTable.draw();

	            } else {

	                journalTable = $('#grid-journal').DataTable({
	                    data: response.data.journal,
	                    columns: [{
	                        data: "create_at"
	                    }, {
	                        data: "staff_id"
	                    }, {
	                        data: "description"
	                    }, ],
	                    bSort: false,
	                    bFilter: false,
	                    bPaginate: false,
	                    bInfo: false,
	                });
	            }



	            // 				$('#editUserName').val(response.data.name);

	            $("#edit").show();
	            $("#list").hide();
	        },
	        cache: false
	    });
	}


	function getCaptionStatus(name) {
	    switch (name) {
	        case "unpaid":
	            return "未付款";
	            break;
	        case "deposit":
	            return "已付訂";
	            break;
	        case "confirmed":
	            return "已確認";
	            break;
	        case "paid":
	            return "已付清";
	            break;
	        case "completed":
	            return "完成";
	            break;
	        case "canceled":
	            return "已取消";
	            break;
	        case "pending":
	            return "待確認";
	            break;
	        case "reject_soldout":
	            return "reject_soldout";
	            break;
	        default:
	            return name;
	    }


	}

	function exportPDF() {
	    var id = $('#editId').val();
	    window.open("/api/v1/orderPDF/" + id, "pdfwindow", "status=1,toolbar=1");
	}

	function sendMail() {
	    var id = $('#editId').val();
	    $.ajax({
	        url: "/api/v1/wsorders/" + id,
	        type: 'PUT',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        data: {
	            'action': 'sendMail'
	        },
	        success: function(data) {
	            console.log(data);
	            alert('已Email訂單');
	            orderTable.ajax.reload();
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	            switch (xhr.status) {
	                case 422:
	                    alert('Email不存在，無法發送');
	                    break;
	                case 404:
	                    alert('訂單不存在');
	                    break;
	                case 401:
	                    alert('Token 不存在');
	                    window.location.replace("/admin/login");
	                    break;
	                default:
	                    alert('無法發送Email');
	            }
	        },
	        cache: false
	    });
	}

	function confirmOrder(id) {
	    var type = "";
	    if (id == "edit") {
	        id = $('#editId').val();
	        type = "edit"
	    }
	    $.ajax({
	        url: "/api/v1/wsorders/" + id,
	        type: 'PUT',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        data: {
	            'action': 'confirmOrder'
	        },
	        success: function(data) {
	            alert('已確認訂單');
	            if (type == "edit") {
	                editOrder(id);
	            }
	            orderTable.ajax.reload();
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	            switch (xhr.status) {
	                case 422:
	                    alert('訂單狀態不對，無法確認訂單');
	                    break;
	                case 404:
	                    alert('訂單不存在');
	                    break;
	                case 401:
	                    alert('Token 不存在');
	                    window.location.replace("/admin/login");
	                    break;
	                default:
	                    alert('無法確認訂單');
	            }
	        },
	        cache: false
	    });

	}

	function cancelOrder(id) {
	    if (id == "edit") {
	        var id = $('#editId').val();
	    }
	    $.ajax({
	        url: "/api/v1/wsorders/" + id,
	        type: 'PUT',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        data: {
	            'action': 'cancelOrder'
	        },
	        success: function(data) {
	            alert('已取消訂單');
	            if (type == "edit") {
	                editOrder(id);
	            }
	            orderTable.ajax.reload();
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	            switch (xhr.status) {
	                case 422:
	                    alert('訂單狀態不對，無法取消訂單');;
	                    break;
	                case 404:
	                    alert('訂單不存在');
	                    break;
	                case 401:
	                    alert('Token 不存在');
	                    window.location.replace("/admin/login");
	                    break;
	                default:
	                    alert('無法取消訂單');
	            }
	        },
	        cache: false
	    });

	}

	function addRemark() {
	    var id = $('#editId').val();
	    $.ajax({
	        url: "/api/v1/wsorders/" + id,
	        type: 'PUT',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        data: {
	            'action': 'addRemark',
	            'remarkContent': $('#remarkContent').val(),
	        },
	        success: function(data) {
	            alert('已增加備註');
	            document.getElementById('popopRemark').style.display = 'none';
	            editOrder(id);
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	            switch (xhr.status) {
	                case 422:
	                    alert('備註為空，無法新增');;
	                    break;
	                case 404:
	                    alert('訂單不存在');
	                    break;
	                case 401:
	                    alert('Token 不存在');
	                    window.location.replace("/admin/login");
	                    break;
	                default:
	                    alert('無法增加備註');
	            }
	        },
	        cache: false
	    });

	}

	function changeDateSelection(option) {
	    if (option.value == 0) {
	        $('#dateSelection').hide();
	    } else {
	        $('#dateSelection').show();
	    }
	}




	function listOrders() {
	    var table = $('#grid-basic').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "language": {
	            "lengthMenu": "顯示 _MENU_ 筆",
	            "zeroRecords": "無資料",
	            "info": "第 _START_ ~ _END_ 筆共 _TOTAL_ 筆",
	            "search": "搜尋:",
	            "processing": "處理中...",
	            "paginate": {
	                "first": "First",
	                "last": "Last",
	                "next": "下一頁",
	                "previous": "上一頁"
	            }
	        },
	        "ajax": {
	            "url": "/api/v1/wsorders",
	            "type": "POST",
	            "beforeSend": function(request) {
	                request.setRequestHeader("Authorization", Cookies.get('authToken'));
	            },
	            "data": function(d) {
	                d.orderMode = $('#orderMode').val();
	                d.searchOrderNumber = $('#searchOrderNumber').val();
	                d.searchContactName = $('#searchContactName').val();
	                d.searchHotelName = $('#searchHotelName').val();
	                d.searchOrderStatus = $('#searchOrderStatus').val();
	                d.searchTimeSelection = $('#searchTimeSelection').val();
	                d.searchOrderStartTime = $('#searchOrderStartTime').val();
	                d.searchOrderEndTime = $('#searchOrderEndTime').val();
	                d.searchCheckInStartTime = $('#searchCheckInStartTime').val();
	                d.searchCheckInEndTime = $('#searchCheckInEndTime').val();
	                d.searchCheckOutStartTime = $('#searchCheckOutStartTime').val();
	                d.searchCheckOutEndTime = $('#searchCheckOutEndTime').val();
	            }
	        },
	        "columns": [{
	                "data": "orderHotelInfo"
	            }, // 0 x
	            {
	                "data": "otaInfo"
	            }, // 1 x
	            {
	                "data": "roomInfo"
	            }, // 2 x
	            {
	                "data": "stayInfo"
	            }, // 3 x
	            {
	                "data": "stay_info_count"
	            }, // 4
	            {
	                "data": "daysdiff"
	            }, // 5 x
	            {
	                "data": "contact_name"
	            }, // 6
	            {
	                "data": "updateInfo"
	            }, // 7 x
	            {
	                "data": "price"
	            }, // 8
	            {
	                "data": "status"
	            }, // 9 x
	            {
	                "data": "quickCommands"
	            }, // 10 x
	            {
	                "data": "commands"
	            }, // 11 x
	        ],
	        "columnDefs": [{
	            "targets": 0, //orderHotelInfo
	            "render": function(data, type, row) {
	                order_id = row.order_id;
	                hotel_name = "";

	                var sendCaptaion = '';
	                if (row.mail.status == 'send') {
	                    sendCaptaion = '<span class=\"btn btn-default btn-xs\">已送信</span>';
	                }


	                var returnvalue = "<div>" +
	                    order_id + "<br>" + hotel_name + "&nbsp;<span class=\"btn btn-default btn-xs\">" +
	                    getCaptionStatus(row.status) + "</span>" +
	                    sendCaptaion + "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 1, //otaInfo
	            "render": function(data, type, row) {
	                ota_id = row.ota;
	                var returnvalue = "<div>" +
	                    ota_id +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 2, //roomInfo
	            "render": function(data, type, row) {
	                room_type_name = "";
	                plan_name = "";
	                if (row.stay_info.length != 0) {
	                    room_type_name = row.stay_info[0].room_type_name;
	                    plan_name = row.stay_info[0].plan_name;
	                }
	                var returnvalue = "<div Title=\"" + room_type_name + "\">" +
	                    plan_name +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 3, //stayInfo
	            "render": function(data, type, row) {
	                check_in_time = moment(row.check_in_time).format('YYYY-MM-DD');
	                check_out_time = moment(row.check_out_time).format('YYYY-MM-DD');

	                var returnvalue = "<div>" + check_in_time + "<br>" +
	                    check_out_time + "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 5, //daysdiff
	            "render": function(data, type, row) {
	                var returnvalue = "<div>" + row.daysdiff + "晚</div>";
	                return returnvalue;
	            },
	        }, {
	            "targets": 7, //updateInfo
	            "render": function(data, type, row) {
	                sent_date = "";
	                if (row.mail.length != 0) {
	                    sent_date = moment(row.mail.sent_date).format('YYYY-MM-DD')
	                }
	                var returnvalue = "<div>" + sent_date + "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 9, //status
	            "render": function(data, type, row) {
	                return "<div Title=\"" + getCaptionStatus(row.status) + "\">" + getCaptionStatus(row.status) + "</div>";
	            },
	        }, {
	            "targets": 10, //quickCommands
	            "render": function(data, type, row) {
	                ota_id = row.ota;

	                if ((ota_id == "itaifeng") && (row.status == "pending")) {

	                    return "<div class=\"btn btn-default btn-xs\" onclick=\"confirmOrder('" + row.id + "')\">接受</div><br>" +
	                        "<div class=\"btn btn-default btn-xs\" onclick=\"cancelOrder('" + row.id + "')\">拒絕</div>";

	                } else {

	                    return "";
	                }
	            },
	        }, {
	            "targets": 11, //commands
	            "render": function(data, type, row) {
	                return "<div class=\"btn btn-default btn-xs\" onclick=\"editOrder('" + row.id + "')\">編輯</div>";
	                // 					"<div class=\"button left\" onclick=\"deleteUser('"+ row.id +"'\">刪除</div>"
	            },
	        }, ],
	        "bSort": false,
	        "bFilter": false,

	    });

	    return table;

	}

	function changeOrderTab(id) {

	    $('#orderMode').val(id);

	    orderTable.ajax.reload();


	}

	function checkOrderTab() {

	    switch ($('#orderMode').val()) {
	        case "pending":
	            $('#tab1').addClass('active');
	            break;
	        case "canceled":
	            $('#tab2').addClass('active');
	            break;
	        case "todayIn":
	            $('#tab3').addClass('active');
	            break;
	        case "todayCheckIn":
	            $('#tab4').addClass('active');
	            break;
	    }
	}


	function doOrderSearch() {

	    $('#orderMode').val('');


	    $('#tab1').removeClass('active');
	    $('#tab2').removeClass('active');
	    $('#tab3').removeClass('active');
	    $('#tab4').removeClass('active');

	    orderTable.ajax.reload();


	}

	function accMul(arg1, arg2) {
	    var m = 0,
	        s1 = arg1.toString(),
	        s2 = arg2.toString();
	    try {
	        m += s1.split(".")[1].length
	    } catch (e) {}
	    try {
	        m += s2.split(".")[1].length
	    } catch (e) {}
	    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	}


	function changeＣurrency(currency) {
	    var price = $('#price').val();
	    var rate = currency.value;
	    $('#convertPrice').val(accMul(price, rate));
	}


	function addＣurrencyList() {
	    $.ajax({
	        url: "/api/v1/currencies?length=-1",
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            $('#currencyList').empty();
	            $('#currencyList').append($('<option>', {
	                value: 0,
	                text: '請選擇幣別'
	            }));
	            $.each(response.data, function(i, item) {
	                $('#currencyList').append($('<option>', {
	                    value: item.exchange_rate,
	                    text: item.name + '(' + item.key + ')'
	                }));
	            });

	        },
	        cache: false
	    });
	}



	function addOtaList() {
	    $.ajax({
	        url: "/api/v1/otas?current=1&rowCount=-1",
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            $('#otaKey').empty();
	            $('#otaKey').append($('<option>', {
	                value: '',
	                text: '請選擇來源'
	            }));
	            $.each(response.rows, function(i, item) {
	                $('#otaKey').append($('<option>', {
	                    value: item.key,
	                    text: item.name
	                }));
	            });

	        },
	        cache: false
	    });
	}

	function addHotelList() {
	    $("#hotels").autocomplete({
	        source: function(request, response) {
	            $.ajax({
	                url: "/api/v1/hotels?length=-1",
	                type: 'GET',
	                async: false,
	                headers: {
	                    'Authorization': Cookies.get('authToken')
	                },
	                data: {
	                    search: request.term
	                },
	                success: function(output) {
	                    $('#hotelId').val('')
	                    var hotels = output.data;
	                    var outHotels = new Array();
	                    for (var key in hotels) {
	                        var tempHotel = {
	                            id: hotels[key]['id'],
	                            label: hotels[key]['name'],
	                            value: hotels[key]['name']
	                        };
	                        outHotels.push(tempHotel);
	                    }

	                    response(outHotels);
	                }
	            });
	        },
	        minLength: 2,
	        change: function(event, ui) {
	            if (ui.item == null) {
	                addRoomList('');
	            }
	        },
	        select: function(event, ui) {
	            $('#hotelId').val(ui.item.id);
	            addRoomList(ui.item.id);
	        }
	    });

	    // 		$.ajax({
	    // 			url: "/api/v1/hotels?length=-1",
	    // 			type: 'GET',
	    // 			async: false,
	    // 			headers: {
	    // 				'Authorization': Cookies.get('authToken')
	    // 			},
	    // 			success: function (response) {
	    // 				$('#hotelId').empty();
	    // 				$('#hotelId').append($('<option>', {
	    // 					value: '',
	    // 					text : '請選擇飯店'
	    // 				}));
	    // 				$.each(response.data, function (i, item) {
	    // 					$('#hotelId').append($('<option>', {
	    // 						value: item.id,
	    // 						text : item.name
	    // 					}));
	    // 				});
	    //
	    // 			},
	    // 			cache: false
	    // 		});
	}

	function addRoomList(id) {
	    if (id != '') {
	        $.ajax({
	            url: "/api/v1/hotels/" + id,
	            type: 'GET',
	            async: false,
	            success: function(response) {
	                $('#roomTypeId').empty();
	                $('#roomTypeId').append($('<option>', {
	                    value: '',
	                    text: '請選擇房型'
	                }));
	                $.each(response.data.room_types, function(i, item) {

	                    $('#roomTypeId').append($('<option>', {
	                        value: item.id,
	                        text: item.name
	                    }));
	                });

	            },
	            cache: false
	        });
	    } else {
	        $('#roomTypeId').empty();
	        $('#roomTypeId').append($('<option>', {
	            value: '',
	            text: '請選擇房型'
	        }));
	    }
	}

	//Merchant
	function listMerchants() {
	    var table = $('#grid-basic').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "language": {
	            "lengthMenu": "顯示 _MENU_ 筆",
	            "zeroRecords": "無資料",
	            "info": "第 _START_ ~ _END_ 筆共 _TOTAL_ 筆",
	            "search": "搜尋:",
	            "processing": "處理中...",
	            "paginate": {
	                "first": "First",
	                "last": "Last",
	                "next": "上一頁",
	                "previous": "下一頁"
	            }
	        },
	        "ajax": {
	            "url": "/api/v1/merchants",
	            "type": "GET",
	            "beforeSend": function(request) {
	                request.setRequestHeader("Authorization", Cookies.get('authToken'));
	            }
	        },
	        "columns": [{
	            "data": "id"
	        }, {
	            "data": "name"
	        }, {
	            "data": "account"
	        }, {
	            "data": "contactName"
	        }, {
	            "data": "contactMobile"
	        }, ],
	        "columnDefs": [{
	            "targets": 5,
	            "render": function(data, type, row) {
	                return "<div class=\"btn btn-default btn-xs\" onclick=\"editMerchant('" + row.id + "')\">編輯</div>&nbsp;" +
	                    "<div class=\"btn btn-default btn-xs\" onclick=\"deleteMerchant('" + row.id + "')\">刪除</div>"
	            },
	        }],
	        "bSort": false

	    });

	    return table;
	}

	function editMerchant(id) {
	    $('#editForm')[0].reset();
	    $.ajax({
	        url: "/api/v1/merchants/" + id,
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            //console.log(response);
	            $('#editId').val(id);
	            $('#editName').val(response.data.name);
	            $('#editNo').val(response.data.no);
	            $('#editAccount').val(response.data.users[0].account);
	            //$('#editPassword').val(response.data.users[0].password);
	            $('#editContactName').val(response.data.contactName);
	            $('#editContactMobile').val(response.data.contactMobile);
	            $('#editEmail').val(response.data.email);
	            $('#editPaymentTerm').val(response.data.payment_info[0].paymentTerm);
	            $('#editPaymentMethod').val(response.data.payment_info[0].paymentMethod);
	            //$('#editCreditPaymentFilePath').val(response.data.payment_info[0].creditPaymentFilePath);
	            $('#editBankAccount').val(response.data.payment_info[0].bankAccount);
	            $('#editBankName').val(response.data.payment_info[0].bankName);
	            $('#editBankBranch').val(response.data.payment_info[0].bankBranch);
	            $('#editPaymentNoticeEmail').val(response.data.payment_info[0].paymentNoticeEmail);
	            $('#editStatus').val(response.data.status);
	            $("#edit").show();
	            $("#list").hide();
	        },
	        cache: false,
	        contentType: false,
	        processData: false
	    });
	}

	function deleteMerchant(id) {
	    if (confirm("是否確定要刪除：" + id + "該筆資料?")) {
	        $.ajax({
	            url: "/api/v1/merchants/" + id,
	            type: 'DELETE',
	            async: false,
	            success: function(response) {
	                merchantTable.ajax.reload();
	                //$("#grid-basic").bootgrid("reload");
	                alert("資料 " + id + " 已刪除！");
	            },
	            error: function(xhr, ajaxOptions, thrownError) {
	                alert('無法刪除資料');
	            },
	            cache: false
	        });
	    } else {
	        alert("取消刪除資料 " + id + "！");
	    }
	}

	//Hotel
	function listHotels() {
	    var table = $('#grid-basic').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "language": {
	            "lengthMenu": "顯示 _MENU_ 筆",
	            "zeroRecords": "無資料",
	            "info": "第 _START_ ~ _END_ 筆共 _TOTAL_ 筆",
	            "search": "搜尋:",
	            "processing": "處理中...",
	            "paginate": {
	                "first": "First",
	                "last": "Last",
	                "next": "上一頁",
	                "previous": "下一頁"
	            }
	        },
	        "ajax": {
	            "url": "/api/v1/hotels",
	            "type": "GET",
	            "beforeSend": function(request) {
	                request.setRequestHeader("Authorization", Cookies.get('authToken'));
	            }
	        },
	        "columns": [{
	            "data": "id"
	        }, {
	            "data": "name"
	        }, {
	            "data": "merchantName"
	        }, {
	            "data": "tel"
	        }, {
	            "data": "email"
	        }, ],
	        "columnDefs": [{
	            "targets": 5,
	            "render": function(data, type, row) {
	                return "<div class=\"btn btn-default btn-xs\" onclick=\"editHotel('" + row.id + "')\">編輯</div>&nbsp;" +
	                    "<div class=\"btn btn-default btn-xs\" onclick=\"deleteHotel('" + row.id + "')\">刪除</div>"
	            },
	        }],
	        "bSort": false

	    });

	    return table;
	}

	function addHotel() {
	    $.ajax({
	        url: "/api/v1/merchants?start=1&length=-1",
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            var merchantData = new Array();
	            $.each(response.data, function(i, item) {
	                merchantData[i] = {
	                    "label": item.name,
	                    "value": item.contactMobile
	                }
	            });
	            //console.log(merchantData);
	            $("#merchantName").autocomplete({
	                source: merchantData,
	                // callback function:
	                select: function(event, ui) {
	                    // feed hidden id field
	                    $("#merchantName").val(ui.item.label);
	                    $("#merchantTel").val(ui.item.value);
	                    return false;
	                },
	                // mustMatch implementation
	                change: function(event, ui) {
	                    if (ui.item === null) {
	                        $(this).val('');
	                        $('#merchantTel').val('');
	                    }
	                }
	            });
	            // mustMatch (no value) implementation
	            $("#merchantName").focusout(function() {
	                if ($("#merchantName").val() === '') {
	                    $('#merchantTel').val('');
	                }
	            });
	        },
	        cache: false
	    });
	}

	function editHotel(id) {
	    $('#editForm')[0].reset();
	    $.ajax({
	        url: "/api/v1/hotels/" + id,
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            //console.log(response);
	            $('#editId').val(id);
	            $('#editHotelName').val(response.data.name);
	            $('#editHotelNameEn').val(response.data.nameEn);
	            $('#editMerchantName').val(response.data.merchantName);
	            $('#editMerchantTel').val(response.data.merchantTel);
	            $('#editAddress').val(response.data.address);
	            $('#editAddressEn').val(response.data.addressEn);
	            $('#editBriefAddress').val(response.data.briefAddress);
	            $('#editBriefAddressEn').val(response.data.briefAddressEn);
	            $('#editContactTel').val(response.data.tel);
	            $('#editEmail').val(response.data.email);
	            $('#editWebsite').val(response.data.website);
	            $('#editStatus').val(response.data.status);

	            $("#edit").show();
	            $("#list").hide();
	        },
	        cache: false
	    });
	    $.ajax({
	        url: "/api/v1/merchants?start=1&length=-1",
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            var merchantData = new Array();
	            $.each(response.data, function(i, item) {
	                merchantData[i] = {
	                    "label": item.name,
	                    "value": item.contactMobile
	                }
	            });
	            //console.log(merchantData);
	            $("#editMerchantName").autocomplete({
	                source: merchantData,
	                // callback function:
	                select: function(event, ui) {
	                    // feed hidden id field
	                    $("#editMerchantName").val(ui.item.label);
	                    $("#editMerchantTel").val(ui.item.value);
	                    return false;
	                },
	                // mustMatch implementation
	                change: function(event, ui) {
	                    if (ui.item === null) {
	                        $(this).val('');
	                        $('#editMerchantTel').val('');
	                    }
	                }
	            });
	            // mustMatch (no value) implementation
	            $("#editMerchantName").focusout(function() {
	                if ($("#editMerchantName").val() === '') {
	                    $('#editMerchantTel').val('');
	                }
	            });
	        },
	        cache: false
	    });
	}

	function deleteHotel(id) {
	    if (confirm("是否確定要刪除：" + id + "該筆資料?")) {
	        $.ajax({
	            url: "/api/v1/hotels/" + id,
	            type: 'DELETE',
	            async: false,
	            success: function(response) {
	                hotelTable.ajax.reload();
	                //$("#grid-basic").bootgrid("reload");
	                alert("資料 " + id + " 已刪除！");
	            },
	            error: function(xhr, ajaxOptions, thrownError) {
	                alert('無法刪除資料');
	            },
	            cache: false
	        });
	    } else {
	        alert("取消刪除資料 " + id + "！");
	    }
	}

	//search DayCheck
	function changeDayCheckTab(id) {

	    $('#dayCheckMode').val(id);
	    $.blockUI({
	        message: '<div style="top: 50%;left: 50%; font-size: 28px;">讀取資料中</div>',
	        css: {
	            opacity: .8
	        }
	    });
	    dayCheckTable.ajax.reload();

	}

	function checkDayCheckTab() {

	    switch ($('#dayCheckMode').val()) {
	        case "untreated":
	            $('#tab1').addClass('active');
	            break;
	        case "processing":
	            $('#tab2').addClass('active');
	            break;
	        case "unpay":
	            $('#tab3').addClass('active');
	            break;
	        case "alreadyPay":
	            $('#tab4').addClass('active');
	            break;
	        case "allOrder":
	            $('#tab5').addClass('active');
	            break;
	    }
	}

	function doDayCheckSearch() {

	    $('#dayCheckMode').val('');

	    $('#tab1').removeClass('active');
	    $('#tab2').removeClass('active');
	    $('#tab3').removeClass('active');
	    $('#tab4').removeClass('active');
	    $('#tab5').removeClass('active');

	    dayCheckTable.ajax.reload();

	}

	//DayCheck
	function listDayChecks() {
	    $.blockUI({
	        message: '<div style="top: 50%;left: 50%; font-size: 28px;">讀取資料中</div>',
	        css: {
	            opacity: .8
	        }
	    });
	    var table = $('#grid-basic').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "language": {
	            "lengthMenu": "顯示 _MENU_ 筆",
	            "zeroRecords": "無資料",
	            "info": "第 _START_ ~ _END_ 筆共 _TOTAL_ 筆",
	            "search": "搜尋:",
	            "processing": "處理中...",
	            "paginate": {
	                "first": "First",
	                "last": "Last",
	                "next": "下一頁",
	                "previous": "上一頁"
	            }
	        },
	        "ajax": {
	            "url": "/api/v1/dayChecks",
	            "type": "POST",
	            "beforeSend": function(request) {
	                request.setRequestHeader("Authorization", Cookies.get('authToken'));
	            },
	            "data": function(d) {
	                d.dayCheckMode = $('#dayCheckMode').val();
	                d.searchOtaId = $('#searchOtaId').val();
	                d.searchMerchantName = $('#searchMerchantName').val();
	                d.searchPaymentMethod = $('#searchPaymentMethod').val();
	                d.searchPaymentTerm = $('#searchPaymentTerm').val();
	            }
	        },
	        "columns": [{
	                "data": "id"
	            }, // 0
	            {
	                "data": "otaInfo"
	            }, // 1 x
	            {
	                "data": "merchant_name"
	            }, // 2 x
	            {
	                "data": "hotel_name"
	            }, // 3
	            {
	                "data": "price"
	            }, // 4
	            {
	                "data": "payment_term"
	            }, // 5 x
	            {
	                "data": "payment_method"
	            }, // 6 x
	            {
	                "data": "payment_status"
	            }, // 7
	            {
	                "data": "commands"
	            }, // 8 x
	        ],
	        "columnDefs": [{
	            "targets": 1, //otaInfo
	            "render": function(data, type, row) {
	                ota = "";
	                if (row.ota) {
	                    ota = row.ota;
	                }
	                var returnvalue = "<div>" +
	                    ota +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 2, //merchantName
	            "render": function(data, type, row) {
	                merchant_name = "";
	                //console.log(row);
	                if (row.merchant.length != 0) {
	                    merchant_name = row.merchant.name;
	                }
	                var returnvalue = "<div>" +
	                    merchant_name +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 5, //payment_term
	            "render": function(data, type, row) {
	                payment_term = "";
	                if (row.finance.length != 0) {
	                    payment_term = row.finance.payment_term;
	                }
	                var returnvalue = "<div>" +
	                    payment_term +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 6, //payment_method
	            "render": function(data, type, row) {
	                payment_method = "";
	                if (row.finance.length != 0) {
	                    payment_method = row.finance.payment_method;
	                }
	                var returnvalue = "<div>" +
	                    payment_method +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 7, //payment_status
	            "render": function(data, type, row) {
	                payment_status = "";
	                if (row.finance.length != 0) {
	                    payment_status = row.finance.payment_status;
	                }
	                var returnvalue = "<div>" +
	                    payment_status +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 8, //commands
	            "render": function(data, type, row) {
	                return "<div class=\"btn btn-default btn-xs\" onclick=\"editDayCheck('" + row.id + "')\">設定</div>";
	            },
	        }, ],
	        "bSort": false,
	        "bFilter": false,

	    });

	    return table;
	}

	function editDayCheck(id) {
	    $('#editForm')[0].reset();
	    $.ajax({
	        url: "/api/v1/dayChecks/" + id,
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            //console.log(Cookies.get('authToken'));
	            $('#setId').val(id);
	            $('#setOrderNumber').val(response.data.id);
	            $('#setOtaId').val(response.data.ota);
	            $('#setMerchantName').val(response.data.merchant.name);
	            $('#setHotelName').val(response.data.hotel_name);
	            $('#setContactName').val(response.data.contact_name);
	            $('#setCheckInDate').val(response.data.check_in_time);
	            $('#setCheckOutDate').val(response.data.check_out_time);
	            if (response.data.merchant.default_payment_term != '' && response.data.merchant.default_payment_method != '') {
	                $('#setDefaultPaymentTerm').val(response.data.default_payment_term + " / " + response.data.merchant.default_payment_method);
	            } else if (response.data.merchant.default_payment_term != '' && response.data.merchant.default_payment_method == '') {
	                $('#setDefaultPaymentTerm').val(response.data.default_payment_term + " / 預設付款方式未設定");
	            } else if (response.data.merchant.default_payment_term == '' && response.data.merchant.default_payment_method != '') {
	                $('#setDefaultPaymentTerm').val("預設付款條件未設定 / " + response.data.merchant.default_payment_method);
	            } else if (response.data.merchant.default_payment_term == '' && response.data.merchant.default_payment_method == '') {
	                $('#setDefaultPaymentTerm').val("預設付款條件與方式皆未設定");
	            }
	            $('#setQuotedPrice').val(response.data.price);
	            //finance
	            if (response.data.finance.length != 0) {
	                $('#setCheckOutPrice').val(response.data.finance.checkout_price);
	                $('#setCheckOutPercent').val(((response.data.finance.checkout_price / response.data.price) * 100).toFixed(1) + "%");
	                $('#setPaymentTerm').val(response.data.finance.payment_term);
	                $('#setPaymentMethod').val(response.data.finance.payment_method);
	                $('#setExpectedPaymentDate').val(response.data.finance.expected_payment_date);
	                $('#setPaymentDate').val(response.data.finance.payment_date);
	                $('#setCreditPaymentInfo').val(response.data.finance.credit_info);
	                $('#setBankAccount').val(response.data.finance.bank_account);
	                $('#setBankName').val(response.data.finance.bank_name);
	                $('#setBankName').val(response.data.finance.bank_name);
	                $('#setBankBranch').val(response.data.finance.bank_branch);
	                $('#setRemark').val(response.data.finance.payment_memo);
	                $('#setPaymentStatus').val(response.data.finance.payment_status);
	            } else {
	                $('#setCheckOutPrice').val();
	                $('#setCheckOutPercent').val();
	                $('#setPaymentTerm').val();
	                $('#setPaymentMethod').val();
	                $('#setExpectedPaymentDate').val();
	                $('#setPaymentDate').val();
	                $('#setCreditPaymentInfo').val();
	                $('#setBankAccount').val();
	                $('#setBankName').val();
	                $('#setBankBranch').val();
	                $('#setRemark').val();
	                $('#setPaymentStatus').val();
	            }

	            $("#edit").show();
	            $("#list").hide();
	            //var paymentMethod = document.getElementById("setPaymentMethod").value;
	            if (response.data.finance.payment_method == "creditPayment") {
	                $('#setCreditPaymentInfo').attr('disabled', false);
	                $('#setBankAccount').attr('disabled', true);
	                $('#setBankName').attr('disabled', true);
	                $('#setBankBranch').attr('disabled', true);
	            } else if (response.data.finance.payment_method == "bankPayment") {
	                $('#setCreditPaymentInfo').attr('disabled', true);
	                $('#setBankAccount').attr('disabled', false);
	                $('#setBankName').attr('disabled', false);
	                $('#setBankBranch').attr('disabled', false);
	            } else {
	                $('#setBankAccount').attr('disabled', false);
	                $('#setBankName').attr('disabled', false);
	                $('#setBankBranch').attr('disabled', false);
	                $('#setCreditPaymentInfo').attr('disabled', false);
	            }

	            //journal
	            if (journalTable != null) {
	                journalTable.clear();
	                journalTable.rows.add(response.data.finance.dayCheck_journal);
	                journalTable.draw();

	            } else {
	                journalTable = $('#grid-journal').DataTable({
	                    data: response.data.finance.dayCheck_journal,
	                    columns: [{
	                        data: "status"
	                    }, {
	                        data: "update_at"
	                    }, {
	                        data: "staff_id"
	                    }, ],
	                    bSort: false,
	                    bFilter: false,
	                    bPaginate: false,
	                    bInfo: false,
	                });
	            }

	        },
	        cache: false
	    });

	}

	function checkPaymentMethod() {
	    //console.log(id);
	    if (document.getElementById('setPaymentMethod').value == "creditPayment") {
	        $('#setCreditPaymentInfo').attr('disabled', false);
	        $('#setBankAccount').attr('disabled', true);
	        $('#setBankName').attr('disabled', true);
	        $('#setBankBranch').attr('disabled', true);
	    } else if (document.getElementById('setPaymentMethod').value == "bankPayment") {
	        $('#setBankAccount').attr('disabled', false);
	        $('#setBankName').attr('disabled', false);
	        $('#setBankBranch').attr('disabled', false);
	        $('#setCreditPaymentInfo').attr('disabled', true);
	    } else {
	        $('#setBankAccount').attr('disabled', false);
	        $('#setBankName').attr('disabled', false);
	        $('#setBankBranch').attr('disabled', false);
	        $('#setCreditPaymentInfo').attr('disabled', false);
	    }
	}

	//search OtaFunds
	function changeOtaFundsTab(id) {

	    $('#otaFundsMode').val(id);
	    $.blockUI({
	        message: '<div style="top: 50%;left: 50%; font-size: 28px;">讀取資料中</div>',
	        css: {
	            opacity: .8
	        }
	    });

	    otaFundsTable.ajax.reload();


	}

	function checkOtaFundsTab() {

	    switch ($('#otaFundsMode').val()) {
	        case "noPaymentReceive":
	            $('#tab1').addClass('active');
	            break;
	        case "noPaymentGet":
	            $('#tab2').addClass('active');
	            break;
	        case "paymentGet":
	            $('#tab3').addClass('active');
	            break;
	        case "allOrder":
	            $('#tab4').addClass('active');
	            break;
	    }
	}

	function doOtaFundsSearch() {

	    $('#otaFundsMode').val('');

	    $('#tab1').removeClass('active');
	    $('#tab2').removeClass('active');
	    $('#tab3').removeClass('active');
	    $('#tab4').removeClass('active');

	    otaFundsTable.ajax.reload();

	}

	//OtaFunds
	function listOtaFunds() {
	    $.blockUI({
	        message: '<div style="top: 50%;left: 50%; font-size: 28px;">讀取資料中</div>',
	        css: {
	            opacity: .8
	        }
	    });
	    var table = $('#grid-basic').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "language": {
	            "lengthMenu": "顯示 _MENU_ 筆",
	            "zeroRecords": "無資料",
	            "info": "第 _START_ ~ _END_ 筆共 _TOTAL_ 筆",
	            "search": "搜尋:",
	            "processing": "處理中...",
	            "paginate": {
	                "first": "First",
	                "last": "Last",
	                "next": "下一頁",
	                "previous": "上一頁"
	            }
	        },
	        "ajax": {
	            "url": "/api/v1/otaFunds",
	            "type": "POST",
	            "beforeSend": function(request) {
	                request.setRequestHeader("Authorization", Cookies.get('authToken'));
	            },
	            "data": function(d) {
	                d.otaFundsMode = $('#otaFundsMode').val();
	                d.searchOtaId = $('#searchOtaId').val();
	                d.searchMerchantName = $('#searchMerchantName').val();
	                d.searchPaymentReceiveTerm = $('#searchPaymentReceiveTerm').val();
	            }
	        },
	        "columns": [{
	                "data": "id"
	            }, // 0
	            {
	                "data": "otaInfo"
	            }, // 1 x
	            {
	                "data": "merchant_name"
	            }, // 2 x
	            {
	                "data": "hotel_name"
	            }, // 3
	            {
	                "data": "price"
	            }, // 4
	            {
	                "data": "checkout_price"
	            }, // 5
	            {
	                "data": "payment_receive_price"
	            }, // 6
	            {
	                "data": "receive_status"
	            }, // 7 x
	            {
	                "data": "commands"
	            }, // 8 x
	        ],
	        "columnDefs": [{
	            "targets": 1, //otaInfo
	            "render": function(data, type, row) {
	                console.log(row);
	                ota_id = "";
	                if (row.ota.length != 0) {
	                    ota_id = row.ota;
	                }
	                var returnvalue = "<div>" +
	                    ota_id +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 2, //merchantName
	            "render": function(data, type, row) {
	                merchant_name = "";
	                if (row.merchant.length != 0) {
	                    merchant_name = row.merchant.name;
	                }
	                var returnvalue = "<div>" +
	                    merchant_name +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 5, //checkout_price
	            "render": function(data, type, row) {
	                checkout_price = "";
	                if (row.finance.length != 0) {
	                    checkout_price = row.finance.checkout_price;
	                }
	                var returnvalue = "<div>" +
	                    checkout_price +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 6, //payment_receive_price
	            "render": function(data, type, row) {
	                payment_receive_price = "";
	                if (row.finance.length != 0) {
	                    payment_receive_price = row.finance.payment_receive_price;
	                }
	                var returnvalue = "<div>" +
	                    payment_receive_price +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 7, //receive_status
	            "render": function(data, type, row) {
	                receive_status = "";
	                if (row.finance.length != 0) {
	                    receive_status = row.finance.receive_status;
	                }
	                var returnvalue = "<div>" +
	                    receive_status +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 8, //commands
	            "render": function(data, type, row) {
	                return "<div class=\"btn btn-default btn-xs\" onclick=\"editOtaFund('" + row.id + "')\">設定</div>";
	            },
	        }, ],
	        "bSort": false,
	        "bFilter": false,

	    });

	    return table;
	}

	function editOtaFund(id) {
	    $('#editForm')[0].reset();
	    $.ajax({
	        url: "/api/v1/otaFunds/" + id,
	        type: 'GET',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        success: function(response) {
	            console.log(response.data);
	            $('#setId').val(id);
	            $('#setOrderNumber').val(response.data.id);
	            $('#setOtaId').val(response.data.ota);
	            $('#setMerchantName').val(response.data.merchant.name);
	            $('#setHotelName').val(response.data.hotel_name);
	            $('#setContactName').val(response.data.contact_name);
	            $('#setCheckInDate').val(response.data.check_in_time);
	            $('#setCheckOutDate').val(response.data.check_out_time);
	            if (response.data.merchant.default_payment_term != '' && response.data.merchant.default_payment_method != '') {
	                $('#setDefaultPaymentTerm').val(response.data.default_payment_term + " / " + response.data.merchant.default_payment_method);
	            } else if (response.data.merchant.default_payment_term != '' && response.data.merchant.default_payment_method == '') {
	                $('#setDefaultPaymentTerm').val(response.data.default_payment_term + " / 預設付款方式未設定");
	            } else if (response.data.merchant.default_payment_term == '' && response.data.merchant.default_payment_method != '') {
	                $('#setDefaultPaymentTerm').val("預設付款條件未設定 / " + response.data.merchant.default_payment_method);
	            } else if (response.data.merchant.default_payment_term == '' && response.data.merchant.default_payment_method == '') {
	                $('#setDefaultPaymentTerm').val("預設付款條件與方式皆未設定");
	            }
	            $('#setQuotedPrice').val(response.data.price);
	            //finance
	            if (response.data.finance.length != 0) {
	                $('#setPaymentPrice').val(response.data.finance.checkout_price);
	                $('#setPaymentPercent').val(((response.data.finance.checkout_price / response.data.price) * 100).toFixed(1) + "%");

	                if (response.data.finance.payment_method = "creditPayment") {
	                    $('#setPaymentInfo').val(response.data.finance.payment_term + " / " + response.data.finance.payment_method + " / " + response.data.finance.credit_info);
	                } else if (response.data.finance.payment_method = "bankPayment") {
	                    $('#setPaymentInfo').val(response.data.finance.payment_term + " / " + response.data.finance.payment_method + " / " + response.data.finance.bank_account + " / " + response.data.finance.bank_name + " / " + response.data.finance.bank_branch);
	                }

	                $('#setPaymentReceivePrice').val(response.data.finance.payment_receive_price);
	                $('#setPaymentReceivePercent').val(((response.data.finance.payment_receive_price / response.data.price) * 100).toFixed(1) + "%");
	                $('#setPaymentReceiveTerm').val(response.data.finance.payment_receive_term);
	                $('#setExpectedPaymentReceiveDate').val(response.data.finance.expected_receive_date);
	                $('#setReceiveRemark').val(response.data.finance.receive_memo);
	                $('#setPaymentReceiveStatus').val(response.data.finance.receive_status);
	            } else {
	                $('#setCheckOutPrice').val();
	                $('#setCheckOutPercent').val();
	                $('#setPaymentTerm').val();
	                $('#setPaymentMethod').val();
	                $('#setExpectedPaymentDate').val();
	                $('#setPaymentDate').val();
	                $('#setPaymentInfo').val("付款資訊尚未設定");
	                $('#setBankAccount').val();
	                $('#setBankName').val();
	                $('#setBankBranch').val();
	                $('#setRemark').val();
	                $('#setPaymentStatus').val();
	            }

	            $("#edit").show();
	            $("#list").hide();

	            //journal
	            if (journalTable != null) {
	                journalTable.clear();
	                journalTable.rows.add(response.data.finance.otaFunds_journal);
	                journalTable.draw();

	            } else {
	                journalTable = $('#grid-journal').DataTable({
	                    data: response.data.finance.otaFunds_journal,
	                    columns: [{
	                        data: "status"
	                    }, {
	                        data: "update_at"
	                    }, {
	                        data: "staff_id"
	                    }, ],
	                    bSort: false,
	                    bFilter: false,
	                    bPaginate: false,
	                    bInfo: false,
	                });
	            }

	        },
	        cache: false
	    });

	}

	//search Cashier
	function changeCashierTab(id) {

	    $('#cashierMode').val(id);
	    $.blockUI({
	        message: '<div style="top: 50%;left: 50%; font-size: 28px;">讀取資料中</div>',
	        css: {
	            opacity: .8
	        }
	    });

	    cashierTable.ajax.reload();


	}

	function checkCashierTab() {

	    switch ($('#cashierMode').val()) {
	        case "hasNotRecive":
	            $('#tab1').addClass('active');
	            break;
	        case "paymentGet":
	            $('#tab2').addClass('active');
	            break;
	        case "unPayment":
	            $('#tab3').addClass('active');
	            break;
	        case "alreadyPay":
	            $('#tab4').addClass('active');
	            break;
	        case "allOrder":
	            $('#tab5').addClass('active');
	            break;
	    }
	}

	function doCashierSearch() {

	    $('#cashierMode').val('');

	    $('#tab1').removeClass('active');
	    $('#tab2').removeClass('active');
	    $('#tab3').removeClass('active');
	    $('#tab4').removeClass('active');
	    $('#tab5').removeClass('active');

	    cashierTable.ajax.reload();

	}

	//Cashier
	function listCashiers() {
	    $.blockUI({
	        message: '<div style="top: 50%;left: 50%; font-size: 28px;">讀取資料中</div>',
	        css: {
	            opacity: .8
	        }
	    });
	    var table = $('#grid-basic').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "language": {
	            "lengthMenu": "顯示 _MENU_ 筆",
	            "zeroRecords": "無資料",
	            "info": "第 _START_ ~ _END_ 筆共 _TOTAL_ 筆",
	            "search": "搜尋:",
	            "processing": "處理中...",
	            "paginate": {
	                "first": "First",
	                "last": "Last",
	                "next": "下一頁",
	                "previous": "上一頁"
	            }
	        },
	        "ajax": {
	            "url": "/api/v1/cashiers",
	            "type": "POST",
	            "beforeSend": function(request) {
	                request.setRequestHeader("Authorization", Cookies.get('authToken'));
	            },
	            "data": function(d) {
	                d.cashierMode = $('#cashierMode').val();
	                d.searchOtaId = $('#searchOtaId').val();
	                d.searchMerchantName = $('#searchMerchantName').val();
	                d.searchPaymentReceiveTerm = $('#searchPaymentReceiveTerm').val();
	                d.searchPaymentTerm = $('#searchPaymentTerm').val();
	            }
	        },
	        "columns": [{
	                "data": "check_orderId"
	            }, // 0
	            {
	                "data": "id"
	            }, // 1
	            {
	                "data": "otaInfo"
	            }, // 2 x
	            {
	                "data": "merchant_name"
	            }, // 3 x
	            {
	                "data": "hotel_name"
	            }, // 4
	            {
	                "data": "price"
	            }, // 5
	            {
	                "data": "checkout_price"
	            }, // 6
	            {
	                "data": "payment_status"
	            }, // 7 x
	            {
	                "data": "payment_receive_price"
	            }, // 8
	            {
	                "data": "receive_status"
	            }, // 9 x
	            {
	                "data": "commands"
	            }, // 10 x
	        ],
	        "columnDefs": [{
	            "targets": 0, //check_orderId
	            "render": function(data, type, row) {
	                check_orderId = "";
	                if (row.length != 0) {
	                    check_orderId = row.id;
	                }
	                var returnvalue = "<div style='text-align: center'><input type='checkbox' id='check_orderId' name='check_orderId' value=" + check_orderId + ">" +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 2, //otaInfo
	            "render": function(data, type, row) {
	                ota = "";
	                if (row.ota.length != 0) {
	                    ota = row.ota;
	                }
	                var returnvalue = "<div>" +
	                    ota +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 3, //merchantName
	            "render": function(data, type, row) {
	                merchant_name = "";
	                if (row.merchant.name.length != 0) {
	                    merchant_name = row.merchant.name;
	                }
	                var returnvalue = "<div>" +
	                    merchant_name +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 6, //checkout_price
	            "render": function(data, type, row) {
	                checkout_price = "";
	                if (row.finance.length != 0) {
	                    checkout_price = row.finance.checkout_price;
	                }
	                var returnvalue = "<div>" +
	                    checkout_price +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 7, //payment_status
	            "render": function(data, type, row) {
	                payment_status = "";
	                if (row.finance.length != 0) {
	                    payment_status = row.finance.payment_status;
	                }
	                var returnvalue = "<div>" +
	                    payment_status +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 8, //payment_receive_price
	            "render": function(data, type, row) {
	                payment_receive_price = "";
	                if (row.finance.length != 0) {
	                    payment_receive_price = row.finance.payment_receive_price;
	                }
	                var returnvalue = "<div>" +
	                    payment_receive_price +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 9, //receive_status
	            "render": function(data, type, row) {
	                receive_status = "";
	                if (row.finance.length != 0) {
	                    receive_status = row.finance.receive_status;
	                }
	                var returnvalue = "<div>" +
	                    receive_status +
	                    "</div>"
	                return returnvalue;
	            },
	        }, {
	            "targets": 10, //commands
	            "render": function(data, type, row) {
	                return "<div class=\"btn btn-default btn-xs\" onclick=\"confirmPayment('" + row.id + "')\">確認付款</div>&nbsp;" +
	                    "<div class=\"btn btn-default btn-xs\" onclick=\"confirmPaymentGet('" + row.id + "')\">確認收款</div>";
	            },
	        }, ],
	        "bSort": false,
	        "bFilter": false,

	    });

	    return table;
	}

	function confirmPayment(id) {
	    var type = "";
	    if (id == "edit") {
	        id = $('#editId').val();
	        type = "edit"
	    }
	    $.ajax({
	        url: "/api/v1/cashiers/" + id,
	        type: 'PUT',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        data: {
	            'action': 'confirmPayment'
	        },
	        success: function(data) {
	            alert('已確認訂單');
	            if (type == "edit") {
	                editOrder(id);
	            }
	            cashierTable.ajax.reload();
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	            switch (xhr.status) {
	                case 422:
	                    alert('訂單狀態不對，無法確認訂單');
	                    break;
	                case 404:
	                    alert('訂單不存在');
	                    break;
	                case 401:
	                    alert('Token 不存在');
	                    window.location.replace("/admin/login");
	                    break;
	                default:
	                    alert('無法確認訂單');
	            }
	        },
	        cache: false
	    });

	}

	function confirmPaymentGet(id) {
	    var type = "";
	    if (id == "edit") {
	        id = $('#editId').val();
	        type = "edit"
	    }
	    $.ajax({
	        url: "/api/v1/cashiers/" + id,
	        type: 'PUT',
	        async: false,
	        headers: {
	            'Authorization': Cookies.get('authToken')
	        },
	        data: {
	            'action': 'confirmPaymentGet'
	        },
	        success: function(data) {
	            alert('已確認訂單');
	            if (type == "edit") {
	                editOrder(id);
	            }
	            cashierTable.ajax.reload();
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	            switch (xhr.status) {
	                case 422:
	                    alert('訂單狀態不對，無法確認訂單');
	                    break;
	                case 404:
	                    alert('訂單不存在');
	                    break;
	                case 401:
	                    alert('Token 不存在');
	                    window.location.replace("/admin/login");
	                    break;
	                default:
	                    alert('無法確認訂單');
	            }
	        },
	        cache: false
	    });

	}

	function confirmMultiPaymentGet(idArr) {
	    console.log(idArr);
	    var selectedCount = idArr.length;
	    /*$("[name=check_orderId]:checkbox:checked").each(function(i, selected) {
	        selectedArr[i] = {
                "id": $(this).val()
            }
	    });*/
	    var error422 = 0;
	    var error404 = 0;
	    var errorDefault = 0;
	    var finish = 0;
	    $.each(idArr, function(i, selected) {
	        selectedCount--;
	        var id = selected.id;
	        var type = "";
	        if (id == "edit") {
	            id = $('#editId').val();
	            type = "edit"
	        }
	        $.ajax({
	            url: "/api/v1/cashiers/" + id.toString(),
	            type: 'PUT',
	            async: false,
	            headers: {
	                'Authorization': Cookies.get('authToken')
	            },
	            data: {
	                'action': 'confirmPaymentGet'
	            },
	            success: function(data) {
	                //alert('已確認訂單');
	                if (type == "edit") {
	                    editOrder(id);
	                }
	                cashierTable.ajax.reload();
	            },
	            error: function(xhr, ajaxOptions, thrownError) {
	                switch (xhr.status) {
	                    case 422:
	                        error422 = 1;
	                        //alert('訂單狀態不對，無法確認訂單');
	                        break;
	                    case 404:
	                        error404 = 1;
	                        //alert('訂單不存在');
	                        break;
	                    case 401:
	                        alert('Token 不存在');
	                        window.location.replace("/admin/login");
	                        break;
	                    default:
	                        errorDefault = 1;
	                        //alert('無法確認訂單');
	                }
	            },
	            cache: false
	        });
	        if (selectedCount == 0) {
	            finish = 1;
	        }
	    });
	    if (selectedCount == 0 && error422 == 1) {
	        $.blockUI({
	            message: '<div style="top: 50%;left: 50%; font-size: 18px;">有訂單狀態不對，無法確認訂單；其餘動作完成</div>',
	            css: {
	                opacity: .8
	            }
	        });
	        setTimeout($.unblockUI, 1000);
	    } else if (selectedCount == 0 && error404 == 1) {
	        $.blockUI({
	            message: '<div style="top: 50%;left: 50%; font-size: 18px;">有訂單不存在；其餘動作完成</div>',
	            css: {
	                opacity: .8
	            }
	        });
	        setTimeout($.unblockUI, 1000);
	    } else if (selectedCount == 0 && errorDefault == 1) {
	        $.blockUI({
	            message: '<div style="top: 50%;left: 50%; font-size: 18px;">有訂單無法確認；其餘動作完成</div>',
	            css: {
	                opacity: .8
	            }
	        });
	        setTimeout($.unblockUI, 1000);
	    } else if (selectedCount == 0 && finish == 1) {
	        $.blockUI({
	            message: '<div style="top: 50%;left: 50%; font-size: 28px;">動作完成</div>',
	            css: {
	                opacity: .8
	            }
	        });
	        setTimeout($.unblockUI, 2000);
	    }

	}

	function checkConfirmPaymentGet() {
	    var selectedArr = new Array();
	    $("[name=check_orderId]:checkbox:checked").each(function(i, selected) {
	        selectedArr[i] = {
	            "id": $(this).val()
	        }
	    });
	    //console.log(selectedArr);
	    confirmMultiPaymentGet(selectedArr);
	}

	// Util

	function chkPassword(para) {
	    return para == '' ? false : /(?=^.{8,50}$)(?=.*[a-zA-Z])(?=.*[0-9])(?!.*\s).*$/.test(para);
	}


	function shareFacebook(youtubeUrl) {

	    if (youtubeUrl != '') {

	        var link = "https://www.facebook.com/v2.0/dialog/share?redirect_uri=https://www.youtube.com/facebook_redirect&display=popup&href=" + youtubeUrl + "&feature=share&client_id=87741124305&ret=login#_=_"

	        window.open(link, "", "width=400,height=400");

	        return false;
	    } else {

	        alert('影片網址為空');

	        return false;
	    }

	}

	function shareGooglePlus(youtubeUrl) {

	    var link = "https://plus.google.com/u/0/share?url=" + youtubeUrl

	    if (youtubeUrl != '') {

	        var link = "https://plus.google.com/u/0/share?url=" + youtubeUrl

	        window.open(link, "", "width=400,height=400");

	        return false;
	    } else {

	        alert('影片網址為空');

	        return false;
	    }

	}
