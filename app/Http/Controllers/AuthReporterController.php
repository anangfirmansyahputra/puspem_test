<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthReporterController extends Controller
{
    public function showLogin()
    {
        return Inertia::render("reporter/login");
    }

    public function showRegister()
    {
        return Inertia::render("reporter/register");
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'email' => "required|string|email|unique:users,email",
            "password" => "required|string|min:6|confirmed",
            "name" => "required|string|min:3",
            "nik" => "required|string|min:16",
            "phone" => "required|string|min:12"
        ]);

        User::create($data);
        return to_route('login');
    }

    public function login(Request $request)
    {
        $credential = $request->validate([
            'email' => "required|string|email",
            "password" => "required|string",
        ]);

        if (Auth::attempt($credential)) {
            $user = Auth::user();

            if ($user->role === "REPORTER") {
                return redirect()->intended('/admin');
            }

            $request->session()->regenerate();

            return redirect()->intended('/dashboard');
        }

        return back()->withErrors(['email' => "Invalid credentials"])->withInput();
    }

    public function logout(Request $request)
    {
        $request->session()->regenerateToken();
        Auth::logout();
        return redirect('login');
    }
}
