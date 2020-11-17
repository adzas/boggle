<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ImportPolishDictionaryWords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:polish_dictionary_words';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        DB::unprepared(file_get_contents('database/sql/polish_words-02-data.sql'));
        DB::unprepared(file_get_contents('database/sql/polish_words-03-data.sql'));
        DB::unprepared(file_get_contents('database/sql/polish_words-04-data.sql'));
        DB::unprepared(file_get_contents('database/sql/polish_words-05-data.sql'));
        DB::unprepared(file_get_contents('database/sql/polish_words-06-data.sql'));
        DB::unprepared(file_get_contents('database/sql/polish_words-07-data.sql'));
        DB::unprepared(file_get_contents('database/sql/polish_words-08-data.sql'));
        DB::unprepared(file_get_contents('database/sql/polish_words-09-data.sql'));
    }
}
