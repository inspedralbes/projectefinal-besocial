<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Organizer;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

class OrganizerController extends Controller
{
    // Crea un organizador y lo añade a la base de datos
    public function createOrganizer(Request $request)
    {
        $organizer = new Organizer();
        $organizer->idUser = auth()->user()->id;
        $organizer->name = $request->name;
        $organizer->coords = $request->coords;
        $organizer->address = $request->address;
        $organizer->postal_code = $request->postal_code;
        $organizer->city = $request->city;

        if ($organizer->save()) {
            return response()->json($organizer->id, Response::HTTP_CREATED);
        }
    }

    public function organizerCreated()
    {
        $idOrganizer = DB::select(DB::raw('SELECT id FROM organizers WHERE idUser = ' . auth()->user()->id))[0]->id;

        if ($idOrganizer >= 0) {
            return response()->json(true, Response::HTTP_OK);
        } else {
            return response()->json(false, Response::HTTP_OK);
        }
    }
}
