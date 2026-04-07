<?php

namespace App\Http\Middleware;

use App\Models\App;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasAppAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $app = $request->route('app');

        if (! $app instanceof App) {
            $app = App::where('id', $app)->first();
        }

        $user = $request->user();

        $hasAccess = $app
            && ($user->is_admin || $user->apps()->where('apps.id', $app->id)->exists());

        if (! $hasAccess) {
            abort(403);
        }

        $request->attributes->set('app', $app);

        return $next($request);
    }
}
