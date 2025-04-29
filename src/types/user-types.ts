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

export interface IAdminUsers {
    id: number;
    name: string;
    telegram_name?: string;
    telegram_username?: string;
    banned: boolean;
}


export interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    isRegistered: boolean;
    error: string | IApiError | null;
    userNotFound: boolean;
    adminUsers: IAdminUsers[];
    isAdminLoading: boolean;
    isAdminError: string | IApiError | null;
}

export interface IRegisterUserData {
    telegram_id: number;
    full_name: string;
    telegram_name: string | null;
    telegram_username: string | null;
  }