function renderTargetTable(targets) {
  // Create the table element
  var table = $(
    '<table class="table table-striped table-dark rounded"></table>',
  );

  // Create the table header
  var thead = $('<thead></thead>').appendTo(table);
  var headerRow = $('<tr></tr>').appendTo(thead);
  $('<th>Access URL</th>').appendTo(headerRow);
  $('<th>ID</th>').appendTo(headerRow);
  $('<th>OS Type</th>').appendTo(headerRow);
  $('<th>IPV4</th>').appendTo(headerRow);

  // Create the table body
  var tbody = $('<tbody></tbody>').appendTo(table);

  // Loop through the targets array and create table rows
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];

    // Create a clickable row that redirects to the control page
    var row = $('<tr></tr>')
      .appendTo(tbody)
      .click(function () {
        var id = $(this).data('id');
        window.location.href = `target/control/${id}`;
      })
      .css('cursor', 'pointer')
      .hover(
        function () {
          $(this).addClass('hovered-row');
        },
        function () {
          $(this).removeClass('hovered-row');
        },
      );

    // Set the data-id attribute for the row
    row.data('id', target._id);

    // Add table cells with the target data
    $('<td></td>').text(target.access_url).appendTo(row);
    $('<td></td>').text(target._id).appendTo(row);
    $('<td></td>').text(target.ware_info.os.platform).appendTo(row);
    $('<td></td>').text(target.ware_info.network[1].ip4).appendTo(row);
  }

  // Append the table to a container element
  $('#targetTableContainer').empty().append(table);
}

$(async () => {
  const response = await axios.get('/target');
  const targets = response.data;
  console.log(targets[0]);
  renderTargetTable(targets);
});
