<?php

namespace App\Http\Controllers;

use App\Models\Iklan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class IklanController extends Controller
{
    public function index()
    {
        $data = [
            'mockAdvertisements' => Iklan::select(['brand', 'status', 'type', 'image', 'owner', 'no_hp', 'id'])->get()
        ];

        return Inertia::render('dashboard/advertisements/page', $data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:100',
            'no_hp' => 'required|string|max:50',
            'owner' => 'required|string|max:100',
            'type' => 'required|string|max:50',
            'status' => 'required|in:active,nonactive',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // max 5MB
        ]);

        // simpan file image
        $path = $request->file('image')->store('advertisements', 'public');

        Iklan::create([
            'brand' => $validated['brand'],
            'no_hp' => $validated['no_hp'],
            'owner' => $validated['owner'],
            'type' => $validated['type'],
            'status' => $validated['status'],
            'image' => $path,
        ]);
    }

    public function update(Request $request, Iklan $iklan)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:100',
            'no_hp' => 'required|string|max:50',
            'owner' => 'required|string|max:100',
            'type' => 'required|string|max:50',
            'status' => 'required|in:active,nonactive',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {
            // hapus lama
            if ($iklan->image && Storage::disk('public')->exists($iklan->image)) {
                Storage::disk('public')->delete($iklan->image);
            }
            // upload baru
            $path = $request->file('image')->store('advertisements', 'public');
            $validated['image'] = $path;
        } else {
            // kalau tidak ada file baru, tetap pakai lama
            $validated['image'] = $iklan->image;
        }

        $iklan->update([
            'brand' => $validated['brand'],
            'no_hp' => $validated['no_hp'],
            'owner' => $validated['owner'],
            'type' => $validated['type'],
            'status' => $validated['status'],
            'image' => $validated['image'],
        ]);
    }

    public function destroy(Iklan $iklan)
    {
        $iklan->delete();
    }
}
