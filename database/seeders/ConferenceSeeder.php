<?php

namespace Database\Seeders;

use App\Models\Conference;
use Illuminate\Database\Seeder;

class ConferenceSeeder extends Seeder
{
    public function run()
    {
        Conference::create(['name' => 'Tech Innovations 2024', 'status' => 'Scheduled']);
        Conference::create(['name' => 'Health Summit 2023', 'status' => 'Completed']);
        Conference::create(['name' => 'AI and Ethics Conference', 'status' => 'Canceled']);
    }
}
