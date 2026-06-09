<?php

use App\Models\Recipient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

Route::get('route/{recipient}', function (Request $request) {
    $app = $request->user();

    if ($app->tokenCant('route')) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }


    $recipientWithoutZone = Str::before($request->recipient, '@');
    $id = Str::after($recipientWithoutZone, $app->address_prefix);

    $recipient = Recipient::with('zone')->whereSqid($id)->first();

    if (!$recipient) {
        return response()->json(['error' => 'Recipient not found'], 404);
    }

    return response()->json([
        'recipient' => $recipient,
        'app' => $app,
        'app_id' => $app->id,
        'app_name' => $app->name,
    ]);
})->middleware(['auth:sanctum','abilities:route']);
