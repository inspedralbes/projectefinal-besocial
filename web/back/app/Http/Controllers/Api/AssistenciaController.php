<?php

namespace App\Http\Controllers\Api;

use App\Models\Assistencia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AssistenciaController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'eventId' => 'required',
        ]);

        $assistencia = new Assistencia();
        $assistencia->id_user = auth()->user()->id;
        $assistencia->id_event = $request->eventId;
        $assistencia->save();

        return response()->json("Assistencia done");
    }

    public function getAssist ()
    {
        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM assistencias WHERE id_user ='.$id_user;
        $assistencia = DB::select(DB::raw($select));

        return response()->json(["assistencia" => $assistencia], Response::HTTP_OK); 
    }

    public function destroy(Request $request)
    {   
        $request->validate([
            'eventId' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT id FROM assistencias WHERE id_user ='.$id_user. ' AND id_event='.$request->eventId;
        $assistencia = DB::select(DB::raw($select));
        $assistencia = Assistencia::find($assistencia[0]->id);
        $assistencia->delete();

        return response()->json("Assistencia deleted");
    }
}
