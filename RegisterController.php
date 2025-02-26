<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function index()
    {
        return view('registrasi', [
            'title' => 'Register',
            'active' => 'register'
        ]);
    }

    public function store(Request $request)
    {
        $validatedData= $request->validate([
            'name' => 'required|max:255',
            'nip' => 'required|max:255',
            'skpd' => 'required|max:255',
            'jabatan' => 'required|max:255',
            'nomor' => 'required|max:255',
            'username' => ['required', 'min:3', 'max:255', 'unique:users'],
            'email' => 'required|email:dns|unique:users',
            'password' => 'required|min:5|max:255'
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);

        User::create($validatedData);

       // $request->session()->flash('succes', 'Registration succesfull!');

        return redirect('/log')->with('success', 'Registation succesfull! Please login');

    }
}
