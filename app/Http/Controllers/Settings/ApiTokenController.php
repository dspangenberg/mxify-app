<?php

namespace App\Http\Controllers\Settings;

use App\Data\ApiTokenData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ApiTokenStoreRequest;
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

        return Inertia::render('settings/api-token-create', [
            'token' => ApiTokenData::from($token),
        ]);
    }

    public function index(Request $request): Response
    {
        $tokens = $request->user()->tokens()->orderByDesc('created_at')->paginate(10);

        return Inertia::render('settings/api-token-index', [
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

    public function store(ApiTokenStoreRequest $request): RedirectResponse
    {
        $expiresAt = null;
        if ($request->filled('expires_at')) {
            $expiresAt = DateTime::createFromFormat('Y-m-d', $request->validated('expires_at'));
            $expiresAt->setTime(23, 59, 59);
        }

        $token = $request->user()->createToken($request->validated('name'), $request->validated('abilities'), $expiresAt);

        Session::flash('api_token', $token->plainTextToken);

        return redirect()->route('app.api-tokens.index');
    }
}
