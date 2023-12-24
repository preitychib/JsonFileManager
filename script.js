document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const jsonModal = document.getElementById("jsonModal");
  const jsonContentTextarea = document.getElementById("jsonContent");

  fileInput.addEventListener("change", function () {
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
      // Reading content of the selected file as text
      const reader = new FileReader();
      reader.onload = function (e) {
        // Set the content of the textarea to the file content
        jsonContentTextarea.value = e.target.result;

        // Open the modal
        openModal();
      };
      reader.readAsText(selectedFile);
      fileInput.value = "";
    }
  });

  document
    .getElementById("modal-buttons-save")
    .addEventListener("click", function () {
      const content = jsonContentTextarea.value;
      console.log("Saving changes:", content);
      const blob = new Blob([content], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "edited.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Close the modal
      closeModal();
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

  //? Function to open the modal
  function openModal() {
    jsonModal.style.display = "block";
  }

  //? Function to close the modal
  function closeModal() {
    jsonModal.style.display = "none";
  }
});
