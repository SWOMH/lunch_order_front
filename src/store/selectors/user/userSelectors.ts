import { RootState } from '../../store';
import { IUser } from '../../../types/user-types';


export const selectUserInfo = (state: RootState): IUser | null => state.user.user;

export const selectUserInfoLoading = (state: RootState): boolean => state.user.isLoading;

export const selectUserNotFound = (state: RootState): boolean => state.user.userNotFound;

export const selectUserInfoError = (state: RootState): string | { status?: number; message: string } | null => 
  state.user.error;

export const selectUserRegistered = (state: RootState): boolean => state.user.isRegistered;