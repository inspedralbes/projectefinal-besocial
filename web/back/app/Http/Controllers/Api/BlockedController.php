<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Blocked;

class BlockedController extends Controller
{   
    // recibe una id de usario, con el token se consigue la id del usuario que bloquea, y se bloquea al usuario de la id recibida
    public function store(Request $request)
    {
        $request->validate([
            'id_blocked' => 'required',
        ]);

        $blocked = new Blocked();
        $blocked->id_blocker = auth()->user()->id;
        $blocked->id_blocked = $request->id_blocked;
        $blocked->save();
        $msg = "User blocked succesfully";

        return response()->json($msg);
    }

    // recibe una id de usario, con el token se consigue la id del usuario que bloquea, y se desbloquea al usuario de la id recibida
    public function deleteBlock(Request $request)
    {
        $request->validate([
            'id_blocked' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM blockeds WHERE id_blocker = '.$id_user.' AND id_blocked = '.$request->id_blocked.' LIMIT 1';
        $blocked = DB::select(DB::raw($select));
        $blocked = Blocked::find($friendRequest[0]->id);
        $blocked->delete();

        return response()->json("Request deleted");
    }

    // con el token de usuario se consigue la id, y devuelve todos los registros que contienen esa id como bloqueador
    public function getMyBlocks(){
        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM blockeds WHERE id_blocker = '.$id_user;
        $select = DB::select(DB::raw($select));
        return response()->json($select);
    }
}
