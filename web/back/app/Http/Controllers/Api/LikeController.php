<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class LikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'userId' => 'required',
            'eventId' => 'required',
        ]);

        $like = new Like();
        $like->userId = $request->userId;
        $like->eventId = $request->eventId;
        $like->save();
        
        return response()->json("Like done");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function destroy(Like $like)
    {
        //
    }
}
