document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const jsonModal = document.getElementById("jsonModal");
  const jsonContentTextarea = document.getElementById("jsonContent");

  fileInput.addEventListener("change", function () {
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
      if (selectedFile.type === "application/json") {
        // Reading content of the selected JSON file as text
        const reader = new FileReader();
        reader.onload = function (e) {
          // Set the content of the textarea to the file content
          jsonContentTextarea.value = e.target.result;

          // Open the modal
          openModal();
        };
        reader.readAsText(selectedFile);
        fileInput.value = "";
      } else {
        alert("Please select a valid JSON file.");
        fileInput.value = "";
      }
    }
  });

  document
    .getElementById("modal-buttons-save")
    .addEventListener("click", function () {
      const content = jsonContentTextarea.value;

      try {
        // Validate if the content is valid JSON
        JSON.parse(content);

        const blob = new Blob([content], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "edited.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // Close the modal
        closeModal();
      } catch (error) {
        alert("Invalid JSON content. Please correct the JSON syntax.");
      }
    });

  document
    .getElementById("modal-buttons-clear")
    .addEventListener("click", function () {
      jsonContentTextarea.value = "";
    });

  document
    .getElementById("closeModalBtn")
    .addEventListener("click", function () {
      // Close the modal without saving changes
      closeModal();
    });

  // Function to open the modal
  function openModal() {
    jsonModal.style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
    jsonModal.style.display = "none";
  }
});
