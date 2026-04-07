<?php

namespace App\Http\Controllers\App;

use App\Data\RecipientData;
use App\Data\ZoneData;
use App\Http\Controllers\Controller;
use App\Http\Requests\App\RecipientRequest;
use App\Models\App;
use App\Models\Recipient;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class RecipientController extends Controller
{
    public function index(App $app): Response
    {
        $zones = $app->zones()->pluck('id');
        $recipients = Recipient::whereIn('zone_id', $zones)->with('zone')->orderBy('created_at', 'desc')->paginate();

        $recipients->appends($_GET);

        return Inertia::render('app/recipient/index', [
            'recipients' => RecipientData::collect($recipients),
        ]);
    }

    public function create(App $app): Response
    {
        $recipient = new Recipient;
        $recipient->token = str()->random(32);

        $zones = $app->zones()->with('app')->orderBy('name')->get();

        return Inertia::render('app/recipient/edit', [
            'recipient' => RecipientData::from($recipient),
            'zones' => ZoneData::collect($zones),
        ]);
    }

    public function edit(Recipient $recipient): Response
    {
        $recipient->load('zone');
        return Inertia::render('app/recipient/edit', [
            'recipient' => RecipientData::from($recipient),
        ]);
    }

    public function update(RecipientRequest $request, App $app, Recipient $recipient): RedirectResponse
    {
        $recipient->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Recipient updated successfully']);
        return redirect()->route('app.recipients.index', ['app' => $app]);
    }


    public function destroy(Recipient $recipient): RedirectResponse
    {
        $recipient->delete();

        return Inertia::flash('toast', [
            'message' => 'Recipient deleted successfully',
            'type' => 'success',
        ])->back();
    }

    public function store(RecipientRequest $request, App $app): RedirectResponse
    {
        ray($request->validated());
        Recipient::create($request->validated());
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Recipient created successfully']);
        return redirect()->route('app.recipients.index', ['app' => $app]);
    }
}
