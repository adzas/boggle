
composer install

php artisan migrate:fresh --seed

php artisan import:polish_dictionary_words

php artisan import:polish_password_words

npm install

npm run dev