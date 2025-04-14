document.addEventListener("DOMContentLoaded", function () {
  // General full date pickers for Experience Start and End Dates
  var startDatePicker = new Pikaday({
    field: document.getElementById("experience-start"),
    format: "YYYY-MM-DD",
    minDate: new Date("1970-01-01"),
    maxDate: new Date(),
    yearRange: [1970, new Date().getFullYear()],
    onSelect: function (date) {
      console.log("Selected start date:", date);
    },
  });

  var endDatePicker = new Pikaday({
    field: document.getElementById("experience-end"),
    format: "YYYY-MM-DD",
    minDate: new Date("1970-01-01"),
    maxDate: new Date(),
    yearRange: [1970, new Date().getFullYear()],
    onSelect: function (date) {
      console.log("Selected end date:", date);
    },
  });

  // Date of Birth Picker
  var dobPicker = new Pikaday({
    field: document.getElementById("dob"),
    format: "YYYY-MM-DD",
    minDate: new Date("1900-01-01"), // Minimum DOB can be adjusted
    maxDate: new Date(),
    yearRange: [1900, new Date().getFullYear()],
    onSelect: function (date) {
      console.log("Selected DOB:", date);
    },
  });
});
