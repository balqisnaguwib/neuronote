<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link rel="icon" type="image/png" href="/installation/admin/assets/img/nmos.png" />
    <title>Southern Gateway || Fulfillment</title>
    <link href="../css/styles_v3.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
    <!-- <link rel="stylesheet" href="https://nocgrid.tm.com.my/dashboard/ctt_tracker/css/buttons.dataTables.css">  -->
    <link href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css" rel="stylesheet">
  </head>
  <body style="background-color:#F2F4F6;">
    <div class="col-12 col-xl-8 listgambo" style="display:block;">
      <div class="card card-body border-1 shadow mb-4">
        <div class="bg-danger dot rounded-circle me-1 atas" id="indi1"></div>
        <h2 class="h3 mb-4">Contact Search</h3> Enter NOVA CTT: <br>
        <input type="text" id="ctt_input" name="fname" value="1-73159926711">
        <br>
        <div class="mt-3">
          <div class="row" style="margin-bottom:10px">
            <button type="button" class="full-width btnsubmit btn btn-danger deleteBtn2 btn_search" id="search">Get Contact</button><br>
			<button type="button" class="full-width btnsubmit btn btn-primary deleteBtn2 btn_clear" id="clear" style="margin-top:10px">Clear</button>
          </div>
        </div>
        <div class="card-body" id="resultpane" style="display:none;">
          <div class="table-responsive">
            <div class="dt-buttons">
              <div id="printables">
                <div class="to_print" id="first_element">
                  <h3 class="text-center">
                    <b>Customer Contact List</b>
                  </h3>
                  <hr>
                  <table class="table table-bordered table-striped" id="table-list" style="overflow: scroll;overflow: auto;">
                    <thead>
                      <tr class="bg-primary bg-gradient text-white">
                        <th class="text-capitalize text-center py-1 px-2">#</th>
                        <th class="text-capitalize text-center py-1 px-2">contact_name</th>
                        <th class="text-capitalize text-center py-1 px-2">mobile_phone</th>
                        <th class="text-capitalize text-center py-1 px-2">office_phone</th>
                        <th class="text-capitalize text-center py-1 px-2">home_phone</th>
                        <th class="text-capitalize text-center py-1 px-2">Designation</th>
                        <th class="text-capitalize text-center py-1 px-2">primary_contact</th>
                      </tr>
                    </thead>
                    <tbody style="overflow: scroll;overflow: auto; "></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="js/jquery-3.5.1.js"></script>
      <script src="js/scripts.js"></script>
  </body>
</html>