<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'phone' => 'required',
            'password' => 'required'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = $request->password;
        $user->save();

        return response()->json([
            "message" => "Método REGISTER" 
        ]);
    }

    public function login(Request $request){
        return response()->json([
            "message" => "Método LOGIN"
        ]);
    }

    public function userProfile(Request $request){
        
    }

    public function logout(){
        
    }
}
