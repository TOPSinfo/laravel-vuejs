<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterFormRequest;
use App\User;
use JWTAuth;
use Auth;

class AuthController extends Controller
{
    
    /**
     * Registration - Validate and store the registration request
     *
     * @param  \Illuminate\Http\Request  $request registration form fields
     * @return User data array
     */

    public function register(RegisterFormRequest $request)
	{
	    $user = new User;
	    $user->email = $request->email;
	    $user->name = $request->name;
	    $user->password = bcrypt($request->password);
	    $user->save();
	    return response([
	        'status' => 'success',
	        'data' => $user
	       ], 200);
	}

	/**
     * Login - Validate user and return authentication token
     *
     * @param  \Illuminate\Http\Request  $request login form fields
     * @return token
     */

	public function login(Request $request)
	{
	    $credentials = $request->only('email', 'password');
	    if ( ! $token = JWTAuth::attempt($credentials)) {
	            return response([
	                'status' => 'error',
	                'error' => 'invalid.credentials',
	                'msg' => 'Invalid Credentials.'
	            ], 400);
	    }
	    return response([
	            'status' => 'success'
	        ])
	        ->header('Authorization', $token);
	}

	/**
     * User - Search user details
     *
     * @param  \Illuminate\Http\Request  $request user id
     * @return user data array
     */

	public function user(Request $request)
	{
	    $user = User::find(Auth::user()->id);
	    return response([
	            'status' => 'success',
	            'data' => $user
	        ]);
	}

	/**
     * Refresh token
     *
     * @return Success
     */

	public function refresh()
	{
	    return response([
	            'status' => 'success'
	        ]);
	}

	/**
     * Logout - Invalidate the token
     *
     * @return Success
     */

	public function logout()
	{
	    JWTAuth::invalidate();
	    return response([
	            'status' => 'success',
	            'msg' => 'Logged out Successfully.'
	        ], 200);
	}
}
