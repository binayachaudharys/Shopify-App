<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use HasFactory;
    use Sluggable;
    protected $fillable = [];


   
   

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'content_title'
            ]
        ];
    }

    public function content()
    {
        return $this->hasOne(Content::class);
    }
    public function rating()
    {
        return $this->hasmang(Rating::class);
    }
}
