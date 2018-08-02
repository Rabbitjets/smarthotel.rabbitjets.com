<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="{{ URL::asset('assets/plugins/jquery/jquery-1.9.1.min.js') }}"></script>
</head>
 <body style="background-color:powderblue;">
   <div id="contenArea"></div>
   <script>

   $(document).ready(function() {
     loadData();
   });
   //Get URL Vars
    function getUrlVars()
    {
       var vars = [], hash;
       if ( window.location.href.indexOf('#') != -1 ) {
         var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1, window.location.href.indexOf('#')).split('&');
       } else{
         var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
       }
       for(var i = 0; i < hashes.length; i++)
       {
           hash = hashes[i].split('=');
           vars.push(hash[0]);
           vars[hash[0]] = hash[1];
       }
       return vars;
    }
    function loadData(){

          $.ajax({
            type: "GET",
            url: 'http://114.35.110.109:8005/api/v1/creditByTest/' + getUrlVars()["id"],
            error: function (v_obj_xhr) {
                // alert("error1:" + v_obj_xhr.status);
            },
            success: function (v_str_response) {
                // console.log(v_str_response);
                if(v_str_response.status == '0'){
                    $('#contenArea').html(v_str_response.data);

                }
            }
        });


    }

   </script>
 </body>
</html>
