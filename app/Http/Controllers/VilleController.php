<?php

namespace App\Http\Controllers;

use App\Http\Requests\VilleRequest;
use App\Models\Ville;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VilleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():Response
    {
        $villes=Ville::latest()->get();
         return Inertia::render('ville/index',
         ['villes' => $villes]);
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
   public function store(VilleRequest $request)
   {
        try {
            $ville = Ville::create([
                'nameVille' => $request->validated()['nameVille'],
            ]);

            return redirect()->route('villes.index')->with('success', 'Ville créée avec succès');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['message' => 'Erreur lors de la création: ' . $e->getMessage()])->withInput();
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ville $ville)
    {


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VilleRequest $request, Ville $ville)
    {
            try {
                    $ville->nameVille = $request->nameVille;
                    $ville->save();

                    if ($ville) {
                         return redirect()->route('villes.index')->with('success', 'Ville updated successfully.');
                     }
                    return redirect()->back()->with('error', 'Unable to uipdate Ville. Please try again.');


            } catch (\Exception $th) {
                return redirect()->back()->with('error', 'Failed to update Ville.');
            }


    }

    /**
     * Remove the specified resource from storage.
     */
     public function destroy(Ville $ville)
    {
        try {
            if ($ville) {
                $ville->delete();
                return redirect()->route('villes.index')->with('success', 'Ville Supprimer avec succès');
            }

         } catch (\Exception $e) {
        return redirect()->back()->withErrors(['message' => 'Erreur lors de la Suppression: ' . $e->getMessage()])->withInput();
    }
    }
}
