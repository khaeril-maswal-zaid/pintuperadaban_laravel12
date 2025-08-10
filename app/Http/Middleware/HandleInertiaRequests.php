<?php

namespace App\Http\Middleware;

use App\Models\Blog;
use App\Models\CategoryArticle;
use App\Models\Iklan;
use App\Models\Kontak;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $labels = ['fb', 'ig', 'x', 'yt', 'telepon', 'email', 'alamat'];
        $kontaks = [];
        foreach ($labels as $label) {
            $kontaks[$label] = Kontak::select(['name', 'value', 'link'])
                ->where('label', $label)
                ->where('status', 'aktif')
                ->first();
        }


        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'iklans' => Iklan::all(),
            'popularPosts' => (new Blog())->populer(),
            'mains' => Blog::select(['id', 'title', 'slug', 'category_articles_id',])
                ->with(['category', 'author'])
                ->where('level', 'main')
                ->latest()
                ->take(3)
                ->get(),
            'categories' => CategoryArticle::select(['slug', 'name'])
                ->orderBy('name')
                ->get(),
            'kontaks' => $kontaks
        ];
    }
}
