<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\App;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $user = Auth::user();
        $user->last_login_at = now();
        $user->save();

        $request->session()->regenerate();
        $app = null;

        if ($user->current_app_id) {
            $app = $user->is_admin
                ? App::query()->find($user->current_app_id)
                : $user->apps()->where('apps.id', $user->current_app_id)->first();
        }

        if (!$app) {
            $app = $user->is_admin
                ? App::query()->orderBy('name')->first()
                : $user->apps()->orderBy('name')->first();
        }

        if ($app) {
            return redirect()->intended(route('app.dashboard', ['app' => $app->id], absolute: false));
        }

        abort(404);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
