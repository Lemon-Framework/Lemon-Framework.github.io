---
title: Your First Project | Lemon Docs
---

## Installation

You can create a new project with Composer:

```shell
$ composer create-project lemon_framework/lemon:dev-master hello-world # download Lemon
$ touch index.php # create an entry-point of your project
$ composer install # install dependencies
```

The project's default structure should look like this:

```
├─ hello-world
│  ├─ lemon
│  │  └─ framework.php
├─ composer.lock
├─ composer.json
└─ index.php
```

## Quick Start

Now that your project is ready, let's get started with a classic Hello World!

Open your `index.php` file and require Lemon:

```php
require "lemon/framework.php";
```

### Define your first route

To define a new route, use Lemon's `Route` class.

The class contains the following functions:

- `Route::get(route, handler)` - Defines a GET-only route
- `Route::post(route, handler)` - Defines a POST-only route
- `Route::any(route, handler)` - Defines a route for every method
- `Route::execute()` - Runs the handler of the current route.
- `Route::handler(httpCode, handler)` - Sets an error handler.

Let's say we want to define a GET endpoint `/hello`:

```php
// ...

// Define a route
Route::get('/hello', function () {
    echo 'Hello World';
});

// Run!
Route::execute();
```

And just like that we made our own Hello World in Lemon!
