FROM php:7.4-apache
# FROM php:8.1-apache

ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf

WORKDIR /var/www/html

RUN docker-php-ext-install pdo pdo_mysql mysqli

RUN apt-get update

RUN apt-get install -y git-core curl build-essential openssl libssl-dev

RUN apt-get install -y \
    unzip \
    zip \
    libzip-dev \
 && docker-php-ext-install zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

EXPOSE 80

CMD ["apache2-foreground"]
