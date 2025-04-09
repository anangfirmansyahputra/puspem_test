<?php

namespace App\Http\Controllers;

use App\Enums\ComplaintStatus;
use App\Mail\ComplaintMail;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $complaints = Complaint::where("user_id",  $user->id)->orderBy("created_at", "desc")->get();
        return Inertia::render("reporter/aduan/page", [
            'complaints' => $complaints
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("reporter/aduan/form");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $data = $request->validate([
            'title' => "required|string|min:6",
            "description" => "required|string|min:6",
            "file_path" => "required|file|mimes:jpg,jpeg,png,pdf|max:2048",
        ]);

        if ($request->hasFile("file_path")) {
            $data["file_path"] = $request->file("file_path")->store('uploads', 'public');
        }

        $data["status"] = "PENDING";
        $data['user_id'] = Auth::user()->id;

        Complaint::create($data);
        try {
            Mail::to($user->email)->send(new ComplaintMail(['name' => $user->name]));
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }

        return to_route('complaints.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Complaint $complaint)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Complaint $complaint)
    {
        if ($complaint->closed) {
            return redirect()->route('complaints.index');
        }

        return Inertia::render("reporter/aduan/form", [
            'complaint' => $complaint
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Complaint $complaint)
    {
        $data = $request->validate([
            'title' => "required|string|min:6",
            "description" => "required|string|min:6",
            "file_path" => "nullable",
            Rule::when(
                $request->hasFile("file_path"),
                ["file|mimes:jpg,jpeg,png,pdf|max:2048"],
                ["string"]
            ),
        ]);

        if ($request->hasFile("file_path")) {
            $data["file_path"] = $request->file("file_path")->store('uploads', 'public');
        } else {
            unset($data["file_path"]);
        }

        $data["status"] = "PENDING";
        $data['user_id'] = Auth::user()->id;

        $complaint->update($data);

        return to_route('complaints.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Complaint $complaint)
    {
        $complaint->delete();
        return to_route('complaints.index');
    }
}
