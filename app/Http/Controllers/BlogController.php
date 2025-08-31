<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\CategoryArticle;
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
        $data = [
            'blogs' => Blog::select(['id', 'slug', 'title', 'excerpt', 'picture1', 'category_articles_id', 'user_id', 'views', 'created_at'])
                ->with('category')
                ->with('author')
                ->where('user_id', Auth::id())
                ->latest()
                ->paginate(10)
                ->withQueryString(),
        ];
        return Inertia::render('dashboard/articles/page', $data);
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

        $body1 = str_replace('<p>', '<p class="mb-2">', $request->body1);
        $body2 = str_replace('<p>', '<p class="mb-2">', $request->body2);

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
            'category_articles_id' => $request->category,
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
        $ogTags = [
            'title' => $blog->title,
            'description' => Str::limit(strip_tags($blog->excerpt), 200),
            'image' => asset('/storage/' . $blog->picture1),
            'url' => route('show', $blog),
        ];
        request()->attributes->set('og', $ogTags);

        $blog->load(['author', 'category']);

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

        $latestBlog = Blog::select(['slug',  'excerpt', 'title', 'picture1', 'category_articles_id', 'user_id', 'views', 'created_at'])
            ->whereNot('slug', $blog->slug)
            ->with('category')
            ->with('author')
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('ppc/article/page', [
            'articleData' => $blog,
            'latestBlog' => $latestBlog,
        ]);
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

    function home(): Response
    {
        // $blog = new Blog();
        // $blog->import();
        // die('Selesai');

        $mainBlog = Blog::select(['slug', 'title', 'picture1', 'category_articles_id', 'created_at'])
            ->where('level', 'main')
            ->with('category')
            ->latest()
            ->take(3)
            ->get();

        $generalBlog = Blog::select(['slug', 'title', 'picture1', 'category_articles_id', 'created_at'])
            ->where('level', 'general')
            ->with('category')
            ->latest()
            ->take(4)
            ->get();

        // Gabungkan slug dari main dan general
        $excludedSlugs = $mainBlog->pluck('slug')
            ->merge($generalBlog->pluck('slug'))
            ->all();

        $latestBlog = Blog::select(['slug',  'excerpt', 'title', 'picture1', 'category_articles_id', 'user_id', 'views', 'created_at'])
            ->whereNotIn('slug', $excludedSlugs)
            ->whereHas('category', function ($query) {
                $query->where('slug', 'news');
            })
            ->with('category')
            ->with('author')
            ->latest()
            ->take(4)
            ->get();


        $kategori = CategoryArticle::select('id')->get();

        $categorizedBlog = collect(); // untuk menampung hasil akhir | Kira-kira sama []

        foreach ($kategori as $kat) {
            $blog = Blog::select(['slug', 'title', 'picture1', 'category_articles_id',  'user_id', 'views', 'created_at'])
                ->where('category_articles_id', $kat->id)
                ->with('category')
                ->with('author')
                ->whereNotIn('slug', $excludedSlugs)
                ->latest()
                ->first(); // ambil 1 berita per kategori

            if ($blog) {
                $categorizedBlog->push($blog);
                $excludedSlugs[] = $blog->slug; // tambah ke daftar slug yang sudah dipakai
            }
        }

        $data = [
            'mainBlog' => $mainBlog,
            'generalBlog' => $generalBlog,
            'latestBlog' => $latestBlog,
            'categorizedBlog' => $categorizedBlog, // hasil: 1 per kategori
        ];

        return Inertia::render('ppc/page', $data);
    }

    public function card($category)
    {
        return Inertia::render('ppc/category/page', [

            'allArticles' => Blog::with(['category:id,slug'])
                ->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                })
                ->select('id', 'title', 'picture1', 'slug', 'category_articles_id', 'user_id', 'excerpt', 'views', 'created_at')
                ->with(['category', 'author'])
                ->latest()
                ->paginate(6)
        ]);
    }
}
