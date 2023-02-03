<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrganizerController;
use App\Http\Controllers\Api\EventController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('create-organizer', [OrganizerController::class, 'createOrganizer']);
Route::get('get-organizer', [OrganizerController::class, 'getOrganizer']);
Route::post('create-event', [OrganizerController::class, 'createEvent']);
Route::get('get-event', [OrganizerController::class, 'getEvent']);
