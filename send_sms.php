<?php
/**
 * Oak Specialist Hospital — SMS Booking Notification Backend Handler
 * 
 * This script is triggered via AJAX from the booking wizard. It uses the Zenoph Notify PHP SDK
 * to send confirmation SMS messages to the client.
 */

// 1. Core Configurations
define('ZENOPH_API_KEY', '9bb2205bfa7ab3fa695254e68bf44fbcb0ecdaed0757612f9474d167be9a5ccd'); // Live Zenoph API Key
define('ZENOPH_SENDER_ID', 'OAKHOSPITAL');          // Live Sender ID

header('Content-Type: application/json');

// Ensure AutoLoader is present
$autoloader_path = __DIR__ . '/zenoph.notify-2.25.08-php/lib/Zenoph/Notify/AutoLoader.php';
if (!file_exists($autoloader_path)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Zenoph SDK not found at: ' . $autoloader_path
    ]);
    exit;
}

include_once($autoloader_path);

use Zenoph\Notify\Enums\AuthModel;
use Zenoph\Notify\Enums\SMSType;
use Zenoph\Notify\Request\SMSRequest;

// 2. Process AJAX Request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve JSON inputs
    $inputData = json_decode(file_get_contents('php://input'), true);
    
    $name = isset($inputData['name']) ? trim($inputData['name']) : '';
    $phone = isset($inputData['phone']) ? trim($inputData['phone']) : '';
    $email = isset($inputData['email']) ? trim($inputData['email']) : '';
    $type = isset($inputData['type']) ? trim($inputData['type']) : '';
    $doctor = isset($inputData['doctor']) ? trim($inputData['doctor']) : '';
    $dept = isset($inputData['department']) ? trim($inputData['department']) : '';
    $date = isset($inputData['date']) ? trim($inputData['date']) : '';
    $time = isset($inputData['time']) ? trim($inputData['time']) : '';

    // Validate inputs
    if (empty($phone)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Missing required client telephone.'
        ]);
        exit;
    }

    // Format consultation details for message body
    $typeFormatted = ($type === 'virtual') ? 'Virtual (Google Meet)' : 'In-Person';
    
    // Construct dynamic date & time text string for inclusion in SMS
    $dateTimeText = (!empty($date) && !empty($time)) ? " for {$date} at {$time}" : "";

    // 3. Check for API key configuration
    if (ZENOPH_API_KEY === 'YOUR_ZENOPH_API_KEY') {
        $salutation = (empty($name) || $name === 'Client' || $name === 'Unknown Client') ? 'Hello' : "Hello {$name}";
        if ($type === 'virtual') {
            $clientMessage = "{$salutation}, your Virtual consultation ({$dept}) with {$doctor} at Oak Specialist Hospital has been scheduled{$dateTimeText}.\r\nGoogle Meet calendar invite link has been sent to your email.\r\nOak Specialist Hospital:\r\n+233 50 976 0659";
        } else {
            $clientMessage = "{$salutation}, your In-Person consultation ({$dept}) with {$doctor} at Oak Specialist Hospital has been scheduled{$dateTimeText}.\r\nLocation: Bek-Egg Hotel Rd, Fankyenebra-Santasi.\r\nMap: https://maps.google.com/?q=Oak+Specialist+Hospital+Kumasi\r\nOak Specialist Hospital:\r\n+233 50 976 0659";
        }
        // Fallback simulation mode (for testing locally before getting live credentials)
        echo json_encode([
            'status' => 'simulation',
            'message' => 'Simulation successful! SMS message drafted.',
            'client_sms' => $clientMessage
        ]);
        exit;
    }

    try {
        // 4. Send SMS to Client
        $clientSms = new SMSRequest();
        $clientSms->setHost('api.smsonlinegh.com');
        $clientSms->useSecureConnection(true, true);
        $clientSms->setAuthModel(AuthModel::API_KEY);
        $clientSms->setAuthApiKey(ZENOPH_API_KEY);
        $clientSms->setSender(ZENOPH_SENDER_ID);
        $clientSms->setSMSType(SMSType::GSM_DEFAULT);
        
        $salutation = (empty($name) || $name === 'Client' || $name === 'Unknown Client') ? 'Hello' : "Hello {$name}";
        
        if ($type === 'virtual') {
            $clientMessage = "{$salutation}, your Virtual consultation ({$dept}) with {$doctor} at Oak Specialist Hospital has been scheduled{$dateTimeText}.\r\nGoogle Meet calendar invite link has been sent to your email.\r\nOak Specialist Hospital:\r\n+233 50 976 0659";
        } else {
            $clientMessage = "{$salutation}, your In-Person consultation ({$dept}) with {$doctor} at Oak Specialist Hospital has been scheduled{$dateTimeText}.\r\nLocation: Bek-Egg Hotel Rd, Fankyenebra-Santasi.\r\nMap: https://maps.google.com/?q=Oak+Specialist+Hospital+Kumasi\r\nOak Specialist Hospital:\r\n+233 50 976 0659";
        }
        
        $clientSms->setMessage($clientMessage);
        $clientSms->addDestination($phone);
        $clientSms->submit();

        echo json_encode([
            'status' => 'success',
            'message' => 'SMS notification sent successfully to client!',
            'sms_body' => $clientMessage
        ]);
        
    } catch (\Exception $ex) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Failed to send SMS via Zenoph: ' . $ex->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid Request Method.'
    ]);
}
