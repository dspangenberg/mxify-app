<?php

namespace App\Http\Controllers\Admin;

use App\Data\AppData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AppRequest;
use App\Models\App;
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
use Symfony\Component\HttpFoundation\RedirectResponse;

class AppController extends Controller
{
    public function index(): Response
    {
        $apps = App::orderBy('name')->paginate();
        $apps->appends($_GET);

        return Inertia::render('admin/app/index', [
            'applications' => AppData::collect($apps),
        ]);
    }

    public function create(): Response
    {
        $app = new App;

        return Inertia::render('admin/app/edit', [
            'application' => AppData::from($app),
        ]);
    }

    public function edit(App $app): Response
    {
        return Inertia::render('admin/app/edit', [
            'application' => AppData::from($app),
        ]);
    }

    public function update(AppRequest $request, App $app): RedirectResponse
    {
        $data = $request->safe()->except('avatar','remove_avatar');

        $app->update($data);

        if ($request->hasFile('avatar')) {
            $app->detachMediaTags('avatar');

            try {
                $media = MediaUploader::fromSource($request->file('avatar'))
                    ->toDestination('public', 'avatars/apps')
                    ->upload();
                $app->attachMedia($media, 'avatar');
            } catch (ConfigurationException|FileExistsException|FileNotFoundException|FileNotSupportedException|FileSizeException|ForbiddenException|InvalidHashException) {

            }
        } else {
            if ($request->input('remove_avatar', false)) {
                if ($app->firstMedia('avatar')) {
                    $app->detachMediaTags('avatar');
                }
            }
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => 'App updated successfully']);

        return redirect()->route('admin.apps.index');
    }

    public function store(AppRequest $request): RedirectResponse
    {
        $data = $request->safe()->except('avatar','remove_avatar');
        $app = App::create($data);

        if ($request->hasFile('avatar')) {
            $app->detachMediaTags('avatar');

            try {
                $media = MediaUploader::fromSource($request->file('avatar'))
                    ->toDestination('public', 'avatars/apps')
                    ->upload();
                $app->attachMedia($media, 'avatar');
            } catch (ConfigurationException|FileExistsException|FileNotFoundException|FileNotSupportedException|FileSizeException|ForbiddenException|InvalidHashException) {
            }
        }


        Inertia::flash('toast', ['type' => 'success', 'message' => 'App created successfully']);

        return redirect()->route('admin.apps.index');
    }
}
