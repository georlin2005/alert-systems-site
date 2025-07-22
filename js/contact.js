  $('#contactForm').on('submit', function (e) {
    e.preventDefault(); // Stop default submission

    $.ajax({
      url: 'contact.php', // PHP file that handles email + WhatsApp
      type: 'POST',
      data: $(this).serialize(), // Serialize form data
      success: function (response) {
        if (response.trim() === "success") {
          $('#formResponse').css('color', 'green').text("✅ Message sent successfully!");
          $('#contactForm')[0].reset(); // clear form
        } else {
          $('#formResponse').css('color', 'red').text("❌ Failed to send. Try again.");
        }
      },
      error: function () {
        $('#formResponse').css('color', 'red').text("❌ Error sending form.");
      }
    });
  });