<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function updateRole(Request $request)
    {
        $request->validate([
            'role' => 'required|string|in:Client,Employee,Admin',
        ]);

        $user = Auth::user();
        $user->role = $request->role;
        $user->save();

        return response()->json(['status' => 'Role updated successfully']);
    }
}
