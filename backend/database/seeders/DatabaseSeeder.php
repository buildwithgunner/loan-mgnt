<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create 10 users, each with 1-2 applications
        \App\Models\User::factory(10)->create()->each(function ($user) {
            \App\Models\Application::factory(rand(1, 2))->create([
                'user_id' => $user->id
            ]);
        });

        // Create a specific test user for the dashboard
        $testUser = \App\Models\User::factory()->create([
            'name' => 'Demo User',
            'email' => 'user@demo.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password123'),
        ]);

        \App\Models\Application::factory()->create([
            'user_id' => $testUser->id,
            'type' => 'Fix & Flip',
            'amount' => 350000,
            'status' => 'under_review',
            'processing_stage' => 'Appraisal Ordered',
            'processing_level' => 45,
        ]);

        // Create specified admins
        \App\Models\Admin::create([
            'name' => 'Daniel Moses',
            'email' => 'danielmoses849@gmail.com',
            'password' => \Illuminate\Support\Facades\Hash::make('admin1234'),
        ]);

        \App\Models\Admin::create([
            'name' => 'Luke Addy',
            'email' => 'Lukeaddyflooringcapital@gmail.com',
            'password' => \Illuminate\Support\Facades\Hash::make('123456AaMD'),
        ]);
    }
}
