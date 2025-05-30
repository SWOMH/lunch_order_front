import { RootState } from '../../store';
import { IAdminUsers, IUser } from '../../../types/user-types';
import { IApiError } from '../../../types/other-types';


export const selectUserInfo = (state: RootState): IUser | null => state.user.user;

export const selectUserInfoLoading = (state: RootState): boolean => state.user.isLoading;

export const selectUserNotFound = (state: RootState): boolean => state.user.userNotFound;

export const selectUserInfoError = (state: RootState): string | IApiError | null => 
  state.user.error;

export const selectUserRegistered = (state: RootState): boolean => state.user.isRegistered;

export const selectUserIsAdmin = (state: RootState): boolean => state.user.user?.admin || false;

export const selectAllUsers = (state: RootState): IAdminUsers[] => state.user.adminUsers || [];

export const selectAdminIsLoading = (state: RootState): boolean => state.user.isAdminLoading;

export const selectAdminErrorLoading = (state: RootState): string | IApiError | null => state.user.isAdminError;