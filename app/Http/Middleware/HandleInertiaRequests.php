<?php

namespace App\Http\Middleware;

use App\Data\AppData;
use App\Models\App;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $appId = null;
        $routeApp = $request->route('app');
        if ($routeApp instanceof App) {
            $appId = $routeApp->id;
        } elseif ($routeApp) {
            $appId = $routeApp;
        }

        if (! $appId && $request->user()?->current_app_id) {
            $appId = $request->user()->current_app_id;
        }

        $apps = $request->user()?->is_admin
            ? App::query()->orderBy('name')->get()
            : $request->user()?->apps()->orderBy('name')->get() ?? collect([]);

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'apps' => AppData::collect($apps),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'canRegister' => config('app.registration_enabled', true),
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'currentAppId' => $appId,
        ];
    }
}
