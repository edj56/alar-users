import { ILoginRequest } from './login/login.interfaces';
import { IRegisterRequest } from './register/register.interfaces';
import { IProfile } from './auth.interfaces';

export class AuthStateModel {
  isLoggedIn?: boolean;
  profile?: IProfile;
  isLoading?: boolean;
}

export class Init {
  static readonly type = '[Auth] Init';
  constructor() {}
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: ILoginRequest) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: IRegisterRequest) {}
}
