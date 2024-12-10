<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Polling;
use App\Models\Voted;
use Illuminate\Support\Facades\DB;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/items', function (Request $request) {
    $fields =  $request->all();
    $data = Polling::create(['pollings_data'=>$fields]);
    return $data;
});

Route::post('/items/update', function (Request $request) {
    $fields =  $request->all();
    Polling::select("pollings_data")->update(['pollings_data'=>$fields]);
   
});

Route::post('/voted', function (Request $request) {
    $fields =  $request->all();
    $data = Voted::create(['voted_data'=>$fields]);
    return $data;
});

Route::post('/items/delete', function (Request $request) {
    $fields =  $request->all();
    Polling::select("pollings_data")->update(['pollings_data'=>$fields]);
   
});