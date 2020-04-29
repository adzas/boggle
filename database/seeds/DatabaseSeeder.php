<?php

use App\Room;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        Room::create(['letters' => null , 'created' => date('Y-m-d H:i:s')]);
    }
}
