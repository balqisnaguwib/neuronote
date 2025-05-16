$(document).ready(function() {
    
});




/* $(document).on('click', '.btn_search', function() {

	

var tt = $('#ctt_input').val();
	
	
	$("#remarkInput").val("");

	$("#changeStatus").val("1");
    $("#ballers").html("");
	 $('#registerRsponse').text("");
		$('#registererror').text("");

    $.ajax({
        url: "checkinfo.php",
        method: "POST",
        data: {
            _tt: tt,
        },
        dataType: "json",
        success: function(data) {
           /*  $('#exampleModalCenter').modal('show');
            $('#oid').text(data.order_number);
            $('#ins_name').text(data.installer_name);
            $('#ins_id').text(data.installer_id);
            $('#company').text(data.companyname);
            $('#dp').text(data.device_name);
            $('#cab').text(data.cabinet_id);
            $('#zone').text(data.zone);
            $('#state').text(data.state);
            $('#region').text(data.region);
			
			$('#dptype').text(data.dp_type);
			$('#pdName').text(data.product_name);
			$('#dploc').text(data.dp_location);
			$('#nsi').text(data.nsi);
			$('#fdpport').text(data.fdp_port);
			
            $('.modal-title').text("Order Details " + user_id);
            $('#user_id').val(user_id);
            $('#user_uploaded_image').html(data.user_image);
            $('#action').val("Edit");
            $('#operation').val("Edit");
			$('#cid').val(data.cid); 
			
			console.log("status  " + data.verify_status);
			  /*  initPhotoSt(); *
		if(data.verify_status == 'Verified'){
				/* $('#photoSt').addClass('badge-success'); 
				$('#photoSt').text('Verified');
				$('#changeStatus').css('display', 'none');
				$('#saveMe').css('display', 'none');
				$('#remarksMe').css('display', 'none');
				$('#changeStatus').val('2').change();			
		}else if(data.verify_status == 'Pending'){
				/* $('#photoSt').addClass('badge-warning');	 
				$('#photoSt').text('Pending');
				$('#changeStatus').css('display', 'block');
				$('#saveMe').css('display', 'block');
				$('#remarksMe').css('display', 'block');					
		}else if(data.verify_status == 'No Photo'){
				/* $('#photoSt').addClass('badge-bahaya');	
				$('#photoSt').text('No Photo');
				$('#changeStatus').css('display', 'none');
				$('#saveMe').css('display', 'none');
				$('#remarksMe').css('display', 'none');		
		}else if(data.verify_status == 'Rejected'){
				/* $('#photoSt').addClass('badge-bahaya');	 
				$('#photoSt').text('Rejected');
				$('#changeStatus').css('display', 'block');
				$('#saveMe').css('display', 'block');
				$('#remarksMe').css('display', 'block');
				$('#changeStatus').val('3').change();					
		}
			
			
			
        }
    })
	$('#pills-makegood-tab').css('display', 'none');
	if(mg_flag =="Y"){
		$('#pills-makegood-tab').css('display', 'block');
	}
		
		
		$('#seqid').val(seqid);
		if(id_order == 'null'){		
		//console.log("null ");
			$("#pills-profile-tab").css("display", "none");
			$("#downloadImage").css("display", "none");

		}else{
			$("#pills-profile-tab").css("display", "block");
			$("#downloadImage").css("display", "block");
		}
		
	$("#pills-home-tab").trigger("click");
    $("#ballers").html("");
	$("#remark").val("");
	
    $('#pills-profile-tab').val(id_order);
	
	
});
 */


$(document).on('click', '.btn_search', function() {
	var tt = $('#ctt_input').val();
	var table = $('#table-list')
        // Emptying the Table items
    table.find('tbody').html('')
    setTimeout(() => {
        $.ajax({
            // JSON FILE URL
            url: "checkinfo.php",
            // Type of Return Data
            method: "POST",
			data: {
            _tt: tt,
        },
        dataType: "json",
            // Error Function
            error: err => {
                console.log(err)
                alert("An error occured")
                $('#loader').addClass('d-none')
            },
            // Succes Function
            success: function(resp) {
                if (resp.length > 0) {
					$("#resultpane").css("display", "block");
				
					
					arrStr = ['BIN', 'B', 'BTE', 'BINTI', 'A/L', 'A/P'];
					
                    // If returned json data is not empty
                    var i = 1;
                    // looping the returned data
                    Object.keys(resp).map(k => {
                        // creating new table row element
                        var tr = $('<tr>')
                            // first column data
                        tr.append('<td class="py-1 px-2 text-center">' + (i++) + '</td>')
                            // second column data
						
						var nameCu = resp[k].cn;
						if($.inArray(nameCu, arrStr) != -1){
						    //nameCu.substring(0, txt.length - 5);
							var maskname = nameCu.substring(0, nameCu.length - 2) + "XXX";
							
							tr.append('<td class="py-1 px-2"><b>' + maskname + ' </b><br><span style="font-size: 12px;">' + resp[k].cn  +'</span></td>')
						} else{
							tr.append('<td class="py-1 px-2"><b>' + resp[k].cn + ' </b><br><span style="font-size: 12px;"></span></td>')
						}
						
                            // third column data
							
						var innum = resp[k].mp;
						var masknum = innum.replace(innum.substring(4,8), "***");
							
							
						tr.append('<td class="py-1 px-2">📞 <a href="tel: ' + resp[k].mp + '">' + innum + '</a></td>')
                       
                            // fourth column data
                        tr.append('<td class="py-1 px-2">' + resp[k].op + '</td>')
                            // fifth column data
                        tr.append('<td class="py-1 px-2">' + resp[k].hp + '</td>')
                            // sixth column data
                        tr.append('<td class="py-1 px-2">' + resp[k].ds + '</td>')
						if(resp[k].pc =='Y'){
						 tr.append('<td class="py-1 px-2">' + resp[k].pc + '</td>')
						}
						

                        // Append table row item to table body
                        table.find('tbody').append(tr)
                    })
                } else {
                    // If returned json data is empty
                    var tr = $('<tr>')
                    tr.append('<th class="py-1 px-2 text-center">No data to display</th>')
                    table.find('tbody').append(tr)
                }
                $('#loader').addClass('d-none')
            }
        })
    }, 500)
	});
	
	
	
	
	$(document).on('click', '.btn_clear', function() {
		$('#ctt_input').val('');
		$("#resultpane").css("display", "none");
		});