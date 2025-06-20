<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard/articles/page');
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
    public function store(StoreBlogRequest $request)
    {
        $base64Image = $request->mainImage;

        [$type, $data] = explode(';', $base64Image);
        [, $extension] = explode('/', $type); // jpeg, png
        [, $base64Data] = explode(',', $data);

        $filename = uniqid() . '-' . Str::slug($request->title) . '.' . $extension;

        Storage::disk('public')->put("image/blog/{$filename}", base64_decode($base64Data));

        $mainPath = "image/blog/{$filename}";

        $base64Image1 = $request->subImage1;

        [$type1, $data1] = explode(';', $base64Image1);
        [, $extension1] = explode('/', $type1); // jpeg, png
        [, $base64Data1] = explode(',', $data1);

        $filename1 = uniqid() . '-' . Str::slug($request->title) . '-sub.' . $extension1;

        Storage::disk('public')->put("image/blog/{$filename1}", base64_decode($base64Data1));

        $mainPath1 = "image/blog/{$filename1}";

        $body1 = str_replace('<p>', '<p class="mb-3">', $request->body1);
        $body2 = str_replace('<p>', '<p class="mb-3">', $request->body2);

        Blog::create([
            'user_id' => Auth::id(),
            'slug' => Str::slug($request->title, '-'),
            'title' => $request->title,
            'excerpt' => $request->description,
            'body1' => $body1,
            'body2' => $body2,
            'picture1' => $mainPath,
            'picture2' =>  $mainPath1,
            'tags' => $request->tags,
            'category' => $request->category,
            'level' => 'main',
            'views' => 50
        ]);

        // Reset semua level ke general
        Blog::query()->update(['level' => 'general']);

        // Ambil 3 berita terbaru → update jadi main
        Blog::query()
            ->latest()
            ->take(3)
            ->update(['level' => 'main']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        // 2️ Buat cache key
        $cacheKey = 'viewed_' . $blog->id . '_' . request()->ip();

        // 3️ Cek & proses log view
        if (!Cache::has($cacheKey)) {
            // Tambahkan log ke news_views
            $blog->views()->create([
                'ip_address' => request()->ip(),
            ]);

            // Increment kolom lifetime views
            $blog->increment('views');

            // Simpan cache key valid 1 jam
            Cache::put($cacheKey, true, now()->addMinutes(60));
        }

        // 4️ Tampilkan view
        return view('news.show', compact('news'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        //
    }
}
