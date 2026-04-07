<?php

namespace App\Http\Controllers\App;

use App\Data\ApiTokenData;
use App\Http\Controllers\Controller;
use App\Http\Requests\App\ApiTokenRequest;
use App\Models\App;
use DateTime;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class ApiTokenController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function create(): Response
    {
        $token = [
            'name' => '',
            'abilities' => [],
            'expires_at' => null,
        ];

        return Inertia::render('app/api-token/api-token-create', [
            'token' => ApiTokenData::from($token),
        ]);
    }

    public function destroy(App $app, string $tokenId): RedirectResponse
    {
        $app->tokens()->where('id', $tokenId)->delete();
        return redirect()->route('app.api-tokens.index', ['app' => $app->id])->with('flash.api_token', 'Token deleted successfully');
    }

    public function index(App $app): Response
    {
        $tokens = $app->tokens()->orderByDesc('created_at')->paginate(10);

        return Inertia::render('app/api-token/api-token-index', [
            'tokens' => $tokens->through(fn ($token) => ApiTokenData::from([
                'id' => $token->id,
                'name' => $token->name,
                'expires_at' => $token->expires_at,
                'abilities' => $token->abilities,
            ]))->appends($_GET),
            'flash' => [
                'api_token' => Session::get('api_token'),
            ],
        ]);
    }

    public function store(ApiTokenRequest $request, App $app): RedirectResponse
    {
        $expiresAt = null;
        if ($request->filled('expires_at')) {
            $expiresAt = DateTime::createFromFormat('Y-m-d', $request->validated('expires_at'));
            $expiresAt->setTime(23, 59, 59);
        }

        $token = $app->createToken($request->validated('name'), $request->validated('abilities'), $expiresAt);

        Session::flash('api_token', $token->plainTextToken);

        return redirect()->route('app.api-tokens.index', ['app' => $app]);
    }
}
