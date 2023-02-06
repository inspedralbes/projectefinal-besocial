<?php
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrganizerController;
use App\Http\Controllers\Api\EventController;

Route::post('register', [AuthController::class, 'register']);

Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::get('user_profile', [AuthController::class, 'userProfile']);
    Route::post('logout', [AuthController::class, 'logout']);
});
Route::post('create-organizer', [OrganizerController::class, 'createOrganizer']);
Route::get('get-organizer', [OrganizerController::class, 'getOrganizer']);
Route::post('create-event', [EventController::class, 'createEvent']);
Route::get('get-event', [EventController::class, 'getEvent']);
