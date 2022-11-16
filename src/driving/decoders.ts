import * as D from "io-ts/Decoder";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { User } from "../entities/users";

const newUserDecorder = D.struct({
  username: D.string,
});

const targetDecoder = D.number;

export const parseUser = (user: unknown): User =>
  pipe(
    newUserDecorder.decode(user),
    E.map((user) => ({ history: [], ...user })),
    E.matchW(
      (err) => {
        throw err;
      },
      (user) => user
    )
  );

export const parseTarget = (target: unknown): number =>
  pipe(
    targetDecoder.decode(target),
    E.matchW(
      (err) => {
        throw err;
      },
      (target) => target
    )
  );
