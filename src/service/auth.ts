import { accountService}from './auth/account'
import {authPageService} from './auth/auth'
import {roleService} from './auth/role'


export const authService =  {
    ...accountService,
    ...authPageService,
    ...roleService,
}