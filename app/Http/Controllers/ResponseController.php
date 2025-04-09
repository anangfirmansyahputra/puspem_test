<?php

namespace App\Http\Controllers;

use App\Models\ComplaintResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResponseController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $responses = ComplaintResponse::with('complaint')
            ->whereHas('complaint', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->orderBy("created_at", "desc")
            ->get();

        return Inertia::render('reporter/response/page', [
            'responses' => $responses
        ]);
    }

    public function showResponse(Request $request, string $id)
    {
        $response = ComplaintResponse::findOrFail($id);

        return Inertia::render('reporter/response/form', [
            'response' => $response
        ]);
    }

    public function feedback(Request $request, string $id)
    {

        $response = ComplaintResponse::findOrFail($id);

        $data = $request->validate([
            'feedback' => "string|required|min:3"
        ]);

        $response->update($data);

        return redirect()->route("responses.index");
    }
}
