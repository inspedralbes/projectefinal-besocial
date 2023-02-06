<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrganizerController;
use App\Http\Controllers\Api\EventController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('create-organizer', [OrganizerController::class, 'createOrganizer']);
Route::post('create-event', [EventController::class, 'createEvent']);
Route::get('get-events', [EventController::class, 'getEvents']);
