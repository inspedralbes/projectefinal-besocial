<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrganizerController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\AssistenciaController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('user_profile', [AuthController::class, 'userProfile']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('update_profile', [AuthController::class, 'update']);
    Route::post('save-like', [LikeController::class, 'store']);
    Route::get('get-like', [LikeController::class, 'getLikes']);
    Route::post('delete-like', [LikeController::class, 'destroy']);
    Route::get('get-like-user',[LikeController::class, 'getLikesUser']);
    Route::post('save-assist', [AssistenciaController::class, 'store']);
    Route::get('get-assist', [AssistenciaController::class, 'getAssist']);
    Route::post('delete-assist', [AssistenciaController::class, 'destroy']);
    Route::get('get-assist-user',[AssistenciaController::class, 'getAssistUser']);
});

Route::post('getAllLikes', [LikeController::class, 'getAllLikes']);

Route::post('create-organizer', [OrganizerController::class, 'createOrganizer']);
Route::post('create-event', [EventController::class, 'createEvent']);
Route::post('get-events', [EventController::class, 'getEvents']);
Route::get('get-categories', [EventController::class, 'getCategories']);

