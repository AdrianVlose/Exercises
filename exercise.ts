// Task: parseUserConfig (TypeScript + runtime validation)

// Goal: Implement a function that takes a JSON string and returns either a valid User object or a friendly error.

// Starter types (do not change)
type Role = 'intern' | 'mentor' | 'admin';

export type User = {
  id: string;
  email: string;
  role: Role;
};

export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

// [1] Implement
export function parseUserConfig(input: string): Result<User> {
  try {
    const parsedInput = JSON.parse(input);

    if (!('id' in parsedInput)) {
      return {
        ok: false,
        error: 'Missing field: id',
      };
    }

    if (typeof parsedInput.id !== 'string') {
      return {
        ok: false,
        error: 'Invalid type for id field(expected string)',
      };
    }

    if (!('email' in parsedInput)) {
      return {
        ok: false,
        error: 'Missing field: email',
      };
    }

    if (typeof parsedInput.email !== 'string') {
      return {
        ok: false,
        error: 'Invalid type for email field(expected string)',
      };
    }

    if (!('role' in parsedInput)) {
      return {
        ok: false,
        error: 'Missing field: role',
      };
    }

    if (
      parsedInput.role === 'intern' ||
      parsedInput.role === 'intern' ||
      parsedInput.role === 'intern'
    ) {
      return {
        ok: true,
        value: {
          id: parsedInput.id,
          email: parsedInput.email,
          role: parsedInput.role,
        },
      };
    }

    return {
      ok: false,
      error: 'Invalid role (expected intern|mentor|admin)',
    };
  } catch (error) {
    return {
      ok: false,
      error: 'Invalid JSON',
    };
  }
}

const inputWithValidJSON = `[
  {"id":"u1","email":"a@b.com","role":"intern"},
  {"id":"u2","email":"a@b.com","role":"boss"},
  {"id":123,"email":"a@b.com","role":"intern"},
  {"email":"a@b.com","role":"intern"},
  {"id":"u2","role":"intern"},
  {"id":"u2","email":505,"role":"intern"},
  {"id":"u2","email":"a@b.com"}
]`;

const inputWithInvalidJSON = `[
  {"id":"u1","email":"a@b.com","role":"intern", ]`;
const inputWithNoArray = `{"id":"u1","email":"a@b.com","role":"intern"}`;

// [2] Parse list of users
// Implement
export function parseUsersConfig(input: string): Result<User[]> {
  let users: unknown;
  try {
    users = JSON.parse(input);
    if (!Array.isArray(users)) {
      return {
        ok: false,
        error: 'JSON must be an array',
      };
    }

    let validUsers: User[] = [];

    users.forEach((user) => {
      const result = parseUserConfig(JSON.stringify(user));
      if (result.ok) {
        validUsers.push(result.value);
        console.log('\nValid user: ', user);
      } else {
        console.log('\n', user);
        console.log('Error for this user is ', result.error);
      }
    });

    return {
      ok: true,
      value: validUsers,
    };
  } catch (error) {
    return {
      ok: false,
      error: 'Invalid Json',
    };
  }
}

// Rules:
// JSON must be an array
// Every element must be a valid User
// If JSON is invalid -> "Invalid JSON"
// If JSON is valid but not an array or any element is invalid -> "Invalid Users shape"

// [3] Better error messages (advanced)
// Improve errors so they are more specific than "Invalid User shape".
// Examples:
// "Missing field: id"
// "Invalid type for id (expected string)"
// "Invalid role (expected intern|mentor|admin)"

// What to submit:
// * exercise.ts with your implementations
// * A short console.log demo that shows outputs for the sample inputs

const resultsForInvalidJSON = parseUsersConfig(inputWithInvalidJSON);
console.log('New input for testing: \n', resultsForInvalidJSON);

const resultsForNoArray = parseUsersConfig(inputWithNoArray);
console.log('New input for testing: \n', resultsForNoArray);

const resultsForValidJSON = parseUsersConfig(inputWithValidJSON);
console.log('New input for testing: \n', resultsForValidJSON);
