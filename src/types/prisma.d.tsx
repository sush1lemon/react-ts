import {User} from "./user.d";
import {SubReddit} from "./subReddit.d";




/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const SubRedditType = {
  public: 'public',
  private: 'private',
  restricted: 'restricted'
};

export type SubRedditType = (typeof SubRedditType)[keyof typeof SubRedditType]

