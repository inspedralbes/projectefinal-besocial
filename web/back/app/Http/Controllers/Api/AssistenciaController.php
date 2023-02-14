<?php

namespace App\Http\Controllers\Api;

use App\Models\Assistencia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AssistenciaController extends Controller
{

    public function save(Request $request)
    {
        $request->validate([
            'userId' => 'required',
            'eventId' => 'required',
        ]);

        $assistencia = new Assistencia();
        $assistencia->userId = $request->userId;
        $assistencia->eventId = $request->eventId;
        $assistencia->save();
        
        return response()->json("Assitencia confirmed");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\assistencia  $assistencia
     * @return \Illuminate\Http\Response
     */
    public function show(assistencia $assistencia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\assistencia  $assistencia
     * @return \Illuminate\Http\Response
     */
    public function destroy(assistencia $assistencia)
    {
        //
    }
}
