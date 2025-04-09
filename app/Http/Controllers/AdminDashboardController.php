<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        $complaints = Complaint::count();
        $users = User::where("role", "REPORTER")->count();

        return Inertia::render('admin/dashboard', [
            'complaints' => $complaints,
            'users' => $users
        ]);
    }
}
