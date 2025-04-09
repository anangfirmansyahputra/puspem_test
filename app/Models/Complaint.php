<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
        'file_path'
    ];

    public function responses()
    {
        return $this->hasMany(ComplaintResponse::class)->latest();
    }
}
