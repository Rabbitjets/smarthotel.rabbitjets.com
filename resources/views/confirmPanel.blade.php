<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="{{ URL::asset('assets/plugins/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet" />
    <script src="{{ URL::asset('assets/plugins/jquery/jquery-1.9.1.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/jquery/jquery-migrate-1.1.0.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/jquery-ui/ui/minified/jquery-ui.min.js') }}"></script>
	<script src="{{ URL::asset('assets/plugins/bootstrap/js/bootstrap.min.js') }}"></script>
  </head>
<body>
<p>您的訂單訊息如下：</p>

<table border="1" cellpadding="0" cellspacing="0">
	<tbody>

		<tr>
			<td colspan="2">
			<p align="center">訂單信息</p>
			</td>
		</tr>

		<tr>
			<td style="width:121px;">
			<p align="center">訂單號</p>
			</td>
			<td style="width:437px;">
			<p><?php echo $orderId; ?></p>
			</td>
		</tr>

		<tr>
			<td style="width:121px;">
			<p align="center">訂單類型</p>
			</td>
			<td style="width:437px;">
			<p></p>
			</td>
		</tr>

		<tr>
			<td style="width:121px;">
			<p align="center">訂單狀況</p>
			</td>
			<td style="width:437px;">
			<p><?php echo $status; ?></p>
			</td>
		</tr>

		<tr>
			<td colspan="2">
			<p align="center">酒店資訊</p>
			</td>
		</tr>


		<tr>
			<td style="width:121px;">
			<p align="center">酒店名稱</p>
			</td>
			<td style="width:437px;">
			<p><?php echo $hotelName; ?></p>
			</td>
		</tr>


		<tr>
			<td style="width:121px;">
			<p align="center">電話</p>
			</td>
			<td style="width:437px;">
			<p><?php echo $hotelTel; ?></p>
			</td>
		</tr>

		<tr>
			<td style="width:121px;">
			<p align="center">地址</p>
			</td>
			<td style="width:437px;">
			<p><?php echo $hotelAddress; ?></p>
			</td>
		</tr>

		<tr>
			<td colspan="2">
			<p align="center">入住資訊</p>
			</td>
		</tr>

    <tr>
			<td style="width:121px;">
			<p align="center">計畫</p>
			</td>
			<td style="width:437px;">
			<p><?php echo $planName; ?></p>
			</td>
		</tr>

		<tr>
			<td style="width:121px;">
			<p align="center">房型</p>
			</td>
			<td style="width:437px;">
			<p><?php echo $romeName; ?></p>
			</td>
		</tr>

		<tr>
			<td style="width:121px;">
			<p align="center">入離時間</p>
			</td>
			<td style="width:437px;">
			<p><?php echo $checkTime; ?></p>
			</td>
		</tr>

		<tr>
			<td style="width:121px;">
			<p align="center">預計間數</p>
			</td>
			<td style="width:437px;">
			<p><?php echo $rooms; ?></p>
			</td>
		</tr>

		<tr>
			<td style="width:121px;">
			<p align="center">聯絡人</p>
			</td>
			<td style="width:437px;">
			<p><?php echo $contactName; ?></p>
			</td>
		</tr>

	</tbody>
</table>

		<div class="btn btn-primary" onclick="confirmOrder('<?php echo $id; ?>');">接收</div>
		<div class="btn btn-primary" onclick="cancelOrder('<?php echo $id; ?>');">拒絕</div>

	<script>
	function confirmOrder(id) {
		$.ajax({
			url: "/merchant/confirm/" + id,
			type: 'PUT',
			async: false,
			data: {
				'action': 'confirmOrder'
			},
			success: function (data) {
				alert('已確認訂單');
				window.location = '/merchant/confirm/' + id;
			},
			error:function (xhr, ajaxOptions, thrownError){
				switch (xhr.status) {
					case 422:
						alert('訂單狀態不對，無法確認訂單');
						break;
					case 404:
						alert('訂單不存在');
						break;
					default:
						alert('無法確認訂單');
				}
			},
			cache: false
		});

	}

	function cancelOrder(id) {
		$.ajax({
			url: "/merchant/confirm/" + id,
			type: 'PUT',
			async: false,
			data: {
				'action': 'cancelOrder'
			},
			success: function (data) {
				alert('已取消訂單');
				window.location = '/merchant/confirm/' + id;
			},
			error:function (xhr, ajaxOptions, thrownError){
				switch (xhr.status) {
					case 422:
						alert('訂單狀態不對，無法取消訂單');;
						break;
					case 404:
						alert('訂單不存在');
						break;
					default:
						alert('無法取消訂單');
				}
			},
			cache: false
		});

	}
	</script>
</body>
</html>
