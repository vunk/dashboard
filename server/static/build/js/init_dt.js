function DT () {
        this.serverSide = true
        this.processing = true
        this.order = [[1, 'asc']]
        this.dom = "<'row'<'col-sm-3 col-md-3'l><'col-sm-5 col-md-5'B><'col-sm-4 col-md-4'f>>"+
               "<'row'<'col-sm-12'tr>>" +
               "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
        this.lengthMenu = [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ]
        this.select = {
            style: 'single',
            selector: 'td:not(:first-child)'
        }
        this.columns = [
            {
                class: 'details-control',
                orderable: false,
                defaultContent: '<i class="glyphicon glyphicon-plus"></i>',
            }
        ]
        this.buttons = []
    }

function DT_Click (dt, td, api, callback) {
    var tr = td.closest('tr')
    var row = dt.row(tr)

    if (row.child.isShown()) {
        td.html('<i class="glyphicon glyphicon-plus"></i>');

        row.child.hide();
    }
    else {
        td.html('<i class="glyphicon glyphicon-minus"></i>');

        $.ajax({
            url: '{0}{1}/'.format(api, row.data().id),
            type: 'get',
            async: false,
            success: function(data, status, xhr) {
                callback(row, data)
            },
            error: function(data, status, xhr) {
                console.error('[{0}] {1}'.format(status, JSON.stringify(data)))
            }
        })
    }
}

function DT_Filter (options) {
    ops = []
    $.each(options, function(idx, val) {
        ops.push(val.value ? val.value : val.label)
    })
    return ops.toString()
}

function DT_Select (dt) {
    var row = dt.row({selected: true}).data()
    if (row) {
        return row
    }
    else {
        alert('Table is not selected')
    }
}