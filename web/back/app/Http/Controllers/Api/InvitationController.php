<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvitationController extends Controller
{
    // recibe la id del usuario al que se envía la solicitud, y con el token se consigue el id del usuario que la envía,
    // comprueba que no haya una solicitud pendiente con los dos mismos usuarios y guarda el registro en la base de datos
    public function sendInvitation(Request $request)
    {
        $request->validate([
            'id_receiver' => 'required',
        ]);

        $alreadySent = $this->checkRequests($request->id_receiver);
        if (!$alreadySent) {
            $msg = "Invitation request already sent, accept or reject it first";
        } else {
            $invitation = new Invitation();
            $invitation->id_sender = auth()->user()->id;
            $invitation->id_receiver = $request->id_receiver;
            // Status 0 = pending // 1 = accepted
            $invitation->status = 0;
            $invitation->save();
            $msg = "Invitation request sent";
        }

        return response()->json($msg);
    }

    // Revisa que no haya una solicitud ya enviada que contenga a los dos usuarios, para que no hayan solicitudes repetidas
    public function checkRequests($id_receiver)
    {
        $alreadySent = false;
        $id_user = auth()->user()->id;
        $select1 = 'SELECT * FROM invitations WHERE id_receiver = ' . $id_receiver . ' AND id_sender = ' . $id_user;
        $checkRequest1 = DB::select(DB::raw($select1));
        $select2 = 'SELECT * FROM invitations WHERE id_receiver = ' . $id_user . ' AND id_sender = ' . $id_receiver;
        $checkRequest2 = DB::select(DB::raw($select2));
        if ($checkRequest1 == [] && $checkRequest2 == []) {
            $alreadySent = true;
        }

        return $alreadySent;
    }

    // recibe la id del que envió la solicitud, y mediante el token se coge la id del usuario, y se busca la solicitud, para cambiar el status a 1 (aceptada)
    public function acceptInvitation(Request $request)
    {
        $request->validate([
            'id_sender' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM invitations WHERE id_receiver = ' . $id_user . ' AND id_sender = ' . $request->id_sender . ' LIMIT 1';
        $invitation = DB::select(DB::raw($select));
        $invitation = Invitation::find($invitation[0]->id);
        $invitation->status = 1;
        $invitation->save();

        return response()->json("Invitation accepted");
    }

    // recibe la id del que envió la solicitud, y mediante el token se coge la id del usuario, y se busca la solicitud, para eliminar la solicitud
    public function rejectInvitation(Request $request)
    {
        $request->validate([
            'id_sender' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM invitations WHERE id_receiver = ' . $id_user . ' AND id_sender = ' . $request->id_sender . ' AND status=0 LIMIT 1';
        $invitation = DB::select(DB::raw($select));
        $invitation = Invitation::find($invitation[0]->id);
        $invitation->delete();

        return response()->json("Invitation deleted");
    }

    // mediante el token consigue el id de usuario, y consigue todos las solicitudes pendientes (status = 0)
    public function getMyInvitations()
    {
        $id_user = auth()->user()->id;
        $select = 'SELECT users.photo, users.name, users.id FROM invitations LEFT JOIN users on users.id=id_receiver or users.id=id_sender WHERE (id_receiver = ' . $id_user . ' OR id_sender = ' . $id_user . ') AND status=0';
        $select = DB::select(DB::raw($select));
        return response()->json($select);
    }
}
