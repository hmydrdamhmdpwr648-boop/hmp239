<?php
// رفع ارور CORS برای درخواست‌های فرانت
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // پیش‌پرواز (preflight) برای مرورگر
    http_response_code(200);
    exit();
}

if (isset($_POST['zarib'])) {
    $zarib = floatval($_POST['zarib']);
    $file = 'zarib_data.csv';

    // اگر فایل CSV وجود نداشت، تیترشو اضافه کن
    if (!file_exists($file)) {
        file_put_contents($file, "id,zarib\n");
    }

    // شمارنده ردیف‌ها
    $lines = file($file, FILE_IGNORE_NEW_LINES);
    $id = count($lines); // چون خط اول تیتره

    // ذخیره در فایل
    file_put_contents($file, "$id,$zarib\n", FILE_APPEND);
    echo "ذخیره شد: $id → $zarib";
} else {
    echo "❌ ضریب دریافت نشد!";
}