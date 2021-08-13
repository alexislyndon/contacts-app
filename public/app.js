//on form submit
$(function () {
  $(".new-person-form").on("submit", function (e) {
    e.preventDefault();
    var form = $(this);
    var formData = form.serialize();
    console.log("ok");

    $.ajax({
      url: "/person",
      type: "POST",
      data: formData,
      success: function (response) {
        var firstname = form.find('input[name="firstname"]').val();
        var lastname = form.find('input[name="lastname"]').val();
        var id = $("tbody tr:last td:first").text();
        console.log(id);

        var html = `<tr><td>${
          parseInt(id) + 1
        }</td> <td>${firstname}</td> <td>${lastname}<td></tr>`;

        $("table tbody").append(html);
        $("#msg").show().delay(3000).fadeOut();
      },
    });
  });

  //on table row click
  $("table tbody tr").on("click", function () {
    var tr = $(this);
    var personID = tr.data("person-id");

    $.ajax({
      url: "/person/" + personID,
      success: function (response) {

        $('#content').html(response)
      },
    });
  });
});
