<?php

namespace App\Http\Controllers\Admin;

use App\Data\AppData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AppRequest;
use App\Http\Requests\App\ZoneRequest;
use App\Models\App;
use App\Models\Zone;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class AppController extends Controller
{
    public function index(): Response
    {
        $apps = App::orderBy('name')->paginate();
        $apps->appends($_GET);

        return Inertia::render('admin/app/index', [
            'apps' => AppData::collect($apps),
        ]);
    }

    public function create(): Response
    {
        $app = new App;

        return Inertia::render('admin/app/edit', [
            'app' => AppData::from($app),
        ]);
    }

    public function edit(App $app): Response
    {
        return Inertia::render('admin/app/edit', [
            'app' => AppData::from($app),
        ]);
    }

    public function update(ZoneRequest $request, Zone $zone): RedirectResponse
    {
        $zone->update($request->validated());
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Zone updated successfully']);

        return redirect()->route('app.apps.index');
    }

    public function store(AppRequest $request): RedirectResponse
    {
        App::create($request->validated());
        Inertia::flash('toast', ['type' => 'success', 'message' => 'App created successfully']);

        return redirect()->route('admin.apps.index');
    }
}
