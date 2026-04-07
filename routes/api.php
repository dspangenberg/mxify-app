<?php

use App\Models\Recipient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('route/{recipient}', function (Request $request) {
    $app = $request->user();
    $recipientWithoutZone = Str::before($request->recipient, '@');
    $id = Str::after($recipientWithoutZone, $app->address_prefix);

    $recipient = Recipient::whereSqid($id)->first();

    return response()->json([
        'recipient' => $recipient,
        'app' => $app,
        'app_id' => $app->id,
        'app_name' => $app->name,
    ]);
})->middleware(['auth:sanctum','abilities:route']);
