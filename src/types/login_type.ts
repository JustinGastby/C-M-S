export interface IAccount {
  name: string
  password: string
}
export interface IUser {
  id: number
  name: string
  password: string
  cellphone: string
  departmentId: number
  enable: number
  roleId: number
  createAt: string
  updateAt: string
  realname: string
}
export interface Isystem {
  usersList: IUser[]
  usersTotalCount: number
}
export interface ISelectDate {
  entireRoles: any[]
  entireDepartment: any[]
}
