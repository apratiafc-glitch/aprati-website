<?php
/**
 * Check PHP Upload Configuration & Temp Directory
 * Access: https://sdev.apratifoods.asia/check-upload-config.php?key=aprati2026
 */

if (!isset($_GET['key']) || $_GET['key'] !== 'aprati2026') {
    die('Access Denied');
}

function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
    $val = (int)$val;
    switch($last) {
        case 'g': $val *= 1024;
        case 'm': $val *= 1024;
        case 'k': $val *= 1024;
    }
    return $val;
}

$upload_tmp_dir = ini_get('upload_tmp_dir') ?: sys_get_temp_dir();
$is_writable = is_writable($upload_tmp_dir);
$free_space = @disk_free_space($upload_tmp_dir);

$info = [
    'file_uploads' => ini_get('file_uploads'),
    'upload_max_filesize' => ini_get('upload_max_filesize'),
    'post_max_size' => ini_get('post_max_size'),
    'memory_limit' => ini_get('memory_limit'),
    'max_file_uploads' => ini_get('max_file_uploads'),
    'upload_tmp_dir' => $upload_tmp_dir,
    'tmp_dir_writable' => $is_writable ? 'YES' : 'NO',
    'tmp_dir_free_space' => $free_space !== false ? number_format($free_space / 1024 / 1024, 2) . ' MB' : 'Unknown',
    'upload_max_filesize_bytes' => return_bytes(ini_get('upload_max_filesize')),
    'post_max_size_bytes' => return_bytes(ini_get('post_max_size')),
];

header('Content-Type: application/json');
echo json_encode($info, JSON_PRETTY_PRINT);
