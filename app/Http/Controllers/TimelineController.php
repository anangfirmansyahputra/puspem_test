<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimelineController extends Controller
{
    public function index()
    {
        $complaints = Complaint::where("status", "PENDING")->orderBy("created_at", "desc")->get();
        return Inertia::render("welcome", [
            'complaints' => $complaints
        ]);
    }
}
