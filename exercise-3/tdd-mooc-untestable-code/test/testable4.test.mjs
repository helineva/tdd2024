import { afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { PasswordService, PostgresUserDao } from "../src/testable4.mjs";
import argon2 from "@node-rs/argon2";


describe("Untestable 4: PasswordService", () => {
  let users;  
  let service;
  beforeEach(() => {
    users = {
        "123": { userId: "123", passwordHash: argon2.hashSync("pw") },
        "456": { userId: "456", passwordHash: argon2.hashSync("salasana") },
    
        getById(id) {
          return { userId: this[id].userId, passwordHash: this[id].passwordHash };
        },
        save(user) {
          this[user.userId] = { userId: user.userId, passwordHash: user.passwordHash };
        }
    };
    service = new PasswordService(users);
  });
  
  test("can change password", async () => {
    let user1 = users["123"];
    let user2 = users["456"];
    expect(argon2.verifySync(user1.passwordHash, "pw")).to.be.true;
    expect(argon2.verifySync(user2.passwordHash, "salasana")).to.be.true;
    await service.changePassword("456", "salasana", "uusiSalasana");
    user1 = users["123"];
    user2 = users["456"];
    expect(argon2.verifySync(user1.passwordHash, "pw")).to.be.true;
    expect(argon2.verifySync(user2.passwordHash, "uusiSalasana")).to.be.true;
  });

  test("can not change password using wrong old password", async () => {
    let user1 = users["123"];
    let user2 = users["456"];
    expect(argon2.verifySync(user1.passwordHash, "pw")).to.be.true;
    expect(argon2.verifySync(user2.passwordHash, "salasana")).to.be.true;
    let wrongPasswordError;
    try {
        await service.changePassword("456", "ssalasana", "uusiSalasana");
    } catch (error) {
      wrongPasswordError = error;
    }
    expect(wrongPasswordError).to.deep.equal(new Error("wrong old password"));
    user1 = users["123"];
    user2 = users["456"];
    expect(argon2.verifySync(user1.passwordHash, "pw")).to.be.true;
    expect(argon2.verifySync(user2.passwordHash, "salasana")).to.be.true;
  });
});

describe("Untestable 4: PostgresUserDao", () => {
    let db; 
    let dao;
    beforeEach(() => {
      db = {
        query(str, params) {
            if (str.startsWith("select")) {
                if (this[params[0]] != undefined) {
                    return { rows: [this[params[0]]] };
                } else return { rows: [] };
            } else if (str.startsWith("insert")) {
                this[params[0]] = { user_id: params[0], password_hash: params[1] };
            }
        }
      };  
      dao = new PostgresUserDao(db); 
    });
    
  test("can get user by id", async () => {
      db["123"] = { user_id: "123", password_hash: "pwhash" };
      let user = await dao.getById("123");
      expect(user.userId).to.deep.equal(db["123"].user_id);
      expect(user.passwordHash).to.deep.equal(db["123"].password_hash);
  });

  test("trying to get nonexisting user returns null", async () => {
    let user = await dao.getById("123");
    expect(user).to.equal(null);
  });

  test("can create a user", async () => {
    let user = { userId: "123", passwordHash: "pwhash" };
    await dao.save(user);
    expect(db["123"].user_id).to.deep.equal("123");
    expect(db["123"].password_hash).to.deep.equal("pwhash");
  });

  test("can update an existing user", async () => {
    db["123"] = { user_id: "123", password_hash: "pwhash" };
    let user = { userId: "123", passwordHash: "new_pwhash" };
    await dao.save(user);
    expect(db["123"].user_id).to.deep.equal("123");
    expect(db["123"].password_hash).to.deep.equal("new_pwhash");
  });
});
  