<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
  </head>
<body >
<input type="hidden" name="message" id="message" value="<?php echo $message; ?>"/></input>

<script src="{{ URL::asset('assets/plugins/jquery/jquery-1.9.1.min.js') }}"></script>
<script src="{{ URL::asset('assets/plugins/jquery/jquery-migrate-1.1.0.min.js') }}"></script>
<script type="text/javascript">

$(document).ready(function() {
    index();
});

 function index(){

    //alert('call android back home function');

    var message = document.getElementById("message").value;

    if (message !== ''){
      
      android.returnPayStatus('fail',message);

    }else{

      android.returnPayStatus('fail');

    }


 }

</script>
</body>
</html>
