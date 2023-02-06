<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

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

    public function getEvents(Request $request)
    {
        if ($request->search && $request->date) {
            $events = DB::select(DB::raw('SELECT organizers.name AS organizer, events.name AS name, events.date AS date, events.hour AS hour, organizers.coords AS coords, organizers.location AS location, events.link AS link FROM events, organizers WHERE events.idOrganizer = organizers.id AND events.name LIKE "%' . $request->search . '%" AND events.date = "' . $request->date . '";'));
        } else if ($request->search) {
            $events = DB::select(DB::raw('SELECT organizers.name AS organizer, events.name AS name, events.date AS date, events.hour AS hour, organizers.coords AS coords, organizers.location AS location, events.link AS link FROM events, organizers WHERE events.idOrganizer = organizers.id AND events.name LIKE "%' . $request->search . '%" AND events.date = "' . date("d/m/Y") . '";'));
        } else if ($request->date) {
            $events = DB::select(DB::raw('SELECT organizers.name AS organizer, events.name AS name, events.date AS date, events.hour AS hour, organizers.coords AS coords, organizers.location AS location, events.link AS link FROM events, organizers WHERE events.idOrganizer = organizers.id AND events.date = "' . $request->date . '";'));
        } else {
            $events = DB::select(DB::raw('SELECT organizers.name AS organizer, events.name AS name, events.date AS date, events.hour AS hour, organizers.coords AS coords, organizers.location AS location, events.link AS link FROM events, organizers WHERE events.idOrganizer = organizers.id AND events.date = "' . date("d/m/Y") . '";'));
        }
        return response()->json(["events" => $events], Response::HTTP_OK);
    }
}
