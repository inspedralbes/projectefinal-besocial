<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class GenresController extends Controller
{
    public function get(Request $request)
    {
        $genres = DB::select(DB::raw('SELECT * FROM genres'));

        return response()->json($genres);
    }
}
