//on form submit
$(function () {
  $("#new").on("submit", function (e) {
    e.preventDefault();
    var form = $(this);
    var formData = form.serializeToJSON({ associativeArrays: false });
    console.log("ok");

    $.ajax({
      url: "/person",
      type: "POST",
      data: formData,
      success: function (response) {
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

  //on table row click
  $("table tbody tr").on("click", function () {
    var tr = $(this);
    var personID = tr.data("person-id");

    $.ajax({
      url: "/person/" + personID,
      success: function (response) {
        $("#content").html(response);
      },
    });
  });

  $(".new-contact-btn").on("click", function () {
    $.ajax({
      url: "person/new",
      success: function (res) {
        $("#content").html(res);
      },
    });
  });

  //person form handlers
  // var form = $(".person-form");
  // form.on("submit", function (e) {
  //   e.preventDefault();

  //   var form = $(this);
  //   var formData = form.serialize();

  //   $.ajax({
  //     type: "POST",
  //     url: "/person",
  //     data: formData,
  //     success: function () {
  //       form.find("#msg").show().delay(3000).fadeOut();
  //     },
  //   });
  // });
  // //remove
  // form.find("table tbody .remove-ea-btn").on("click", function () {
  //   var a = $(this);
  //   a.closest("tr").remove();
  // });

  //
});
