<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EventController extends Controller
{
    public function createEvent(Request $request)
    {
        $event = new Event();
        $event->idOrganizer = $request->idOrganizer;
        $event->name = $request->name;
        $event->date = $request->date;
        $event->hour = $request->hour;
        $event->link = $request->link;

        if ($event->save()) {
            return response()->json($event->id, Response::HTTP_CREATED);
        }
    }

    public function getEvent(Request $request)
    {
        $event = Event::find($request->id);
        return response()->json(["event" => $event], Response::HTTP_OK);
    }
}
