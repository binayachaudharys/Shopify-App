<?php

use App\Http\Controllers\ContentController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\RatingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return "Hello API";
});

Route::group(["prefix" => "v1"], function () {
    Route::group(["prefix" => "faq"], function () {
        Route::get('{store_id}', [FaqController::class, 'index']); //all faq
        Route::post('', [FaqController::class, 'store']); // create new faq
        Route::get('/getContent/{id}', [FaqController::class, 'show']); //faq detail
        Route::get('/getcode/{slug}', [FaqController::class, 'shortcodeshow']); //code data
        Route::put('/edit/{id}', [FaqController::class, 'update']); //edit faq
        Route::delete('/delete/{id}', [FaqController::class, 'destroy']); //delete faq
    });
    Route::group(["prefix" => "content"], function () {
        Route::get('{content_id}', [ContentController::class, 'show']); //get content
        Route::put('/edit/{id}', [ContentController::class, 'update']); //edit faq
    });
    Route::group(["prefix" => "rating"], function () {
        Route::get('/getRating/{id}', [RatingController::class, 'show']); //faq detail
        Route::post('/rating', [RatingController::class, 'store']); //edit faq
    });
});
