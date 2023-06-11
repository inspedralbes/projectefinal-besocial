<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends Controller
{
    // guarda en la base de datos una asistencia
    public function getOrganizers(Request $request)
    {
        $select = 'SELECT * FROM organizers';
        $organizers = DB::select(DB::raw($select));

        return response()->json($organizers);
    }

    public function deleteOrganizer(Request $request)
    {
        $select = 'DELETE FROM organizers WHERE organizers.id =' . $request->id;
        $organizers = DB::select(DB::raw($select));

        return response()->json($organizers);
    }

    public function editOrganizer(Request $request)
    {
        $select = 'UPDATE organizers SET name = "' . $request->name . '", address = "' . $request->address . '", postal_code = "' . $request->postal . '", coords = "' . $request->coords . '", city = "' . $request->city . '" WHERE organizers.id =' . $request->id;
        $organizers = DB::select(DB::raw($select));

        return response()->json($organizers);
    }
}
