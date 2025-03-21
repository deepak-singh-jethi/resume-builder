document.addEventListener("DOMContentLoaded", function () {
  // Select the form element
  const form = document.getElementById("resume-form");

  // Listen for any input change in the form
  form.addEventListener("input", function () {
    // Get all form data
    const formData = new FormData(form);
    const resumeData = {};

    // Convert FormData to an object
    formData.forEach((value, key) => {
      resumeData[key] = value;
    });

    // Update the live resume preview
    updatePreview(resumeData);
  });
});
