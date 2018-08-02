<?php

namespace App;

use Carbon\Carbon;

use App\Log;

use SimpleXMLElement;

use MongoDB\BSON\ObjectId;

use MongoDB\BSON\UTCDateTime;


class SMS extends Model
{
    public static function sendTwSMS($useName,$userMobile,$sendContent,$userId){

      

      


      $message = urlencode($sendContent);

      $payloadData = "";

      // $headers = array('Content-Type: application/x-www-form-urlencodedrn'
			// 				);

      $ch = curl_init();
			curl_setopt( $ch, CURLOPT_URL, $smsUrl );
			curl_setopt( $ch, CURLOPT_POST, true );
      //curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			$result = curl_exec( $ch );


      $response = new SimpleXMLElement($result);
      $code = (string)$response->code;
      $status = (string)$response->text;
      $msgId = (string)$response->msgid;


      $storeArray = array(
                    
      );

      $log = Log::create($storeArray);

      if($code == "00000"){

        return true;

      }else{

        return false;
      }

    }
}
