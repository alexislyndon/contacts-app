$(function () {
  var form = $(".person-form");
  form.on("submit", function (e) {
    e.preventDefault();

    var form = $(this);
    var formData = form.serializeToJSON({ associativeArrays: false });

    $.ajax({
      type: "POST",
      url: "/person",
      data: formData,
      success: function () {
        //form.find("#msg").show().delay(3000).fadeOut();
        var { p_id } = response;
        var firstname = form.find('input[name="firstname"]').val();
        var lastname = form.find('input[name="lastname"]').val();
        var id = $("tbody tr:last td:first").text();
        console.log(id);

        var html = `<tr data-person-id=${p_id}><td>${firstname}</td> <td>${lastname}<td></tr>`;

        $("table tbody").append(html);
        $("#msg").show().delay(3000).fadeOut();
      },
    });
  });

  function removeTr(a) {
    //a = $(this);
    a.closest("tr").remove();
  }

  form.find(".remove-ea-btn").on("click", function () {
    removeTr(this);
  });

  form.find("#add-ea-btn").on("click", function () {
    var tbody = $(this).closest("table").find("tbody");
    var tr = `
    <tr>
            <td><a href="javascript:" class="remove-ea-btn">Remove</a></td>
            <td>
              <input type="text" name="emailaddresses" value="" >
            </td>
          </tr>
    `;

    tbody.append(tr);
  });

  form.find("#add-pa-btn").on("click", function () {
    var tbody = $(this).closest("table").find("tbody");
    var idx = tbody.find("tr").length;
    var tr = $(`
    <tr>
            <td><a href="javascript:" class="remove-pa-btn">Remove</a></td>
            <td>
              <input type="hidden" name="postaladdresses[${idx}].pa_id" value="" >
              <input type="text" name="postaladdresses[${idx}].street" value="" >
            </td>
            <td>
              <input type="text" name="postaladdresses[${idx}].city" value="" >
            </td>
            <td>
              <input type="text" name="postaladdresses[${idx}].zipcode" value="" >
            </td>
          </tr>
    `);

    tbody.append(tr);

    var a = tr.find(".remove-pa-btn");

    a.on("click", function () {
      removeTr(a);
    });
  });

  form.find(".remove-pa-btn").on("click", function () {
    removeTr(this);
  });
});
