<?php




class TTDetailsService {
  // Properties
  public $novaRowid ="";
  
	  /* function get_row_id($ctt_number) {
		  $this->name = "tahi";
	  } */


	function get_row_id($ctt_number) {

		
		$novaRowid2 = new TTDetailsService(); 
		//print($apple->data);
		$length = 8; 
		$reg = substr(str_shuffle("0123456789"), 0, $length);
        $finalreg = "152".time()-$reg;
		$datestring = date("d/m/Y H:i:s");
		
	 	$xml = '<PortalMessage>
		  <Header>
			<BusinessEvent>TTDetailsRetrieve</BusinessEvent>
			<Timestamp>'.$datestring.'</Timestamp>
			<ReqResType>Request</ReqResType>
			<MessageId>'.$finalreg.'</MessageId>
		  </Header>
		  <Request>
			<TroubleTicketID>'.$ctt_number.'</TroubleTicketID>
		  </Request>
		</PortalMessage>';

		$url = "http://10.41.22.44:7280/prj_HsbbEai_Sync_War/httpMessageReceiver.do";
		
		
		

		$ch = curl_init($url);

		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
		curl_setopt($ch, CURLOPT_POSTFIELDS, "$xml");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$output = curl_exec($ch); 

/*
		 $output2 ='<?xml version="1.0" encoding="UTF-8" standalone="no"?>
		<PortalMessage>
			<Header>
				<BusinessEvent>TTDetailsRetrieve</BusinessEvent>
				<Timestamp>02/13/2023 17:37:09</Timestamp>
				<ReqResType>Response</ReqResType>
				<ErrorCode/>
				<ErrorMessage/>
			</Header>
			<Response>
				<TroubleTicketID>1-61795561188</TroubleTicketID>
				<BillingAccountNo/>
				<ServiceID>BU8299931223</ServiceID>
				<Category>Failure</Category>
				<Description>as per req by CFF RR to create CTT due to UPB problem</Description>
				<PreferredCommunication>Mobile</PreferredCommunication>
				<Status>Open</Status>
				<CreateDate>02/08/2023 08:34:39</CreateDate>
				<ClosedDate/>
				<ClosedBy/>
				<Contact>
					<LastName>KHO CHEOK LIAN</LastName>
					<OfficePhone/>
					<MobilePhone>0138188488</MobilePhone>
					<HomePhone/>
					<EmailAddress>patkcl118@yahoo.com</EmailAddress>
				</Contact>
				<ResolutionCode/>
				<SourcePortal/>
				<Symptom>Blank Screen_All Channel</Symptom>
				<AssignedtoStatus/>
				<AccountId>1-RZO111145</AccountId>
				<TypeId>New NRIC</TypeId>
				<CustId>690124-13-5005</CustId>
			</Response>
		</PortalMessage>'; 
		
		
		 $output1 ='<?xml version="1.0" encoding="UTF-8" standalone="no"?>
				<PortalMessage>
					<Header>
						<BusinessEvent>TTDetailsRetrieve</BusinessEvent>
						<Timestamp>03/10/2023 23:51:42</Timestamp>
						<ReqResType>Response</ReqResType>
						<ErrorCode/>
						<ErrorMessage/>
					</Header>
					<Response>
						<TroubleTicketID/>
						<ServiceID/>
						<Category/>
						<Description/>
						<PreferredCommunication/>
						<Status/>
						<CreateDate/>
						<Contact>
							<LastName/>
							<MobilePhone/>
						</Contact>
						<SourcePortal/>
						<AssignedtoStatus/>
						<AccountId/>
						<TypeId/>
						<CustId/>
					</Response>
				</PortalMessage>'; 
		 */ 

				$xmlout = simplexml_load_string($output);
				$json = json_encode($xmlout, JSON_PRETTY_PRINT);
				$jsonDecoded = json_decode($json);
				$accountidReq = $jsonDecoded->Response->AccountId;
				$segment = $jsonDecoded->Response->TypeId;
				$statusCtt = $jsonDecoded->Response->Status;
				$serviceid = $jsonDecoded->Response->ServiceID;
				 
				 
				$referVal ="@unifi";
				$inputSvcId = $serviceid;
				$outputServiceid  = stristr($inputSvcId,$referVal);
				if(!empty($outputServiceid)){
				  //echo $outputServiceid; 
				    return $accountidReq;
				}else if(is_numeric($inputSvcId)){
				  //echo $inputSvcId; 
				   return $accountidReq;
				}else{
				  //echo "Sila refer SAO untuk Contact";
				   return "P10";
				}

				 
				 
				 
				
				/* unset($jsonDecoded);
				unset($json);
				unset($xmlout);
				unset($xmlout); */
				
				//return $accountidReq;

		}

}




?>