<?php

namespace App\Http\Controllers;

use App\Http\Requests\SecteurRequest;
use App\Models\Secteur;
use App\Models\Ville;
use Inertia\Inertia;

class SecteurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $secteurs = Secteur::with('ville')->latest()->get();
          $villes = Ville::all(); // Ou votre logique de récupération
         return Inertia::render('secteur/index',
         ['secteurs' => $secteurs,
          'villes' => $villes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SecteurRequest $request)
    {
         try {
            $secteur = Secteur::create([
                'nameSecteur' => $request->validated()['nameSecteur'],
                'idVille' => $request->validated()['idVille'],
            ]);

            return redirect()->route('secteurs.index')->with('success', 'Secteur créée avec succès');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['message' => 'Erreur lors de la création: ' . $e->getMessage()])->withInput();
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(Secteur $secteur)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Secteur $secteur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SecteurRequest $request, Secteur $secteur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Secteur $secteur)
    {
        //
    }
}
