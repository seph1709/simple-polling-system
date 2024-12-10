<?php

namespace App\Http\Controllers;

use App\Models\Voted;
use App\Http\Requests\StoreVotedRequest;
use App\Http\Requests\UpdateVotedRequest;

class VotedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVotedRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Voted $voted)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voted $voted)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVotedRequest $request, Voted $voted)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voted $voted)
    {
        //
    }

    public function success() {
       return inertia("Successful");
    }
}
