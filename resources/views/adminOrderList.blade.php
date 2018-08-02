<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh-tw">
<!--<![endif]-->
<head>
	<meta charset="utf-8" />
	<title>RabbiJet Admin | 系統設定</title>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
	<meta content="This is RabbiJet Backend System." name="description" />
	<meta content="" name="author" />

	<!-- ================== BEGIN BASE CSS STYLE ================== -->
	<link href="http://fonts.googleapis.com/css?family=Nunito:400,300,700" rel="stylesheet" id="fontFamilySrc" />
	<link href="{{ URL::asset('assets/plugins/jquery-ui/themes/base/minified/jquery-ui.min.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/css/animate.min.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/css/style.min.css') }}" rel="stylesheet" />
	<!-- ================== END BASE CSS STYLE ================== -->

	<!-- ================== BEGIN PAGE LEVEL CSS STYLE ================== -->
  <link href="{{ URL::asset('assets/plugins/bootstrap-calendar/css/bootstrap_calendar.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/DataTables/extensions/FixedHeader/css/fixedHeader.bootstrap.min.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css') }}" rel="stylesheet" />
  <link href="{{ URL::asset('assets/plugins/bootstrap-calendar/css/bootstrap_calendar.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/bootstrap-datepicker/css/datepicker.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/bootstrap-datepicker/css/datepicker3.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/ionRangeSlider/css/ion.rangeSlider.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/ionRangeSlider/css/ion.rangeSlider.skinNice.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/strength-js/strength.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/bootstrap-combobox/css/bootstrap-combobox.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/bootstrap-select/bootstrap-select.min.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css') }}" rel="stylesheet" />
	<link href="{{ URL::asset('assets/plugins/jquery-tag-it/css/jquery.tagit.css') }}" rel="stylesheet" />
  <link href="{{ URL::asset('assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css') }}" rel="stylesheet" />
  <link href="{{ URL::asset('assets/plugins/select2/dist/css/select2.min.css') }}" rel="stylesheet" />
  <link href="{{ URL::asset('assets/plugins/bootstrap-eonasdan-datetimepicker/build/css/bootstrap-datetimepicker.min.css') }}" rel="stylesheet" />
	<!-- ================== END PAGE LEVEL CSS STYLE ================== -->
    <style>
    .white_content {
        display: none;
        position: absolute;
        top: 200px;
        left: 200px;
        width: 200px;
        height: 380px;
        padding: 8px;
        border: 8px solid #485562;
        background-color: white;
        z-index:1002;
        overflow: auto;
    }
	</style>

	<!-- ================== BEGIN BASE JS ================== -->
	<script src="{{ URL::asset('assets/plugins/pace/pace.min.js') }}"></script>
	<!-- ================== END BASE JS ================== -->

	<!--[if lt IE 9]>
	    <script src="assets/crossbrowserjs/excanvas.min.js"></script>
	<![endif]-->
</head>
<body>
	<!-- begin #page-loader -->
	<div id="page-loader" class="page-loader fade in"><span class="spinner">讀取中...</span></div>
	<!-- end #page-loader -->

	<!-- begin #page-container -->
	<div id="page-container" class="fade page-container page-header-fixed page-sidebar-fixed page-with-two-sidebar page-with-footer">
		<!-- begin #header -->
		<div id="header" class="header navbar navbar-default navbar-fixed-top">
			<!-- begin container-fluid -->
			<div class="container-fluid">
				<!-- begin mobile sidebar expand / collapse button -->
				<div class="navbar-header">
					<a href="/admin/system/Index" class="navbar-brand"><img src="{{ URL::asset('images/rabbijet_logo.svg') }}" class="logo" alt="" />天地圖</a>
					<button type="button" class="navbar-toggle" data-click="sidebar-toggled">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				</div>
				<!-- end mobile sidebar expand / collapse button -->

				<!-- begin navbar-right -->
				<ul class="nav navbar-nav navbar-right">
					<li>
						<!--<form class="navbar-form form-input-flat">
							<div class="form-group">
								<input type="text" class="form-control" placeholder="輸入關鍵字..." />
								<button type="submit" class="btn btn-search"><i class="fa fa-search"></i></button>
							</div>
						</form>-->
					</li>
					<li class="dropdown">
						<a href="javascript:;" data-toggle="dropdown" class="dropdown-toggle has-notify" data-click="toggle-notify"><!-- css:has-notify 表示必須要顯示提醒的綠球 -->
							<i class="fa fa-bell"></i>
						</a>
						<ul class="dropdown-menu dropdown-notification pull-right">
                            <li class="dropdown-header">通知 (0)</li>
                            <!-- 開始：單一推播通知項目 -->
<!--
                            <li class="notification-item">
                                <a href="javascript:;">
                                    <div class="media"><i class="fa fa-exclamation-triangle"></i></div>
                                    <div class="message">
                                        <h6 class="title">伺服器錯誤報告</h6>
                                        <div class="time">3分鐘前</div>
                                    </div>
                                    <div class="option" data-toggle="tooltip" data-title="Mark as Read" data-click="set-message-status" data-status="unread" data-container="body">
                                        <i class="fa fa-circle-o"></i>
                                    </div>
                                </a>
                            </li>
 -->
                            <!-- 結束：單一推播通知項目 -->
<!--
                            <li class="dropdown-footer text-center">
                                <a href="javascript:;">查看更多....</a>
                            </li>
 -->
						</ul>
					</li>
					<li class="dropdown navbar-user">
						<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
							<span class="image"><img src="{{ URL::asset('assets/img/user_profile.jpg') }}" alt="" /></span>
							<span class="hidden-xs" id="loginUserInfo">Username</span> <b class="caret"></b>
						</a>
                        <!-- 開始： 用戶的下拉選單 -->
						<ul class="dropdown-menu pull-right">
							<!--<li><a href="javascript:;">Edit Profile</a></li>
							<li><a href="javascript:;"><span class="badge badge-danger pull-right">2</span> Inbox</a></li>
							<li><a href="javascript:;">Calendar</a></li>
							<li><a href="javascript:;">Setting</a></li>
							<li class="divider"></li>-->
							<li><a href="javascript:logout();">登出系統</a></li>
						</ul>
                        <!-- 結束： 用戶的下拉選單 -->
					</li>
					<!--<li>
						<a href="javascript:;" data-click="right-sidebar-toggled">
							<i class="fa fa-align-left"></i>
						</a>
					</li>-->
				</ul>
				<!-- end navbar-right -->
			</div>
			<!-- end container-fluid -->
		</div>
		<!-- end #header -->

		<!-- begin #sidebar -->
		<div id="sidebar" class="sidebar">
			<!-- begin sidebar scrollbar -->
			<div data-scrollbar="true" data-height="100%">
				<!-- begin sidebar nav -->
				<ul id= "navMenu" class="nav">
				</ul>
				<!-- end sidebar nav -->
			</div>
			<!-- end sidebar scrollbar -->
		</div>
		<div class="sidebar-bg"></div>
		<!-- end #sidebar -->

		<!-- begin #content -->
		<div id="content" class="content">
			<!-- begin breadcrumb -->
			<ol class="breadcrumb pull-right">
				<li><a href="javascript:;">訂單</a></li>
			</ol>
			<!-- end breadcrumb -->
			<!-- begin page-header -->
			<h1 class="page-header">訂單<small>訂單列表</small></h1>
			<!-- end page-header -->

			<!-- begin section-container -->
			<div id="add" class="section-container section-with-top-border">
				<div class="panel">
					<div class="panel-heading">
						<h5>請依照以下欄位進行填寫</h5>
						<div class="btn btn-primary" onclick="$('#list').show();$('#add').hide();">回到列表</div>
					</div>
					<div class="panel-body">
						<form id="addForm" action="" method="post">
							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="form-group">
										<h2>基本資訊</h2>
									</div>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-12">
									<div class="form-group">
										<label>訂單來源</label>
										<select class="form-control" name="otaKey" id="otaKey"></select>
									</div>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-12">
									<div class="form-group">
										<label>訂單狀態</label>
										<select class="form-control" name="orderStatus" id="orderStatus">
											<option value="confirmed">已確認</option>
											<option value="pending">未確認</option>
											<option value="unpaid">未付款</option>
											<option value="deposit">已付訂</option>
											<option value="paid">已付清</option>
										</select>
									</div>
								</div>
								<div class="col-md-3 col-sm-3 col-xs-12">
									<div class="form-group">
										<label>聯絡人姓名</label>
										<input type="text" name="contactName" id="contactName" class="form-control" placeholder="請填入聯絡人姓名">
									</div>
								</div>
								<div class="col-md-3 col-sm-3 col-xs-12">
									<div class="form-group">
										<label>聯絡人電話</label>
										<input type="text" name="contactPhone" id="contactPhone" class="form-control" placeholder="請填入聯絡人電話">
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>聯絡人信箱</label>
										<input type="email" name="contactEmail" id="contactEmail" class="form-control" placeholder="請填入聯絡人信箱">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="form-group">
										<h2>訂單信息</h2>
									</div>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-12">
									<div class="form-group">
										<label>酒店名稱</label>
										<input type="hidden" name="hotelId" id="hotelId" value="">
										<input id="hotels" name="hotels" class="form-control ui-autocomplete-input" type="text" placeholder="請填寫飯定名稱" >
									</div>
								</div>
								<div class="col-md-3 col-sm-3 col-xs-12">
									<div class="form-group">
										<label>房型</label>
										<select class="form-control" name="roomTypeId" id="roomTypeId" ></select>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="input-group date">
										<label>入住時間</label>
										<input type="text" name="checkInTime" id="checkInTime" class="form-control" placeholder="YYYY-MM-DDThh:mm:ss">
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="input-group date">
										<label>退房時間</label>
										<input type="text" name="checkOutTime" id="checkOutTime" class="form-control" placeholder="YYYY-MM-DDThh:mm:ss">
									</div>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-12">
									<div class="form-group">
										<label>價格</label>
										<input type="text" name="price" id="price" class="form-control" placeholder="0">
									</div>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-12">
									<div class="form-group">
										<label>幣別</label>
										<select class="form-control" name="currencyList" id="currencyList" onchange="changeＣurrency(this);"></select>
									</div>
								</div>
								<div class="col-md-4 col-sm-4 col-xs-12">
									<div class="form-group">
										<label>轉換價格</label>
										<input type="text" name="convertPrice" id="convertPrice" class="form-control" placeholder="0">
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="panel-footer">
							<div class="btn btn-primary" onclick="$('#addForm').submit();">確定送出</div>
							<div class="btn btn-primary" onclick="$('#addForm')[0].reset();">清除重來</div>

					</div>
				</div>
			</div>
			<div id="edit" class="section-container section-with-top-border">
		    <div id="popopRemark" class="white_content">
				<h3>增加備註</h3>
				<textarea rows="10" id="remarkContent"></textarea><p>
				<div class="btn btn-primary" onclick="addRemark();">確定送出</div>
				<div class="btn btn-primary" onclick="document.getElementById('popopRemark').style.display='none'">關閉視窗</div>
		    </div>
				<div class="panel">
					<div class="panel-heading">
						<div id="cancelBtnInEdit" class="btn btn-primary" onclick="cancelOrder('edit');">拒絕</div>
						<div id="confirmBtnInEdit" class="btn btn-primary" onclick="confirmOrder('edit');">接受</div>
						<div class="btn btn-primary" onclick="exportPDF();">打印</div>
						<div class="btn btn-primary" onclick=" $('#remarkContent').val('');document.getElementById('popopRemark').style.display='block';">備註</div>
						<div class="btn btn-primary" onclick="sendMail()">發單</div>

						<div class="btn btn-primary" onclick="$('#list').show();$('#edit').hide();">回到列表</div>
					</div>
					<div class="panel-body">
						<form id="editForm" action="" method="post">
							<input type="hidden" name="editId" id="editId"/>
							<input type="hidden" name="action" id="action" value="edit"/>
							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="form-group">
										<h2>訂單信息</h2>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>訂單號 :</label>
										<span id="editOrderId"></span>
									</div>
								</div>
								<!-- <div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>訂單類型 :</label>

									</div>
								</div> -->
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>訂單狀態 :</label>
										<span id="editStatus"></span>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="form-group">
										<h2>酒店資訊</h2>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>酒店名稱 :</label>
										<span id="editHoteName"></span>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>電話 :</label>
										<span id="editHoteTel"></span>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>地址 :</label>
										<span id="editHoteAddress"></span>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="form-group">
										<h2>入住資訊</h2>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>計畫 :</label>
										<span id="editPlanName"></span>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>房型 :</label>
										<span id="editRomeName"></span>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>入離時間 :</label>
										<span id="editCheckTime"></span>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>預計間數 :</label>
										<span id="editRooms"></span>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>價格:</label>
										<input type="text" name="editPrice" id="editPrice" class="form-control" placeholder="0">
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>聯絡人:</label>
										<input type="text" name="editContactName" id="editContactName" class="form-control" placeholder="">
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>聯絡人信箱:</label>
										<input type="text" name="editContactEmail" id="editContactEmail" class="form-control" placeholder="">
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-12">
									<div class="form-group">
										<label>聯絡人電話:</label>
										<input type="text" name="editContactPhone" id="editContactPhone" class="form-control" placeholder="">
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="form-group">
										<label>訂單備註</label>
										<textarea class="form-control" rows="5" name="editOrderRemark" id="editOrderRemark" placeholder="請輸入訂單備註"></textarea>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="form-group">
										<h2>備註</h2>
									</div>
								</div>
								<div class="col-md-12 col-sm-12 col-xs-12">
									<table id="grid-remark" class="table table-bordered table-hover">
										<thead>
											<tr class="lime">
												<th>備註</th>
												<th>時間</th>
												<th>人員</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 col-sm-12 col-xs-12">
									<div class="form-group">
										<h2>日誌</h2>
									</div>
								</div>
								<div class="col-md-12 col-sm-12 col-xs-12">
									<table id="grid-journal" class="table table-bordered table-hover">
										<thead>
											<tr class="lime">
												<th>時間</th>
												<th>人員</th>
												<th>描述</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
						</form>
					</div>
					<div class="panel-footer">
						<div class="btn btn-primary" onclick="$('#editForm').submit();">確定送出</div>
						<!-- 							<div class="btn btn-primary" onclick="$('#editForm')[0].reset();">清除重來</div> -->
					</div>
				</div>
			</div>
			<!-- begin panel -->
			<div id="list" class="section-container section-with-top-border">
				<div id="list" class="panel">
				<div class="panel-heading">
					<input type="hidden" id="orderMode" value="pending">
					<div class="row">
						<div class="btn btn-primary" onclick="$('#addForm')[0].reset();addＣurrencyList();addHotelList();addOtaList();$('#list').hide();$('#add').show();">新增</div>
					</div>
					<div class="row">
						<!-- 開始：一個搜尋的欄位 -->
						<div class="col-md-3 col-sm-3 col-xs-12">
							<div class="form-group">
								<label>訂單編號</label>
								<input type="text" id="searchOrderNumber" class="form-control" placeholder="請填寫訂單編號">
							</div>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-12">
							<div class="form-group">
								<label>客人姓名</label>
								<input type="text" id="searchContactName" class="form-control" placeholder="請填寫客人姓名">
							</div>
						</div>
						<div class="col-md-6 col-sm-6 col-xs-12">
							<div class="form-group">
								<label>酒店名稱</label>
								<input type="text" id="searchHotelName" class="form-control" placeholder="請填寫酒店名稱">
							</div>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-12">
							<div class="form-group">
								<label>訂單狀態</label>
								<select class="form-control" name="searchOrderStatus" id="searchOrderStatus">
									<option value="">未選擇</option>
									<option value="unpaid">未付款</option>
									<option value="deposit">已付訂</option>
									<option value="paid">已付清</option>
									<option value="canceled">已取消</option>
									<option value="pending">待確認</option>
								</select>
							</div>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-12">
							<div class="form-group">
								<label>時間</label>
								<select class="form-control" name="searchTimeSelection" id="searchTimeSelection" onchange="changeDateSelection(this);">
									<option value="0" selected>全部時間</option>
									<option value="1">下單時間</option>
									<option value="2">入住時間</option>
									<option value="3">離店時間</option>
								</select>
							</div>
						</div>

						<!-- 結束：一個搜尋的欄位 -->
						<!-- 開始：一個搜尋的欄位 -->
						<div class="col-md-6 col-sm-6 col-xs-6">
							<div class="form-group">
								<label class="control-label"></label>
								<div class="form-group">
									<div id="dateSelection" class="input-group input-daterange" data-date-format="yyyy-mm-dd">
										<input type="text" class="form-control" name="searchOrderStartTime" id="searchOrderStartTime" placeholder="開始日期">
										<span class="input-group-addon">至</span>
										<input type="text" class="form-control" name="searchOrderEndTime" id="searchOrderEndTime" placeholder="結束日期">
									</div>
								</div>
							</div>
						</div>
						 <!-- 結束：一個搜尋的欄位 -->
						<!-- 開始：一個搜尋的欄位 -->
<!--
						<div class="col-md-2 col-sm-2 col-xs-12">
							<div class="form-group">
								<label class="control-label">入住時間</label>
								<div class="form-group">
									<input type="radio" class="form-control" name="searchTimeSelection" value="2">
								</div>
<!~~
								<div class="input-group input-daterange" data-date-format="yyyy-mm-dd">
									<input type="text" class="form-control" name="searchCheckInStartTime" id="searchCheckInStartTime" placeholder="開始日期">
									<span class="input-group-addon">至</span>
									<input type="text" class="form-control" name="searchCheckInEndTime" id="searchCheckInEndTime" placeholder="結束日期">
								</div>
 ~~>
							</div>
						</div>
 -->
						 <!-- 結束：一個搜尋的欄位 -->
						<!-- 開始：一個搜尋的欄位 -->
<!--
						<div class="col-md-2 col-sm-2 col-xs-12">
							<div class="form-group">
								<label class="control-label">離店時間</label>
								<div class="form-group">
									<input type="radio" class="form-control" name="searchTimeSelection" value="3">
								</div>
<!~~
								<div class="input-group input-daterange" data-date-format="yyyy-mm-dd">
									<input type="text" class="form-control" name="searchCheckOutStartTime" id="searchCheckOutStartTime" placeholder="開始日期">
									<span class="input-group-addon">至</span>
									<input type="text" class="form-control" name="searchCheckOutEndTime" id="searchCheckOutEndTime" placeholder="結束日期">
								</div>
 ~~>
							</div>
						</div>
 -->
						 <!-- 結束：一個搜尋的欄位 -->
						<!-- 開始：一個搜尋的欄位 -->
<!--
						<div class="col-md-2 col-sm-2 col-xs-12">
							<div class="form-group">
								<label class="control-label">全部時間</label>
								<div class="form-group">
									<input type="radio" class="form-control" name="searchTimeSelection" value="0" checked>								</div>
							</div>
						</div>
 -->
						 <!-- 結束：一個搜尋的欄位 -->
				  </div>
				  <div class="row">
				  		<div class="btn btn-primary" onclick="doOrderSearch();">搜尋</div>
				  </div>

				</div>
				<ul class="nav nav-tabs">
					<li id="tab1" class="active"><a href="#default-tab-1" data-toggle="tab" onclick="changeOrderTab('pending');">未處理</a></li>
					<li id="tab2" class=""><a href="#default-tab-2" data-toggle="tab" onclick="changeOrderTab('canceled');">取消單</a></li>
					<li id="tab3" class=""><a href="#default-tab-3" data-toggle="tab" onclick="changeOrderTab('todayIn');">今日新進</a></li>
					<li id="tab4" class=""><a href="#default-tab-4" data-toggle="tab" onclick="changeOrderTab('todayCheckIn');">今日入住</a></li>
				</ul>
				<div class="tab-content m-b-0">
					<div class="tab-pane fade active in" >
						<table id="grid-basic" class="table table-bordered table-hover">
							<thead>
								<tr class="lime">
									<th>訂單號</th>
									<th>OTA</th>
									<th>房型</th>
									<th>入離時間</th>
									<th>間數</th>
									<th>天數</th>
									<th>入住人員</th>
									<th>通知時間</th>
									<th>總金額</th>
									<th>狀態</th>
									<th>快速</th>
									<th>操作</th>
								</tr>
							</thead>
						</table>

<!--
						<table id="grid-basic" class="table table-condensed table-hover table-striped"  >
							<thead>
							<tr class="lime">
		<!~~                     	<th data-column-id="id" data-width="20%">id</td> ~~>
								<th data-column-id="orderHotelInfo" data-width="13%" data-formatter="orderHotelInfo">訂單號</td>
								<th data-column-id="otaInfo" data-width="10%" data-formatter="otaInfo">OTA</td>
								<th data-column-id="roomInfo" data-width="10%" data-formatter="roomInfo">房型</td>
								<th data-column-id="stayInfo" data-width="12%"data-formatter="stayInfo">入離時間</td>
								<th data-column-id="stay_info_count" data-width="10%">間數</td>
								<th data-column-id="daysdiff" data-width="10%" data-formatter="daysdiff">天數</td>
								<th data-column-id="contact_name" data-width="12%">入住人員</td>
								<th data-column-id="updateInfo" data-width="12%" data-formatter="updateInfo">通知時間</td>
								<th data-column-id="price" data-width="10%">總金額</td>
								<th data-column-id="status" data-width="10%" data-formatter="status">狀態</td>
								<th data-column-id="quickCommands" data-width="10%" data-formatter="quickCommands" data-sortable="false">快速</td>
								<th data-column-id="commands" data-width="10%" data-formatter="commands" data-sortable="false">操作</td>
							</tr>
							</thead>
						</table>
 -->
					</div>
				</div>
			</div>
			</div>
			<!-- end panel -->




			<!-- end section-container -->

            <!-- begin #footer -->
            <div id="footer" class="footer">
                <span class="pull-right">
                    <a href="javascript:;" class="btn-scroll-to-top" data-click="scroll-top">
                        <i class="fa fa-arrow-up"></i> <span class="hidden-xs">Back to Top</span>
                    </a>
                </span>
                &copy; 2016 <b>愛台風</b> All Right Reserved
            </div>
            <!-- end #footer -->
		</div>
		<!-- end #content -->


	</div>
	<!-- end page container -->

    <!-- begin theme-panel -->
    <div class="theme-panel">
        <a href="javascript:;" data-click="theme-panel-expand" class="theme-collapse-btn"><i class="fa fa-tint"></i></a>
    <div class="theme-panel-content">
        <h5 class="m-t-0">Font Family</h5>
        <div class="row row-space-10">
            <div class="col-md-6">
                <a href="#" class="btn btn-default btn-block btn-sm m-b-10 active" data-value="" data-src="http://fonts.googleapis.com/css?family=Nunito:400,300,700" data-click="body-font-family">
                    Nunito (Default)
                </a>
            </div>
            <div class="col-md-6">
                <a href="#" class="btn btn-default btn-block btn-sm m-b-10" data-value="font-open-sans" data-src="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" data-click="body-font-family">
                    Open Sans
                </a>
            </div>
            <div class="col-md-6">
                <a href="#" class="btn btn-default btn-block btn-sm m-b-10" data-value="font-roboto" data-src="https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900" data-click="body-font-family">
                    Roboto
                </a>
            </div>
            <div class="col-md-6">
                <a href="#" class="btn btn-default btn-block btn-sm m-b-10" data-value="font-lato" data-src="https://fonts.googleapis.com/css?family=Lato:400,100,300,700,900" data-click="body-font-family">
                    Lato
                </a>
            </div>
            <div class="col-md-12">
                <a href="#" class="btn btn-default btn-block btn-sm" data-value="font-helvetica-arial" data-src="" data-click="body-font-family">
                    Helvetica Neue, Helvetica , Arial
                </a>
            </div>
        </div>
        <div class="horizontal-divider"></div>
        <h5 class="m-t-0">Header Theme</h5>
            <ul class="theme-list clearfix">
                <li><a href="javascript:;" class="bg-inverse" data-value="navbar-inverse" data-click="header-theme-selector" data-toggle="tooltip" data-title="Default">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-grey" data-value="navbar-grey" data-click="header-theme-selector" data-toggle="tooltip" data-title="Grey">&nbsp;</a></li>
                <li class="active"><a href="javascript:;" class="bg-white" data-value="navbar-default" data-click="header-theme-selector" data-toggle="tooltip" data-title="Light">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-purple" data-value="navbar-purple" data-click="header-theme-selector" data-toggle="tooltip" data-title="Purple">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-primary" data-value="navbar-primary" data-click="header-theme-selector" data-toggle="tooltip" data-title="Primary">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-success" data-value="navbar-success" data-click="header-theme-selector" data-toggle="tooltip" data-title="Success">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-lime" data-value="navbar-lime" data-click="header-theme-selector" data-toggle="tooltip" data-title="Lime">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-warning" data-value="navbar-warning" data-click="header-theme-selector" data-toggle="tooltip" data-title="Warning">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-danger" data-value="navbar-danger" data-click="header-theme-selector" data-toggle="tooltip" data-title="Danger">&nbsp;</a></li>
            </ul>
            <div class="horizontal-divider"></div>
            <h5 class="m-t-0">Sidebar Highlight Color</h5>
            <ul class="theme-list clearfix">
                <li><a href="javascript:;" class="bg-inverse" data-value="sidebar-highlight-inverse" data-click="sidebar-highlight-selector" data-toggle="tooltip" data-title="Inverse">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-grey" data-value="sidebar-highlight-grey" data-click="sidebar-highlight-selector" data-toggle="tooltip" data-title="Grey">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-white" data-value="sidebar-highlight-light" data-click="sidebar-highlight-selector" data-toggle="tooltip" data-title="Light">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-purple" data-value="sidebar-highlight-purple" data-click="sidebar-highlight-selector" data-toggle="tooltip" data-title="Purple">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-primary" data-value="sidebar-highlight-primary" data-click="sidebar-highlight-selector" data-toggle="tooltip" data-title="Primary">&nbsp;</a></li>
                <li class="active"><a href="javascript:;" class="bg-success" data-value="" data-click="sidebar-highlight-selector" data-toggle="tooltip" data-title="Default">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-lime" data-value="sidebar-highlight-lime" data-click="sidebar-highlight-selector" data-toggle="tooltip" data-title="Lime">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-warning" data-value="sidebar-highlight-warning" data-click="sidebar-highlight-selector" data-toggle="tooltip" data-title="Warning">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-danger" data-value="sidebar-highlight-danger" data-click="sidebar-highlight-selector" data-toggle="tooltip" data-title="Danger">&nbsp;</a></li>
            </ul>
            <div class="horizontal-divider"></div>
            <h5 class="m-t-0">Sidebar Theme</h5>
            <ul class="theme-list clearfix">
                <li class="active"><a href="javascript:;" class="bg-inverse" data-value="" data-click="sidebar-theme-selector" data-toggle="tooltip" data-title="Default">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-grey" data-value="sidebar-grey" data-click="sidebar-theme-selector" data-toggle="tooltip" data-title="Grey">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-white" data-value="sidebar-light" data-click="sidebar-theme-selector" data-toggle="tooltip" data-title="Light">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-purple" data-value="sidebar-purple" data-click="sidebar-theme-selector" data-toggle="tooltip" data-title="Purple">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-primary" data-value="sidebar-primary" data-click="sidebar-theme-selector" data-toggle="tooltip" data-title="Primary">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-success" data-value="sidebar-success" data-click="sidebar-theme-selector" data-toggle="tooltip" data-title="Success">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-lime" data-value="sidebar-lime" data-click="sidebar-theme-selector" data-toggle="tooltip" data-title="Lime">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-warning" data-value="sidebar-warning" data-click="sidebar-theme-selector" data-toggle="tooltip" data-title="Warning">&nbsp;</a></li>
                <li><a href="javascript:;" class="bg-danger" data-value="sidebar-danger" data-click="sidebar-theme-selector" data-toggle="tooltip" data-title="Danger">&nbsp;</a></li>
            </ul>
        </div>
    </div>
    <!-- end theme-panel -->

	<!-- ================== BEGIN BASE JS ================== -->
	<script src="{{ URL::asset('assets/plugins/jquery/jquery-1.9.1.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/jquery/jquery-migrate-1.1.0.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/jquery-ui/ui/minified/jquery-ui.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/bootstrap/js/bootstrap.min.js') }}"></script>
	<!--[if lt IE 9]>
		<script src="assets/crossbrowserjs/html5shiv.js"></script>
		<script src="assets/crossbrowserjs/respond.min.js"></script>
	<![endif]-->
	<script src="{{ URL::asset('assets/plugins/slimscroll/jquery.slimscroll.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/jquery-cookie/jquery.cookie.js') }}"></script>
	<!-- ================== END BASE JS ================== -->

	<!-- ================== BEGIN PAGE LEVEL JS ================== -->
    <script src="{{ URL::asset('assets/plugins/bootstrap-calendar/js/bootstrap_calendar.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/ionRangeSlider/js/ion-rangeSlider/ion.rangeSlider.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/masked-input/masked-input.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/strength-js/strength.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/bootstrap-combobox/js/bootstrap-combobox.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/bootstrap-select/bootstrap-select.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput-typeahead.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/jquery-tag-it/js/tag-it.min.js') }}"></script>
    <script src="{{ URL::asset('assets/plugins/bootstrap-daterangepicker/moment.js') }}"></script>
    <script src="{{ URL::asset('assets/plugins/bootstrap-daterangepicker/daterangepicker.js') }}"></script>
    <script src="{{ URL::asset('assets/plugins/select2/dist/js/select2.min.js') }}"></script>
    <script src="{{ URL::asset('assets/plugins/bootstrap-eonasdan-datetimepicker/build/js/bootstrap-datetimepicker.min.js') }}"></script>
    <script src="{{ URL::asset('assets/plugins/DataTables/media/js/jquery.dataTables.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/DataTables/extensions/FixedHeader/js/dataTables.fixedHeader.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/page-table-manage-fixed-header.demo.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/page-form-plugins.demo.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/demo.min.js') }}"></script>
    <script src="{{ URL::asset('assets/js/apps.min.js') }}"></script>
	<!-- ================== END PAGE LEVEL JS ================== -->

	<script type="text/javascript" src="{{ URL::asset('js/js.cookie.js') }}"></script>
	<script src="{{ URL::asset('js/v7idea.js') }}"></script>

	<script>
		$(document).ready(function() {
		    App.init();
		    Demo.init();
		    PageDemo.init();
		    checkOrderTab();
		});

		checkToken();
		var orderTable = listOrders();
		var remarkTable = null;
		var journalTable = null;


  		$('#add').hide();
  		$('#edit').hide();
  		$('#dateSelection').hide();

		$('#checkInTime').datetimepicker({
			format : 'YYYY-MM-DDTHH:mm:ss',
			useCurrent: false,
			defaultDate:moment().hours(15).minutes(0).seconds(0).milliseconds(0).format('YYYY-MM-DD HH:mm:ss'),
		});

		$('#checkOutTime').datetimepicker({
			format : 'YYYY-MM-DDTHH:mm:ss',
			defaultDate:moment().add(1, 'd').hours(12).minutes(0).seconds(0).milliseconds(0),
			useCurrent: false //Important! See issue #1075
		});

		$("#checkInTime").on("dp.change", function (e) {
			$('#checkOutTime').data("DateTimePicker").minDate(e.date);
		});
		$("#checkOutTime").on("dp.change", function (e) {
			$('#checkInTime').data("DateTimePicker").maxDate(e.date);
		});



		$("#addForm").submit(function(){

		//   	var formData = $("#addForm").serialize();
			var formData = new FormData($(this)[0]);

			$.ajax({
				url: "/api/v1/wsorders",
				type: 'POST',
				data: formData,
				async: false,
				headers: {
					'Authorization': Cookies.get('authToken')
				},
				success: function (data) {
					$("#add").hide();

					orderTable.ajax.reload();

					$("#list").show();
				},
				error:function (xhr, ajaxOptions, thrownError){
					switch (xhr.status) {
						case 422:
							alert('新增資料不完全');
							break;
						case 409:
							alert('名稱重複');
							break;
						case 401:
							alert('Token 不存在');
							window.location.replace("/admin/login");
							break;
						default:
							alert('無法新增資料');
					}
				},
				cache: false,
				contentType: false,
				processData: false
			});

			return false;

		});

		$("#editForm").submit(function(){

			var formData = $("#editForm").serialize();

			$.ajax({
				url: "/api/v1/wsorders/" + $('#editId').val(),
				type: 'PUT',
				data: formData,
				async: false,
				headers: {
					'Authorization': Cookies.get('authToken')
				},
				success: function (data) {
					$("#edit").hide();

					orderTable.ajax.reload();

					$("#list").show();
				},
				error:function (xhr, ajaxOptions, thrownError){
					switch (xhr.status) {
						case 422:
							alert('修改資料不完全');
							break;
						case 409:
							alert('名稱重複');
							break;
						case 401:
							alert('Token 不存在');
							window.location.replace("/admin/login");
							break;
						default:
							alert('無法修改資料');
					}
				},
				cache: false
			});

			return false;

		  });

	</script>
</body>
</html>
