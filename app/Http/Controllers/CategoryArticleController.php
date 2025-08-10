<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryArticleController extends Controller
{
    public function card($category)
    {
        return Inertia::render('ppc/category/page', [

            'allArticles' => Blog::with(['category:id,slug'])
                ->whereHas('category', function ($q) use ($category) {
                    $q->where('slug', $category);
                })
                ->select('id', 'title', 'picture1', 'slug', 'category_articles_id', 'user_id', 'excerpt', 'views', 'created_at')
                ->with(['category', 'author'])
                ->paginate(6)
        ]);
    }
}
