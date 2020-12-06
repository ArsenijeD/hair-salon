package com.example.hairsalon.security.util;

import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.stereotype.Service;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

@Service
public class CredentialsUtil {
    private final PasswordGenerator passwordGenerator;

    public CredentialsUtil(PasswordGenerator passwordGenerator) {
        this.passwordGenerator = passwordGenerator;
    }

    public CharSequence generatePassword(int length) {
        //TODO Store password in a char[] because it is not immutable
        CharacterRule lowerCaseRule = createCharacterRule(EnglishCharacterData.LowerCase, 2);
        CharacterRule upperCaseRule = createCharacterRule(EnglishCharacterData.UpperCase, 2);
        CharacterRule digitRule = createCharacterRule(EnglishCharacterData.Digit, 2);

        CharacterData specialChars = new CharacterData() {
            @Override
            public String getErrorCode() {
                throw new NotImplementedException();
            }

            @Override
            public String getCharacters() {
                return "!@#$%^&*()_+";
            }
        };
        CharacterRule splCharRule = createCharacterRule(specialChars, 2);

        CharSequence password = passwordGenerator.generatePassword(length, splCharRule, lowerCaseRule,
                upperCaseRule, digitRule);
        return password;
    }

    public String generateUsername(String firstName, String phoneNumber) {
        return firstName + phoneNumber;
    }
    
    private CharacterRule createCharacterRule(CharacterData characterData, int numberOfCharacters) {
        CharacterRule characterRule = new CharacterRule(characterData);
        characterRule.setNumberOfCharacters(numberOfCharacters);
        return characterRule;
    }
}
