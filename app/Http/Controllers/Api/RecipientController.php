<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\App\RecipientRequest;
use App\Http\Resources\RecipientResource;
use App\Models\Recipient;

class RecipientController extends Controller
{
    public function index()
    {
        return RecipientResource::collection(Recipient::all());
    }

    public function store(RecipientRequest $request)
    {
        return new RecipientResource(Recipient::create($request->validated()));
    }

    public function show(Recipient $recipient)
    {
        return new RecipientResource($recipient);
    }

    public function update(RecipientRequest $request, Recipient $recipient)
    {
        $recipient->update($request->validated());

        return new RecipientResource($recipient);
    }

    public function destroy(Recipient $recipient)
    {
        $recipient->delete();

        return response()->json();
    }
}
