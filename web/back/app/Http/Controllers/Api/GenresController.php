<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GenresController extends Controller
{
    public function get(Request $request)
    {
        $genres = DB::select(DB::raw('SELECT * FROM genres'));

        return response()->json($genres);
    }

    public function setMyGenres(Request $request)
    {
        $id_user = User::find(auth()->user()->id);

        $affected = DB::table('users')->where('id', $id_user->id)->update(['genres' => $request->genres]);

        return response()->json("todo correcto ".$request->genres." ".$id_user->id);
    }
}
