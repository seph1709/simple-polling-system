<?php

namespace App\Http\Controllers;

use App\Models\Polling;
use App\Http\Requests\StorePollingRequest;
use App\Http\Requests\UpdatePollingRequest;
use Illuminate\Support\Facades\DB;
class PollingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data= DB::table('pollings')->select("pollings_data")->latest()->get();
        return Inertia("Vote",["itemsData"=>$data]);
    }


    public function adminLogin()
    {
        //

        return Inertia("AdminLogin");
    }


    public function adminDashBoard()
    {
        //

       $data= DB::table('pollings')->select("pollings_data")->latest()->get();

    //    dd($data);

        return Inertia("AdminDashBoard",["itemsData"=>$data]);
    }

     public  function statistics()  {
        $data= DB::table('voteds')->select("voted_data")->get();
        $dataPollings= DB::table('pollings')->select("pollings_data")->latest()->get()->first();
        return inertia("Statistics",["voted_data"=>$data,"polling_data"=>$dataPollings]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        // Polling::create([
        //     'pollings_data' => [1,2,3],
        //     ]);
        //     return 'done';
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePollingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Polling $polling)
    {
        //

        $data = Polling::find(1);
         dd($data->pollings_data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Polling $polling)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePollingRequest $request, Polling $polling)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Polling $polling)
    {
        //
    }
}
