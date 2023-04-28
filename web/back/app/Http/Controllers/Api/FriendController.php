<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Friend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class FriendController extends Controller
{
    // recibe la id del usuario al que se envía la solicitud, y con el token se consigue el id del usuario que la envía,
    // comprueba que no haya una solicitud pendiente con los dos mismos usuarios y guarda el registro en la base de datos
    public function sendRequest(Request $request)
    {
        $request->validate([
            'id_receiver' => 'required',
        ]);
        
        $alreadySent = $this->checkRequests($request->id_receiver);
        if(!$alreadySent){
            $msg = "Friend request already sent, accept or reject it first";
        }else{
            $friend = new Friend();
            $friend->id_sender = auth()->user()->id;
            $friend->id_receiver = $request->id_receiver;
            // Status 0 = pending // 1 = accepted
            $friend->status = 0;
            $friend->save();
            $msg = "Friend request sent";
        }

        return response()->json($msg);
    }

    // Revisa que no haya una solicitud ya enviada que contenga a los dos usuarios, para que no hayan solicitudes repetidas
    public function checkRequests($id_receiver){
        $alreadySent = false;
        $id_user = auth()->user()->id;
        $select1 = 'SELECT * FROM friends WHERE id_receiver = '.$id_receiver.' AND id_sender = '.$id_user;
        $checkRequest1 = DB::select(DB::raw($select1));
        $select2 = 'SELECT * FROM friends WHERE id_receiver = '.$id_user.' AND id_sender = '.$id_receiver;
        $checkRequest2 = DB::select(DB::raw($select2));
        if ($checkRequest1 == [] && $checkRequest2 == []) {
            $alreadySent = true;
        }

        return $alreadySent;
    }

    // recibe la id del que envió la solicitud, y mediante el token se coge la id del usuario, y se busca la solicitud, para cambiar el status a 1 (aceptada)
    public function acceptRequest(Request $request)
    {   
        $request->validate([
            'id_sender' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM friends WHERE id_receiver = '.$id_user.' AND id_sender = '.$request->id_sender.' LIMIT 1';
        $friendRequest = DB::select(DB::raw($select));
        $friendRequest = Friend::find($friendRequest[0]->id);
        $friendRequest->status = 1;
        $friendRequest->save();

        return response()->json("Friend accepted");
    }
    
    // recibe la id del que envió la solicitud, y mediante el token se coge la id del usuario, y se busca la solicitud, para eliminar la solicitud
    public function rejectRequest(Request $request)
    {
        $request->validate([
            'id_sender' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM friends WHERE id_receiver = '.$id_user.' AND id_sender = '.$request->id_sender.' LIMIT 1';
        $friendRequest = DB::select(DB::raw($select));
        $friendRequest = Friend::find($friendRequest[0]->id);
        $friendRequest->delete();

        return response()->json("Request deleted");
    }
    
    // mediante el token consigue el id de usuario, y consigue todos los amigos (solicitudes aceptadas)
    public function getMyFriends(){
        $id_user = auth()->user()->id;
        $select = 'SELECT users.photo, users.name, users.id FROM friends LEFT JOIN users on users.id=id_receiver or users.id=id_sender WHERE (id_receiver = '.$id_user.' OR id_sender = '.$id_user.') AND status=1';
        $select = DB::select(DB::raw($select));
        return response()->json($select);
    }

    // mediante el token consigue el id de usuario, y consigue todos las solicitudes pendientes (status = 0)
    public function getMyRequests(){
        $id_user = auth()->user()->id;
        $select = 'SELECT users.photo, users.name, users.id FROM friends LEFT JOIN users on users.id=id_receiver or users.id=id_sender WHERE (id_receiver = '.$id_user.' OR id_sender = '.$id_user.') AND status=0';
        $select = DB::select(DB::raw($select));
        return response()->json($select);
    }
}
