document.addEventListener("DOMContentLoaded", function () {
  // General full date pickers
  flatpickr("#experience-start", {
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "F j, Y",
    allowInput: true,
  });

  flatpickr("#experience-end", {
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "F j, Y",
    allowInput: true,
  });

  flatpickr("#dob", {
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "F j, Y",
    allowInput: true,
    maxDate: "today", // can't pick future DOB
  });

  // Year-only pickers for education
  flatpickr("#education-start", {
    dateFormat: "Y",
    altInput: true,
    altFormat: "Y",
    allowInput: true,
    plugins: [
      new flatpickr.plugins.monthSelect({
        shorthand: true,
        dateFormat: "Y",
        altFormat: "Y",
      }),
    ],
  });

  flatpickr("#education-end", {
    dateFormat: "Y",
    altInput: true,
    altFormat: "Y",
    allowInput: true,
    plugins: [
      new flatpickr.plugins.monthSelect({
        shorthand: true,
        dateFormat: "Y",
        altFormat: "Y",
      }),
    ],
  });
});
