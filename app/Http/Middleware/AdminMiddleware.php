<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): RedirectResponse|Response
    {

        if (auth()->user()->is_admin === false) {
            auth()->logout();

            return redirect()->route('home');
        }

        return $next($request);
    }
}
