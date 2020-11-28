<?php

namespace App\database\seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rooms')->insert([
            'letters' => NULL,
            'created_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
