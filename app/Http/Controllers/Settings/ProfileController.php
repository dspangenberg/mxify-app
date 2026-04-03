<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Plank\Mediable\Exceptions\MediaUpload\ConfigurationException;
use Plank\Mediable\Exceptions\MediaUpload\FileExistsException;
use Plank\Mediable\Exceptions\MediaUpload\FileNotFoundException;
use Plank\Mediable\Exceptions\MediaUpload\FileNotSupportedException;
use Plank\Mediable\Exceptions\MediaUpload\FileSizeException;
use Plank\Mediable\Exceptions\MediaUpload\ForbiddenException;
use Plank\Mediable\Exceptions\MediaUpload\InvalidHashException;
use Plank\Mediable\Facades\MediaUploader;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     * @throws ConfigurationException
     * @throws ForbiddenException
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $data = $request->safe()->except('avatar', 'email', 'remove_avatar');
        $newEmail = $request->validated('email');

        $request->user()->fill($data);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if ($newEmail !==  $request->user()->email) {
            $request->user()->newEmail($newEmail);
            $request->user()->email_verified_at = null;
        }

        if ($request->hasFile('avatar')) {
            $request->user()->detachMediaTags('avatar');

            try {
                $media = MediaUploader::fromSource($request->file('avatar'))
                    ->toDestination('public', 'avatars/users')
                    ->upload();
                $request->user()->attachMedia($media, 'avatar');
            } catch (ConfigurationException|FileExistsException|FileNotFoundException|FileNotSupportedException|FileSizeException|ForbiddenException|InvalidHashException) {

            }
        }  else {
            if ($request->input('remove_avatar', false)) {
                if ($request->user()->firstMedia('avatar')) {
                    $request->user()->detachMediaTags('avatar');
                }
            }
        }



        return to_route('app.profile.edit');
    }

    public function resendVerificationEmail(Request $request): RedirectResponse
    {
        $request->user()->resendPendingEmailVerificationMail();
        return Redirect::back();
    }

    public function clearPendingMailAddress(Request $request)
    {
        $request->user()->clearPendingEmail();
        return redirect()->back();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
