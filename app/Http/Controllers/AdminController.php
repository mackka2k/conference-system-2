<?php

namespace App\Http\Controllers;

use App\Models\User;

class AdminController extends Controller
{
    public function getAllUsers()
    {
        try {
            $users = User::all();
            return response()->json($users);
        } catch (\Exception $e) {
            \Log::error('Error fetching users: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while fetching users.'], 500);
        }
    }
}
