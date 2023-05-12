<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrganizerController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\AssistenciaController;
use App\Http\Controllers\Api\FriendController;
use App\Http\Controllers\Api\BlockedController;
use App\Http\Controllers\Api\InvitationController;
use App\Http\Controllers\Api\GenresController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('user-profile', [AuthController::class, 'userProfile']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('update-profile', [AuthController::class, 'update']);
    Route::post('update-profile-photo', [AuthController::class, 'updatePhoto']);
    Route::post('search-user', [AuthController::class, 'searchUser']);
    Route::post('get-friend-profile', [AuthController::class, 'getFriendProfile']);
    Route::post('save-like', [LikeController::class, 'store']);
    Route::get('get-like', [LikeController::class, 'getLikes']);
    Route::post('delete-like', [LikeController::class, 'destroy']);
    Route::get('get-like-user', [LikeController::class, 'getLikesUser']);
    Route::post('save-assist', [AssistenciaController::class, 'store']);
    Route::get('get-assist', [AssistenciaController::class, 'getAssist']);
    Route::post('delete-assist', [AssistenciaController::class, 'destroy']);
    Route::get('get-assist-user', [AssistenciaController::class, 'getAssistUser']);
    Route::post('get-assist-friend', [AssistenciaController::class, 'getAssistFriend']);
    Route::post('send-friend-request', [FriendController::class, 'sendRequest']);
    Route::post('accept-friend-request', [FriendController::class, 'acceptRequest']);
    Route::post('delete-friend-request', [FriendController::class, 'rejectRequest']);
    Route::post('delete-friend', [FriendController::class, 'deleteFriend']);
    Route::get('get-my-friends', [FriendController::class, 'getMyFriends']);
    Route::get('get-my-requests', [FriendController::class, 'getMyRequests']);
    Route::get('get-my-pending-requests', [FriendController::class, 'getMyPendRequests']);
    Route::post('block-user', [FriendController::class, 'deleteBlock']);
    Route::post('delete-block', [FriendController::class, 'deleteBlock']);
    Route::get('get-my-blocks', [FriendController::class, 'getMyBlocks']);
    Route::post('send-invitation', [InvitationController::class, 'sendInvitation']);
    Route::post('accept-invitation', [InvitationController::class, 'acceptInvitation']);
    Route::post('reject-invitation', [InvitationController::class, 'rejectInvitation']);
    Route::get('get-invitation', [InvitationController::class, 'getMyInvitations']);
    Route::post('create-organizer', [OrganizerController::class, 'createOrganizer']);
    Route::post('create-event', [EventController::class, 'createEvent']);
    Route::get('organizer-created', [OrganizerController::class, 'organizerCreated']);
    Route::get('user-role', [AuthController::class, 'userRole']);
    Route::get('get-all-genres', [GenresController::class, 'get']);
    Route::post('set-my-genres', [GenresController::class, 'setMyGenres']);
    Route::get('get-my-events', [EventController::class, 'getMyEvents']);
    Route::post('delete-event', [EventController::class, 'deleteEvent']);
});

Route::post('getAllLikes', [LikeController::class, 'getAllLikes']);
Route::post('get-events', [EventController::class, 'getEvents']);
Route::get('get-categories', [EventController::class, 'getCategories']);
Route::get('get-top-events', [EventController::class, 'getTopEvents']);
