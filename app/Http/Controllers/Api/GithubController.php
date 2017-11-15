<?php

namespace App\Http\Controllers\API;

use Cache;
use Github;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GithubController extends Controller
{
    public function search(Request $request) {
        // Cache to remove redundant calls. bcrypt for faster cache response time
        $user = [
            "profile" => Github::api('user')->show($request->input('username')),
            "followers" => Github::api('user')->followers($request->input('username'), 
                ['per_page' => 50, 'page' => $request->input('page', 1)]),
        ];
        return $user;
    }
}