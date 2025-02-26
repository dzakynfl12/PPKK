<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use \Cviebrock\EloquentSluggable\Services\SlugService;
use illuminate\support\Str;

class PostMonitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('layout.monitoring', [
            'posts' => Post::where('user_id', auth()->user()->id)->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('post.create', [
            
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'namaapk' => 'required|max:255',
            'pengajuan' =>'required|max:255',
            'alasan' => 'required|max:255',
            'tujuan' => 'required|max:255'
        ]);

        $validatedData['user_id'] = auth()->user()->id;

        Post::create($validatedData);

        return redirect('/post')->with('success', 'New Post Success!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return view('post.show', [
            'post' => $post,
            'namaapk' => Post::all()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        return view('post.edit', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $rules =[
            'namaapk' => 'required|max:255',
            'pengajuan' =>'required|max:255',
            'alasan' => 'required|max:255',
            'tujuan' => 'required|max:255'
        ];

        // if($request->slug != $post->slug){
        //     $rules['slug'] = 'required|unique:posts';
        // }
        
        $validatedData = $request->validate($rules);
        $validatedData['user_id'] = auth()->user()->id;

        Post::where('id', $post->id)
            ->update($validatedData);

        return redirect('/post.index')->with('success', 'Post Update Success!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        Post::destroy($post->id);

        return redirect('/post')->with('success', 'Post Deleted!');
    }

}
