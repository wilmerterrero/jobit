import * as crypto from "crypto";

const GenerateRandomStrings = (): string => {
    const Secret = crypto.randomBytes(46).toString('hex');
    return Secret;
}

export const RefreshSecretKey = {
    "key": GenerateRandomStrings()
}

export const SecretKey = {
    "key": GenerateRandomStrings()
}
