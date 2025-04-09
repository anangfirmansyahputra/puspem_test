<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComplaintResponse extends Model
{
    protected $fillable = [
        'complaint_id',
        'response',
        'feedback',
    ];

    public function complaint()
    {
        return $this->belongsTo(Complaint::class);
    }
}
