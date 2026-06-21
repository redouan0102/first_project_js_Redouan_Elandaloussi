class User {

    constructor(fullName, email, age, password, balance = 500) {
        this.fullName = fullName;
        this.email = email;
        this.age = parseInt(age);
        this.password = password;
        this.balance = balance;
    }
}
    static validateName(name) {
    const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ ";
    if (name.startsWith(" ") || name.endsWith(" ")) {
        console.error("Erreur : Le nom ne doit pas contenir d'espaces au début ou à la fin.");
        return false;
    }

    if (!name) {
        console.log("Erreur : Le nom est vide ou invalide.");
        return false;
        for (let i = 0; i < name.length; i++) {
            const char = name[i];
            if (!allowedChars.includes(char)) {
                console.error(`Erreur : Le caractère "${char}" est interdit dans le nom.`);
                return false;
            }
        }
        const words = name.split(/\s+/);
        for (let word of words) {
            if (word[0] !== word[0].toUpperCase()) {
                console.error("Erreur : La première lettre de chaque mot doit être une majuscule.");
                return false;
            }
            if (word.slice(1) !== word.slice(1).toLowerCase()) {
                console.error("Erreur : Les lettres suivantes doivent être en minuscules.");
                return false;
            }
        }
        const charactersWithoutSpaces = name.replace(/\s+/g, '');
        if (charactersWithoutSpaces.length < 5) {
            console.error("Erreur : Le nom doit contenir au moins 5 caractères (hors espaces).");
            return false;
        }
        return true;
    }
     static validateEmail(email, database) {
        if (email.startsWith(" ") || email.endsWith(" ")) {
            console.error("Erreur : L'email ne doit pas contenir d'espaces au début ou à la fin.");
            return false;
        }
        if (email.includes(" ")) {
            console.error("Erreur : L'email ne doit pas contenir d'espaces.");
            return false;
        }
        if (email.length < 10) {
            console.error("Erreur : L'email doit faire au moins 10 caractères.");
            return false;
        }

        let atCount = 0;

        for (let i = 0; i < email.length; i++) {
            if (email[i] === '@') {
                atCount++;
            }
        }
        if (atCount !== 1) {
            console.error("Erreur : L'email doit contenir exactement un symbole '@'.");
            return false;
        }
        const lowerEmail = email.toLowerCase();
        const isDuplicate = database.some(user => user.email.toLowerCase() === lowerEmail);
        if (isDuplicate) {
            console.error("Erreur : Cet email est déjà utilisé par un autre compte.");
            return false;
        }
        return true;
    }
static validateAge(age) {
        if (age.length === 0 || age.length >= 3) {
            console.error("Erreur : L'âge doit comporter 1 ou 2 chiffres maximum.");
            return false;
        }
        const allowedDigits = "0123456789";
        for (let i = 0; i < age.length; i++) {
            const char = age[i];

            if (char === " ") {
                console.error("Erreur : L'âge ne doit contenir aucun espace.");
                return false;
            }

            if (!allowedDigits.includes(char)) {
                console.error("Erreur : L'âge doit uniquement contenir des chiffres.");
                return false;
            }
        }
        return true;
    }
    static validatePassword(password) {
        if (password.startsWith(" ") || password.endsWith(" ")) {
            console.error("Erreur : Le mot de passe ne doit pas contenir d'espaces au début ou à la fin.");
            return false;
        }
        if (/\s/.test(password)) {
            console.error("Erreur : Le mot de passe ne doit pas contenir d'espaces au milieu.");
            return false;
        }
        if (password.length < 7) {
            console.error("Erreur : Le mot de passe doit contenir au moins 7 caractères.");
            return false;
        }

        const specialChars = ["@", "#", "-", "+", "*", "/"];
        const hasSpecial = specialChars.some(char => password.includes(char));
        if (!hasSpecial) {
            console.error("Erreur : Le mot de passe doit contenir au moins l'un de ces caractères : @, #, -, +, *, /");
            return false;
        }

        return true;
    }

}
