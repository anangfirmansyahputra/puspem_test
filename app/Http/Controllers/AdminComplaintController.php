<?php

namespace App\Http\Controllers;

use App\Enums\ComplaintStatus;
use App\Models\Complaint;
use App\Models\ComplaintResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;

class AdminComplaintController extends Controller
{
    public function index()
    {

        $complaints = Complaint::orderBy("created_at", "desc")->get();
        return Inertia::render("admin/aduan/page", [
            'complaints' => $complaints
        ]);
    }

    public function show(string $id)
    {
        $complaint = Complaint::with('responses')->findOrFail($id);
        if ($complaint->closed) {
            return redirect()->route("admin.complaints.index");
        }

        return Inertia::render("admin/aduan/form", [
            'complaint' => $complaint
        ]);
    }

    public function complaintResponses(Request $request, string $id)
    {
        $data = $request->validate([
            'response' => "required|string",
            "status" => ["required", new Enum(ComplaintStatus::class)]
        ]);

        $complaint = Complaint::findOrFail($id);
        $complaint->update([
            'status' => $data['status']
        ]);

        ComplaintResponse::create([
            'complaint_id' => $complaint->id,
            'response' => $data['response']
        ]);

        return redirect()->route("admin.complaints.index");
    }
}
