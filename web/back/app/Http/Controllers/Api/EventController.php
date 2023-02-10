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
        $event->categories = $request->categories;

        if ($event->save()) {
            return response()->json($event->id, Response::HTTP_CREATED);
        }
    }

    public function getEvents(Request $request)
    {
        $select = 'SELECT organizers.name AS organizer, events.name AS name, events.date AS date, events.hour AS hour, organizers.address AS address, organizers.postal_code AS postal_code, organizers.city AS city, organizers.coords AS coords, events.link AS link, events.categories AS categories FROM events, organizers WHERE events.idOrganizer = organizers.id ';
        if ($request->search) {
            $search = 'AND (events.name LIKE "%' . $request->search . '%" OR organizers.city LIKE "%' . $request->search . '%" OR organizers.name LIKE "%' . $request->search . '%") ';
        }
        if ($request->date) {
            $date = 'AND events.date = "' . $request->date . '" ';
        }
        if ($request->category) {
            $category = 'AND events.categories LIKE "%' . $request->category . '%" ';
        }
        $actualDate = 'AND events.date = "' . date("d/m/Y") . '" ';

        if ($request->search && $request->date && $request->category) {
            $events = DB::select(DB::raw($select . $search . $date . $category));
        } else if ($request->search && $request->date) {
            $events = DB::select(DB::raw($select . $search . $date));
        } else if ($request->search && $request->category) {
            $events = DB::select(DB::raw($select . $search . $category . $actualDate));
        } else if ($request->date && $request->category) {
            $events = DB::select(DB::raw($select . $date . $category));
        } else if ($request->search) {
            $events = DB::select(DB::raw($select . $search . $actualDate));
        } else if ($request->date) {
            $events = DB::select(DB::raw($select . $date));
        } else if ($request->category) {
            $events = DB::select(DB::raw($select . $category . $actualDate));
        } else {
            $events = DB::select(DB::raw($select . $actualDate));
        }

        return response()->json(["events" => $events], Response::HTTP_OK);
    }

    public function getCategories()
    {
        $categories = DB::select(DB::raw('SELECT categories FROM events'));
        $array = array();
        for ($i = 0; $i < count($categories); $i++) {
            $array = array_merge($array, json_decode($categories[$i]->categories));
        }
        return response()->json(["categories" => array_unique($array)], Response::HTTP_OK);
    }
}
