<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Friend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class FriendController extends Controller
{
    // guarda en la base de datos un amigo con las ids de los usuarios que la envían
    public function store(Request $request)
    {
        $request->validate([
            'id_receiver' => 'required',
        ]);
    
        $friend = new Friend();
        $friend->id_sender = auth()->user()->id;
        $friend->id_receiver = $request->id_receiver;
        // Status 0 = pending // 1 = accepted
        $friend->status = 0;
        $friend->save();
    
        return response()->json("Friend request sent");
    }

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
    
    public function rejectRequest(Request $request)
    {
        $request->validate([
            'id_sender' => 'required',
        ]);

        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM friends WHERE id_receiver = '.$id_user.' AND id_sender = '.$request->id_sender.' LIMIT 1';
        $friendRequest = DB::select(DB::raw($select));
        $friendRequest = Friend::find($friendRequest[0]->id);
        $friendRequest = Like::find($like[0]->id);
        $friendRequest->delete();

        return response()->json("Request deleted");
    }

    public function getMyFriends(){
        $id_user = auth()->user()->id;
        $select = 'SELECT * FROM friends WHERE (id_receiver = '.$id_user.' OR id_sender = '.$id_user.') AND status=1';
        $select = DB::select(DB::raw($select));
        return response()->json($select);
    }

}
