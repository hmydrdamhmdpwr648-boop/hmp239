<?php
$filename = 'zarib_data.csv';
if (file_exists($filename)) {
    unlink($filename);
    echo "Deleted";
} else {
    http_response_code(404);
    echo "File not found";
}
?>