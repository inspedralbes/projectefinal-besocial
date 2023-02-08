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
    public function register(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->photo = $request->photo;
        $user->save();

        return response()->json("User succesfully created");
    }

    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if(Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('cookie_token', $token, 60*24);
            return response(["token"=>$token], Response::HTTP_OK)->withCookie($cookie);
        } else {
            return response(["message"=> "Invalid Credentials"], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function userProfile(Request $request){
        return response()->json([
            "userData" => auth()->user()
        ], Response::HTTP_OK);
    }

    public function logout(){
        $cookie = cookie::forget('cookie_token');
        return response(["message"=>"Cierre de sesión OK"], Response::HTTP_OK)->withCookie($cookie);
    }

    public function update(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->photo = $request->photo;

        DB::table('users')->where('id', $request->id)
            ->update(['name' => $user->name,'email' => $user->email, 'password' => $user->password, 'photo' => $user->photo]);

        return response()->json("User succesfully updated");
    }
}
