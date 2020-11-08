<?php

use Illuminate\Database\Seeder;

class polish_password_words_seeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // factory(App\Word::class, 10)->create()->each(function ($user) {
            factory(App\Word::class)->make([
                'name' => 'test',
            ]);
        // });
    }
}
