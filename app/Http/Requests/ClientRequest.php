<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "code" => [
                "required",
                "string",
                "min:3",
                "max:20",
                Rule::unique('clients')->ignore($this->route('client'))
            ],
            "fullName" => [
                "required",
                "string",
                "min:3",
                "max:100"
            ],
            "idVille" => [
                "required",
                Rule::exists('villes', 'id')
            ],
            "idSecteur" => [
                "required",
                Rule::exists('secteurs', 'id')
            ]
        ];
    }

    public function messages(): array
    {
        return [
            "code.required" => "Le code est obligatoire.",
            "code.min" => "Le code doit contenir au moins 3 caractères.",
            "code.max" => "Le code doit contenir au plus 20 caractères.",
            "code.unique" => "Ce code existe déjà.",
            "fullName.required" => "Le nom complet est obligatoire.",
            "fullName.min" => "Le nom complet doit contenir au moins 3 caractères.",
            "fullName.max" => "Le nom complet doit contenir au plus 100 caractères.",
            "idVille.required" => "La ville est obligatoire.",
            "idVille.exists" => "La ville sélectionnée n'existe pas.",
            "idSecteur.required" => "Le secteur est obligatoire.",
            "idSecteur.exists" => "Le secteur sélectionné n'existe pas."
        ];
    }
}
