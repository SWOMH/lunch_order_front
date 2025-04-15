import { IApiError } from "./other-types"; 

export interface IVariants {
    id: number;
    size: string;
    price: number;
}

export interface IDishesResponse {
    dishes: IDish[];
}


export interface IDish {
    id: number;
    _id: string;
    name: string;
    description: string | null;
    price: number | null;
    image: string | null;
    available: boolean;
    type: string;
    stop_list: boolean;
    is_combo: boolean;
    additives: boolean;
    variants: Array<IVariants> | null;
    selectedVariant?: IVariants; // Добавьте это свойство
    quantity?: number; // И это, если нужно
}

export interface IDishesState {
    dishes: IDish[];
    isLoading: boolean;
    isLoaded: boolean;
    error: string | IApiError | null;
  }