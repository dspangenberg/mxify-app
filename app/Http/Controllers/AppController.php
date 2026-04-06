<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppRequest;
use App\Http\Resources\AppResource;
use App\Models\App;

class AppController extends Controller
{
    public function index()
    {
        return AppResource::collection(App::all());
    }

    public function store(AppRequest $request)
    {
        return new AppResource(App::create($request->validated()));
    }

    public function show(App $app)
    {
        return new AppResource($app);
    }

    public function update(AppRequest $request, App $app)
    {
        $app->update($request->validated());

        return new AppResource($app);
    }

    public function destroy(App $app)
    {
        $app->delete();

        return response()->json();
    }
}
