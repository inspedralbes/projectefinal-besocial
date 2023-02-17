<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class LikeController extends Controller
{
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

    public function getLikes(Request $request)
    {
        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM likes WHERE id_user ='.$id_user;
        $like = DB::select(DB::raw($select));

        return response()->json(["likes" => $like], Response::HTTP_OK); 
    }

    public function destroy(Request $request)
    {   
        $request->validate([
            'eventId' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT id FROM likes WHERE id_user ='.$id_user. ' AND id_event='.$request->eventId;
        $like = DB::select(DB::raw($select));
        $like = Like::find($like[0]->id);
        $like->delete();

        return response()->json("Like deleted");
    }

    public function getAllLikes(Request $request) {
        $request->validate([
            'eventId' => 'required',
        ]);

        $select = 'SELECT count(*) AS total FROM likes WHERE id_event='.$request->eventId;
        $likes = DB::select(DB::raw($select));

        return response()->json(["likes" => $likes]); 
    }
}
