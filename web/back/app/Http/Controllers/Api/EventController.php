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
        $idOrganizer = DB::select(DB::raw('SELECT id FROM organizers WHERE idUser = ' . auth()->user()->id))[0]->id;

        $event = new Event();
        $event->idOrganizer = $idOrganizer;
        $event->name = $request->name;
        $event->date = $request->date;
        $event->hour = $request->hour;
        $event->link = $request->link;
        $event->photo = $request->photo;
        $event->dayOfWeek = $request->dayOfWeek;
        $event->categories = $request->categories;

        if ($event->save()) {
            return response()->json($event->id, Response::HTTP_CREATED);
        }
    }

    public function getEvents(Request $request)
    {
        $actualDate = getDate();
        $select = 'SELECT events.id AS id, organizers.name AS organizer, events.name AS name, events.date AS date, events.hour AS hour, organizers.address AS address, organizers.postal_code AS postal_code, organizers.city AS city, organizers.coords AS coords, events.link AS link, events.categories AS categories, events.photo AS photo FROM events, organizers WHERE events.idOrganizer = organizers.id ';
        if ($request->search) {
            $search = 'AND (events.name LIKE "%' . $request->search . '%" OR organizers.city LIKE "%' . $request->search . '%" OR organizers.name LIKE "%' . $request->search . '%") ';
        }
        if ($request->date) {
            $date = 'AND (events.date = "' . $request->date . '" OR events.dayOfWeek = ' . date('w', strtotime($request->date)) . ')';
        }
        if ($request->category) {
            $category = 'AND events.categories LIKE "%' . $request->category . '%" ';
        }
        $actualDate = 'AND (events.date = "' . date("Y-m-d") . '" OR events.dayOfWeek = ' . $actualDate['wday'] . ')';

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
        $newArray = array();
        for ($i = 0; $i < count($categories); $i++) {
            $array = array_merge($array, json_decode($categories[$i]->categories));
        }
        foreach (array_unique($array) as $value) {
            array_push($newArray, $value);
        }
        sort($newArray);
        return response()->json(["categories" => $newArray], Response::HTTP_OK);
    }

    public function getTopEvents()
    {
        $actualDate = getDate();
        $events = DB::select(DB::raw('SELECT events.photo AS photo ,events.id AS id, organizers.name AS organizer, events.name AS name, events.date AS date, events.hour AS hour, organizers.address AS address, organizers.postal_code AS postal_code, organizers.city AS city, events.link AS link, events.categories AS categories FROM events, organizers WHERE events.idOrganizer = organizers.id AND (events.date = "' . date("Y-m-d") . '" OR events.dayOfWeek = ' . $actualDate['wday'] . ')'));
        foreach ($events as $event) {
            $event->totalAssists = DB::select(DB::raw('SELECT COUNT(*) AS count FROM assistencias WHERE id_event = ' . $event->id))[0]->count;
        }
        usort($events, fn ($a, $b) => $b->totalAssists - $a->totalAssists);
        $events = array_slice($events, 0, 3);
        return response()->json(["events" => $events], Response::HTTP_OK);
    }

    public function getMyEvents()
    {
        $select = 'SELECT events.id, organizers.name AS organizer, events.name, events.photo FROM events, organizers WHERE events.idOrganizer = organizers.id AND organizers.idUser = ' . auth()->user()->id . ' AND (events.date >= "' . date("Y-m-d") . '" OR events.dayOfWeek >= 0);';
        $events = DB::select(DB::raw($select));
        foreach ($events as $event) {
            $event->assists = DB::select(DB::raw('SELECT COUNT(*) AS count FROM assistencias WHERE id_event = ' . $event->id))[0]->count;
            $event->likes = DB::select(DB::raw('SELECT COUNT(*) AS count FROM likes WHERE id_event = ' . $event->id))[0]->count;
        }
        return response()->json($events, Response::HTTP_OK);
    }

    public function deleteEvent(Request $request)
    {
        $request->validate([
            'eventId' => 'required',
        ]);
        $event = Event::find($request->eventId);
        $event->delete();
        return response()->json("Event deleted", Response::HTTP_OK);
    }

    public function getAssistFriends(Request $request)
    {
        $request->validate([
            'eventId' => 'required',
        ]);
        $assists = DB::select(DB::raw('SELECT users.id, users.name ,users.photo FROM users, assistencias WHERE id_event = ' . $request->eventId . ' AND id_user = users.id;'));
        $friends = DB::select(DB::raw('SELECT users.id FROM friends LEFT JOIN users on users.id = id_receiver or users.id = id_sender WHERE (id_receiver = ' . auth()->user()->id . ' OR id_sender = ' . auth()->user()->id . ') AND status = 1 AND users.id != ' . auth()->user()->id));
        $assistFriends = [];
        foreach ($assists as $assist) {
            foreach ($friends as $friend) {
                if ($friend->id == $assist->id) {
                    $assistFriends[] = $assist;
                    break;
                }
            }
        }
        return response()->json($assistFriends, Response::HTTP_OK);
    }
}
