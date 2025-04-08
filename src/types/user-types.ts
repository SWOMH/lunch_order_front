import { IApiError } from './other-types';

export interface ITelegramId {
    telegram_id: number;
}

export interface IUser{
    id: number;
    telegram_id: ITelegramId;
    full_name: string;
    telegram_name: string | null;
    telegram_username: string | null;
    ban: boolean;
    admin: boolean;
}


export interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    isRegistered: boolean;
    error: string | IApiError | null;
    userNotFound: boolean;
}

export interface IRegisterUserData {
    telegram_id: number;
    full_name: string;
    telegram_name: string | null;
    telegram_username: string | null;
  }