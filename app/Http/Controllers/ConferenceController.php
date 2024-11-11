<?php
// app/Http/Controllers/ConferenceController.php

namespace App\Http\Controllers;

use App\Models\Conference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConferenceController extends Controller
{
    public function index()
    {
        $role = Auth::check() ? Auth::user()->role : 'Guest';

        if ($role === 'Client') {
            $conferences = Conference::where('status', 'Scheduled')->orderBy('created_at', 'desc')->get();
        } else if ($role === 'Employee') {
            $conferences = Conference::whereIn('status', ['Scheduled', 'Completed'])->orderBy('created_at', 'desc')->get();
        } else {
            $conferences = Conference::orderBy('created_at', 'desc')->get();
        }

        return Inertia::render('ViewConferences', [
            'conferences' => $conferences,
            'role' => $role,
        ]);
    }

    public function create()
    {
        return Inertia::render('CreateConference');
    }

    // Store a newly created conference in storage.
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|in:Scheduled,Completed,Canceled',
        ]);

        Conference::create([
            'name' => $request->name,
            'date' => $request->date,
            'status' => $request->status,
        ]);

        return redirect()->route('conferences.index')->with('success', 'Conference created successfully!');
    }

    // Show the form for editing a conference
    public function edit($conferenceId)
    {
        $conference = Conference::findOrFail($conferenceId);
        return Inertia::render('EditConference', [
            'conference' => $conference,
        ]);
    }
    public function update(Request $request, $conferenceId)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|in:Scheduled,Completed,Canceled',
        ]);

        $conference = Conference::findOrFail($conferenceId);
        $conference->update([
            'name' => $request->name,
            'date' => $request->date,
            'status' => $request->status,
        ]);

        return redirect()->route('conferences.index')->with('success', 'Conference updated successfully!');
    }
    public function destroy($conferenceId)
    {
        $conference = Conference::findOrFail($conferenceId);

        try {
            $conference->delete();
            return response()->json(['message' => 'Conference deleted successfully!']);
        } catch (\Exception $e) {
            \Log::error('Error deleting conference: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while deleting the conference.'], 500);
        }
    }
}
