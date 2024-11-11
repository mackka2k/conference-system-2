<?php

namespace App\Http\Controllers;

use App\Models\Conference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function register(Request $request, int $conferenceId)
    {
        $conference = Conference::findOrFail($conferenceId);
        $user = Auth::user();

        if ($conference->users()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Already registered'], 400);
        }

        $conference->users()->attach($user->id, [
            'user_name' => $user->name,
            'conference_name' => $conference->name,
        ]);

        return response()->json(['message' => 'Registered successfully']);
    }

    public function getRegisteredUsers($conferenceId)
    {
        $conference = Conference::findOrFail($conferenceId);

        $registeredUsers = $conference->users()
            ->select('users.id', 'users.name')
            ->get();

        return response()->json($registeredUsers);
    }

    // Show the registered users view.
    public function showRegisteredUsers($conferenceId)
    {
        $conference = Conference::findOrFail($conferenceId);

        $registeredUsers = $conference->users()
            ->select('users.id', 'users.name')
            ->get();

        return Inertia::render('RegisteredUsers', [
            'conference' => $conference,
            'registeredUsers' => $registeredUsers,
        ]);
    }
}
