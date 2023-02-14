<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'userId' => 'required',
            'eventId' => 'required',
        ]);

        $like = new Like();
        $like->id_user = $request->userId;
        $like->id_event = $request->eventId;
        $like->save();

        return response()->json("Like done");
    }

    public function show(Like $like)
    {
        //
    }

    public function destroy(Like $like)
    {
        //
    }
}
