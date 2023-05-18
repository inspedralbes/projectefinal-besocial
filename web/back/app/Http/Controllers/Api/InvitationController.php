<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\AssistenciaController;
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
            'id_event' => 'required',
        ]);

        $alreadySent = $this->checkRequests($request->id_receiver, $request->id_event);
        if (!$alreadySent) {
            $msg = "Invitation request already sent, wait for % to accept or reject it";
        } else {
            $invitation = new Invitation();
            $invitation->id_sender = auth()->user()->id;
            $invitation->id_receiver = $request->id_receiver;
            $invitation->id_event = $request->id_event;
            // Status 0 = pending // 1 = accepted
            $invitation->status = 0;
            $invitation->save();
            $msg = "Invitation request sent";
        }

        return response()->json($msg);
    }

    // Revisa que no haya una solicitud ya enviada que contenga a los dos usuarios, para que no hayan solicitudes repetidas
    public function checkRequests($id_receiver, $id_event)
    {
        $alreadySent = false;
        $id_user = auth()->user()->id;
        $select1 = 'SELECT * FROM invitations WHERE (id_receiver = ' . $id_receiver . ' AND id_sender = ' . $id_user . ') AND id_event = ' . $id_event;
        $checkRequest1 = DB::select(DB::raw($select1));
        if ($checkRequest1 == []) {
            $alreadySent = true;
        }

        return $alreadySent;
    }

    // recibe la id del que envió la solicitud, y mediante el token se coge la id del usuario, y se busca la solicitud, para cambiar el status a 1 (aceptada)
    public function acceptInvitation(Request $request)
    {
        $request->validate([
            'id_sender' => 'required',
            'id_event' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM invitations WHERE (id_receiver = ' . $id_user . ' AND id_sender = ' . $request->id_sender . ') AND id_event=' . $request->id_event . ' LIMIT 1';
        $invitation = DB::select(DB::raw($select));
        $invitation = Invitation::find($invitation[0]->id);
        $invitation->status = 1;
        $invitation->save();

        $assistenciaController = app(AssistenciaController::class);
        $response = $assistenciaController->store($request);

        return response()->json($response);
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
        $select = 'SELECT users.photo, users.name, users.id, id_event, events.name as eventName, events.link, organizers.name as organizerName 
        FROM invitations LEFT JOIN users on (users.id=id_receiver or users.id=id_sender) 
        LEFT JOIN events on events.id = id_event 
        LEFT JOIN organizers on organizers.id = events.idOrganizer 
        WHERE id_receiver = ' . $id_user . ' AND status=0 AND users.id != ' . $id_user;
        $select = DB::select(DB::raw($select));
        return response()->json($select);
    }
}
