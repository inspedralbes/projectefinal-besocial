<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Organizer;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OrganizerController extends Controller
{
    public function createOrganizer(Request $request)
    {
        $organizer = new Organizer();
        $organizer->name = $request->name;
        $organizer->coords = $request->coords;
        $organizer->location = $request->location;
        $organizer->img = $request->img;

        if ($organizer->save()) {
            return response()->json($organizer->id, Response::HTTP_CREATED);
        }
    }
}
