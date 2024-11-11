<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conference extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'date', 'status'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'conference_user')->withTimestamps();
    }
}
