export enum ROLES {
  ADMIN = "admin",
  SELLER = "seller",
  CUSTOMER = "customer"
}
export type User = {
  username: string;
  role: ROLES;
}

const angelUser: User = {
  username: 'angel',
  role: ROLES.ADMIN
}
