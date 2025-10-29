import { Model, Types } from "mongoose";

export enum UserRole {
  CONTRIBUTOR = "contributor",
  REVIEWER = "reviewer",
  SCHOLAR = "scholar",
  SUPER_ADMIN = "super_admin",
}

export type TBaseUser = {
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  isVerified: boolean;
  isDeleted?: boolean;
  reputation: number;
  authId: Types.ObjectId;
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<TBaseUser>;
