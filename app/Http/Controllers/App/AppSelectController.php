<?php

namespace App\Http\Controllers\App;

use App\Data\AppData;
use App\Http\Controllers\Controller;
use App\Models\App;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class AppSelectController extends Controller
{
    public function __invoke(): RedirectResponse
    {
        $apps = $this->getAccessibleApps();

        if ($apps->isNotEmpty()) {
            return redirect()->route('app.dashboard', ['app' => $apps->first()]);
        }

        return redirect()->route('home');
    }

    public function index(): Response
    {
        $apps = $this->getAccessibleApps();

        return Inertia::render('app/select', [
            'apps' => AppData::collect($apps),
        ]);
    }

    public function select(App $app): HttpResponse
    {
        $user = request()->user();

        if (! $user->is_admin && ! $user->apps()->where('apps.id', $app->id)->exists()) {
            abort(403);
        }

        $user->current_app_id = $app->id;
        $user->save();

        return redirect()->route('app.dashboard', ['app' => $app]);
    }

    private function getAccessibleApps(): Collection
    {
        $user = request()->user();

        return $user->is_admin ? App::all() : $user->apps;
    }
}
