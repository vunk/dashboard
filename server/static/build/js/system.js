function formSetter(form, data) {
    $.each(data, function(idx, val){
        // console.log("{0} {1}".format(idx, val))
        form.find("[name={0}]".format(idx)).val(val)
    });
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function renderBoolean(value) {
    var flag = value ? 'fa-circle-o' : 'fa-remove'
    return '<i class="fa {0}"></i>'.format(flag)
}

function renderBooleanData(value) {
    return (value) ? value : '<code>None</code>'
}

function showResponse(data, status) {
    $("#header-modal").text(status.toUpperCase())
    if (status == 'error') {
        $("#header-modal").addClass('alert alert-danger').removeClass('alert-success')
    }
    else {
        $("#header-modal").addClass('alert alert-success').removeClass('alert-danger')
    }
    $("#response-modal").text(JSON.stringify(data, null, 4))
    $("#logs-modal").modal('show')
}

function captcha_code(length) {
  var x = Math.random().toFixed(length);
  return x.substr(x.indexOf(".")+1);
}

function serializeObject(form) {
  var formArray = form.serializeArray()

  var returnObject = {}
  for (var x=0; x<formArray.length; x++) {
    returnObject[formArray[x]['name']] = formArray[x]['value']
  }
  return returnObject
}

function MainDataTable(info){

    //url, buttons, columns, selecter, order
    if (!info.order){
      info.order = [[1, 'asc']]
    }

    if (!info.select_type) {
      info.select_type = 'single'
    }

    // DataTable
    var dt = $(".main-datatable").DataTable({
        // basic
        "serverSide": true,
        "processing": true,
        // stateSave: true,
        // scrollCollapse: true,
        // scrollY: '50vh',

        // ajax
        "ajax": {
            url: info.api_url + 'dt_query/',
            dataSrc: 'data',
        },
        "columns": info.columns,
        "order": info.order,

        // dom
        "dom": "<'row'<'col-sm-3 col-md-3'l><'col-sm-5 col-md-5'B><'col-sm-4 col-md-4'f>>"+
               "<'row'<'col-sm-12'tr>>" +
               "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        "buttons": info.buttons,
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        "select": {
            style: info.select_type,
            selector: 'td:not(:first-child)'
        },
    });

    // Database row detail
    dt.on('click', 'tbody tr td.details-control', function() {
        // detail trigger
        var tr = $(this).closest('tr')
        var row = dt.row(tr)

        if (row.child.isShown()) {
            $(this).html('<i class="glyphicon glyphicon-plus"></i>');
            tr.removeClass('details');
            row.child.hide();
        }
        else {
            $(this).html('<i class="glyphicon glyphicon-minus"></i>');
            tr.addClass('details');

            var data = row.data()
            if (data.id) {
              var id = data.id
            }
            else {
              var id = data.sid
            }

            $.ajax({
              url: '{0}{1}/'.format(info.api_url, id),
                type: 'get',
                async: false,
                success: function(data, status, xhr) {
                    row.child('Memo: ' + data.memo).show()
                },
                error: function(data, status, xhr) {
                    row.child('Memo: ' + data.memo).show()
                    // row.child('{0}: {1}'.format(status, data)).show()
                    console.log('[{0}] {1}'.format(status, JSON.stringify(data)))
                }
            })
        }
    }); // close detail

  function ModalSubmit(url, type) {
      if (type == 'PUT') {
        var selected = dt.row({selected: true}).data()
        var url = url + selected.id + '/'
      }
      var $crf_token = $('[name="csrfmiddlewaretoken"]').attr('value');

        $.ajax({
          url: url,
          type: type,
          headers: {"X-CSRFToken": $crf_token},
          data: $('#modal-form').serialize(),
          dataType: 'json',
          success: function(data, status, xhr) {
              $('#notification-title').text(status.toUpperCase())
              $('#notification-title').addClass('alert alert-success').removeClass('alert-danger')
              $('#notification-body').text(JSON.stringify(data, null, 4))
              $("#notification-modal").modal('show')

              $("#edit-modal").modal('toggle')
              dt.ajax.reload()
          },
          error: function(data, status, xhr){
            $("#notification-modal").modal('show')
            $('#notification-title').text(status.toUpperCase())
            $('#notification-title').addClass('alert alert-danger')
            $('#notification-body').text(JSON.stringify(data, null, 4))
            $("#notification-modal").modal('show')
          }
        })
    }

    $('.modal-create').click(function() {
      ModalSubmit(info.api_url, 'POST')
    });

    $('.modal-update').click(function() {
      ModalSubmit(info.api_url, 'PUT')
    });

    // Submit
    $('.modal-submit').click(function(){
      console.log('modal-submit.click()')
        $.ajax({
            url: info.api_url,
            type: 'POST',
            data: $('#modal-form').serialize(),
            dataType: 'json',
            success: function(data, status, xhr){
              if (info.ignore_success == 1) {
                console.log(JSON.stringify(data))
              }
              else {
                $('#notification-title').text(status.toUpperCase())
                $('#notification-title').addClass('alert alert-success').removeClass('alert-danger')
                $('#notification-body').text(JSON.stringify(data, null, 4))
                $("#notification-modal").modal('show')
              }
                $("#edit-modal").modal('toggle')
                dt.ajax.reload()
            },
            error: function(data, status, xhr){
                $("#notification-modal").modal('show')
                $('#notification-title').text(status.toUpperCase())
                $('#notification-title').addClass('alert alert-danger')
                $('#notification-body').text(JSON.stringify(data, null, 4))
                $("#notification-modal").modal('show')
            }
        })
    }); // close submit

    // Datatable Select
    $(".selecter-datatable").select2({
        width: '100%',
        allowClear: true,
        data: info.selecter,
        tags: true,
        placeholder: 'Select options or type query clauses.',
    }).change(function(x){
        dt.search($(this).val()).draw()
    })

    console.log("Init_MainDataTable")
    return dt;
}


function ModalFormSetter(data) {
  var form = $("#modal-form")
  return form_setter(form, data)
}

