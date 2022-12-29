<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use App\Models\Faq;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        try {
            
         
            if()

            $faqvote = new Rating();
            $faqvote->content_id = $request->content_id;
            $faqvote->answer_id = $request->answer_id;
            $faqvote->upvote = $request->upvote;
            $faqvote->downvote = $request->downvote;
            $faqvote->save();
            
            return [
                "status" => 201,
                "data" => [
             
                    "content_id" => $faqvote,
                ],
                "msg" => "Content Fetched"
            ];
        } catch (Exception $e) {
            return response(["msg" => $e->getMessage()], 400);
        } catch (Error $e) {
            return response(["msg" => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        try {
            // $faq = Faq::find($id);
            // $data = $faq->content;
            // // $array =json_decode($data->content);
            // // $arraylen =count($array);
            // // dd($arraylen);
            // $ratingFind =$data->id;

            $ratingdata = Rating::where('content_id',$id )->get();
        
        //    dd($ratingdata);
  
            return [
                "status" => 200,
                "data" => json_decode($ratingdata),
                "msg" => "Voting fetched successfully"
            ];
        } catch (Exception $e) {
            return response(["msg" => $e->getMessage()], 400);
        } catch (Error $e) {
            return response(["msg" => $e->getMessage()], 400);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function edit(Rating $rating)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rating $rating)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rating  $rating
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rating $rating)
    {
        //
    }
}
