<?php

namespace App\Http\Controllers\Api;

use App\Models\assistencia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AssistenciaController extends Controller
{
    // guarda en la base de datos una asistencia
    public function store(Request $request)
    {
        $request->validate([
            'eventId' => 'required',
        ]);

        $assist = $this->checkAssists($request->eventId);
        $msg = "";

        if (!$assist) {
            $assistencia = new assistencia();
            $assistencia->id_user = auth()->user()->id;
            $assistencia->id_event = $request->eventId;
            $assistencia->save();
            $msg = "Assistencia done";
        } else {
            $msg = "You already have an assist";
        }
        return response()->json($msg);
    }

    public function checkAssists($eventId)
    {
        $assist = false;
        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM assistencias WHERE id_event = ' . $eventId . ' AND id_user = ' . $id_user;
        $checkRequest1 = DB::select(DB::raw($select));
        if ($checkRequest1 != []) {
            $assist = true;
        }

        return $assist;
    }

    // busca las asistencias que tiene el usuario con el que estas autentificado
    public function getAssist()
    {
        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM assistencias WHERE id_user =' . $id_user;
        $assistencia = DB::select(DB::raw($select));

        return response()->json(["assistencia" => $assistencia], Response::HTTP_OK);
    }

    // busca las asistencias que tiene, el usuario con el que estas autentificado,
    // haciendo join en los eventos para recibir información adicional
    public function getAssistUser()
    {
        $id_user = auth()->user()->id;
        $select = 'SELECT  organizers.name AS organizerName, events.id, events.name, events.date, events.hour, events.categories, events.link, events.photo, events.dayOfWeek, events.link
                        FROM `assistencias` 
                    LEFT JOIN `events` ON assistencias.id_event = events.id
                    LEFT JOIN `organizers` ON organizers.id = events.idOrganizer
                        where id_user =' . $id_user . ' AND (events.date >= "' . date("Y-m-d") . '" OR events.dayOfWeek >= 0)';

        $assistUser = DB::select(DB::raw($select));

        return response()->json(["assistUser" => $assistUser], Response::HTTP_OK);
    }

    // busca las asistencias que tiene, el usuario con el id recibido por post,
    // haciendo join en los eventos para recibir información adicional
    public function getAssistFriend(Request $request)
    {
        $request->validate([
            'id_user' => 'required',
        ]);

        $select = 'SELECT  organizers.name AS organizerName, events.id, events.name, events.date, events.hour, events.categories, events.link, events.photo, events.dayOfWeek, events.link
                        FROM `assistencias` 
                    LEFT JOIN `events` ON assistencias.id_event = events.id
                    LEFT JOIN `organizers` ON organizers.id = events.idOrganizer
                        where id_user =' . $request->id_user . ' AND (events.date >= "' . date("Y-m-d") . '" OR events.dayOfWeek >= 0)';

        $assistUser = DB::select(DB::raw($select));

        return response()->json(["assistUser" => $assistUser], Response::HTTP_OK);
    }

    // recibe el id de un evento, y se elimina la asistencia del usuario a ese evento
    public function destroy(Request $request)
    {
        $request->validate([
            'eventId' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT id FROM assistencias WHERE id_user =' . $id_user . ' AND id_event=' . $request->eventId;
        $assistencia = DB::select(DB::raw($select));
        $assistencia = assistencia::find($assistencia[0]->id);
        $assistencia->delete();

        return response()->json("Assistencia deleted");
    }
}
