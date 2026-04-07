<?php

namespace App\Http\Controllers\App;

use Alyakin\DnsChecker\Facades\DnsChecker;
use App\Data\ZoneData;
use App\Http\Controllers\Controller;
use App\Http\Requests\App\ZoneRequest;
use App\Models\App;
use App\Models\Zone;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class ZoneController extends Controller
{
    public function index(Request $request, App $app): Response
    {
        $zones = $app->zones()->with('app')->orderBy('name')->paginate();
        $zones->appends($_GET);

        return Inertia::render('app/zone/index', [
            'zones' => ZoneData::collect($zones),
        ]);
    }

    public function create(Request $request, App $app): Response
    {
        return Inertia::render('app/zone/edit', [
            'zone' => ZoneData::from([
                'id' => null,
                'name' => '',
                'webhook_url' => '',
                'is_dns_created' => false,
                'description' => null,
                'dns_checked_at' => null,
                'created_at' => null,
                'app_id' => $app->id,
            ]),
        ]);
    }

    public function edit(App $app, Zone $zone): Response
    {
        return Inertia::render('app/zone/edit', [
            'zone' => ZoneData::from($zone),
        ]);
    }

    public function update(ZoneRequest $request, App $app, Zone $zone): RedirectResponse
    {
        $zone->update($request->validated());
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Zone updated successfully']);

        return redirect()->route('app.zones.index', ['app' => $app]);
    }

    public function checkDns(App $app, Zone $zone): RedirectResponse
    {
        $records = DnsChecker::getRecords($zone->name, 'MX');
        $zone->dns_checked_at = now();


        if (count($records) > 0) {
            $zone->is_dns_created = true;
        }

        $zone->save();

        if ($zone->is_dns_created) {
            return Inertia::flash('toast', [
                'message' => 'DNS record found',
                'type' => 'success',
            ])->back();
        } else {
            return Inertia::flash('toast', [
                'message' => 'DNS record not found',
                'type' => 'warning',
            ])->back();
        }
    }

    public function destroy(App $app, Zone $zone): RedirectResponse
    {
        $zone->delete();

        return Inertia::flash('toast', [
            'message' => 'Zone deleted successfully',
            'type' => 'success',
        ])->back();
    }

    public function store(ZoneRequest $request, App $app): RedirectResponse
    {
        $zone = $app->zones()->create($request->validated());

        $records = DnsChecker::getRecords($zone->name, 'MX');
        $zone->dns_checked_at = now();

        if (count($records) > 0) {
            $zone->is_dns_created = true;
        }

        $zone->save();

        return redirect()->route('app.zones.index', ['app' => $app])->with('success', 'Zone created successfully');
    }
}
