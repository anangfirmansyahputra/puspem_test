<?php

namespace App\Enums;

enum ComplaintStatus: string
{
  case PENDING = 'PENDING';
  case APPROVED = 'VERIFIED';
  case REJECTED = 'REJECTED';
}
