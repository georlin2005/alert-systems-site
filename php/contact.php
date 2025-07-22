<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Sanitize form inputs
    $name    = htmlspecialchars(trim($_POST["name"]));
    $email   = htmlspecialchars(trim($_POST["email"]));
    $phone   = htmlspecialchars(trim($_POST["phone"]));
    $service = htmlspecialchars(trim($_POST["service"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // 2. Email Setup
    $to      = "alertsystems.in@gmail.com";
    $subject = "New Contact Message from ALERT SYSTEMS Website";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_body = "You have received a new message:\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Phone: $phone\n";
    $email_body .= "Service: $service\n";
    $email_body .= "Message:\n$message\n";

    // 3. Attempt to send email
    $email_sent = mail($to, $subject, $email_body, $headers);

    // 4. WhatsApp Setup (via Meta Cloud API)
    $wa_token          = "EAAJ5g90SFasBPCR9IArsuvSZB7xICZByf1w5JgdtSj6ChIx9FMtthkSbeWZCehU8cZCIkqK60s6Fcc2hBL2HfhDPcKs4FV5ZBG4ZBpPdvmHRnZBKvaesFdTmwZCEn5YcOXDZAZCD8lwLLfuobvPOmaOkZCn6f9dbhqgN0lRwtqVTD5dv21OLPNEZBFlI6DHgU2uNGygyi0BNUYpSxw7UmTZCmcUkETXVx6q6kut8ZB93LYxDDkHFnmk0YZD"; // Replace with your real token
    $wa_phone_number_id = "656245624249260"; // Replace with your ID
    $wa_recipient      = "919946667170"; // Your WhatsApp number with country code

    $wa_url = "https://graph.facebook.com/v19.0/$wa_phone_number_id/messages";

    $wa_message = "🚨 New Inquiry from ALERT SYSTEMS Website:\n\n";
    $wa_message .= "👤 Name: $name\n📞 Phone: $phone\n📧 Email: $email\n🛠️ Service: $service\n📝 Message: $message";

    $wa_data = [
        "messaging_product" => "whatsapp",
        "to" => $wa_recipient,
        "type" => "text",
        "text" => ["body" => $wa_message]
    ];

    $wa_headers = [
        "Authorization: Bearer $wa_token",
        "Content-Type: application/json"
    ];

    $ch = curl_init($wa_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($wa_data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $wa_headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $wa_response = curl_exec($ch);
    $wa_http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // 5. Final response
    if ($email_sent && $wa_http_code == 200) {
        echo "success";
    } else {
        echo "error";
    }

} else {
    echo "invalid";
}
?>
