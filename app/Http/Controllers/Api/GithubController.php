<?php

namespace App\Http\Controllers\API;

use Cache;
use Github;
use Illuminate\Http\Request;

class GithubController extends Controller
{
    public function search(Request $request) {
        $github_api = Github::api('user');
        // Cache to remove redundant calls. bcrypt for faster cache response time
        $user = [
            "profile" => Cache::remember(bcrypt($request->input('username')), 5, function() {
                $github_api->find($request->input('username'));
            }),
            "followers" => $github_api->followers($request->input('username'), 
                ['per_page' => 50, 'page' => $request->input('page', 1)]),
        ];
    }
}