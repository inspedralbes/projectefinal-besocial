<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class LikeController extends Controller
{
    // guarda en la base de datos un like
    public function store(Request $request)
    {
        $request->validate([
            'eventId' => 'required',
        ]);

        $like = new Like();
        $like->id_user = auth()->user()->id;
        $like->id_event = $request->eventId;
        $like->save();

        return response()->json("Like done");
    }

    // busca los likes que tiene el usuario con el que estas autentificado
    public function getLikes(Request $request)
    {
        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM likes WHERE id_user =' . $id_user;
        $like = DB::select(DB::raw($select));

        return response()->json(["likes" => $like], Response::HTTP_OK);
    }

    // busca los likes que tiene, el usuario con el que estas autentificado,
    // haciendo join en los eventos para recibir información adicional
    public function getLikesUser()
    {
        $id_user = auth()->user()->id;
        $select = 'SELECT  organizers.name AS organizerName,events.id, events.name, events.date, events.hour, events.categories, events.link, events.photo, events.dayOfWeek, events.link
                        FROM `likes` 
                    LEFT JOIN `events` ON likes.id_event = events.id
                    LEFT JOIN `organizers` ON organizers.id = events.idOrganizer
                        where id_user =' . $id_user . ' AND (events.date >= "' . date("Y-m-d") . '" OR events.dayOfWeek >= 0)';

        $likeUser = DB::select(DB::raw($select));

        return response()->json(["likeUser" => $likeUser], Response::HTTP_OK);
    }

    // recibe el id de un evento, y se elimina el like del usuario a ese evento
    public function destroy(Request $request)
    {
        $request->validate([
            'eventId' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT id FROM likes WHERE id_user =' . $id_user . ' AND id_event=' . $request->eventId;
        $like = DB::select(DB::raw($select));
        $like = Like::find($like[0]->id);
        $like->delete();

        return response()->json("Like deleted");
    }

    // recibe el id de un evento, y devuelve el total de likes que tiene ese evento
    public function getAllLikes(Request $request)
    {
        $request->validate([
            'eventId' => 'required',
        ]);

        $select = 'SELECT count(*) AS total FROM likes WHERE id_event=' . $request->eventId;
        $likes = DB::select(DB::raw($select));

        return response()->json(["likes" => $likes]);
    }
}
