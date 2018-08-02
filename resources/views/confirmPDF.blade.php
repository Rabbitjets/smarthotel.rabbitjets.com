<html lang="zh">
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<style>
		@font-face {
		  font-family: 'Noto Sans';
		  font-style: normal;
		  font-weight: 400;
		  src: url({{storage_path()}}/fonts/fireflysung.ttf) format('truetype');
		}
		* {
		  font-family: Noto Sans, DejaVu Sans, sans-serif;
		}
	</style>
	</head>
<body>
<p><?php echo $name; ?>  您好：</p>

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


</body>
</html>
