<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Adityo Hariyudo',
            'email' => 'adit.goyo@gmail.com',
            'email_verified_at' => now(),
            'password' => 'secret',
            'role' => 0
        ]);
    }
}
