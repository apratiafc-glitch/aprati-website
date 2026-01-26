<?php

/**
 * Laravel Bootstrap for External Public Directory
 * 
 * This file allows Laravel to run when the public directory
 * is outside the main application folder.
 * 
 * Place this in: /home/apratifoodscom/public_html/sdev.apratifoods.asia/index.php
 */

define('LARAVEL_START', microtime(true));

// Register the Composer autoloader
require __DIR__.'/../aprati_backend/vendor/autoload.php';

// Bootstrap Laravel and handle the request
$app = require_once __DIR__.'/../aprati_backend/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
)->send();

$kernel->terminate($request, $response);
