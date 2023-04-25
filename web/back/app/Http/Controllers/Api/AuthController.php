<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Cookie;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        $user = new User();
        $user->description = "Hi i'm ".$request->name.". Let's party together!";
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        if ($request->photo != null) {
            $user->photo = $request->photo;
        }
        $user->save();

        return response()->json("User succesfully created");
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('cookie_token', $token, 60 * 24);
            return response(["token" => $token], Response::HTTP_OK)->withCookie($cookie);
        } else {
            return "false";
        }
    }

    public function userProfile(Request $request)
    {
        return response()->json([
            "userData" => auth()->user()
        ], Response::HTTP_OK);
    }

    public function logout()
    {
        $cookie = cookie::forget('cookie_token');
        return response(["message" => "Session closed OK"], Response::HTTP_OK)->withCookie($cookie);
    }

    public function update(Request $request)
    {
        $user = User::find(auth()->user()->id);

        if ($request->photo) {
            $user->photo = $request->photo;
        }
        if ($request->name) {
            $user->name = $request->name;
        }
        if ($request->description) {
            $user->description = $request->description;
        }
        if ($request->email) {
            $user->email = $request->email;
        }
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->save();
        return response()->json("User succesfully updated");
    }

    public function updatePhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required'
        ]);
        $user = User::find(auth()->user()->id);

        if ($request->photo) {
            $user->photo = $request->photo;
        }
        $user->save();
        return response()->json("Photo succesfully updated");
    }
}