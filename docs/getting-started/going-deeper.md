---
title: Going Deeper | Lemon Docs
---

## Routing

Routing in Lemon is based on the class `Route` and it's inspired by Laravel's route definition syntax.

The class contains the following functions:

- `Route::get(route, handler)` - Defines a GET-only route
- `Route::post(route, handler)` - Defines a POST-only route
- `Route::any(route, handler)` - Defines a route for every method
- `Route::execute()` - Runs the handler of the current route.
- `Route::handler(httpCode, handler)` - Sets an error handler.

> :exclamation: If the route is accessed using a wrong method, error 400 is returned.

### Dynamic routes

You can also define dynamic routes using regex. For example,

```php
// ...

Route::get('/hello/(.+)', function ($name) {
    echo $name; // /hello/world -> "world"
})

// ...
```

will match any route starting with `/hello` and pass the url parameter to the handler's args.

## Templating system

Since version 1.2.0, Lemon has it's own templating system that escapes any input by default. The syntax is similar to Jinja2 and Twig, so Python and Symfony developers will already know it for the most part.

To make your own templates, create a folder `views` in your project root and create a new file with a `.lemon.php` extension.

Inside the `views` folder, let's create a new `hello.lemon.php` file:

```py
<p>Hello {{ $name ?: 'World' }}</p>
```

Your structure should look like this:

```
├─ hello-world
│  ├─ lemon
│  │  └─ framework.php
|  ├─ views
|  |  └─ hello.lemon.php
├─ composer.lock
├─ composer.json
└─ index.php
```

To render the view use the `view(name)` function. You don't have to specify the `.lemon.php` extension.

```php
// ...

Route::get("/hello/(.+)", function ($name) {
    view("hello", compact("name"));
})

// ...
```

This will render `<p>Hello $name</p>` (or "world" in place of $name if $name is not present).

### Syntax in-depth

// WIP

#### Displaying variables

<!-- v-pre because the braces are a valid Vue template syntax  -->

To display variables, simply use two curly braces: <span v-pre>`{{ $var }}`</span>. The input is automatically escaped by Lemon.

Examples:

```py
<!-- Displays a variable -->
{{ $var }}

<!-- Displays a variable or 'Unknown' if it's not present. -->
{{ $var ?: 'Unknown' }}
```

Anything inside the <span v-pre>`{{ }}`</span> is evaluated as PHP code and the output is printed out and escaped. You can think of it as the `<?= ?>` tags in PHP.

#### Conditional statements

You can make conditional statements using `{% if %}`, `{% else: %}`, `{% else if (condition): %}` and finally close the statement with `{% endif; %}`.

For example,

```py
{% if ($hello === "myself") %}
    Hello there
{% else if ($hello === "CoolFido"): %}
    Podvodink spotted!
{% else: %}
    Hello $name.
```

will print `Hello there` if $hello is "myself", `Podvodnik spotted!` if $hello is "CoolFido", otherwise it will print `Hello $name`;

#### For-loop, For-each

You can iterate over items using `{% foreach %}`.

For example,

```py
{% foreach($arr as $item): %}
    {{ $item }}
{% endfor; %}
```

will print every item in the `$arr` array.

You can use any PHP construct and use it inside of `{% %}`. Unlike the double braces, output inside `{% %}` does not get printed out.

## Error handling

The `Route` class contains a static method `handler` which gives you the ability to create custom error handling logic.
The function accepts 2 arguments - the httpCode and a handler callback.

At the moment, Lemon only handles the following HTTP codes

- 404 (Not Found)
- 400 (Bad Request)
- 500 (Internal Server Error)

Example:

```php
// ...

Route::handler(404, function () {
    echo "Whoops, looks like you got lost.";
});

// ...
```

## Sessions

You can manage sessions using the `Session` class. It contains the following methods:

- `Route::setName(name)` - Set the name of the session.
- `Route::start()` - Start the session.

If you want to use sessions in Lemon, you need to call `Route::start()`, ideally at application start before anything else.

## CSRF

Lemon provides a Cross-Site Request Forgery protection out of the box. You can enable it by calling `CSRF::setToken()` at the application start. To use it, you also need to include `@csrf` in your template's forms.

Example:

```php
<?php

require "lemon/framework.php";

Session::start();
CSRF::setToken();

Route::any("/", function() {
    CSRF::check();
    view("hello");
});

Route::execute();
```

```html
<form method="POST" href="/">
  <input type="text" name="input" required />
  @csrf
</form>
```

## Helpers

There are some helper functions from Lemon you can use in your application.

### `redirect(link)`

Redirect the user to a specified URL

Usage:

```php
redirect("/podvodnici"); // redirects to /podvodnici
```

### `jsonify(array)`

Serializes the array into a JSON and sends a JSON response with the `Content-Type: application/json` header.

Usage:

```php
jsonify([ "hello" => "world" ]); // sends { "hello": "world" }
```

### `console(message, color)`

This function send a message to the PHP console and is meant for debugging.

Usage:

```php
console("hello"); // outputs "hello" to the console
```

### `isUserPodvodnik(user)`

Checks whether the user is a podvodnik.

Usage:

```php
isUserPodvodnik("CoolFido"); // true
isUserPodvodnik("mianotfake"); // false
```
