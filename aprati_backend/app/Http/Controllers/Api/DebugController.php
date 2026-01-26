<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DebugController extends Controller
{
    public function testPromotionBanner(Request $request)
    {
        return response()->json([
            'status' => 'debug',
            'method' => $request->method(),
            'all_data' => $request->all(),
            'has_file_image' => $request->hasFile('image'),
            'files' => $request->allFiles(),
            'headers' => [
                'content-type' => $request->header('Content-Type'),
                'authorization' => $request->header('Authorization') ? 'Present' : 'Missing'
            ]
        ]);
    }
}
