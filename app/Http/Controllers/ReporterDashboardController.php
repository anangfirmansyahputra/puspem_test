<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReporterDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();
        $complaints = Complaint::where('user_id', $user->id)->count();

        return Inertia::render('dashboard', [
            'complaints' => $complaints
        ]);
    }
}
