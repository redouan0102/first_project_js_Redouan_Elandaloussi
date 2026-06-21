const database = [];
let currentUser = null;
function startBankSystem() {
    while (true) {
        if (currentUser==null) {
            const choice = prompt(
                "Sélectionnez une option :\n" +
                "1. Sign up (S'inscrire)\n" +
                "2. Log in (Se connecter)\n" +
                "3. Change password (Modifier le mot de passe)\n\n" +
                "4.'exit' pour quitter le programme complet."
            );

            if (choice === "4" || choice === null) {
                console.log("Fermeture du système bancaire.");
                break;
            }

            switch (choice.trim()) {
                case "1": SignUp(); break;
                case "2": LogIn(); break;
                case "3": ChangePassword(); break;
                default: alert("Option invalide.");
            }
        }else{
            break;
        }
    }
}

function SignUp() {
    console.log("PROCESSUS D'INSCRIPTION");
    
    // !vld nom
    let name = "";
    while (true) {
        name = prompt("Inscriptions - 1\nEntrez votre Nom complet:");
        if (User.validateName(name)) break;
        alert("Nom invalide.");
    }
    
    // ?2. Vld Email
    let email = "";
    while (true) {
        email = prompt("Inscriptions -  2\nEntrez votre adresse Email :");
        if (User.validateEmail(email, database)) break;
        alert("Email invalide ou déjà pris.");
    }

    //?3 vld ag
    let age = "";
    while (true) {
        age = prompt("Inscriptions - 3\nEntrez votre Âge (uniquement les chiffres) :");
        if (User.validateAge(age)) break;
        alert("Âge invalide (sans espace, de 1 à 2 caractères).");
    }

    //? 4. Vld psswrd
    let password = "";
    while (true) {
        password = prompt("Inscriptions - 4\nCréez votre mot de passe (min 7 caractères, inclure un signe @,#,-,+,*,/) :");
        if (User.validatePassword(password)) break;
        alert("Mot de passe non sécurisé. Consultez la console.");
    }

    //? 5.cnfrm psswrd
    while (true) {
        const confirm = prompt("Inscriptions - 5\nConfirmez votre mot de passe :");
        if (confirm === password) {
            break;
        } else {
            alert("Les mots de passe ne correspondent pas, Réessayez.");
            return; 
        }
    }

    // ?Svgrd en b.d
    const newUser = new User(name, email.toLowerCase(), age, password);
    database.push(newUser);
    console.log(`Succès: Compte créé pour ${newUser.fullName}`);
    alert("Votre compte a été enregistré avec succès !");
}

function LogIn() {
    console.log("CONNEXION");
    const emailInput = prompt("Entrez votre Email :");

    const user = database.find(u => u.email === emailInput.trim().toLowerCase());
    if (user==null) {
        alert("Cet email n'existe pas dans notre base de données.");
        return;
    }

    const passwordInput = prompt("Entrez votre Mot de passe :");

    if (user.password !== passwordInput) {
        alert("Mot de passe incorrect.");
        return;
    }

    // ?cnx vld
    currentUser = user;
    console.log(`Connexion réussie. Bienvenue ${currentUser.fullName}!`);
    
    // ?dplc auto des dividendes d'investissements au login
    currentUser.processLoginTriggers();
}

// !intial chrgmnt script
startBankSystem();