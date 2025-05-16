<?php

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Vary: Origin');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
require_once('Trans.php');
// try{
// $soapclient = new SoapClient('http://10.41.22.44:7280/prj_HsbbEai_Sync_War/httpMessageReceiver.do');

// }catch(Exception $e){
	// $e->getMessage();
	
// }

$apple = new Trans(); 
//print($apple->data);

// echo $apple->get_trans_id('S53902','TTDetailsRetrive');

/* $xml = '<PortalMessage>
  <Header>
    <BusinessEvent>TTDetailsRetrieve</BusinessEvent>
    <Timestamp>13/02/2023 10:05:31</Timestamp>
    <ReqResType>Request</ReqResType>
	<MessageId>1-61795561188</MessageId>
  </Header>
  <Request>
    <TroubleTicketID>1-61795561188</TroubleTicketID>
  </Request>
</PortalMessage>';

$url = "http://10.41.22.44:7280/prj_HsbbEai_Sync_War/httpMessageReceiver.do";

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
curl_setopt($ch, CURLOPT_POSTFIELDS, "$xml");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch); */

 $output ='<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
        <ServiceID>6085320886</ServiceID>
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
        <AccountId>1-RZOHS59</AccountId>
        <TypeId>New NRIC</TypeId>
        <CustId>690124-13-5005</CustId>
    </Response>
</PortalMessage>';
 

$xml = simplexml_load_string($output);
$json = json_encode($xml, JSON_PRETTY_PRINT);
//echo $json;

$jsonDecoded = json_decode($json);
// echo $accountidReq = $jsonDecoded->Response->AccountId;


//curl_close($ch); "BusinessEvent":



/* $xml2 = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<PortalMessage>
	<Header>
		<BusinessEvent>CustomerProfileRetrieve</BusinessEvent>
		<Timestamp>02/13/2023 22:28:42</Timestamp>
		<ReqResType>Request</ReqResType>
		<MessageId>150000330018978</MessageId>
	</Header>
	<Request>
		<AccountNo>'.$accountidReq.'</AccountNo>
	</Request>
</PortalMessage>';

$url2 = "http://10.41.22.44:7280/prj_HsbbEai_Sync_War/httpMessageReceiver.do";

$ch2 = curl_init($url2);

curl_setopt($ch2, CURLOPT_POST, 1);
curl_setopt($ch2, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
curl_setopt($ch2, CURLOPT_POSTFIELDS, "$xml2");
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
$output2 = curl_exec($ch2);
echo $output2;
curl_close($ch2);
 */


  $output2 ='<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<PortalMessage>
	<Header>
		<BusinessEvent>CustomerProfileRetrieve</BusinessEvent>
		<Timestamp>02/13/2023 23:28:43</Timestamp>
		<ReqResType>Response</ReqResType>
		<ErrorCode/>
		<ErrorMessage/>
	</Header>
	<Response>
		<CustomerAccount>
			<AccountNo>1-RZOHS59</AccountNo>
			<CustomerName>BENTEN CONSTRUCTION SDN. BHD.</CustomerName>
			<SegmentCode>S10</SegmentCode>
			<SegmentGroup>SME</SegmentGroup>
			<PrimaryIDType>Business Registration Number</PrimaryIDType>
			<PrimaryIDNo>626331-X</PrimaryIDNo>
			<TMExternalSource>Partner Portal</TMExternalSource>
			<Blacklist>Not Applicable</Blacklist>
			<MobilePhone>0166555939</MobilePhone>
			<OfficePhone/>
			<HomePhone/>
			<ContactMethod>Mobile</ContactMethod>
			<Industry>PNC</Industry>
			<EmailAddress>account@benten.com.my</EmailAddress>
			<FaxNumber/>
			<ExpiryDate/>
			<PreferredLanguage>English</PreferredLanguage>
			<CustomerAddress>
				<AddressType/>
				<HouseUnitLot>B-25-01</HouseUnitLot>
				<Postcode>55000</Postcode>
				<Floor>25</Floor>
				<BuildingName>MENARA B KOMPLEKS PAVILION AMPANG</BuildingName>
				<StreetType>JALAN</StreetType>
				<StreetName>AMPANG</StreetName>
				<Section>TAMAN U THANT</Section>
				<City>KUALA LUMPUR</City>
				<State>WILAYAH PERSEKUTUAN</State>
				<Country>MALAYSIA</Country>
				<TMAddressID>1-RBJGBG4</TMAddressID>
			</CustomerAddress>
			<Priority>P03</Priority>
			<PassportCountry/>
			<RegisteredAddress>
				<AddressType/>
				<HouseUnitLot>B-25-01</HouseUnitLot>
				<Postcode>55000</Postcode>
				<Floor>25</Floor>
				<BuildingName>MENARA B KOMPLEKS PAVILION AMPANG</BuildingName>
				<StreetType>JALAN</StreetType>
				<StreetName>AMPANG</StreetName>
				<Section>TAMAN U THANT</Section>
				<City>KUALA LUMPUR</City>
				<State>WILAYAH PERSEKUTUAN</State>
				<Country>MALAYSIA</Country>
				<TMAddressID>1-RBJGBG4</TMAddressID>
			</RegisteredAddress>
			<ServiceProvider/>
			<LARSRewardsNo/>
			<LARSMembershipNo/>
			<LARSMemberCategory/>
			<LARSMemberStatus/>
			<LARSTotalPoint/>
			<LARSTotalPointDate/>
			<LARSPointExpiry/>
			<LARSPointExpiryDate/>
			<LARSLastEarnTrnDate/>
			<LARSLastEarnTrnDesc/>
			<LARSLastEarnTrnPoint/>
			<LARSLastRedemTrnDate/>
			<LARSLastRedemTrnDesc/>
			<LARSLastRedemTrnPoint/>
			<LARSProfileEnrollFlag>Y</LARSProfileEnrollFlag>
			<TMBRNSubType>BRN ROC</TMBRNSubType>
			<SSMID>626331-X</SSMID>
			<SSMStatus>VALID</SSMStatus>
			<SSMNewID/>
			<SSMUnmatchFlag/>
		</CustomerAccount>
		<NonConsumerDemographics>
			<RetailIndustry/>
			<NatureOfBusiness>No Answer Given</NatureOfBusiness>
			<CompanyAnnualRevenue>No Answer Given</CompanyAnnualRevenue>
			<NoOfEmployees>No Answer Given</NoOfEmployees>
			<NoOfBranches>No Answer Given</NoOfBranches>
			<HeadquarterLocation>No Answer Given</HeadquarterLocation>
		</NonConsumerDemographics>
		<ConsumerDemographics>
			<Gender/>
			<Race/>
			<Occupation/>
			<JobTitle/>
			<DateOfBirth/>
			<Nationality/>
			<MaritalStatus/>
			<MonthlyHouseholdIncome/>
			<HouseholdSize/>
			<HouseOwnership/>
			<StayingWith/>
			<PrimaryFestiveCelebration/>
		</ConsumerDemographics>
		<ContactList>
			<Contact>
				<PrimaryContactIndicator>N</PrimaryContactIndicator>
				<ContactPrimaryIdType/>
				<ContactPrimaryIdNo/>
				<ContactID>1-RZRWXCM</ContactID>
				<ContactName>AZIM (PIC)</ContactName>
				<OfficePhone/>
				<HomePhone/>
				<MobilePhone>01136578896</MobilePhone>
				<PortalID/>
				<EmailAddress/>
				<Designation/>
			</Contact>
			<Contact>
				<PrimaryContactIndicator>N</PrimaryContactIndicator>
				<ContactPrimaryIdType/>
				<ContactPrimaryIdNo/>
				<ContactID>1-SHWRSC3</ContactID>
				<ContactName>RENNIE</ContactName>
				<OfficePhone/>
				<HomePhone/>
				<MobilePhone>01131713396</MobilePhone>
				<PortalID/>
				<EmailAddress/>
				<Designation/>
			</Contact>
			<Contact>
				<PrimaryContactIndicator>N</PrimaryContactIndicator>
				<ContactPrimaryIdType/>
				<ContactPrimaryIdNo/>
				<ContactID>1-SHWRSBX</ContactID>
				<ContactName>RENNIE</ContactName>
				<OfficePhone/>
				<HomePhone/>
				<MobilePhone>01126413396</MobilePhone>
				<PortalID/>
				<EmailAddress/>
				<Designation/>
			</Contact>
			<Contact>
				<PrimaryContactIndicator>N</PrimaryContactIndicator>
				<ContactPrimaryIdType/>
				<ContactPrimaryIdNo/>
				<ContactID>1-RZOHS5F</ContactID>
				<ContactName>TEE LEE MENG</ContactName>
				<OfficePhone/>
				<HomePhone/>
				<MobilePhone>0166555939</MobilePhone>
				<PortalID/>
				<EmailAddress>account@benten.com.my</EmailAddress>
				<Designation/>
			</Contact>
			<Contact>
				<PrimaryContactIndicator>Y</PrimaryContactIndicator>
				<ContactPrimaryIdType>New NRIC</ContactPrimaryIdType>
				<ContactPrimaryIdNo>760517-01-5806</ContactPrimaryIdNo>
				<ContactID>1-RZOHS5B</ContactID>
				<ContactName>TEE LEE MENG</ContactName>
				<OfficePhone>01126413396</OfficePhone>
				<HomePhone/>
				<MobilePhone>01136578896</MobilePhone>
				<PortalID/>
				<EmailAddress>account@benten.com.my</EmailAddress>
				<Designation>Director</Designation>
			</Contact>
		</ContactList>
		<CommitmentPeriodList>
			<CommitmentPeriod>
				<CommitmentName/>
				<CommitmentDuration/>
			</CommitmentPeriod>
		</CommitmentPeriodList>
		<BillingList>
			<BillingAccount>
				<BillingAddress>
					<TMAddressID/>
					<AddressType/>
					<HouseUnitLot>B-25-01</HouseUnitLot>
					<Postcode>55000</Postcode>
					<Floor>25</Floor>
					<BuildingName>MENARA B KOMPLEKS PAVILION AMPANG</BuildingName>
					<StreetType>JALAN</StreetType>
					<StreetName>AMPANG</StreetName>
					<Section>TAMAN U THANT</Section>
					<City>KUALA LUMPUR</City>
					<State>WILAYAH PERSEKUTUAN</State>
					<Country>MALAYSIA</Country>
				</BillingAddress>
				<BillingAccountRowID>1-RZOYFTL</BillingAccountRowID>
				<BillingAccountNo>1071368532</BillingAccountNo>
				<BillingName>BENTEN CONSTRUCTION SDN. BHD.</BillingName>
				<BillingProfileRowID>1-RZOYFTP</BillingProfileRowID>
				<BillAccountStatus>Active</BillAccountStatus>
				<BillingCycle>22</BillingCycle>
				<BillingSalesPTT/>
				<BillingType>Detail</BillingType>
				<HsbaBtuFlag>N</HsbaBtuFlag>
			</BillingAccount>
		</BillingList>
	</Response>
</PortalMessage>';


$xml2 = simplexml_load_string($output2);
$json2 = json_encode($xml2, JSON_PRETTY_PRINT);
//echo $json2;


$jsonDecoded2 = json_decode($json2);
$objContact = $jsonDecoded2->Response->ContactList; 

echo json_encode([
	'success' => true,
	'data' => $objContact
], JSON_PRETTY_PRINT);






?>