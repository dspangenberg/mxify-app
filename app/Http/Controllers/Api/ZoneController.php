<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\App\ZoneRequest;
use App\Http\Resources\ZoneResource;
use App\Models\Zone;

class ZoneController extends Controller
{
    public function index()
    {
        return ZoneResource::collection(Zone::all());
    }

    public function store(ZoneRequest $request)
    {
        return new ZoneResource(Zone::create($request->validated()));
    }

    public function show(Zone $zone)
    {
        return new ZoneResource($zone);
    }

    public function update(ZoneRequest $request, Zone $zone)
    {
        $zone->update($request->validated());

        return new ZoneResource($zone);
    }

    public function destroy(Zone $zone)
    {
        $zone->delete();

        return response()->json();
    }
}
