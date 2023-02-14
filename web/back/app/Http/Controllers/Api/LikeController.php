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

    public function getLikes(Like $like)
    {
        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM likes WHERE id_user ='.$id_user;
        $like = DB::select(DB::raw($select));

        return response()->json(["likes" => $like], Response::HTTP_OK); 
    }

    public function destroy(Like $like)
    {
        //
    }
}
